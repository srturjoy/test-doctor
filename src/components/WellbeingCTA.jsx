import React from "react";
import { MessageCircle, HeartHandshake, ShieldCheck } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { openWhatsApp } from "../utils/whatsapp";

export default function WellbeingCTA() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Soft warm light overlays */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-amber-300 text-xs font-bold tracking-wide">
          <HeartHandshake className="w-4 h-4" />
          <span>{lang === "bn" ? "সহমর্মিতা ও সুরক্ষা" : "Compassionate & Confidential"}</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {siteContent.wellbeingCta.headline[lang]}
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          {siteContent.wellbeingCta.text[lang]}
        </p>

        {/* Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            id="wellbeing-talk-btn"
            onClick={() => openWhatsApp("Hello MINDSET, I am reaching out to talk with a professional.")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>{siteContent.wellbeingCta.button[lang]}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{lang === "bn" ? "সকল তথ্য কঠোরভাবে গোপনীয় রাখা হয়" : "All conversations remain 100% confidential"}</span>
        </p>

      </div>
    </section>
  );
}
