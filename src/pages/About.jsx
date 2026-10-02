import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  ShieldCheck,
  Lock,
  HeartHandshake,
  Award,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Phone,
  Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";
import { useImageModal } from "../context/ImageModalContext";
import { useDoctorPhotos } from "../context/DoctorPhotosContext";
import { cmdData } from "../data/doctors";
import DoctorModal from "../components/DoctorModal";
import SEO from "../components/SEO";
import TiltCard3D from "../components/ui/TiltCard3D";
import Button3D from "../components/ui/Button3D";
import { BreathingCircle } from "../components/PsychologyVisuals";
import { openWhatsApp, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from "../utils/whatsapp";

/* ========================================================= */
/* 3D PSYCHOLOGY ORGANIC CONNECTED VISUAL                    */
/* Understanding -> Awareness -> Support -> Growth           */
/* ========================================================= */
function PsychologyJourneyVisual({ lang }) {
  const stages = [
    {
      step: "01",
      name: { en: "Understanding", bn: "উপলব্ধি" },
      subtitle: {
        en: "Uncovering roots of emotional distress in a safe space.",
        bn: "নিরাপদ পরিবেশে মানসিক কষ্টের মূল কারণ উন্মোচন।"
      },
      accent: "#5B4BDB", // Royal purple
      badgeBg: "bg-indigo-500/15 border-indigo-400/30 text-indigo-300"
    },
    {
      step: "02",
      name: { en: "Awareness", bn: "সচেতনতা" },
      subtitle: {
        en: "Gaining insight into automatic thoughts and behavioral loops.",
        bn: "স্বতঃস্ফূর্ত চিন্তা ও আচরণের চক্র সম্পর্কে গভীর অন্তর্দৃষ্টি।"
      },
      accent: "#B9B3FF", // Soft lavender
      badgeBg: "bg-purple-500/15 border-purple-400/30 text-purple-200"
    },
    {
      step: "03",
      name: { en: "Support", bn: "সহায়তা" },
      subtitle: {
        en: "Evidence-based psychotherapy and compassionate alliance.",
        bn: "প্রমাণভিত্তিক সাইকোথেরাপি ও সহমর্মী পেশাদার সঙ্গ।"
      },
      accent: "#F97316", // Subtle warm orange
      badgeBg: "bg-orange-500/15 border-orange-400/30 text-orange-300"
    },
    {
      step: "04",
      name: { en: "Growth", bn: "উত্তরণ ও বিকাশ" },
      subtitle: {
        en: "Cultivating lasting emotional balance and empowerment.",
        bn: "দীর্ঘমেয়াদী মানসিক ভারসাম্য ও আত্মবিশ্বাসের বিকাশ।"
      },
      accent: "#10B981", // Emerald vitality
      badgeBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
    }
  ];

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Central Connecting Organic Line (Desktop & Tablet) */}
      <div className="hidden sm:block absolute left-8 top-12 bottom-12 w-0.5 pointer-events-none">
        <svg
          className="w-8 h-full -ml-4"
          preserveAspectRatio="none"
          viewBox="0 0 32 400"
          fill="none"
        >
          <path
            d="M 16 0 C 26 80, 6 140, 16 200 C 26 260, 6 320, 16 400"
            stroke="url(#organicJourneyGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="opacity-70"
          />
          <defs>
            <linearGradient id="organicJourneyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#5B4BDB" />
              <stop offset="0.33" stopColor="#B9B3FF" />
              <stop offset="0.66" stopColor="#F97316" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 4 Stages Vertical Sequence */}
      <div className="space-y-4 sm:space-y-6">
        {stages.map((stage, idx) => (
          <div key={stage.step} className="relative flex items-start gap-4 sm:gap-6">
            
            {/* 3D Organic Node Marker */}
            <div className="relative z-10 shrink-0 mt-2">
              <div
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#11182D] border border-white/20 flex flex-col items-center justify-center shadow-[0_8px_20px_-4px_rgba(0,0,0,0.6)]"
                style={{
                  boxShadow: `0 8px 24px -4px ${stage.accent}33`
                }}
              >
                <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400">
                  {stage.step}
                </span>
                <span
                  className="w-2 h-2 rounded-full mt-1"
                  style={{ backgroundColor: stage.accent }}
                />
              </div>
            </div>

            {/* Stage Card with 3D Depth */}
            <TiltCard3D maxTilt={5} scale={1.01} className="flex-1 rounded-2xl">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {stage.name[lang]}
                  </h3>
                  <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md border ${stage.badgeBg}`}>
                    Phase {stage.step}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {stage.subtitle[lang]}
                </p>
              </div>
            </TiltCard3D>

          </div>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { lang } = useLanguage();
  const { openImage } = useImageModal();
  const { getDoctorPhoto } = useDoctorPhotos();
  const [isQualificationsExpanded, setIsQualificationsExpanded] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Philosophy 4 Short Cards
  const philosophyCards = [
    {
      id: "safe",
      title: { en: "Safe", bn: "নিরাপদ" },
      desc: {
        en: "A non-judgmental sanctuary where vulnerability is respected and honored.",
        bn: "কোনো বিচার বা দোষারোপহীন মানসিক স্থান, যেখানে আপনি সম্পূর্ণ নিশ্চিন্ত।"
      },
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />
    },
    {
      id: "confidential",
      title: { en: "Confidential", bn: "গোপনীয়" },
      desc: {
        en: "Absolute privacy and strict ethical clinical standards for every conversation.",
        bn: "আন্তর্জাতিক মানের কঠোর চিকিৎসা নৈতিকতা এবং শতভাগ তথ্য গোপনীয়তা।"
      },
      icon: <Lock className="w-5 h-5 text-purple-400" />
    },
    {
      id: "professional",
      title: { en: "Professional", bn: "পেশাদার" },
      desc: {
        en: "Evidence-based psychotherapeutic modalities guided by trained clinical specialists.",
        bn: "প্রমাণভিত্তিক চিকিৎসা ও ঢাকা বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিপ্রাপ্ত দল।"
      },
      icon: <Award className="w-5 h-5 text-orange-400" />
    },
    {
      id: "human-centered",
      title: { en: "Human-Centered", bn: "মানবিক" },
      desc: {
        en: "Empathetic care tailored to your unique lived reality, never rigid labels.",
        bn: "মানুষ হিসেবে আপনার অনুভূতি ও জীবনের বাস্তবতায় ব্যক্তিগতকৃত সহায়তা।"
      },
      icon: <HeartHandshake className="w-5 h-5 text-emerald-400" />
    }
  ];

  const handleOpenCMDModal = () => {
    setSelectedDoctor(cmdData);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16">
      <SEO
        title="About Us | MINDSET Psychotherapy & Counseling Center"
        description="Understanding the Mind. Professional care with a human approach at MINDSET Psychotherapy & Counseling Center, Dhaka."
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION: EDITORIAL LAYOUT                         */}
      {/* Heading: Understanding the Mind                           */}
      {/* Supporting text: Professional care with a human approach. */}
      {/* ========================================================= */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 bg-gradient-to-b from-[#0B1020] via-[#11182D] to-[#0B1020] text-white overflow-hidden border-b border-white/10">
        
        {/* Atmospheric ambient lighting */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>MINDSET PSYCHOTHERAPY &amp; COUNSELING CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === "bn" ? "মনকে উপলব্ধি করা" : "Understanding the Mind"}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {lang === "bn"
              ? "মানবিক দৃষ্টিভঙ্গি ও পেশাদার ক্লিনিক্যাল সেবা।"
              : "Professional care with a human approach."}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button3D
              to="/appointment"
              variant="primary"
              size="md"
              icon={Calendar}
            >
              {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
            </Button3D>

            <Button3D
              to="/specialists"
              variant="ghost"
              size="md"
              icon={ArrowRight}
            >
              {lang === "bn" ? "আমাদের বিশেষজ্ঞ দল" : "Meet Our Specialists"}
            </Button3D>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PSYCHOLOGY-INSPIRED 3D VISUAL                          */}
      {/* Understanding -> Awareness -> Support -> Growth           */ }
      {/* Connected organic lines and subtle depth                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1020] rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 text-white relative overflow-hidden shadow-xl">
          
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12 space-y-2 relative z-10">
            <span className="text-xs font-mono uppercase font-bold text-orange-400 tracking-wider">
              {lang === "bn" ? "আরোগ্যের সমন্বিত পর্যায়" : "The Therapeutic Pathway"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "bn" ? "উত্তরণ ও মানসিক পরিবর্তনের পথ" : "From Insight to Lasting Growth"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === "bn"
                ? "আমাদের চিকিৎসা কাঠামোর প্রতিটি ধাপ একটি স্বাভাবিক জৈব ও বিজ্ঞানসম্মত প্রবাহে অগ্রসর হয়।"
                : "A connected, progressive psychological journey designed for sustainable wellbeing."}
            </p>
          </div>

          {/* 3D Organic Connected Visual */}
          <PsychologyJourneyVisual lang={lang} />

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MINDSET PHILOSOPHY SECTION                             */}
      {/* Short cards: Safe, Confidential, Professional,            */}
      {/* Human-Centered in Dark Glassmorphic 3D Cards              */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-1.5">
          <span className="text-xs font-mono uppercase font-bold text-orange-400 tracking-wider">
            {lang === "bn" ? "নীতিমালা ও মানদণ্ড" : "Ethical Foundations"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === "bn" ? "আমাদের মূল দর্শন" : "MINDSET Philosophy"}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200/80 font-normal">
            {lang === "bn"
              ? "সহমর্মিতা, বিজ্ঞান ও গোপনীয়তার মূল স্তম্ভে আমাদের প্রতিটি সেবা পরিচালিত।"
              : "Core ethical pillars guiding every session and therapeutic relationship."}
          </p>
        </div>

        {/* 4 Short Philosophy Cards in Dark Psychology Aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {philosophyCards.map((card) => (
            <TiltCard3D
              key={card.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-2xl"
            >
              <div className="h-full p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-purple-500/20 hover:border-purple-400/50 hover:bg-white/[0.07] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-purple-500/30 flex items-center justify-center mb-3.5 shadow-xs">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-1.5">
                    {card.title[lang]}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.desc[lang]}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. CMD SECTION                                            */}
      {/* Show: Fowzia Sharmin Hossain                              */}
      {/* Chairman & Managing Director (CMD)                        */}
      {/* Image: public/images/cmd/fowzia-sharmin-hossain.webp      */}
      {/* Subtle 3D depth around portrait                           */}
      {/* Clean expandable/read-more layout for qualifications      */}
      {/* Do NOT invent any credentials or statistics               */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-[#0F172A] to-indigo-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 relative overflow-hidden shadow-xl">
          
          {/* Subtle Ambient Depth Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* CMD Portrait with 3D Depth Frame */}
              <div className="md:col-span-5 flex justify-center">
                <TiltCard3D maxTilt={6} scale={1.02} className="rounded-2xl">
                  <div
                    className="relative w-56 sm:w-64 aspect-3/4 rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-indigo-500/30 via-slate-800 to-orange-500/30 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.8)] border border-white/15 group cursor-zoom-in flex items-center justify-center"
                    onClick={() =>
                      openImage({
                        src: getDoctorPhoto("fowzia-sharmin-hossain", cmdData.image),
                        alt: "Fowzia Sharmin Hossain",
                        title: "Fowzia Sharmin Hossain",
                        subtitle:
                          lang === "bn"
                            ? "চেয়ারম্যান ও ব্যবস্থাপনা পরিচালক (সিএমডি)"
                            : "Chairman & Managing Director (CMD)",
                        category: "MINDSET Leadership",
                      })
                    }
                    title={lang === "bn" ? "ছবি বড় করে দেখতে ক্লিক করুন" : "Click to view full image"}
                  >
                    {/* Ambient blurred backdrop for letterboxed areas */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-25 blur-md scale-110 pointer-events-none rounded-xl"
                      style={{ backgroundImage: `url(${getDoctorPhoto("fowzia-sharmin-hossain", cmdData.image)})` }}
                    />

                    <img
                      src={getDoctorPhoto("fowzia-sharmin-hossain", cmdData.image)}
                      alt="Fowzia Sharmin Hossain"
                      className="relative z-10 w-full h-full object-contain object-center rounded-xl group-hover:scale-103 transition-transform duration-500"
                      style={{ objectFit: "contain" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/logo.png";
                      }}
                    />
                    <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 pointer-events-none" />

                    {/* Image Lightbox Trigger Badge */}
                    <div className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-xl bg-[#0B1020]/80 backdrop-blur-md border border-white/20 text-white/80 group-hover:text-amber-300 group-hover:bg-purple-900/90 group-hover:border-purple-400/60 shadow-md transition-all">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </TiltCard3D>
              </div>

              {/* CMD Info & Concise Bio */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase font-bold text-orange-400 tracking-wider block mb-1">
                    {cmdData.title[lang]}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {cmdData.name[lang]}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-indigo-300 mt-0.5">
                    {cmdData.designation[lang]}
                  </p>
                </div>

                {/* Concise Bio */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {cmdData.bio[lang]}
                </p>

                {/* Clean Expandable Qualifications */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQualificationsExpanded(!isQualificationsExpanded)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer py-1"
                  >
                    <span>
                      {isQualificationsExpanded
                        ? (lang === "bn" ? "শিক্ষাগত যোগ্যতা সংক্ষেপ করুন" : "Hide Academic Credentials")
                        : (lang === "bn" ? "শিক্ষাগত যোগ্যতা ও সনদসমূহ দেখুন" : "View Academic Qualifications")}
                    </span>
                    {isQualificationsExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isQualificationsExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden mt-3"
                      >
                        <div className="p-4 rounded-xl bg-white/[0.05] border border-white/10 space-y-3">
                          <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                            <GraduationCap className="w-4 h-4" />
                            <span>
                              {lang === "bn"
                                ? "শিক্ষাগত ডিগ্রি ও প্রশিক্ষণ"
                                : "Academic Background"}
                            </span>
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {cmdData.qualifications[lang].map((qual, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 border border-white/10 font-medium"
                              >
                                {qual}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleOpenCMDModal}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-colors cursor-pointer"
                  >
                    {lang === "bn" ? "পূর্ণ বিবরণ দেখুন" : "View Full Profile"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const msg = lang === "bn"
                        ? `আসসালামু আলাইকুম, আমি সিএমডি ফওজিয়া শারমিন হোসেন-এর পরামর্শ নিতে আগ্রহী।`
                        : `Hello MINDSET, I would like to inquire regarding a consultation with CMD Fowzia Sharmin Hossain.`;
                      openWhatsApp(msg);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{lang === "bn" ? "পরামর্শের জন্য যোগাযোগ" : "Consultation Inquiry"}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FINAL ELEGANT ACTION CTA                               */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 max-w-2xl mx-auto space-y-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "bn" ? "আমরা পাশে আছি" : "We Are Here for You"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            {lang === "bn"
              ? "আপনার বা প্রিয়জনের মানসিক সুস্থতায় পেশাদার ও সংবেদনশীল সহায়তা নিতে আজই যোগাযোগ করুন।"
              : "Connect with our clinical team today for safe, ethical, and compassionate psychotherapeutic care."}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button3D
              to="/appointment"
              variant="primary"
              size="md"
              icon={Calendar}
            >
              {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
            </Button3D>

            <Button3D
              onClick={() => openWhatsApp("Hello MINDSET, I would like to book an appointment.")}
              variant="emerald"
              size="md"
              icon={MessageCircle}
            >
              {lang === "bn" ? "হোয়াটসঅ্যাপ বার্তা" : "WhatsApp Message"}
            </Button3D>
          </div>
        </div>
      </section>

      {/* Doctor Modal for CMD or specialist view */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

