import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Users,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useImageModal } from "../context/ImageModalContext";
import { useDoctorPhotos } from "../context/DoctorPhotosContext";
import { doctorsData } from "../data/doctors";
import SpecialistRailHero from "../components/SpecialistRailHero";
import DoctorModal from "../components/DoctorModal";
import SEO from "../components/SEO";
import TiltCard3D from "../components/ui/TiltCard3D";
import Button3D from "../components/ui/Button3D";
import {
  BreathingCircle,
  AnxietyWaveVisual,
  DepressionLightVisual,
  RelationshipSpheresVisual,
  TraumaReconnectionVisual,
  StressSmoothingVisual,
  ChildDevelopmentVisual
} from "../components/PsychologyVisuals";
import { openWhatsApp } from "../utils/whatsapp";

/* ========================================================= */
/* 3D ABSTRACT SHAPES FOR SECTION 1 (TRUST / SERVICE STRIP)  */
/* ========================================================= */
function ShapeIndividual() {
  return (
    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] via-[#25204A] to-[#1E1B4B] border border-purple-500/30 flex items-center justify-center shadow-[0_4px_12px_rgba(91,75,219,0.25)] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="#8075E8" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="16" cy="16" r="6" fill="url(#gradIndiv)" />
        <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#B9B3FF" strokeWidth="1.2" transform="rotate(-25 16 16)" />
        <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
        <defs>
          <linearGradient id="gradIndiv" x1="10" y1="10" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5B4BDB" />
            <stop offset="1" stopColor="#25204A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function ShapeCouples() {
  return (
    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] via-[#351B2A] to-[#25204A] border border-orange-400/30 flex items-center justify-center shadow-[0_4px_12px_rgba(249,115,22,0.25)] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
        <circle cx="12" cy="16" r="7" stroke="#F97316" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="20" cy="16" r="7" stroke="#B9B3FF" strokeWidth="1.5" strokeOpacity="0.8" />
        <circle cx="16" cy="16" r="3" fill="#FED7AA" fillOpacity="0.6" />
      </svg>
    </div>
  );
}

function ShapeChild() {
  return (
    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] via-[#162E2B] to-[#1E1B4B] border border-emerald-400/30 flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.25)] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
        <path
          d="M16 25V13C16 9 20 6 24 6C24 10 21 14 16 15"
          stroke="#34D399"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M16 17C12 16 8 13 8 9C12 9 15 11 16 14"
          stroke="#6EE7B7"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="23" cy="7" r="2" fill="#FDE047" />
      </svg>
    </div>
  );
}

function ShapeSpecialized() {
  return (
    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] via-[#2E1945] to-[#1E1B4B] border border-purple-400/30 flex items-center justify-center shadow-[0_4px_12px_rgba(168,85,247,0.25)] shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
        <polygon
          points="16,5 26,10 26,22 16,27 6,22 6,10"
          stroke="#C084FC"
          strokeWidth="1.5"
          fill="url(#gradSpec)"
        />
        <circle cx="16" cy="16" r="3.5" fill="#FAF5FF" />
        <defs>
          <linearGradient id="gradSpec" x1="6" y1="5" x2="26" y2="27" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5B4BDB" stopOpacity="0.4" />
            <stop offset="1" stopColor="#25204A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const { openImage } = useImageModal();
  const { getDoctorPhoto } = useDoctorPhotos();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  // Section 2: 6 Clean Concern Cards matching the user's exact specification
  const helpCards = [
    {
      id: "anxiety",
      title: { en: "Anxiety", bn: "উদ্বেগ" },
      subtitle: { en: "Calm the mind.", bn: "মনকে শান্ত করুন।" },
      desc: {
        en: "Relief from racing thoughts, chronic worry, and physical tension.",
        bn: "অতিরিক্ত দুশ্চিন্তা ও মানসিক অস্থিরতা কাটিয়ে প্রশান্তির সন্ধান।"
      },
      visual: <AnxietyWaveVisual />
    },
    {
      id: "depression",
      title: { en: "Depression", bn: "হতাশা ও বিষণ্নতা" },
      subtitle: { en: "Restore motivation.", bn: "স্পৃহা পুনরুদ্ধার করুন।" },
      desc: {
        en: "Rebuilding vitality, everyday purpose, and emotional warmth.",
        bn: "জীবনের স্বাভাবিক আনন্দ, মানসিক উদ্দীপনা ও উদ্দেশ্য পুনরুদ্ধার।"
      },
      visual: <DepressionLightVisual />
    },
    {
      id: "relationships",
      title: { en: "Relationships", bn: "সম্পর্ক" },
      subtitle: { en: "Build healthier connections.", bn: "সুস্থ সম্পর্ক গড়ে তুলুন।" },
      desc: {
        en: "Deepening mutual empathy, boundary clarity, and conscious bonding.",
        bn: "পারস্পরিক বোঝাপড়া, আস্থা ও সুস্থ যোগাযোগের মেলবন্ধন।"
      },
      visual: <RelationshipSpheresVisual />
    },
    {
      id: "trauma",
      title: { en: "Trauma", bn: "মানসিক আঘাত" },
      subtitle: { en: "Move toward healing.", bn: "আরোগ্যের পথে অগ্রসর হন।" },
      desc: {
        en: "Safe integration of past pain in an honoring, confidential container.",
        bn: "বেদনাদায়ক স্মৃতি ও ট্রমা থেকে সংবেদনশীল ও নিরাপদ আরোগ্য।"
      },
      visual: <TraumaReconnectionVisual />
    },
    {
      id: "stress",
      title: { en: "Stress", bn: "মানসিক চাপ" },
      subtitle: { en: "Ease everyday overload.", bn: "দৈনন্দিন ক্লান্তি লাঘব করুন।" },
      desc: {
        en: "Decompressing burnout, cognitive friction, and life pressure.",
        bn: "অতিরিক্ত কাজের চাপ ও ক্লান্তি কাটিয়ে ভারসাম্যপূর্ণ জীবনযাপন।"
      },
      visual: <StressSmoothingVisual />
    },
    {
      id: "child-development",
      title: { en: "Child Development", bn: "শিশুর বিকাশ" },
      subtitle: { en: "Nurture healthy growth.", bn: "সুস্থ বিকাশের যত্ন নিন।" },
      desc: {
        en: "Positive behavioral milestones, emotional security, and parenting.",
        bn: "শিশুর মানসিক সমৃদ্ধি, আচরণগত সুস্থতা ও সহায়ক প্যারেন্টিং।"
      },
      visual: <ChildDevelopmentVisual />
    }
  ];

  // Section 4: 4 Connected Pathway Steps
  const pathwaySteps = [
    {
      num: "01",
      title: { en: "Reach Out", bn: "যোগাযোগ" },
      desc: {
        en: "Connect online or message us confidentially.",
        bn: "অনলাইনে বা বার্তায় নিশ্চিন্তে যোগাযোগ করুন।"
      }
    },
    {
      num: "02",
      title: { en: "Talk", bn: "কথা বলুন" },
      desc: {
        en: "Share openly in a safe, judgment-free space.",
        bn: "নিরাপদ পরিবেশে নির্দ্বিধায় আপনার কথা বলুন।"
      }
    },
    {
      num: "03",
      title: { en: "Understand", bn: "বোঝাপড়া" },
      desc: {
        en: "Gain deep clinical clarity on emotional loops.",
        bn: "মানসিক কারণগুলো বিজ্ঞানসম্মতভাবে বিশ্লেষণ করুন।"
      }
    },
    {
      num: "04",
      title: { en: "Support", bn: "সহায়তা" },
      desc: {
        en: "Walk a personalized evidence-based healing path.",
        bn: "ধারাবাহিক যত্ন ও থেরাপির মাধ্যমে সুস্থ হয়ে উঠুন।"
      }
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12 pb-14">
      <SEO
        title="MINDSET | Psychotherapy & Counseling Center Dhaka"
        description="Professional psychotherapy and counseling center in Dhaka. A safe, confidential space for individuals, couples, families, and children."
      />

      {/* ========================================================= */}
      {/* HERO: 3D PSYCHOLOGY ENVIRONMENT + SPECIALIST RAIL        */}
      {/* ========================================================= */}
      <SpecialistRailHero onSelectDoctor={handleSelectDoctor} />

      {/* ========================================================= */}
      {/* SECTION 1: COMPACT TRUST / SERVICE STRIP                  */}
      {/* Short items: Individual Support, Couples & Family,        */}
      {/* Child Support, Specialized Care with 3D shapes in dark    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="bg-[#0B1020]/90 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-3 sm:p-4 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            
            {/* 1. Individual Support */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 px-2 sm:px-3">
              <ShapeIndividual />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {lang === "bn" ? "ব্যক্তিগত সহায়তা" : "Individual Support"}
                </h4>
                <p className="text-[11px] text-indigo-200/80 truncate">
                  {lang === "bn" ? "একান্ত মানসিক যত্ন" : "One-on-one therapy"}
                </p>
              </div>
            </div>

            {/* 2. Couples & Family */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 px-2 sm:px-3">
              <ShapeCouples />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {lang === "bn" ? "দম্পতি ও পরিবার" : "Couples & Family"}
                </h4>
                <p className="text-[11px] text-orange-200/80 truncate">
                  {lang === "bn" ? "সম্পর্ক ও বোঝাপড়া" : "Relational harmony"}
                </p>
              </div>
            </div>

            {/* 3. Child Support */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 px-2 sm:px-3">
              <ShapeChild />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {lang === "bn" ? "শিশু সহায়তা" : "Child Support"}
                </h4>
                <p className="text-[11px] text-emerald-200/80 truncate">
                  {lang === "bn" ? "বিকাশ ও প্যারেন্টিং" : "Growth & parenting"}
                </p>
              </div>
            </div>

            {/* 4. Specialized Care */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0 px-2 sm:px-3">
              <ShapeSpecialized />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                  {lang === "bn" ? "বিশেষায়িত যত্ন" : "Specialized Care"}
                </h4>
                <p className="text-[11px] text-purple-200/80 truncate">
                  {lang === "bn" ? "প্রমাণভিত্তিক চিকিৎসা" : "Evidence-based"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: WHAT WE HELP WITH                              */}
      {/* Heading: What We Help With                                */}
      {/* Short text: Support for your mind, emotions and           */}
      {/* relationships.                                            */}
      {/* 6 Cards with abstract 3D psychology visuals & dark glass  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-xs font-mono uppercase font-bold text-orange-400 tracking-wider">
            {lang === "bn" ? "ক্লিনিক্যাল বিশেষায়িত ক্ষেত্র" : "Clinical Focus Areas"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {lang === "bn" ? "যেসব বিষয়ে আমরা পাশে আছি" : "What We Help With"}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200/80 font-normal">
            {lang === "bn"
              ? "আপনার মন, অনুভূতি ও সম্পর্কের জন্য নির্ভরযোগ্য মানবিক সহায়তা।"
              : "Support for your mind, emotions and relationships."}
          </p>
        </div>

        {/* 6 Clean Cards Grid with Dark Translucent Glass & 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {helpCards.map((card) => (
            <TiltCard3D
              key={card.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-2xl"
            >
              <div className="h-full p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-purple-500/20 hover:border-purple-400/50 hover:bg-white/[0.07] shadow-[0_8px_24px_-4px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col justify-between">
                <div>
                  {/* Abstract 3D Psychology Visual */}
                  <div className="mb-4 flex items-center justify-between">
                    {card.visual}
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/10">
                      MINDSET
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1 mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {card.title[lang]}
                    </h3>
                    <p className="text-xs font-semibold text-purple-300">
                      {card.subtitle[lang]}
                    </p>
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {card.desc[lang]}
                  </p>
                </div>

                <div className="pt-3.5 mt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      openWhatsApp(
                        `Hello MINDSET, I am seeking support regarding: ${card.title.en}`
                      )
                    }
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1.5 transition-colors cursor-pointer group-hover:translate-x-0.5"
                  >
                    <span>{lang === "bn" ? "পরামর্শ নিন" : "Inquire Support"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: SPECIALISTS PREVIEW                            */}
      {/* Heading: Meet Our Specialists                             */}
      {/* 4 Specialists on Premium 3D Dark Portrait Cards           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-orange-400 tracking-wider block mb-1">
              {lang === "bn" ? "পেশাদার দল" : "Clinical Team"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "bn" ? "আমাদের বিশেষজ্ঞবৃন্দ" : "Meet Our Specialists"}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/80 mt-0.5">
              {lang === "bn" ? "ঢাকা বিশ্ববিদ্যালয় ও উচ্চতর প্রশিক্ষণপ্রাপ্ত সাইকোলজিস্ট দল" : "Dedicated, certified mental health specialists"}
            </p>
          </div>

          <Link
            to="/specialists"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-200 transition-colors px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10"
          >
            <span>{lang === "bn" ? "সকল বিশেষজ্ঞ" : "View All"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Specialist 3D Cards in Dark Psychology Aesthetic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {doctorsData.map((doc) => (
            <TiltCard3D
              key={doc.id}
              maxTilt={6}
              scale={1.02}
              className="rounded-2xl flex flex-col"
            >
              <div className="h-full bg-white/[0.04] backdrop-blur-md rounded-2xl border border-purple-500/20 hover:border-purple-400/50 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                
                {/* 3D Elevated Portrait Image */}
                <div
                  className="relative h-56 sm:h-60 md:h-64 bg-[#070B18] overflow-hidden cursor-zoom-in group/portrait flex items-center justify-center"
                  onClick={() =>
                    openImage({
                      src: getDoctorPhoto(doc.id, doc.image),
                      alt: doc.name[lang] || doc.name.en,
                      title: doc.name[lang] || doc.name.en,
                      subtitle: doc.designation[lang] || doc.designation.en,
                      category: lang === "bn" ? "মাইন্ডসেট সাইকোলজিস্ট" : "MINDSET Specialist",
                    })
                  }
                  title={lang === "bn" ? "ছবি বড় করে দেখতে ক্লিক করুন" : "Click to view full image"}
                >
                  {/* Ambient backdrop */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-md scale-110 pointer-events-none"
                    style={{ backgroundImage: `url(${getDoctorPhoto(doc.id, doc.image)})` }}
                  />

                  <img
                    src={getDoctorPhoto(doc.id, doc.image)}
                    alt={doc.name[lang] || doc.name.en}
                    className="relative z-10 w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    style={{ objectFit: "contain" }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logo.png";
                    }}
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070B18] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Lightbox Icon Indicator */}
                  <div className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-xl bg-[#0B1020]/80 backdrop-blur-md border border-white/20 text-white/80 group-hover/portrait:text-amber-300 group-hover/portrait:bg-purple-900/90 group-hover/portrait:border-purple-400/60 shadow-md transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Name, Professional Title, View Profile */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {doc.title && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        {doc.title[lang] || doc.title.en}
                      </span>
                    )}
                    {/* Name */}
                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                      {doc.name[lang] || doc.name.en}
                    </h3>
                    {/* Professional Title */}
                    <p className="text-xs text-indigo-300 font-medium line-clamp-2 mt-1">
                      {doc.designation[lang] || doc.designation.en}
                    </p>
                  </div>

                  {/* View Profile Action */}
                  <button
                    type="button"
                    onClick={() => handleSelectDoctor(doc)}
                    className="w-full py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-200 hover:text-white border border-purple-500/30 text-xs font-bold transition-all duration-200 cursor-pointer text-center"
                  >
                    {doc.isCMD
                      ? (lang === "bn" ? "শিক্ষাগত যোগ্যতা দেখুন" : "View Academic Qualifications")
                      : (lang === "bn" ? "প্রোফাইল দেখুন" : "View Profile")}
                  </button>
                </div>

              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: HOW IT WORKS                                   */}
      {/* Heading: How It Works                                     */}
      {/* 4 Steps: Reach Out, Talk, Understand, Support             */}
      {/* Connected Pathway in Dark Psychology Theme                */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1020]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-500/20 text-white relative overflow-hidden shadow-[0_12px_36px_-8px_rgba(0,0,0,0.7)]">
          
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-1.5 relative z-10">
            <span className="text-xs font-mono uppercase font-bold text-orange-400 tracking-wider">
              {lang === "bn" ? "আমাদের প্রক্রিয়া" : "Therapeutic Pathway"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "bn" ? "কীভাবে কাজ করে" : "How It Works"}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/80 font-normal">
              {lang === "bn"
                ? "৪টি সহজ ও সম্পূর্ণ গোপনীয় ধাপে সেবা শুরু করুন।"
                : "A simple, completely confidential 4-step path to care."}
            </p>
          </div>

          {/* 3D Connected Pathway Track */}
          <div className="relative z-10">
            
            {/* Desktop Horizontal Connecting Line */}
            <div className="hidden lg:block absolute top-7 left-12 right-12 h-0.5 bg-gradient-to-r from-purple-500/40 via-orange-400/60 to-emerald-400/40 rounded-full shadow-[0_0_12px_rgba(91,75,219,0.5)] z-0 pointer-events-none" />

            {/* 4 Pathway Step Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
              {pathwaySteps.map((step) => (
                <div
                  key={step.num}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* 3D Raised Node Badge */}
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-white/20 shadow-[0_6px_16px_-2px_rgba(0,0,0,0.5)] flex items-center justify-center mb-3.5 relative">
                      <span className="text-xs font-black text-amber-300 font-mono">
                        {step.num}
                      </span>
                      {/* Ambient Synapse Glow */}
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-400 shadow-xs" />
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                      {step.title[lang]}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: FINAL CTA                                      */}
      {/* Heading: Ready to Talk?                                   */}
      {/* Short text: Take the first step toward better wellbeing.  */}
      {/* Button: Book Appointment                                  */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B1020] via-[#1A163B] to-[#0B1020] text-white p-7 sm:p-10 lg:p-12 text-center overflow-hidden shadow-[0_16px_40px_-8px_rgba(0,0,0,0.8)] border border-purple-500/25">
          
          {/* Subtle Ambient Breathing Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 opacity-20 pointer-events-none hidden sm:block">
            <BreathingCircle className="w-40 h-40" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase font-bold text-orange-400 tracking-wider">
              {lang === "bn" ? "আমরা পাশে আছি" : "Confidential Support"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {lang === "bn" ? "কথা বলতে চান?" : "Ready to Talk?"}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-indigo-200/90 font-normal">
              {lang === "bn"
                ? "উন্নত মানসিক সুস্থতার দিকে প্রথম পদক্ষেপ নিন।"
                : "Take the first step toward better wellbeing."}
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button3D
                to="/appointment"
                variant="primary"
                size="lg"
                icon={Calendar}
                className="w-full sm:w-auto"
              >
                {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
              </Button3D>

              <Button3D
                onClick={() =>
                  openWhatsApp(
                    "Hello MINDSET, I would like to book an appointment."
                  )
                }
                variant="emerald"
                size="lg"
                icon={MessageCircle}
                className="w-full sm:w-auto"
              >
                {lang === "bn" ? "হোয়াটসঅ্যাপে বুকিং" : "WhatsApp"}
              </Button3D>
            </div>
          </div>

        </div>
      </section>

      {/* Specialist Modal for clicking 'View Profile' */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
