import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Share2,
  ExternalLink,
  ShieldCheck,
  Building
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import {
  CHAMBER_ADDRESS_EN,
  CHAMBER_ADDRESS_BN,
  VISITING_HOURS_EN,
  VISITING_HOURS_BN,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  SECONDARY_PHONE_DISPLAY,
  SECONDARY_PHONE_TEL,
  CONTACT_EMAIL,
  FACEBOOK_URL
} from "../utils/whatsapp";

export default function Chamber() {
  const { lang } = useLanguage();
  const t = siteContent.chamber;

  return (
    <section id="chamber" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5 text-indigo-700" />
            <span>{t.badge[lang]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.heading[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.subtext[lang]}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Address Card */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-indigo-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {t.addressTitle[lang]}
            </h3>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              {lang === "bn" ? CHAMBER_ADDRESS_BN : CHAMBER_ADDRESS_EN}
            </p>
            <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-orange-600" />
              <span>4th Floor, Monowara Plaza</span>
            </p>
          </div>

          {/* Visiting Hours Card */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {t.hoursTitle[lang]}
            </h3>
            <p className="text-base sm:text-lg font-bold text-indigo-950">
              {lang === "bn" ? VISITING_HOURS_BN : VISITING_HOURS_EN}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              {lang === "bn"
                ? "কর্মজীবী ও শিক্ষার্থীদের জন্য সুবিধাজনক সান্ধ্যকালীন সেশন"
                : "Convenient evening appointment slots available"}
            </p>
          </div>

          {/* Appointments & Serial Phone Numbers */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {t.serialTitle[lang]}
            </h3>
            <div className="space-y-1.5">
              <div>
                <a
                  href={`tel:${PRIMARY_PHONE_TEL}`}
                  className="text-sm sm:text-base font-bold text-indigo-950 hover:text-orange-600 font-mono transition-colors block"
                >
                  {PRIMARY_PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${SECONDARY_PHONE_TEL}`}
                  className="text-sm sm:text-base font-bold text-indigo-950 hover:text-orange-600 font-mono transition-colors block"
                >
                  {SECONDARY_PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {lang === "bn" ? "সরাসরি ফোন বা হোয়াটসঅ্যাপ করুন" : "Direct telephone & WhatsApp booking"}
            </p>
          </div>

          {/* Email Card */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {t.emailTitle[lang]}
            </h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-semibold text-indigo-950 hover:text-orange-600 break-all transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-xs text-slate-500 mt-2">
              {lang === "bn" ? "অফিসিয়াল ও প্রশাসনিক যোগাযোগ" : "Official inquiries & administrative support"}
            </p>
          </div>

          {/* Facebook Card */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {t.facebookTitle[lang]}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-semibold text-indigo-950">
                Mindset Psychotherapy &amp; Counseling Center
              </span>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <span>{lang === "bn" ? "পেজে ভিজিট করুন" : "Visit Page"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
