import React from "react";
import {
  ShieldCheck,
  Award,
  Heart,
  Users,
  Smile,
  CalendarCheck,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";

export default function WhyChooseUs() {
  const { lang } = useLanguage();

  const iconList = [
    ShieldCheck,
    Award,
    Heart,
    Users,
    Smile,
    CalendarCheck
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-700" />
            <span>{siteContent.whyChooseUs.badge[lang]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {siteContent.whyChooseUs.heading[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {siteContent.whyChooseUs.subtext[lang]}
          </p>
        </div>

        {/* 6 Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.whyChooseUs.features.map((feature, idx) => {
            const Icon = iconList[idx] || ShieldCheck;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Feature Icon */}
                <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-950 group-hover:text-white text-indigo-900 flex items-center justify-center mb-5 transition-colors duration-200 shadow-2xs">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-950 transition-colors mb-2.5">
                  {feature.title[lang]}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {feature.description[lang]}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
