import React from "react";
import { MessageCircle, ArrowRight, ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, Maximize2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useDoctorPhotos } from "../context/DoctorPhotosContext";
import { useImageModal } from "../context/ImageModalContext";
import { siteContent } from "../data/siteContent";
import { doctorsData } from "../data/doctors";
import { openWhatsApp } from "../utils/whatsapp";

export default function Hero({ onSelectDoctor }) {
  const { lang } = useLanguage();
  const { getDoctorPhoto } = useDoctorPhotos();
  const { openImage } = useImageModal();

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50/20 to-white"
    >
      {/* Soft atmospheric background glow & abstract shapes */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 -z-10 pointer-events-none opacity-60 overflow-hidden">
        <div className="absolute -top-16 left-12 w-80 h-80 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-amber-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-purple-100/30 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-950 text-xs font-bold tracking-wide shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-700" />
              <span>{siteContent.hero.badge[lang]}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              {siteContent.hero.headline[lang]}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              {siteContent.hero.subtext[lang]}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2">
              <button
                type="button"
                id="hero-whatsapp-btn"
                onClick={() => openWhatsApp("Hello MINDSET, I would like to book a confidential appointment.")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <MessageCircle className="w-5 h-5 text-white shrink-0 group-hover:scale-110 transition-transform" />
                <span>{siteContent.hero.primaryCta[lang]}</span>
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm sm:text-base shadow-xs hover:border-indigo-300 transition-all duration-200"
              >
                <span>{siteContent.hero.secondaryCta[lang]}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </a>
            </div>

            {/* Subtle Key Highlights */}
            <div className="pt-4 border-t border-slate-200/70 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">
                  {lang === "bn" ? "পূর্ণ গোপনীয়তা" : "Strict Privacy"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-700 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">
                  {lang === "bn" ? "৪ জন বিশেষজ্ঞ" : "4 Specialists"}
                </span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">
                  {lang === "bn" ? "পান্থপথ চেম্বার" : "Panthapath, Dhaka"}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Composition with 4 Specialists */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* Center background visual container */}
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Soft decorative backdrop card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/10 via-amber-500/5 to-purple-800/10 rounded-3xl -rotate-1 scale-102 filter blur-sm pointer-events-none" />

              {/* Composition Grid for the 4 Specialists */}
              <div className="relative bg-white/70 backdrop-blur-xs p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xl">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-900">
                      <HeartHandshake className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="text-xs sm:text-sm font-bold text-indigo-950">
                        {siteContent.hero.specialistsBadge[lang]}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        MINDSET Psychotherapy &amp; Counseling
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>{lang === "bn" ? "সক্রিয় সেশন" : "Sessions Available"}</span>
                  </div>
                </div>

                {/* Artistic Layout with gentle floating animation */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {doctorsData.map((doc, idx) => {
                    const isEven = idx % 2 === 1;
                    return (
                      <div
                        key={doc.id}
                        onClick={() => onSelectDoctor && onSelectDoctor(doc)}
                        className={`group relative bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 hover:border-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${
                          isEven ? "animate-float-delayed" : "animate-float-slow"
                        }`}
                        title={`${doc.name[lang]} - ${doc.designation[lang]}`}
                      >
                        {/* Doctor Photo */}
                        <div
                          className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-slate-100 mb-2.5 cursor-zoom-in group/photo"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImage({
                              src: getDoctorPhoto(doc.id, doc.image),
                              alt: doc.name[lang] || doc.name.en,
                              title: doc.name[lang] || doc.name.en,
                              subtitle: doc.designation[lang] || doc.designation.en,
                              category: lang === "bn" ? "মাইন্ডসেট সাইকোলজিস্ট" : "MINDSET Specialist",
                            });
                          }}
                          title={lang === "bn" ? "ছবি বড় করে দেখতে ক্লিক করুন" : "Click to view full photo"}
                        >
                          {/* Ambient backdrop */}
                          <div
                            className="absolute inset-0 bg-cover bg-center opacity-25 blur-md scale-110 pointer-events-none"
                            style={{ backgroundImage: `url(${getDoctorPhoto(doc.id, doc.image)})` }}
                          />

                          <img
                            src={getDoctorPhoto(doc.id, doc.image)}
                            alt={doc.name[lang]}
                            className="relative z-10 w-full h-full object-contain object-center group-hover/photo:scale-106 transition-transform duration-500"
                            style={{ objectFit: "contain" }}
                            loading="eager"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/logo.png";
                            }}
                          />
                          <div className="absolute top-2 right-2 z-10 p-1.5 rounded-lg bg-slate-900/70 backdrop-blur-md text-white/90 border border-white/20 opacity-0 group-hover/photo:opacity-100 transition-opacity shadow-sm">
                            <Maximize2 className="w-3 h-3" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                            <span className="text-[10px] font-bold text-white bg-indigo-600/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Maximize2 className="w-2.5 h-2.5" />
                              {lang === "bn" ? "ছবি দেখুন" : "View Photo"}
                            </span>
                          </div>
                        </div>

                        {/* Card Info */}
                        <div className="space-y-0.5">
                          {doc.title && (
                            <span className="inline-block px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 text-[9px] font-bold uppercase tracking-wider mb-0.5">
                              {doc.title[lang] || doc.title.en}
                            </span>
                          )}
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-950 transition-colors line-clamp-1">
                            {doc.name[lang]}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] font-medium text-orange-700 line-clamp-1">
                            {doc.designation[lang]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Floating badge over bottom of cards */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-[11px] font-medium text-slate-700">
                      {siteContent.hero.confidentialityBadge[lang]}
                    </span>
                  </div>
                  <a
                    href="#specialists"
                    className="text-[11px] font-bold text-indigo-900 hover:text-orange-600 flex items-center gap-1 transition-colors"
                  >
                    <span>{lang === "bn" ? "সকল প্রোফাইল" : "All Profiles"}</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
