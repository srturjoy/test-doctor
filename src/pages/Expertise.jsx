import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  Sparkles,
  Search,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Compass
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { therapeuticModalities } from "../data/expertise";
import InteractiveMindSystem from "../components/InteractiveMindSystem";
import ExpandableModalityCard from "../components/ExpandableModalityCard";
import SEO from "../components/SEO";
import Button3D from "../components/ui/Button3D";
import { openWhatsApp } from "../utils/whatsapp";

export default function Expertise() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [expandAll, setExpandAll] = useState(false);

  // Filter categories for the clinical modalities
  const filterCategories = [
    { id: "all", label: { en: "All Frameworks", bn: "সকল ফ্রেমওয়ার্ক" } },
    { id: "individual", label: { en: "Individual (CBT & Humanistic)", bn: "ব্যক্তিকেন্দ্রিক (সিবিটি)" } },
    { id: "relational", label: { en: "Relational & Family", bn: "সম্পর্ক ও পরিবার" } },
    { id: "child", label: { en: "Child & Play", bn: "শিশু ও প্লে থেরাপি" } },
    { id: "specialized", label: { en: "Specialized & Trauma", bn: "ট্রমা ও বিশেষায়িত" } }
  ];

  // Filter modalities based on search and category
  const filteredModalities = useMemo(() => {
    return therapeuticModalities.filter((mod) => {
      // Category filter matching
      let matchesCategory = true;
      if (selectedFilter === "individual") {
        matchesCategory = ["cbt", "person-centered", "existential"].includes(mod.id);
      } else if (selectedFilter === "relational") {
        matchesCategory = ["transactional-analysis", "family-couple"].includes(mod.id);
      } else if (selectedFilter === "child") {
        matchesCategory = ["art-play", "child-parenting"].includes(mod.id);
      } else if (selectedFilter === "specialized") {
        matchesCategory = ["trauma-emdr", "geriatric-addiction", "forensic"].includes(mod.id);
      }

      // Search matching
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const nameStr = (mod.name?.[lang] || mod.name?.en || "").toLowerCase();
      const shortStr = (mod.short || "").toLowerCase();
      const descStr = (mod.description?.[lang] || mod.description?.en || "").toLowerCase();
      const idealStr = (mod.idealFor?.[lang] || mod.idealFor?.en || "").toLowerCase();

      const matchesSearch =
        nameStr.includes(q) ||
        shortStr.includes(q) ||
        descStr.includes(q) ||
        idealStr.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedFilter, searchQuery, lang]);

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10 pb-14">
      <SEO
        title="Clinical Expertise & Evidence-Based Psychotherapy | MINDSET Center"
        description="Explore our evidence-based psychological frameworks in Dhaka: Cognitive Behavioral Therapy (CBT), Transactional Analysis, Trauma-Informed Care, Systemic Therapy, and more."
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION: EDITORIAL 3D ATMOSPHERE                  */}
      {/* Exact requested Heading: Understanding the Mind           */}
      {/* Exact requested Subheading: Transforming the way we live. */}
      {/* ========================================================= */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 bg-gradient-to-b from-[#070B18] via-[#11182D] to-[#0B1020] text-white overflow-hidden border-b border-white/10">
        {/* Soft atmospheric radial glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-mono font-bold tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>MINDSET CLINICAL SCIENCE &amp; PRACTICE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === "bn" ? "মনের গভীরকে জানা" : "Understanding the Mind"}
          </h1>

          <p className="text-lg sm:text-2xl text-indigo-200/90 max-w-2xl mx-auto font-light leading-relaxed">
            {lang === "bn" ? "জীবনযাপনের ধারায় ইতিবাচক রূপান্তর।" : "Transforming the way we live."}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button3D
              to="/appointment"
              variant="primary"
              size="md"
              icon={Calendar}
            >
              {lang === "bn" ? "পরামর্শ সেশন বুক করুন" : "Schedule Consultation"}
            </Button3D>

            <Button3D
              onClick={() =>
                openWhatsApp(
                  "Hello MINDSET, I am looking to understand which therapeutic modality fits my situation best."
                )
              }
              variant="emerald"
              size="md"
              icon={MessageCircle}
            >
              {lang === "bn" ? "হোয়াটসঅ্যাপে জানুন" : "WhatsApp Inquiry"}
            </Button3D>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN VISUAL: SOPHISTICATED INTERACTIVE 3D SYSTEM       */}
      {/* - THOUGHT → EMOTION → BEHAVIOR                            */}
      {/* - Person → Relationship → Family                          */}
      {/* - Stress → Understanding → Support → Growth               */}
      {/* Interactive nodes, organic curves, subtle 3D depth       */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <InteractiveMindSystem />
      </section>

      {/* ========================================================= */}
      {/* 3. EXPANDABLE CLINICAL EXPERTISE MODALITIES SECTION       */}
      {/* "Detailed clinical expertise should be expandable."       */}
      {/* "Keep text short. Use only real expertise info."          */}
      {/* "Do not create medical claims."                          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header & Interactive Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-orange-400 tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "প্রমাণভিত্তিক সাইকোথেরাপিউটিক পদ্ধতি" : "Evidence-Based Psychotherapy Frameworks"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {lang === "bn" ? "আমাদের ক্লিনিক্যাল পদ্ধতি ও ফ্রেমওয়ার্ক" : "Our Clinical Modalities"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              {lang === "bn"
                ? "প্রতিটি ফ্রেমওয়ার্ক আন্তর্জাতিক ক্লিনিক্যাল প্রটোকল অনুসারে পরিচালিত। বিস্তারিত দেখতে কার্ডে ক্লিক করুন।"
                : "Each framework adheres to standardized clinical guidelines. Click any card to expand clinical details."}
            </p>
          </div>

          {/* Quick Expand All Toggle & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setExpandAll(!expandAll)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer border border-white/10"
            >
              {expandAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span>
                {expandAll
                  ? (lang === "bn" ? "সব সংক্ষেপ করুন" : "Collapse All")
                  : (lang === "bn" ? "সব বিস্তারিত দেখুন" : "Expand All")}
              </span>
            </button>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "bn" ? "পদ্ধতি খুঁজুন..." : "Filter modalities..."}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/[0.06] border border-purple-500/30 focus:outline-hidden focus:ring-2 focus:ring-purple-400/50 text-white placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterCategories.map((cat) => {
            const isActive = selectedFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/40"
                    : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-purple-500/20"
                }`}
              >
                {cat.label[lang]}
              </button>
            );
          })}
        </div>

        {/* Expandable Cards List */}
        <div className="space-y-4">
          {filteredModalities.map((modality) => (
            <ExpandableModalityCard
              key={modality.id}
              modality={modality}
              lang={lang}
              defaultExpanded={expandAll}
            />
          ))}

          {filteredModalities.length === 0 && (
            <div className="text-center py-12 px-4 bg-white/[0.03] rounded-3xl border border-purple-500/20">
              <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-white">
                {lang === "bn" ? "কোনো ফ্রেমওয়ার্ক পাওয়া যায়নি" : "No modalities match your filter"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3 px-4 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 cursor-pointer shadow-md"
              >
                {lang === "bn" ? "ফিল্টার মুছুন" : "Clear Filters"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PROFESSIONAL ETHICS & NON-MEDICAL SAFEGUARD BANNER     */}
      {/* "Do not create medical claims."                          */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "মনস্তাত্ত্বিক বিজ্ঞানভিত্তিক চর্চা" : "Psychological Science"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "মাইন্ডসেট-এর সেবাগুলো সাইকোথেরাপি ও কাউন্সেলিং নির্ভর। কোনো অবৈজ্ঞানিক বা চটকদার দাবি আমরা করি না।"
                    : "Interventions are grounded in clinical psychology and psychotherapy. We do not make speculative cure claims."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "সম্পূর্ণ পেশাদার গোপনীয়তা" : "Strict Ethical Confidentiality"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "আপনার প্রতিটি আলোচনা আমেরিকান সাইকোলজিক্যাল অ্যাসোসিয়েশন (APA) নৈতিক বিধি অনুসারে গোপন থাকে।"
                    : "All discussions follow international clinical ethics ensuring absolute confidentiality and non-judgment."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "সহযোগিতামূলক নিরাময় যাত্রা" : "Collaborative Empowerment"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "থেরাপিস্ট ও ক্লায়েন্ট একত্রে কাজ করে বাস্তবসম্মত রূপান্তর ও মানসিক স্থিতিশীলতা নিশ্চিত করেন।"
                    : "Therapy is an active partnership between practitioner and client to foster lasting life changes."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. APPOINTMENT / INQUIRY CTA                              */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#070B18] via-[#11182D] to-[#25204A] text-white p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden border border-purple-500/30 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]">
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "bn" ? "নিজের মানসিক স্বাস্থ্যের রূপান্তরে প্রস্তুত?" : "Ready to Experience Clinical Care?"}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 font-light leading-relaxed">
              {lang === "bn"
                ? "আজই বিশেষজ্ঞ সাইকোথেরাপিস্টের সাথে আপনার প্রথম পরামর্শের সময় নির্ধারণ করুন।"
                : "Schedule your initial consultation with our licensed psychotherapists in Dhaka or online."}
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button3D
                to="/appointment"
                variant="primary"
                size="md"
                icon={Calendar}
              >
                {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book an Appointment"}
              </Button3D>

              <Button3D
                onClick={() =>
                  openWhatsApp(
                    "Hello MINDSET, I would like to schedule a clinical consultation."
                  )
                }
                variant="ghost"
                size="md"
                icon={MessageCircle}
              >
                {lang === "bn" ? "হোয়াটসঅ্যাপে যোগাযোগ" : "Ask via WhatsApp"}
              </Button3D>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
