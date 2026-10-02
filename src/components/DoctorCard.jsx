import React from "react";
import { ArrowRight, Sparkles, Maximize2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useImageModal } from "../context/ImageModalContext";
import { useDoctorPhotos } from "../context/DoctorPhotosContext";
import TiltCard3D from "./ui/TiltCard3D";

/* ========================================================= */
/* NEURAL CONNECTION SVG ANIMATION OVERLAY                   */
/* Connects organic synaptic nodes with a gentle pulse glow  */
/* ========================================================= */
function NeuralConnectionOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 280 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="neuralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B4BDB" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#B9B3FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F4F2FF" stopOpacity="0.6" />
          </linearGradient>
          <filter id="neuralGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Synaptic Pathway Lines */}
        <path
          d="M 40 70 Q 110 110 140 170 T 240 230"
          stroke="url(#neuralGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          filter="url(#neuralGlow)"
          className="animate-[pulse_3s_ease-in-out_infinite]"
        />
        <path
          d="M 220 60 Q 170 120 140 170 T 50 260"
          stroke="url(#neuralGrad)"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          filter="url(#neuralGlow)"
          className="animate-[pulse_3s_ease-in-out_infinite] [animation-delay:1s]"
        />
        <path
          d="M 140 40 L 140 170 L 190 270"
          stroke="url(#neuralGrad)"
          strokeWidth="1"
          strokeDasharray="2 3"
          className="opacity-70"
        />

        {/* Synaptic Nodes with Soft Glowing Halos */}
        <g className="animate-[pulse_2.5s_ease-in-out_infinite]">
          <circle cx="40" cy="70" r="4" fill="#B9B3FF" filter="url(#neuralGlow)" />
          <circle cx="40" cy="70" r="1.5" fill="#FFFFFF" />
        </g>
        <g className="animate-[pulse_2.5s_ease-in-out_infinite] [animation-delay:0.5s]">
          <circle cx="220" cy="60" r="4" fill="#B9B3FF" filter="url(#neuralGlow)" />
          <circle cx="220" cy="60" r="1.5" fill="#FFFFFF" />
        </g>
        <g className="animate-[pulse_2.5s_ease-in-out_infinite] [animation-delay:1.2s]">
          <circle cx="140" cy="170" r="5" fill="#5B4BDB" filter="url(#neuralGlow)" />
          <circle cx="140" cy="170" r="2" fill="#FFFFFF" />
        </g>
        <g className="animate-[pulse_2.5s_ease-in-out_infinite] [animation-delay:1.8s]">
          <circle cx="240" cy="230" r="4" fill="#B9B3FF" filter="url(#neuralGlow)" />
          <circle cx="240" cy="230" r="1.5" fill="#FFFFFF" />
        </g>
        <g className="animate-[pulse_2.5s_ease-in-out_infinite] [animation-delay:0.8s]">
          <circle cx="50" cy="260" r="3.5" fill="#B9B3FF" filter="url(#neuralGlow)" />
          <circle cx="50" cy="260" r="1.5" fill="#FFFFFF" />
        </g>
        <g className="animate-[pulse_2.5s_ease-in-out_infinite] [animation-delay:1.5s]">
          <circle cx="190" cy="270" r="3.5" fill="#B9B3FF" filter="url(#neuralGlow)" />
          <circle cx="190" cy="270" r="1.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

export default function DoctorCard({ doctor, onViewProfile }) {
  const { lang } = useLanguage();
  const { openImage } = useImageModal();
  const { getDoctorPhoto } = useDoctorPhotos();

  if (!doctor) return null;

  const docName = doctor.name?.[lang] || doctor.name?.en || "Specialist";
  const docDesignation = doctor.designation?.[lang] || doctor.designation?.en || "";
  const docPhoto = getDoctorPhoto(doctor.id, doctor.image);

  return (
    <TiltCard3D
      maxTilt={6}
      scale={1.02}
      className="h-full rounded-2xl flex flex-col"
    >
      <div
        onClick={() => onViewProfile(doctor)}
        className="group relative h-full bg-white/[0.04] backdrop-blur-md rounded-2xl border border-purple-500/20 hover:border-purple-400/50 hover:bg-white/[0.07] shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
      >
        {/* Soft atmospheric backlight halo on hover */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-purple-500/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* ======================================================= */}
        {/* 1. PORTRAIT WITH DEPTH & NEURAL OVERLAY                */}
        {/* ======================================================= */}
        <div
          className="relative aspect-3/4 w-full overflow-hidden bg-[#070B18] flex items-center justify-center cursor-zoom-in group/portrait"
          onClick={(e) => {
            e.stopPropagation();
            openImage({
              src: docPhoto,
              alt: docName,
              title: docName,
              subtitle: docDesignation,
              category: lang === "bn" ? "মাইন্ডসেট সাইকোলজিস্ট" : "MINDSET Specialist",
            });
          }}
          title={lang === "bn" ? "ছবি বড় করে দেখতে ক্লিক করুন" : "Click to enlarge photo"}
        >
          {/* Ambient blurred backdrop so letterboxed areas match the portrait tone */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 blur-md scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${docPhoto})` }}
          />

          <img
            src={docPhoto}
            alt={docName}
            className="relative z-10 w-full h-full object-contain object-center group-hover:scale-103 transition-transform duration-500 ease-out"
            style={{ objectFit: "contain" }}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/logo.png";
            }}
          />

          {/* Gentle bottom gradient for text contrast */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070B18]/90 via-transparent to-transparent opacity-50 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

          {/* Neural Connection SVG Animation Layer */}
          <NeuralConnectionOverlay />

          {/* Top Left: Online / Available Indicator Badge */}
          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold shadow-xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>
              {doctor.isCMD
                ? (lang === "bn" ? "সিএমডি • সাইকোথেরাপিস্ট" : "CMD • Psychotherapist")
                : (lang === "bn" ? "উপলব্ধ" : "Available")}
            </span>
          </div>

          {/* Top Right: Image Lightbox Trigger Badge */}
          <div className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-xl bg-[#0B1020]/80 backdrop-blur-md border border-white/20 text-white/80 group-hover/portrait:text-amber-300 group-hover/portrait:bg-purple-900/90 group-hover/portrait:border-purple-400/60 shadow-md transition-all">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>

          {/* Interactive "View Profile" pill hover trigger */}
          <div
            className="absolute bottom-3 left-3 right-3 z-20 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onViewProfile(doctor);
            }}
          >
            <div className="w-full py-2 px-3 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-purple-500/30 text-white text-xs font-bold flex items-center justify-between shadow-lg group-hover:bg-purple-900/90 group-hover:border-purple-400/60 transition-colors">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {doctor.isCMD
                    ? (lang === "bn" ? "শিক্ষাগত যোগ্যতা দেখুন" : "View Academic Qualifications")
                    : (lang === "bn" ? "প্রোফাইল দেখুন" : "View Profile")}
                </span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* 2. CARD CONTENT: STRICTLY NAME + TITLE (SHORT TEXT)     */}
        {/* ======================================================= */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2 relative z-10">
          <div>
            {doctor.title && (
              <span className="inline-block px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                {doctor.title[lang] || doctor.title.en}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-1">
              {doctor.name?.[lang] || doctor.name?.en || ""}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-indigo-300 line-clamp-1 mt-0.5">
              {doctor.designation?.[lang] || doctor.designation?.en || ""}
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-medium">
            <span>
              {doctor.isCMD
                ? (lang === "bn" ? "নেতৃত্ব ও থেরাপিস্ট" : "Leadership & Therapy")
                : (lang === "bn" ? "ক্লিনিক্যাল প্যানেল" : "Clinical Panel")}
            </span>
            <span className="text-orange-400 font-bold group-hover:underline inline-flex items-center gap-0.5">
              <span>
                {doctor.isCMD
                  ? (lang === "bn" ? "যোগ্যতা ও পরিচিতি" : "Academic Credentials")
                  : (lang === "bn" ? "বিস্তারিত" : "Details")}
              </span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </TiltCard3D>
  );
}
