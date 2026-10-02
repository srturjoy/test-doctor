/**
 * MINDSET Psychotherapy & Counseling Center
 * Centralized WhatsApp & Contact Utilities
 */

import { trackWhatsAppClick } from "../tracking/index";

// Single source of truth for the WhatsApp number (Bangladesh country code 880)
export const WHATSAPP_NUMBER = "8801711345291"; // +880 1711-345291
export const PRIMARY_PHONE_DISPLAY = "+880 1711-345291";
export const PRIMARY_PHONE_TEL = "+8801711345291";
export const SECONDARY_PHONE_DISPLAY = "+880 1991-333503";
export const SECONDARY_PHONE_TEL = "+8801991333503";
export const CONTACT_EMAIL = "fowziahossain1304@gmail.com";
export const FACEBOOK_URL = "https://www.facebook.com"; // Mindset Psychotherapy & Counseling Center
export const CHAMBER_ADDRESS_EN = "Monowara Plaza (4th Floor), 69/B Green Road, East Panthapath, Dhaka-1205";
export const CHAMBER_ADDRESS_BN = "মনোয়ারা প্লাজা (৪র্থ তলা), ৬৯/বি গ্রীন রোড, পূর্ব পান্থপথ, ঢাকা-১২০৫";
export const VISITING_HOURS_EN = "03:00 PM – 10:00 PM";
export const VISITING_HOURS_BN = "বিকাল ০৩:০০ - রাত ১০:০০";

/**
 * Builds standard WhatsApp direct link
 */
export function getWhatsAppUrl(message = "") {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}${encoded ? `?text=${encoded}` : ""}`;
}

/**
 * Opens WhatsApp safely in a new tab / app
 */
export function openWhatsApp(message = "", source = "general") {
  // Silent tracking trigger for Meta CAPI / GTM Server deduplicated event
  try {
    trackWhatsAppClick(source);
  } catch {
    // Non-blocking
  }

  const url = getWhatsAppUrl(message);
  if (typeof window !== "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

/**
 * Generates an appointment request text for WhatsApp
 */
export function createAppointmentMessage(
  { name, phone, email, specialist, service, date, time, consultationType, message },
  lang = "en"
) {
  if (lang === "bn") {
    return `আসসালামু আলাইকুম, মাইন্ডসেট সাইকোথেরাপি অ্যান্ড কাউন্সেলিং সেন্টার,

আমি একটি সেশনের জন্য অ্যাপয়েন্টমেন্ট বুক করতে আগ্রহী।

• নাম: ${name || "অপ্রদানকৃত"}
• মোবাইল নম্বর: ${phone || "অপ্রদানকৃত"}
${email ? `• ইমেইল: ${email}\n` : ""}• বিশেষজ্ঞ: ${specialist || "যেকোনো উপলব্ধ বিশেষজ্ঞ"}
• সেবা: ${service || "সাধারণ কাউন্সেলিং"}
• সেশনের ধরন: ${consultationType || "চেম্বার কনসালটেশন (গ্রীন রোড)"}
• পছন্দের তারিখ: ${date || "আলোচনা সাপেক্ষে"}
• পছন্দের সময়: ${time || "আলোচনা সাপেক্ষে (বিকাল ৩:০০ - রাত ১০:০০)"}
${message ? `• বিশেষ বার্তা / উদ্বেগ: ${message}\n` : ""}
ধন্যবাদ।`;
  }

  return `Hello MINDSET Psychotherapy & Counseling Center,

I would like to request an appointment.

• Name: ${name || "Not provided"}
• Phone: ${phone || "Not provided"}
${email ? `• Email: ${email}\n` : ""}• Preferred Specialist: ${specialist || "Any Available Specialist"}
• Service: ${service || "General Counseling"}
• Consultation Type: ${consultationType || "In-Person Chamber Consultation (Green Road)"}
• Preferred Date: ${date || "To be discussed"}
• Preferred Time Slot: ${time || "To be discussed (03:00 PM – 10:00 PM)"}
${message ? `• Confidential Note: ${message}\n` : ""}
Thank you.`;
}
