import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Zap,
  Info,
  Layers,
  Heart,
  Brain,
  Compass,
  CheckCircle2,
  Users
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

/**
 * InteractiveMindSystem
 * A tactile, non-infographic 3D interactive psychological experience.
 *
 * Visual Systems:
 * 1. COGNITIVE TRIAD: Thought → Emotion → Behavior (CBT feedback loop)
 * 2. RELATIONAL ECOSYSTEM: Person → Relationship → Family (Systemic / TA dynamics)
 * 3. HEALING PATHWAY: Stress → Understanding → Support → Growth (Therapeutic arc)
 *
 * Features:
 * - Dynamic SVG organic bezier spline pathways with particle flow
 * - Interactive 3D tiltable nodes with glowing somatic elevation
 * - Real-time node inspection with concise psychological context
 * - Interactive pulse triggers and fluid perspective shifts
 */

export default function InteractiveMindSystem({ className = "" }) {
  const { lang } = useLanguage();
  const [activeSystem, setActiveSystem] = useState("cognitive"); // "cognitive" | "relational" | "healing"
  const [activeNodeId, setActiveNodeId] = useState("thought");
  const [isPulsing, setIsPulsing] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Set default node when switching systems
  const handleSwitchSystem = (systemKey) => {
    setActiveSystem(systemKey);
    if (systemKey === "cognitive") setActiveNodeId("thought");
    if (systemKey === "relational") setActiveNodeId("person");
    if (systemKey === "healing") setActiveNodeId("stress");
  };

  // Subtle interactive 3D mouse tilt on desktop only
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Data for the 3 systems
  const systemsData = {
    cognitive: {
      title: {
        en: "Cognitive Triad Loop",
        bn: "কগনিটিভ ট্রায়াড চক্র"
      },
      subtitle: {
        en: "The continuous interplay between thoughts, emotional states, and physiological behaviors.",
        bn: "চিন্তা, অনুভূতি ও আচরণের মধ্যকার অবিচ্ছিন্ন পারস্পরিক প্রভাব।"
      },
      pathwayLabel: "THOUGHT → EMOTION → BEHAVIOR",
      nodes: [
        {
          id: "thought",
          label: { en: "THOUGHT", bn: "চিন্তা" },
          sub: { en: "Cognitive Appraisal", bn: "বোধ ও মূল্যায়ন" },
          color: "#6366F1", // Indigo
          glow: "rgba(99, 102, 241, 0.4)",
          pos: { x: 50, y: 18 },
          shortDesc: {
            en: "Automatic internal interpretations and beliefs that filter reality.",
            bn: "বাস্তবতাকে ব্যাখ্যা করার স্বয়ংক্রিয় অভ্যন্তরীণ চিন্তা ও মূল্যায়ন।"
          },
          clinicalContext: {
            en: "When cognitive distortions (e.g. catastrophizing or black-and-white thinking) take over, they generate inaccurate distress signals.",
            bn: "অবাস্তব ও চরমপন্থী চিন্তার কারণে মস্তিষ্কে অতিরিক্ত বিপদ সংকেত তৈরি হয়।"
          },
          therapeuticIntervention: {
            en: "Cognitive restructuring helps identify automatic negative thoughts and build realistic self-dialogue.",
            bn: "সিবিটি থেরাপির মাধ্যমে অবাস্তব চিন্তা চিহ্নিত করে গঠনমূলক আত্মবিশ্বাস ফিরিয়ে আনা হয়।"
          },
          modality: "CBT / Beckian Framework"
        },
        {
          id: "emotion",
          label: { en: "EMOTION", bn: "অনুভূতি" },
          sub: { en: "Somatic Affect", bn: "শারীরিক ও মানসিক প্রতিক্রিয়া" },
          color: "#EC4899", // Pink/Rose
          glow: "rgba(236, 72, 153, 0.4)",
          pos: { x: 82, y: 72 },
          shortDesc: {
            en: "Visceral feeling states and nervous system arousal sparked by interpretation.",
            bn: "চিন্তার প্রভাবে স্নায়ুতন্ত্রে অনুভূত তীব্র মানসিক ও দৈহিক প্রতিক্রিয়া।"
          },
          clinicalContext: {
            en: "Feelings like anxiety, panic, or melancholy manifest physically through tight chest, fatigue, or racing pulse.",
            bn: "উদ্বেগ বা বিষণ্নতা হৃদস্পন্দন বৃদ্ধি, ক্লান্তি বা বুকে চাপের মতো শারীরিক লক্ষণে রূপ নেয়।"
          },
          therapeuticIntervention: {
            en: "Somatic grounding and mindfulness validate affect without becoming overwhelmed by it.",
            bn: "মাইন্ডফুলনেস ও স্নায়বিক শিথিলকরণ কৌশল অনুভূতিকে শান্তভাবে ধারণ করতে শেখায়।"
          },
          modality: "Trauma-Informed & Polyvagal Theory"
        },
        {
          id: "behavior",
          label: { en: "BEHAVIOR", bn: "আচরণ" },
          sub: { en: "Action & Coping", bn: "প্রকাশ্য পদক্ষেপ ও প্রতিক্রিয়া" },
          color: "#F59E0B", // Amber
          glow: "rgba(245, 158, 11, 0.4)",
          pos: { x: 18, y: 72 },
          shortDesc: {
            en: "What we do in response: avoidance, withdrawal, engagement, or fight.",
            bn: "অনুভূতির প্রতিক্রিয়ায় আমরা যা করি: এড়িয়ে যাওয়া, গুটিয়ে থাকা বা সক্রিয় হওয়া।"
          },
          clinicalContext: {
            en: "Avoidance offers temporary relief but reinforces the thought that the situation is unbearable.",
            bn: "কোনো পরিস্থিতি সাময়িক এড়িয়ে চলা দীর্ঘমেয়াদে ভীতি ও সংশয়কে আরও বাড়িয়ে দেয়।"
          },
          therapeuticIntervention: {
            en: "Gradual behavioral activation breaks avoidant loops through achievable positive exposures.",
            bn: "ধাপে ধাপে বাস্তবসম্মত কাজের অনুশীলন ভীতি কাটিয়ে আত্মবিশ্বাস বৃদ্ধি করে।"
          },
          modality: "Behavioral Activation & Exposure"
        }
      ]
    },

    relational: {
      title: {
        en: "Relational Ecosystem",
        bn: "সম্পর্ক ও পারিবারিক বাস্তুতন্ত্র"
      },
      subtitle: {
        en: "How individual wellbeing shapes close interpersonal bonds and whole family systems.",
        bn: "ব্যক্তির সুস্থতা কীভাবে অন্তরঙ্গ সম্পর্ক এবং সমগ্র পারিবারিক পরিবেশকে প্রভাবিত করে।"
      },
      pathwayLabel: "PERSON → RELATIONSHIP → FAMILY",
      nodes: [
        {
          id: "person",
          label: { en: "PERSON", bn: "ব্যক্তি" },
          sub: { en: "Self-Regulation", bn: "আত্ম-সচেতনতা ও সীমানা" },
          color: "#38BDF8", // Sky blue
          glow: "rgba(56, 189, 248, 0.4)",
          pos: { x: 20, y: 48 },
          shortDesc: {
            en: "The foundation: internal self-worth, emotional regulation, and authentic boundaries.",
            bn: "মূল ভিত্তি: আত্মমর্যাদা, নিজস্ব আবেগ নিয়ন্ত্রণ এবং সুস্থ ব্যক্তিগত সীমারেখা।"
          },
          clinicalContext: {
            en: "Unresolved personal pain or childhood wounds naturally spill into how we relate to others.",
            bn: "ব্যক্তির অপ্রকাশিত অতীত কষ্ট অজান্তেই অন্য মানুষের সাথে আচরণে প্রতিফলিত হয়।"
          },
          therapeuticIntervention: {
            en: "Person-centered counseling fosters self-acceptance and emotional grounding.",
            bn: "ব্যক্তিকেন্দ্রিক কাউন্সেলিং আত্মমর্যাদা ও অভ্যন্তরীণ মানসিক শক্তি ফিরিয়ে আনে।"
          },
          modality: "Humanistic & Person-Centered"
        },
        {
          id: "relationship",
          label: { en: "RELATIONSHIP", bn: "সম্পর্ক" },
          sub: { en: "Dyadic Communication", bn: "পারস্পরিক লেনদেন ও বিশ্বাস" },
          color: "#F97316", // Orange
          glow: "rgba(249, 115, 22, 0.4)",
          pos: { x: 50, y: 35 },
          shortDesc: {
            en: "The interactive space: mutual vulnerability, listening, and adult-to-adult dialogue.",
            bn: "পারস্পরিক লেনদেনের ক্ষেত্র: সহমর্মিতা, গভীর শ্রবণ এবং সচেতন আলোচনা।"
          },
          clinicalContext: {
            en: "Unconscious ego-state collisions (Parent vs Child) trigger repeating disputes and emotional distance.",
            bn: "ইগো স্টেটের সংঘাত দাম্পত্য ও প্রিয়জনের মধ্যে ভুল বোঝাবুঝি সৃষ্টি করে।"
          },
          therapeuticIntervention: {
            en: "Transactional Analysis deconstructs blaming games to restore respectful Adult-to-Adult bonds.",
            bn: "টিএ থেরাপি পারস্পরিক দোষারোপের মনস্তাত্ত্বিক খেলা বন্ধ করে শ্রদ্ধা ফিরিয়ে আনে।"
          },
          modality: "Transactional Analysis (TA)"
        },
        {
          id: "family",
          label: { en: "FAMILY", bn: "পরিবার" },
          sub: { en: "Systemic Atmosphere", bn: "পারিবারিক ভারসাম্য ও সংস্কৃতি" },
          color: "#10B981", // Emerald
          glow: "rgba(16, 185, 129, 0.4)",
          pos: { x: 80, y: 52 },
          shortDesc: {
            en: "The collective ecosystem: generational rules, joint-family dynamics, and shared safety.",
            bn: "সম্মিলিত পরিবেশ: প্রজন্মগত ধারণা, যৌথ পরিবারের গতিশীলতা এবং সামগ্রিক সুরক্ষা।"
          },
          clinicalContext: {
            en: "A family system seeks balance; when boundaries are porous or rigid, chronic tension emerges.",
            bn: "পারিবারিক সীমারেখা দুর্বল বা অতি-কঠোর হলে দীর্ঘস্থায়ী অসন্তোষ দেখা দেয়।"
          },
          therapeuticIntervention: {
            en: "Systemic therapy reorganizes family roles so every member feels heard and protected.",
            bn: "সিস্টেমিক থেরাপি পারিবারিক ভূমিকাকে পুনর্বিন্যাস করে সৌহার্দ্য প্রতিষ্ঠা করে।"
          },
          modality: "Systemic Family Therapy"
        }
      ]
    },

    healing: {
      title: {
        en: "Therapeutic Transformation Pathway",
        bn: "নিরাময় ও রূপান্তরের পর্যায়ক্রম"
      },
      subtitle: {
        en: "Moving from acute vulnerability into supported insight, containment, and long-term flourishing.",
        bn: "অস্থিরতা ও মানসিক চাপ থেকে সঠিক সহায়তার মাধ্যমে আত্মোপলব্ধি ও মানসিক প্রসারণ।"
      },
      pathwayLabel: "STRESS → UNDERSTANDING → SUPPORT → GROWTH",
      nodes: [
        {
          id: "stress",
          label: { en: "STRESS", bn: "চাপ" },
          sub: { en: "Nervous Overload", bn: "স্নায়বিক অস্থিরতা" },
          color: "#EF4444", // Red
          glow: "rgba(239, 68, 68, 0.4)",
          pos: { x: 12, y: 60 },
          shortDesc: {
            en: "The crisis point: psychological fatigue, emotional chaos, or unresolved distress.",
            bn: "সংকট মুহূর্ত: মানসিক ক্লান্তি, বিষণ্নতা বা দীর্ঘদিনের মানসিক চাপ।"
          },
          clinicalContext: {
            en: "Chronic stress pushes the autonomic nervous system into constant fight, flight, or freeze.",
            bn: "দীর্ঘস্থায়ী চাপ স্নায়ুতন্ত্রকে সবসময় ভীতি বা ক্লান্তির ঘোরে আটকে রাখে।"
          },
          therapeuticIntervention: {
            en: "Immediate stabilization, somatic safety, and non-judgmental containment.",
            bn: "প্রাথমিক মানসিক স্থিতিশীলতা ও নিরাপদ পরিবেশ নিশ্চিতকরণ।"
          },
          modality: "Somatic De-escalation"
        },
        {
          id: "understanding",
          label: { en: "UNDERSTANDING", bn: "উপলব্ধি" },
          sub: { en: "Clarity & Insight", bn: "স্পষ্টতা ও কারণ অন্বেষণ" },
          color: "#F59E0B", // Amber
          glow: "rgba(245, 158, 11, 0.4)",
          pos: { x: 38, y: 30 },
          shortDesc: {
            en: "Naming what hurts: understanding root causes rather than judging symptoms.",
            bn: "কষ্টের আসল কারণ চিহ্নিত করা; লক্ষণের পেছনে লুকিয়ে থাকা সত্য উপলব্ধি।"
          },
          clinicalContext: {
            en: "Without insight, people blame themselves instead of seeing the environmental and historical causes.",
            bn: "উপলব্ধি না থাকলে মানুষ নিজেকে অনর্থক দোষারোপ করতে থাকে।"
          },
          therapeuticIntervention: {
            en: "Psychoeducation and clinical exploration turn confusion into clarity.",
            bn: "মনস্তাত্ত্বিক কাউন্সিলিং বিভ্রান্তির মেঘ কাটিয়ে স্পষ্ট উপলব্ধি এনে দেয়।"
          },
          modality: "Integrative Assessment"
        },
        {
          id: "support",
          label: { en: "SUPPORT", bn: "সহায়তা" },
          sub: { en: "Therapeutic Alliance", bn: "থেরাপিউটিক ভরসা ও চর্চা" },
          color: "#8B5CF6", // Purple
          glow: "rgba(139, 92, 246, 0.4)",
          pos: { x: 65, y: 60 },
          shortDesc: {
            en: "The healing container: a consistent, confidential partnership to practice new ways of living.",
            bn: "নিরাময়ের সুরক্ষিত স্থান: নতুন দৃষ্টিভঙ্গি ও চর্চা অনুশীলনের অবিচল সঙ্গ।"
          },
          clinicalContext: {
            en: "Isolation maintains suffering; an empathic therapeutic bond rewires relational trust.",
            bn: "একাকীত্ব কষ্টকে বাড়ায়; সহমর্মী থেরাপিউটিক সঙ্গ বিশ্বাস পুনরুদ্ধার করে।"
          },
          therapeuticIntervention: {
            en: "Evidence-based modalities provide tailored exercises, skill building, and accountability.",
            bn: "নির্দিষ্ট বৈজ্ঞানিক থেরাপির মাধ্যমে নিয়মিত মানসিক ব্যায়াম ও দক্ষতা অর্জন।"
          },
          modality: "Confidential Therapeutic Alliance"
        },
        {
          id: "growth",
          label: { en: "GROWTH", bn: "উত্তরণ" },
          sub: { en: "Resilience & Agency", bn: "স্থিতিস্থাপকতা ও পূর্ণতা" },
          color: "#10B981", // Emerald
          glow: "rgba(16, 185, 129, 0.4)",
          pos: { x: 88, y: 28 },
          shortDesc: {
            en: "The outcome: internal resilience, purposeful choices, and deep peace of mind.",
            bn: "চূড়ান্ত অর্জন: আত্মিক শান্তি, সংকট মোকাবিলার শক্তি এবং অর্থপূর্ণ জীবন।"
          },
          clinicalContext: {
            en: "Growth doesn't mean life is free of pain; it means you possess the tools to navigate it with grace.",
            bn: "উত্তরণ মানে কষ্ট না থাকা নয়; বরং কষ্টকে সাহসের সাথে মোকাবিলার শক্তি থাকা।"
          },
          therapeuticIntervention: {
            en: "Relapse prevention and continuous self-actualization habits.",
            bn: "দীর্ঘমেয়াদি প্রতিরোধ পরিকল্পনা ও আত্মবিকাশের স্থায়ী অভ্যাস।"
          },
          modality: "Self-Actualization & Autonomy"
        }
      ]
    }
  };

  const currentSystem = systemsData[activeSystem];
  const currentNode =
    currentSystem.nodes.find((n) => n.id === activeNodeId) ||
    currentSystem.nodes[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full rounded-3xl bg-gradient-to-b from-[#090D1A] via-[#0E1528] to-[#090D1A] border border-white/15 p-5 sm:p-8 lg:p-10 text-white shadow-2xl overflow-hidden ${className}`}
      style={{
        perspective: "1000px"
      }}
    >
      {/* Dynamic atmospheric radial glows */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-3xl pointer-events-none transition-all duration-700 -top-24 -left-20 opacity-20"
        style={{ background: currentNode.color }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none -bottom-20 -right-20" />

      {/* ========================================================= */}
      {/* 1. TOP HEADER & SYSTEM SWITCHER (3 PSYCHOLOGICAL MODELS)   */}
      {/* ========================================================= */}
      <div className="relative z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "ইন্টারেক্টিভ সাইকোলজি এক্সপেরিয়েন্স" : "Interactive Clinical Experience"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {currentSystem.title[lang]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-xl">
            {currentSystem.subtitle[lang]}
          </p>
        </div>

        {/* 3 Model Switchers */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleSwitchSystem("cognitive")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSystem === "cognitive"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            {lang === "bn" ? "১. কগনিটিভ চক্র" : "1. Cognitive Triad"}
          </button>

          <button
            type="button"
            onClick={() => handleSwitchSystem("relational")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSystem === "relational"
                ? "bg-orange-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            {lang === "bn" ? "২. সম্পর্ক ও পরিবার" : "2. Relational System"}
          </button>

          <button
            type="button"
            onClick={() => handleSwitchSystem("healing")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSystem === "healing"
                ? "bg-emerald-600 text-white shadow-md"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            {lang === "bn" ? "৩. নিরাময় পর্যায়" : "3. Healing Pathway"}
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. THE INTERACTIVE 3D SYSTEM CANVAS & NODE STAGE          */}
      {/* ========================================================= */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 sm:pt-8">
        
        {/* Left / Center: Interactive SVG Stage with 3D Nodes (7 cols) */}
        <div
          className="lg:col-span-7 relative min-h-[340px] sm:min-h-[400px] flex items-center justify-center rounded-3xl bg-slate-950/60 border border-white/10 p-4 overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-25 pointer-events-none" />

          {/* Connected Curved Spline Vectors */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="curveGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8" />
              </linearGradient>
              <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Cognitive Triad Curves: Triangle loop */}
            {activeSystem === "cognitive" && (
              <g filter="url(#vectorGlow)">
                {/* Thought → Emotion */}
                <path
                  d="M 50 18 Q 72 35, 82 72"
                  stroke="#818CF8"
                  strokeWidth="0.8"
                  strokeDasharray={isPulsing ? "3 2" : "none"}
                  fill="none"
                  className={isPulsing ? "animate-[pulse_2s_ease-in-out_infinite]" : ""}
                />
                {/* Emotion → Behavior */}
                <path
                  d="M 82 72 Q 50 85, 18 72"
                  stroke="#EC4899"
                  strokeWidth="0.8"
                  strokeDasharray={isPulsing ? "3 2" : "none"}
                  fill="none"
                  className={isPulsing ? "animate-[pulse_2s_ease-in-out_infinite] [animation-delay:0.5s]" : ""}
                />
                {/* Behavior → Thought (Feedback loop) */}
                <path
                  d="M 18 72 Q 28 35, 50 18"
                  stroke="#F59E0B"
                  strokeWidth="0.8"
                  strokeDasharray={isPulsing ? "3 2" : "none"}
                  fill="none"
                  className={isPulsing ? "animate-[pulse_2s_ease-in-out_infinite] [animation-delay:1s]" : ""}
                />
                {/* Center Core Equilibrium Ring */}
                <circle cx="50" cy="54" r="8" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none" />
                <circle cx="50" cy="54" r="2" fill="#F97316" className="animate-ping" />
              </g>
            )}

            {/* Relational Curves: S-shaped organic bridge */}
            {activeSystem === "relational" && (
              <g filter="url(#vectorGlow)">
                <path
                  d="M 20 48 Q 35 25, 50 35 T 80 52"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  strokeDasharray={isPulsing ? "3 2" : "none"}
                  fill="none"
                  className="animate-[pulse_3s_ease-in-out_infinite]"
                />
                <path
                  d="M 20 48 Q 45 65, 80 52"
                  stroke="#F97316"
                  strokeWidth="0.6"
                  strokeDasharray="2 3"
                  strokeOpacity="0.6"
                  fill="none"
                />
              </g>
            )}

            {/* Healing Pathway Curves: Progressive upward ascending wave */}
            {activeSystem === "healing" && (
              <g filter="url(#vectorGlow)">
                <path
                  d="M 12 60 C 25 70, 28 20, 38 30 C 48 40, 55 75, 65 60 C 75 45, 80 20, 88 28"
                  stroke="#10B981"
                  strokeWidth="1"
                  strokeDasharray={isPulsing ? "3 2" : "none"}
                  fill="none"
                  className="animate-[pulse_2.5s_ease-in-out_infinite]"
                />
              </g>
            )}
          </svg>

          {/* Interactive HTML 3D Nodes */}
          {currentSystem.nodes.map((node) => {
            const isSelected = node.id === activeNodeId;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                style={{
                  left: `${node.pos.x}%`,
                  top: `${node.pos.y}%`,
                  transform: `translate(-50%, -50%) translateZ(${isSelected ? "35px" : "10px"})`
                }}
              >
                {/* Somatic ambient ripple when active */}
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping pointer-events-none opacity-40"
                    style={{ background: node.color, transform: "scale(1.4)" }}
                  />
                )}

                {/* Node Pill Card */}
                <div
                  className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all duration-300 shadow-xl select-none ${
                    isSelected
                      ? "border-white bg-slate-900 ring-4 scale-110"
                      : "border-white/20 bg-slate-900/90 hover:border-white/50 hover:scale-105"
                  }`}
                  style={{
                    boxShadow: isSelected ? `0 0 30px ${node.glow}` : "0 8px 20px rgba(0,0,0,0.5)",
                    borderColor: isSelected ? node.color : undefined
                  }}
                >
                  {/* Glowing core indicator */}
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{
                      backgroundColor: node.color,
                      boxShadow: `0 0 10px ${node.color}`
                    }}
                  />

                  <div className="text-left">
                    <div
                      className="text-xs sm:text-sm font-extrabold tracking-wider"
                      style={{ color: isSelected ? "#FFFFFF" : node.color }}
                    >
                      {node.label[lang]}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
                      {node.sub[lang]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Stage Status Info */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 z-10 pointer-events-none">
            <span className="text-orange-300">
              {currentSystem.pathwayLabel}
            </span>
            <span className="hidden sm:inline opacity-75">
              {lang === "bn" ? "যেকোনো নোডে ক্লিক করে বিস্তারিত দেখুন" : "Click any node to inspect"}
            </span>
          </div>
        </div>

        {/* Right: Dynamic Clinical Context & Therapeutic Interventions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 shadow-xl">
            
            {/* Active Node Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase"
                style={{
                  backgroundColor: `${currentNode.color}20`,
                  color: currentNode.color,
                  border: `1px solid ${currentNode.color}40`
                }}
              >
                <span>{currentNode.label[lang]}</span>
                <span>•</span>
                <span>{currentNode.sub[lang]}</span>
              </div>

              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {currentNode.modality}
              </span>
            </div>

            {/* Crisp Short Definition */}
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentNode.shortDesc[lang]}
            </h3>

            {/* Clinical Context */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                {lang === "bn" ? "মনস্তাত্ত্বিক প্রতিক্রিয়া" : "Clinical Mechanism"}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentNode.clinicalContext[lang]}
              </p>
            </div>

            {/* Therapeutic Intervention */}
            <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-1.5">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold font-mono uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>{lang === "bn" ? "থেরাপিউটিক সমাধান" : "Therapeutic Reframing"}</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-100 font-normal leading-relaxed">
                {currentNode.therapeuticIntervention[lang]}
              </p>
            </div>

            {/* Quick Flow Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsPulsing(!isPulsing)}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Zap className={`w-3.5 h-3.5 ${isPulsing ? "text-orange-400" : "text-slate-500"}`} />
                <span>{isPulsing ? (lang === "bn" ? "পালস চলমান" : "Energy Pulse Active") : (lang === "bn" ? "পালস বন্ধ" : "Pulse Paused")}</span>
              </button>

              {/* Cycle through nodes */}
              <button
                type="button"
                onClick={() => {
                  const nodes = currentSystem.nodes;
                  const currentIndex = nodes.findIndex((n) => n.id === activeNodeId);
                  const nextNode = nodes[(currentIndex + 1) % nodes.length];
                  setActiveNodeId(nextNode.id);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
              >
                <span>{lang === "bn" ? "পরবর্তী উপাদান" : "Next Node"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
