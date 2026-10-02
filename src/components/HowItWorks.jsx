import React from "react";
import { MessageSquare, Calendar, Sparkles, ArrowRight, ArrowDown } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";

export default function HowItWorks() {
  const { lang } = useLanguage();

  const stepIcons = [MessageSquare, Calendar, Sparkles];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{siteContent.howItWorks.badge[lang]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {siteContent.howItWorks.heading[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {siteContent.howItWorks.subtext[lang]}
          </p>
        </div>

        {/* 3 Step Cards with connecting arrows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {siteContent.howItWorks.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Sparkles;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50/70 rounded-3xl p-8 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-black text-indigo-900/40 group-hover:text-indigo-900 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/70 text-orange-600 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title[lang]}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description[lang]}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-8 pt-4 border-t border-slate-200/60 flex items-center gap-2 text-xs font-bold text-indigo-900">
                  <span>Step {step.number}</span>
                  {idx < 2 && (
                    <ArrowRight className="w-4 h-4 text-slate-400 hidden md:inline ml-auto" />
                  )}
                  {idx < 2 && (
                    <ArrowDown className="w-4 h-4 text-slate-400 md:hidden ml-auto" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
