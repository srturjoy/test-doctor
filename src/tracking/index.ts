/**
 * MINDSET Psychotherapy & Counseling Center
 * Client-Side Tracking API
 * 
 * Completely invisible to users. No UI, no banners, no debug badges.
 * Automatically coordinates deduplicated server-side event delivery.
 */

import { dispatchClientEvent } from "./dataLayer";
import { generateEventId } from "./events";

export * from "./events";
export * from "./dataLayer";

/**
 * Fires standard PageView event.
 */
export function trackPageView(pagePath?: string, pageTitle?: string) {
  return dispatchClientEvent({
    eventName: "PageView",
    customData: {
      page_path: pagePath || (typeof window !== "undefined" ? window.location.pathname : "/"),
      page_title: pageTitle || (typeof document !== "undefined" ? document.title : "MINDSET"),
    },
  });
}

/**
 * Fires WhatsAppClick event when a user initiates a WhatsApp consultation conversation.
 */
export function trackWhatsAppClick(source: string = "floating_button") {
  return dispatchClientEvent({
    eventName: "WhatsAppClick",
    customData: {
      action: "whatsapp_consultation_inquiry",
      click_source: source,
      content_category: "Psychotherapy Consultation",
    },
  });
}

/**
 * Fires AppointmentStart when user starts interacting with the appointment scheduler.
 */
export function trackAppointmentStart(consultationType?: string) {
  return dispatchClientEvent({
    eventName: "AppointmentStart",
    customData: {
      consultation_type: consultationType || "Chamber",
      step: 1,
    },
  });
}

/**
 * Fires AppointmentSubmit and Schedule upon successful appointment request.
 * NEVER forwards private message, clinical concern, or diagnosis.
 */
export function trackAppointmentSubmit(info?: {
  phone?: string;
  email?: string;
  name?: string;
  specialist?: string;
  service?: string;
  consultationType?: string;
}) {
  const eventId = generateEventId("sched");

  // Fire Schedule (Meta standard event) and AppointmentSubmit (custom event)
  dispatchClientEvent({
    eventName: "Schedule",
    eventId,
    userData: {
      phone: info?.phone,
      email: info?.email,
      firstName: info?.name?.split(" ")[0],
    },
    customData: {
      service_name: info?.service || "Psychotherapy",
      specialist: info?.specialist || "Clinical Psychologist",
      consultation_type: info?.consultationType || "Chamber",
      currency: "BDT",
    },
  });

  return eventId;
}

/**
 * Fires Contact event when general inquiry is submitted.
 * NEVER forwards message content.
 */
export function trackContact(info?: { phone?: string; email?: string; name?: string }) {
  return dispatchClientEvent({
    eventName: "Contact",
    userData: {
      phone: info?.phone,
      email: info?.email,
      firstName: info?.name?.split(" ")[0],
    },
    customData: {
      inquiry_type: "General Consultation Inquiry",
    },
  });
}

/**
 * Fires ViewContent event when viewing a specialist or service detail.
 */
export function trackViewContent(contentType: string, contentName: string) {
  return dispatchClientEvent({
    eventName: "ViewContent",
    customData: {
      content_type: contentType,
      content_name: contentName,
      content_category: "Psychology & Counseling",
    },
  });
}

/**
 * Fires Lead event for high-intent conversions.
 */
export function trackLead(source: string) {
  return dispatchClientEvent({
    eventName: "Lead",
    customData: {
      lead_source: source,
      currency: "BDT",
    },
  });
}
