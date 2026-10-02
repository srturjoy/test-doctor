import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  HeartHandshake
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { serviceCategories, servicesData } from "../data/services";
import ServiceVisualMetaphor from "../components/ServiceVisualMetaphor";
import ServiceModal from "../components/ServiceModal";
import SEO from "../components/SEO";
import TiltCard3D from "../components/ui/TiltCard3D";
import Button3D from "../components/ui/Button3D";
import { openWhatsApp } from "../utils/whatsapp";

export default function Services() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  // Filter services by category and search
  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCat = activeCategory === "all" || service.categoryId === activeCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const titleStr = (service.title?.[lang] || service.title?.en || "").toLowerCase();
      const oneLinerStr = (service.oneLiner?.[lang] || service.oneLiner?.en || "").toLowerCase();
      const descStr = (service.description?.[lang] || service.description?.en || "").toLowerCase();

      const matchesSearch =
        titleStr.includes(query) ||
        oneLinerStr.includes(query) ||
        descStr.includes(query);

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  // Group services by category for clean sectioning
  const displayedCategories = useMemo(() => {
    if (activeCategory === "all" && !searchQuery) {
      return serviceCategories;
    }
    if (activeCategory !== "all" && !searchQuery) {
      return serviceCategories.filter((c) => c.id === activeCategory);
    }
    // When searching, find unique categories present in filteredServices
    const categoryIds = new Set(filteredServices.map((s) => s.categoryId));
    return serviceCategories.filter((c) => categoryIds.has(c.id));
  }, [activeCategory, searchQuery, filteredServices]);

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16">
      <SEO
        title="Support for What You're Going Through | MINDSET Center"
        description="Explore 4 specialized psychological care categories in Dhaka: Individual Support, Relationship & Family, Child & Development, and Specialized Care."
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION: EDITORIAL 3D ATMOSPHERE                  */}
      {/* Heading: Support for What You’re Going Through            */}
      {/* Short supporting text: Very short                         */}
      {/* ========================================================= */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 bg-gradient-to-b from-[#0B1020] via-[#11182D] to-[#0B1020] text-white overflow-hidden border-b border-white/10">
        {/* Soft atmospheric radial glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>MINDSET PSYCHOTHERAPY &amp; COUNSELING CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === "bn" ? "আপনার এই কঠিন সময়ে পাশে আছি আমরা" : "Support for What You’re Going Through"}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            {lang === "bn"
              ? "আপনার বাস্তব পরিস্থিতি বিবেচনা করে বিজ্ঞানসম্মত ও সহানুভূতিশীল থেরাপিউটিক সেবা।"
              : "Evidence-based psychological care designed for where you are right now."}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Button3D
              to="/appointment"
              variant="primary"
              size="md"
              icon={Calendar}
            >
              {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
            </Button3D>

            <Button3D
              onClick={() =>
                openWhatsApp("Hello MINDSET, I am looking for guidance on which therapy service is right for me.")
              }
              variant="emerald"
              size="md"
              icon={MessageCircle}
            >
              {lang === "bn" ? "হোয়াটসঅ্যাপে যোগাযোগ" : "WhatsApp Inquiry"}
            </Button3D>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CATEGORY NAVIGATOR & SEARCH BAR                        */}
      {/* 4 Major Categories:                                       */}
      {/* 1. Individual Support                                     */}
      {/* 2. Relationship & Family                                  */}
      {/* 3. Child & Development                                    */}
      {/* 4. Specialized Support                                    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-3xl bg-[#0B1020]/90 backdrop-blur-xl border border-purple-500/20 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)]">
          
          {/* 4 Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-[#5B4BDB] to-[#8075E8] text-white shadow-xs"
                  : "text-slate-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {lang === "bn" ? "সকল সেবাসমূহ" : "All Services"}
            </button>

            {serviceCategories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75">{category.number}</span>
                  <span>{category.title[lang]}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "bn" ? "সেবা বা সমস্যা খুঁজুন..." : "Search symptom or service..."}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white cursor-pointer font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FOUR MAJOR CATEGORIES & 3D METAPHOR SERVICE CARDS       */}
      {/* Visual Metaphors:                                         */}
      {/* - Anxiety: Breathing wave                                 */}
      {/* - Relationships: Two connected circles                    */}
      {/* - Trauma: Broken line reconnecting                        */}
      {/* - CBT: Thought → Emotion → Behavior loop                 */}
      {/* Each Card: Short title, one-line desc, Learn More        */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-16">
        {displayedCategories.map((category) => {
          const categoryServices = filteredServices.filter(
            (service) => service.categoryId === category.id
          );

          if (categoryServices.length === 0) return null;

          return (
            <section key={category.id} className="space-y-6">
              {/* Category Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-orange-400 tracking-wider">
                    <span>CATEGORY {category.number}</span>
                    <span>•</span>
                    <span>MINDSET CLINICAL DOMAIN</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
                    {category.title[lang]}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-indigo-200/80 max-w-md">
                  {category.tagline[lang]}
                </p>
              </div>

              {/* Service Cards Grid (3 Columns on Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => (
                  <ServiceCardItem
                    key={service.id}
                    service={service}
                    lang={lang}
                    onLearnMore={handleOpenModal}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="text-center py-16 px-4 bg-white/[0.04] backdrop-blur-md rounded-3xl border border-white/10 text-white">
            <Search className="w-8 h-8 text-indigo-300/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">
              {lang === "bn" ? "কোনো সেবা পাওয়া যায়নি" : "No matching services found"}
            </h3>
            <p className="text-xs text-indigo-200/80 mt-1 max-w-sm mx-auto">
              {lang === "bn"
                ? "অনুগ্রহ করে অন্য শব্দ দিয়ে অনুসন্ধান করুন অথবা সকল ক্যাটাগরি ব্রাউজ করুন।"
                : "Try adjusting your search query or reset filters to browse all clinical services."}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer shadow-md"
            >
              {lang === "bn" ? "ফিল্টার রিসেট করুন" : "Reset Filters"}
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 4. CLINICAL ETHICS & PROFESSIONAL INTEGRITY BANNER        */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1020]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-500/20 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "প্রমাণভিত্তিক সাইকোথেরাপি" : "Evidence-Based Modalities"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "কোনো অবৈজ্ঞানিক অনুমান নয়; আন্তর্জাতিকভাবে স্বীকৃত সিবিটি, ট্রমা ও হিউম্যানিস্টিক ফ্রেমওয়ার্ক।"
                    : "No speculative methods. Every consultation utilizes globally standardized clinical psychotherapy protocols."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-purple-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "১০০% নিরাপদ ও গোপনীয়" : "Strict Clinical Privacy"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "আপনার প্রতিটি আলোচনা কঠোর মনস্তাত্ত্বিক নৈতিকতার অধীনে পুরোপুরি গোপন রাখা হয়।"
                    : "Your identity and conversations are strictly confidential and protected by professional medical ethics."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "সহমর্মিতাপূর্ণ মানবিক সঙ্গ" : "Empathetic Human Care"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "আমরা কোনো লেবেল চাপিয়ে দিই না; আপনার পাশে থেকে সুস্থ জীবনের পথ তৈরিতে সাহায্য করি।"
                    : "We listen without diagnostic coldness, honoring your lived reality and personal agency."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. DIRECT CONSULTATION CTA                                */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#10172D] to-indigo-950 text-white p-7 sm:p-10 lg:p-12 text-center relative overflow-hidden border border-white/10 shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "bn" ? "কোন সেবাটি আপনার জন্য সঠিক তা বুঝতে পারছেন না?" : "Unsure Which Service You Need?"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              {lang === "bn"
                ? "আমাদের কেয়ার কোঅর্ডিনেটরের সাথে কথা বলে আপনার পরিস্থিতির জন্য সবচেয়ে উপযুক্ত বিশেষজ্ঞ নির্বাচন করুন।"
                : "Speak with our compassionate care coordinators to understand the most effective therapeutic path for you."}
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
                  openWhatsApp("Hello MINDSET, I am unsure which therapy service I need. Please guide me.")
                }
                variant="ghost"
                size="md"
                icon={MessageCircle}
              >
                {lang === "bn" ? "হোয়াটসঅ্যাপে সাহায্য নিন" : "Ask via WhatsApp"}
              </Button3D>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

/* ========================================================= */
/* INDIVIDUAL SERVICE CARD COMPONENT WITH 3D TILT & METAPHOR */
/* Rules:                                                    */
/* - Short title                                             */
/* - One-line description                                    */
/* - Learn More button                                       */
/* - 3D Psychology-inspired visual metaphor                  */
/* ========================================================= */
function ServiceCardItem({ service, lang, onLearnMore }) {
  const [isHovered, setIsHovered] = useState(false);

  const title = service.title?.[lang] || service.title?.en || "";
  const oneLiner = service.oneLiner?.[lang] || service.oneLiner?.en || "";
  const categoryTitle = service.category?.[lang] || service.category?.en || "";

  return (
    <TiltCard3D maxTilt={6} scale={1.02} className="h-full rounded-3xl flex flex-col">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative h-full bg-white/[0.04] backdrop-blur-md rounded-3xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-white/[0.07] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-default"
      >
        {/* Soft atmospheric ambient glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* ======================================================= */}
        {/* TOP: 3D PSYCHOLOGY-INSPIRED VISUAL METAPHOR STAGE       */}
        {/* ======================================================= */}
        <div className="relative w-full bg-[#070B18] border-b border-white/10 px-4 pt-4 pb-2 flex flex-col items-center justify-center overflow-hidden">
          {/* Category Tag */}
          <div className="w-full flex items-center justify-between z-10 mb-1">
            <span className="text-[10px] font-mono font-bold tracking-wider text-purple-300/80 uppercase">
              {categoryTitle}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              MINDSET
            </span>
          </div>

          {/* Abstract 3D SVG Metaphor */}
          <ServiceVisualMetaphor
            type={service.metaphorType || "anxiety"}
            className="w-full h-32"
            isHovered={isHovered}
          />
        </div>

        {/* ======================================================= */}
        {/* CONTENT: SHORT TITLE & ONE-LINE DESCRIPTION             */}
        {/* ======================================================= */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 relative z-10">
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed line-clamp-2">
              {oneLiner}
            </p>
          </div>

          {/* ======================================================= */}
          {/* ACTIONS: "LEARN MORE" TRIGGER & QUICK LINK              */}
          {/* ======================================================= */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onLearnMore(service)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:text-orange-300 transition-colors cursor-pointer hover:underline"
            >
              <span>{lang === "bn" ? "বিস্তারিত জানুন" : "Learn More"}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/appointment"
              className="text-[11px] font-semibold text-slate-400 hover:text-purple-300 transition-colors"
            >
              {lang === "bn" ? "বুকিং" : "Book Session"}
            </Link>
          </div>
        </div>
      </div>
    </TiltCard3D>
  );
}
