import React from "react";
import { MessageCircle, PhoneCall, Calendar, ShieldCheck } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { openWhatsApp, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from "../utils/whatsapp";

export default function AppointmentCTA() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          
          {/* Subtle decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{siteContent.appointmentCta.badge[lang]}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {siteContent.appointmentCta.heading[lang]}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
              {siteContent.appointmentCta.subtext[lang]}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                id="cta-whatsapp-primary"
                onClick={() => openWhatsApp("Hello MINDSET, I am ready to book my appointment.")}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>{siteContent.appointmentCta.primaryBtn[lang]}</span>
              </button>

              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>{siteContent.appointmentCta.secondaryBtn[lang]} ({PRIMARY_PHONE_DISPLAY})</span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{lang === "bn" ? "সকল তথ্য সর্বোচ্চ বিশ্বস্ততা ও গোপনীয়তায় সংরক্ষিত" : "Your consultation request is processed with strict clinical confidentiality."}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
