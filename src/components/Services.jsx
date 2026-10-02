import React, { useState } from "react";
import {
  CloudSun,
  Wind,
  Users,
  Shield,
  Brain,
  GitMerge,
  HeartHandshake,
  Compass,
  Scale,
  Sparkles,
  CheckCircle,
  Calendar,
  AlertCircle
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { servicesData } from "../data/services";
import { openWhatsApp } from "../utils/whatsapp";

export default function Services() {
  const { lang } = useLanguage();
  const [expandedId, setExpandedId] = useState(null);

  const iconComponents = {
    CloudSun: CloudSun,
    Wind: Wind,
    Users: Users,
    ShieldHeart: Shield,
    Brain: Brain,
    GitMerge: GitMerge,
    HeartHandshake: HeartHandshake,
    Compass: Compass,
    Scale: Scale
  };

  const handleInquireService = (service) => {
    const srvTitle = service.title[lang];
    const msg = lang === "bn"
      ? `আসসালামু আলাইকুম, আমি মাইন্ডসেটের "${srvTitle}" সেবাটি সম্পর্কে বিস্তারিত জানতে ও সেশন বুক করতে আগ্রহী।`
      : `Hello MINDSET, I would like to inquire and book a session for "${srvTitle}".`;
    openWhatsApp(msg);
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div id="expertise" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{siteContent.services.badge[lang]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {siteContent.services.heading[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {siteContent.services.subtext[lang]}
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service, idx) => {
            const IconComponent = iconComponents[service.iconName] || Brain;
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className="group relative bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Section */}
                <div>
                  {/* Service Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/70 group-hover:bg-indigo-950 group-hover:text-white text-indigo-900 flex items-center justify-center transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200/50">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-950 transition-colors mb-3 leading-snug">
                    {service.title[lang]}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {service.shortDescription[lang]}
                  </p>

                  {/* Expandable Key Focus Points */}
                  {isExpanded && (
                    <div className="space-y-2 pt-2 pb-4 border-t border-slate-200/70 text-xs text-slate-600 animate-in fade-in duration-200">
                      {service.details[lang].map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Controls */}
                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    className="text-slate-500 hover:text-indigo-950 underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    {isExpanded
                      ? (lang === "bn" ? "সংক্ষেপ করুন" : "Show less")
                      : (lang === "bn" ? "বিস্তারিত দেখুন" : "View highlights")}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInquireService(service)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-orange-600 text-white transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lang === "bn" ? "বুক করুন" : "Inquire / Book"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible Medical Ethics Note */}
        <div className="mt-14 max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5 text-xs text-slate-600">
          <AlertCircle className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {siteContent.services.disclaimer[lang]}
          </p>
        </div>

      </div>
    </section>
  );
}
