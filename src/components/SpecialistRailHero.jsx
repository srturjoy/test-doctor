import React from "react";
import { Calendar, Users, Maximize2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useDoctorPhotos } from "../context/DoctorPhotosContext";
import { useImageModal } from "../context/ImageModalContext";
import { doctorsData } from "../data/doctors";
import SpatialCanvas3D from "./ui/SpatialCanvas3D";
import Button3D from "./ui/Button3D";

export default function SpecialistRailHero({ onSelectDoctor }) {
  const { lang } = useLanguage();
  const { getDoctorPhoto } = useDoctorPhotos();
  const { openImage } = useImageModal();

  // The 4 clinical specialists
  const specialists = doctorsData;

  // Duplicate list (8 items per group) to ensure a 100% mathematical seamless infinite loop with zero jump
  const setDoctors = [...specialists, ...specialists];

  // Distinct float animations for asynchronous organic movement across cards
  const floatClasses = [
    "animate-float-1",
    "animate-float-2",
    "animate-float-3",
    "animate-float-4",
  ];

  const renderCard = (doc, key, idx) => {
    const floatClass = floatClasses[idx % 4];
    const docPhoto = getDoctorPhoto(doc.id, doc.image);
    const docName = doc.name[lang] || doc.name.en;
    const docDesignation = doc.designation[lang] || doc.designation.en;

    const handleOpenImage = (e) => {
      e.stopPropagation();
      openImage({
        src: docPhoto,
        alt: docName,
        title: docName,
        subtitle: docDesignation,
        category: lang === "bn" ? "মাইন্ডসেট সাইকোলজিস্ট" : "MINDSET Specialist",
      });
    };

    return (
      <div
        key={key}
        className={`group relative shrink-0 text-left transition-transform duration-300 ${floatClass}`}
      >
        {/* Floating 3D Glass Card with Enhanced Size and Aesthetics */}
        <div className="relative w-52 h-76 sm:w-60 sm:h-84 md:w-64 md:h-92 lg:w-72 lg:h-[24rem] rounded-3xl p-2 bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.08] backdrop-blur-xl border border-white/[0.18] shadow-[0_16px_40px_-8px_rgba(0,0,0,0.7),0_0_20px_rgba(91,75,219,0.15)] group-hover:border-purple-400/50 group-hover:shadow-[0_24px_56px_-8px_rgba(91,75,219,0.35),0_0_36px_rgba(249,115,22,0.2)] group-hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden">
          
          {/* Doctor Portrait Image Container */}
          <div
            onClick={handleOpenImage}
            className="relative w-full h-[66%] sm:h-[68%] rounded-2xl overflow-hidden bg-[#070B18] cursor-zoom-in group/img flex items-center justify-center border border-white/10"
            title={lang === "bn" ? `${docName} এর ছবি বড় করে দেখুন` : `Click to view full photo of ${docName}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpenImage(e);
              }
            }}
          >
            {/* Ambient blurred backdrop for aesthetic glow */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 blur-md scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${docPhoto})` }}
            />

            {/* Doctor Portrait */}
            <img
              src={docPhoto}
              alt={docName}
              className="relative z-10 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-106"
              style={{ objectFit: "contain" }}
              loading="eager"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.png";
              }}
            />

            {/* Ambient Lighting & Depth Vignette */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />

            {/* Top Left: Online / Availability Indicator Badge */}
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>
                {doc.isCMD
                  ? (lang === "bn" ? "সিএমডি • সাইকোথেরাপিস্ট" : "CMD • Psychotherapist")
                  : (lang === "bn" ? "উপলব্ধ সেশন" : "Available")}
              </span>
            </div>

            {/* Top Right: Zoom Icon Indicator Badge */}
            <div className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-xl bg-slate-950/80 group-hover/img:bg-purple-900/90 text-white/80 group-hover/img:text-amber-300 border border-white/20 backdrop-blur-md transition-all duration-200 opacity-90 group-hover:opacity-100 shadow-xs">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>

            {/* Bottom Overlay Hint on Hover */}
            <div className="absolute bottom-2 left-2 right-2 z-20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200">
              <div className="py-1 px-2 rounded-lg bg-indigo-950/90 border border-indigo-400/40 text-indigo-200 text-[10px] text-center font-bold flex items-center justify-center gap-1">
                <Maximize2 className="w-2.5 h-2.5 text-amber-300" />
                <span>{lang === "bn" ? "বড় করে দেখতে ক্লিক করুন" : "Click to view full photo"}</span>
              </div>
            </div>
          </div>

          {/* Frosted Glass Information Strip at bottom - Clicking opens profile */}
          <div
            onClick={() => onSelectDoctor && onSelectDoctor(doc)}
            className="relative z-10 mt-2 p-3 sm:p-3.5 rounded-2xl bg-slate-950/85 hover:bg-slate-900/95 backdrop-blur-md border border-white/10 text-left cursor-pointer transition-all duration-200 group/info shadow-xs"
            title={lang === "bn" ? `${docName} এর বিস্তারিত প্রোফাইল দেখুন` : `View details for ${docName}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectDoctor && onSelectDoctor(doc);
              }
            }}
          >
            <div className="flex items-start justify-between gap-1">
              <div className="min-w-0 flex-1">
                {doc.title && (
                  <span className="inline-block px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold tracking-wide uppercase mb-1 border border-amber-400/30">
                    {doc.title[lang] || doc.title.en}
                  </span>
                )}
                <p className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-1 group-hover/info:text-amber-300 transition-colors">
                  {docName}
                </p>
                <p className="text-[10px] sm:text-[11px] text-indigo-200 line-clamp-1 leading-snug mt-0.5 font-medium">
                  {docDesignation}
                </p>
              </div>
            </div>

            {/* View Profile Action Prompt */}
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-purple-300/90 font-semibold group-hover/info:text-white transition-colors">
              <span className="flex items-center gap-1">
                <span>
                  {doc.isCMD
                    ? (lang === "bn" ? "শিক্ষাগত যোগ্যতা ও পরিচিতি" : "View Academic Qualifications")
                    : (lang === "bn" ? "প্রোফাইল দেখুন" : "View Profile")}
                </span>
              </span>
              <span className="text-orange-400 font-bold group-hover/info:translate-x-1 transition-transform inline-flex items-center">
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="hero"
      aria-label="MINDSET Hero Section"
      className="relative pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14 overflow-hidden bg-[#090D1C] text-white min-h-[auto] sm:min-h-[60vh] lg:min-h-[65vh] flex flex-col justify-center select-none"
    >
      {/* ========================================================= */}
      {/* 3D HERO VISUAL ENVIRONMENT                                */}
      {/* Deep navy with subtle purple atmospheric gradients        */}
      {/* Abstract neural network, connected nodes, floating        */}
      {/* particles, organic curves, breathing waveform             */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep ambient royal purple & indigo glow orbs */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[50rem] h-[24rem] bg-indigo-600/16 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-20 w-[28rem] h-[28rem] bg-purple-700/12 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-20 w-[26rem] h-[26rem] bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl" />

        {/* Dynamic 3D Synaptic Neural Network with Floating Particles & Breathing Waveform */}
        <div className="absolute inset-0 opacity-45">
          <SpatialCanvas3D nodeCount={38} interactive={true} opacity={0.7} />
        </div>

        {/* Ambient gentle breathing waveform illumination behind the content */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-44 opacity-20 pointer-events-none">
          <svg
            className="w-full h-full text-indigo-400"
            viewBox="0 0 1200 160"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,80 C150,130 350,30 600,80 C850,130 1050,30 1200,80"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <path
              d="M0,90 C200,50 400,120 600,90 C800,60 1000,120 1200,90"
              stroke="#F97316"
              strokeWidth="1.2"
              strokeOpacity="0.3"
            />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center z-10">
        
        {/* ========================================================= */}
        {/* 1. SMALL LABEL                                            */}
        {/* ========================================================= */}
        <div className="mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/12 backdrop-blur-md text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-indigo-200 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>
              {lang === "bn"
                ? "মাইন্ডসেট সাইকোথেরাপি অ্যান্ড কাউন্সেলিং সেন্টার"
                : "MINDSET PSYCHOTHERAPY & COUNSELING CENTER"}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. SPECIALIST PORTRAIT RAIL: UPPER-MIDDLE AREA            */}
        {/* 4 specialist portraits in ONE horizontal line             */}
        {/* Floating 3D glass cards moving slowly RIGHT -> LEFT       */}
        {/* Seamless infinite loop with zero jump                     */}
        {/* ========================================================= */}
        <div className="w-full max-w-6xl mb-4 sm:mb-6">
          <div className="relative w-full overflow-hidden mask-fade-edges py-3">
            <div className="flex animate-marquee-rtl w-max">
              {/* Set A */}
              <div className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6">
                {setDoctors.map((doc, idx) =>
                  renderCard(doc, `a-${doc.id}-${idx}`, idx)
                )}
              </div>
              {/* Set B (Identical duplicate for mathematical 0% to -50% jump-free loop) */}
              <div
                className="flex items-center gap-4 sm:gap-6 pr-4 sm:pr-6"
                aria-hidden="true"
              >
                {setDoctors.map((doc, idx) =>
                  renderCard(doc, `b-${doc.id}-${idx}`, idx)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Mobile Tap Prompt */}
        <div className="flex items-center justify-center gap-2 -mt-1 mb-5 text-[11px] text-purple-200/75 font-medium sm:hidden">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{lang === "bn" ? "ডাক্তারের ছবি স্পর্শ করে বড় করুন বা প্রোফাইল দেখুন" : "Tap portrait to zoom or view doctor profile"}</span>
        </div>

        {/* ========================================================= */}
        {/* 3. MAIN HEADING & SHORT DESCRIPTION                       */}
        {/* Short text only. No long paragraphs.                      */}
        {/* ========================================================= */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === "bn" ? (
              <>
                আরোগ্যের এক{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200">
                  নিরাপদ আশ্রয়
                </span>
              </>
            ) : (
              <>
                A Safe Space to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-amber-200">
                  Heal
                </span>
              </>
            )}
          </h1>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed">
            {lang === "bn"
              ? "পেশাদার সাইকোথেরাপি ও মনস্তাত্ত্বিক কাউন্সেলিং সহায়তা।"
              : "Professional psychotherapy & counseling support."}
          </p>

          {/* ========================================================= */}
          {/* 4. PRIMARY & SECONDARY CTAS                               */}
          {/* ========================================================= */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button3D
              to="/appointment"
              variant="primary"
              size="md"
              icon={Calendar}
              className="w-full sm:w-auto"
            >
              {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
            </Button3D>

            <Button3D
              to="/specialists"
              variant="glass"
              size="md"
              icon={Users}
              className="w-full sm:w-auto"
            >
              {lang === "bn" ? "আমাদের বিশেষজ্ঞবৃন্দ" : "Meet Our Specialists"}
            </Button3D>
          </div>
        </div>

      </div>
    </section>
  );
}
