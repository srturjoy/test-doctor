import React from "react";
import { Lock, Award, UserCheck, CalendarCheck } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";

export default function TrustBar() {
  const { lang } = useLanguage();

  const iconMap = {
    Lock: Lock,
    Award: Award,
    UserCheck: UserCheck,
    CalendarCheck: CalendarCheck
  };

  return (
    <section id="trust-features" className="py-12 bg-white border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.trustFeatures.items.map((item) => {
            const IconComponent = iconMap[item.icon] || Lock;
            return (
              <div
                key={item.id}
                className="group relative p-6 rounded-2xl bg-slate-50/70 hover:bg-white border border-slate-200/70 hover:border-indigo-200 hover:shadow-md transition-all duration-300"
              >
                {/* Accent top pill */}
                <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-900 group-hover:text-white text-indigo-900 flex items-center justify-center mb-4 transition-colors duration-200 shadow-2xs">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-950 transition-colors">
                  {item.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.description[lang]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
