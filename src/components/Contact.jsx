import React from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Share2,
  ExternalLink,
  ShieldCheck,
  HeartHandshake
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import {
  openWhatsApp,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  CONTACT_EMAIL,
  FACEBOOK_URL
} from "../utils/whatsapp";

export default function Contact() {
  const { lang } = useLanguage();
  const t = siteContent.contact;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Container */}
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-sm relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-indigo-700" />
              <span>{t.badge[lang]}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {t.heading[lang]}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
              {(t.subtext || t.text)?.[lang] || ""}
            </p>

            {/* 4 Working Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              
              {/* WhatsApp Button */}
              <button
                type="button"
                id="contact-whatsapp-btn"
                onClick={() => openWhatsApp("Hello MINDSET, I am reaching out to discuss a consultation.")}
                className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{t.buttons.whatsapp[lang]}</span>
              </button>

              {/* Direct Call Button */}
              <a
                href={`tel:${PRIMARY_PHONE_TEL}`}
                className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Phone className="w-5 h-5 text-amber-300" />
                <span>{t.buttons.call[lang]}</span>
              </a>

              {/* Email Button */}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-sm shadow-xs transition-all duration-200"
              >
                <Mail className="w-5 h-5 text-indigo-700" />
                <span>{t.buttons.email[lang]}</span>
              </a>

              {/* Facebook Button */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Share2 className="w-5 h-5" />
                <span>{t.buttons.facebook[lang]}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

            </div>

            <div className="pt-6 border-t border-slate-200/80 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{lang === "bn" ? "সকল যোগাযোগ গোপনীয়তা নীতিমালা অনুযায়ী সুরক্ষিত।" : "Strict professional ethics and confidentiality strictly maintained."}</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
