import React, { useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Brain,
  Sparkles,
  ShieldCheck,
  MessageCircle,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Button3D from "./ui/Button3D";
import { openWhatsApp } from "../utils/whatsapp";

/**
 * ExpandableModalityCard
 * Compact card with short text that cleanly expands into detailed clinical principles,
 * therapeutic methodology, and ideal candidates.
 * Uses only real clinical expertise info without medical claims.
 */

export default function ExpandableModalityCard({
  modality,
  lang = "en",
  defaultExpanded = false
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const title = modality.name?.[lang] || modality.name?.en || "";
  const shortCode = modality.short || "";
  const badge = modality.badge?.[lang] || modality.badge?.en || "";
  const desc = modality.description?.[lang] || modality.description?.en || "";
  const principles = modality.corePrinciples?.[lang] || modality.corePrinciples?.en || [];
  const idealFor = modality.idealFor?.[lang] || modality.idealFor?.en || "";

  const handleConsultWhatsApp = (e) => {
    e.stopPropagation();
    const msg = lang === "bn"
      ? `আসসালামু আলাইকুম, আমি মাইন্ডসেট-এর "${title}" থেরাপিউটিক পদ্ধতি সম্পর্কে জানতে আগ্রহী।`
      : `Hello MINDSET, I would like to consult about ${title} (${shortCode}) therapy.`;
    openWhatsApp(msg);
  };

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-white/[0.04] backdrop-blur-md ${
        isExpanded
          ? "border-purple-400/60 shadow-[0_16px_40px_-8px_rgba(91,75,219,0.35)] ring-1 ring-purple-500/30"
          : "border-purple-500/20 hover:border-purple-400/40 hover:bg-white/[0.06] shadow-md"
      }`}
    >
      {/* ======================================================= */}
      {/* COMPACT CARD HEADER (ALWAYS VISIBLE)                    */}
      {/* ======================================================= */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none hover:bg-white/[0.02] transition-colors"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsExpanded(!isExpanded);
          }
        }}
      >
        <div className="space-y-2 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-600/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono font-bold">
              {shortCode}
            </span>
            {badge && (
              <span className="px-2.5 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-400/30 text-[11px] font-semibold">
                {badge}
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-2">
            {desc}
          </p>
        </div>

        {/* Expand / Collapse Indicator */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
          <span className="text-xs font-bold text-indigo-300 sm:inline hidden">
            {isExpanded
              ? (lang === "bn" ? "সংক্ষেপ করুন" : "Collapse")
              : (lang === "bn" ? "বিস্তারিত দেখুন" : "Explore Modality")}
          </span>
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 ${
              isExpanded
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rotate-180 shadow-md"
                : "bg-white/10 text-slate-300 hover:bg-white/20"
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* EXPANDABLE CLINICAL DETAILS ACCORDION                   */}
      {/* ======================================================= */}
      {isExpanded && (
        <div className="border-t border-white/10 p-5 sm:p-7 bg-[#0B1020]/95 space-y-6 animate-[fadeIn_0.2s_ease-out] text-slate-200">
          
          {/* Full description */}
          <div className="space-y-1.5">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300">
              {lang === "bn" ? "ক্লিনিক্যাল সারসংক্ষেপ" : "Clinical Foundation"}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Core Principles */}
            <div className="p-4 rounded-2xl bg-[#11182D] border border-purple-500/20 space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-indigo-200 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>{lang === "bn" ? "মূল নীতিসমূহ" : "Core Principles"}</span>
              </div>
              {Array.isArray(principles) && principles.length > 0 ? (
                <ul className="space-y-2">
                  {principles.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-slate-300">{principles}</p>
              )}
            </div>

            {/* Ideal Candidates / For */}
            <div className="p-4 rounded-2xl bg-[#11182D] border border-purple-500/20 space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-orange-300 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>{lang === "bn" ? "উপযুক্ত ক্ষেত্রসমূহ" : "Ideal Indications"}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {idealFor}
              </p>

              {/* Ethical non-medical assurance */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{lang === "bn" ? "প্রমাণভিত্তিক সাইকোথেরাপি • কোনো অবৈজ্ঞানিক দাবি নয়" : "Standardized psychotherapy • No unsubstantiated claims"}</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/10">
            <span className="text-[11px] text-slate-400 font-medium">
              {lang === "bn"
                ? "আন্তর্জাতিক প্রটোকল অনুসারে ৫০ মিনিটের ব্যক্তিগত সেশনে পরিচালিত"
                : "Structured 50-minute clinical sessions adhering to ethical guidelines"}
            </span>

            <div className="flex items-center gap-2.5">
              <Button3D
                onClick={handleConsultWhatsApp}
                variant="emerald"
                size="sm"
                icon={MessageCircle}
              >
                {lang === "bn" ? "পরামর্শ নিন" : "WhatsApp Consult"}
              </Button3D>

              <Button3D
                to="/appointment"
                variant="primary"
                size="sm"
                icon={Calendar}
              >
                {lang === "bn" ? "সেশন বুক করুন" : "Book Session"}
              </Button3D>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
