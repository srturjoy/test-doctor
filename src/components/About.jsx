import React from "react";
import { Check, ArrowRight, Shield, Heart, Maximize2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useImageModal } from "../context/ImageModalContext";
import { siteContent } from "../data/siteContent";
import { cmdData, doctorsData } from "../data/doctors";

export default function About() {
  const { lang } = useLanguage();
  const { openImage } = useImageModal();

  return (
    <section id="about" className="py-20 lg:py-28 bg-slate-50/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: CMD Leadership & Specialist Team Frame */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Leadership Portrait: CMD Fowzia Sharmin Hossain */}
            <div
              onClick={() =>
                openImage({
                  src: cmdData.image,
                  alt: "Fowzia Sharmin Hossain PhD - Chairman & Managing Director (CMD)",
                  title: lang === "bn" ? "ফওজিয়া শারমিন হোসেন" : "Fowzia Sharmin Hossain PhD",
                  subtitle:
                    lang === "bn"
                      ? "চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক (সিএমডি)"
                      : "Chairman & Managing Director (CMD)",
                  category: "MINDSET Leadership",
                })
              }
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-indigo-900/40 aspect-4/3 sm:aspect-16/11 bg-[#070B18] flex items-center justify-center cursor-zoom-in group"
              title={lang === "bn" ? "সিএমডির ছবি বড় করে দেখতে ক্লিক করুন" : "Click to view full photo of CMD"}
            >
              {/* Ambient blurred backdrop so letterboxed areas have matching tone */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25 blur-md scale-110 pointer-events-none"
                style={{ backgroundImage: `url('${cmdData.image}')` }}
              />

              <img
                src={cmdData.image}
                alt="Fowzia Sharmin Hossain - Chairman & Managing Director (CMD)"
                className="relative z-10 w-full h-full object-contain object-center group-hover:scale-102 transition-transform duration-500"
                style={{ objectFit: "contain" }}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo.png";
                }}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Top Right Zoom Badge */}
              <div className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-slate-900/70 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
              
              {/* Floating pill badge on image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto z-20 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    {lang === "bn" ? "ফওজিয়া শারমিন হোসেন" : "Fowzia Sharmin Hossain PhD"}
                  </p>
                  <p className="text-[11px] text-amber-300/90 font-medium mt-0.5">
                    {lang === "bn" ? "চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক (সিএমডি)" : "Chairman & Managing Director (CMD)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Resident Specialist Doctors Row */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  {lang === "bn" ? "আমাদের বিশেষজ্ঞ প্যানেল" : "Resident Clinical Panel"}
                </span>
                <span className="text-[10px] text-indigo-600 font-semibold">{doctorsData.length} Specialists</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {doctorsData.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() =>
                      openImage({
                        src: doc.image,
                        alt: doc.name[lang] || doc.name.en,
                        title: doc.name[lang] || doc.name.en,
                        subtitle: doc.designation[lang] || doc.designation.en,
                        category: lang === "bn" ? "মাইন্ডসেট সাইকোলজিস্ট" : "MINDSET Specialist",
                      })
                    }
                    className="group cursor-zoom-in text-center"
                    title={lang === "bn" ? `${doc.name[lang] || doc.name.en} এর ছবি দেখুন` : `View ${doc.name.en}`}
                  >
                    <div className="relative aspect-3/4 rounded-xl overflow-hidden bg-[#070B18] border border-slate-200 group-hover:border-purple-500 transition-colors flex items-center justify-center">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-20 blur-xs scale-110 pointer-events-none"
                        style={{ backgroundImage: `url(${doc.image})` }}
                      />
                      <img
                        src={doc.image}
                        alt={doc.name.en}
                        className="relative z-10 w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                        style={{ objectFit: "contain" }}
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/logo.png";
                        }}
                      />
                    </div>
                    <p className="text-[10px] font-bold text-slate-800 truncate mt-1">
                      {doc.name[lang] || doc.name.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Subtle background decorative shape */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-200/30 rounded-full blur-2xl -z-10" />
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-orange-800 text-xs font-bold tracking-wider uppercase">
              <Heart className="w-3.5 h-3.5 text-orange-600" />
              <span>{siteContent.about.badge[lang]}</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {siteContent.about.heading[lang]}
            </h2>

            {/* Brand Title & Tagline */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border-l-4 border-indigo-900">
              <p className="text-xs font-extrabold text-indigo-950 tracking-wider uppercase">
                {siteContent.about.brandName}
              </p>
              <p className="text-sm font-semibold text-slate-700 mt-1 italic">
                "{siteContent.about.tagline[lang]}"
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>{siteContent.about.paragraph1[lang]}</p>
              <p>{siteContent.about.paragraph2[lang]}</p>
            </div>

            {/* Core Pillars / Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {siteContent.about.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item[lang]}</span>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <a
                href="#cmd"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-white font-semibold text-sm shadow-sm transition-all duration-200 group"
              >
                <span>{siteContent.about.learnMoreBtn[lang]}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
