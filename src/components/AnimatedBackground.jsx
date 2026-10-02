import React from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * AnimatedBackground
 * Reusable 3D Dark Psychology Visual Atmosphere
 * - Deep navy (#070B18, #0B1020, #11182D, #25204A)
 * - Royal purple & soft lavender (#5B4BDB, #8075E8, #B9B3FF)
 * - Warm orange accents (#F97316)
 * - Slow breathing 3D organic sphere, neural network with synaptic nodes, ambient purple lighting
 * - Respects prefers-reduced-motion
 */
export default function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none opacity-40 bg-[#070B18]" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-[#5B4BDB]/15 blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#25204A]/30 blur-[140px]" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-[#070B18]"
      aria-hidden="true"
    >
      {/* 1. Atmospheric Deep Radial Vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#11182D]/80 via-[#070B18]/90 to-[#070B18]" />
      
      {/* 2. Large Soft 3D Organic Form / Breathing Sphere */}
      <motion.div
        animate={{
          scale: [1, 1.08, 0.96, 1],
          rotate: [0, 4, -3, 0],
          opacity: [0.35, 0.48, 0.38, 0.35],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] right-[-5%] w-[42rem] h-[42rem] sm:w-[54rem] sm:h-[54rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 35% 35%, rgba(128, 117, 232, 0.32) 0%, rgba(91, 75, 219, 0.22) 35%, rgba(37, 32, 74, 0.15) 70%, transparent 85%)",
          filter: "blur(60px)",
        }}
      />

      {/* 3. Secondary Warm Ambient Illumination (MINDSET Brand Orange Accent) */}
      <motion.div
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -20, 0],
          scale: [1, 0.95, 1.05, 1],
          opacity: [0.18, 0.26, 0.2, 0.18],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute top-[38%] left-[-12%] w-[36rem] h-[36rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(249, 115, 22, 0.18) 0%, rgba(234, 88, 12, 0.1) 45%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      {/* 4. Lower Deep Midnight Indigo Glow */}
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -30, 25, 0],
          scale: [1, 1.06, 0.97, 1],
          opacity: [0.25, 0.35, 0.28, 0.25],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute bottom-[-15%] right-[10%] w-[46rem] h-[46rem] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(91, 75, 219, 0.22) 0%, rgba(37, 32, 74, 0.3) 50%, transparent 80%)",
          filter: "blur(90px)",
        }}
      />

      {/* 5. Subtle Neural Synaptic Network with Interconnected Nodes */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="neuralGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B4BDB" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#B9B3FF" stopOpacity="0.6" />
            <stop offset="85%" stopColor="#F97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5B4BDB" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="neuralGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8075E8" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#5B4BDB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#25204A" stopOpacity="0.2" />
          </linearGradient>
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary Flowing Neural Pathways */}
        <path
          d="M -100 240 C 260 380, 520 120, 840 280 C 1120 420, 1340 180, 1560 260"
          stroke="url(#neuralGrad1)"
          strokeWidth="1.6"
          strokeDasharray="6 8"
          className="opacity-70"
        />
        <path
          d="M -80 580 C 320 440, 680 720, 1020 460 C 1240 280, 1420 540, 1580 480"
          stroke="url(#neuralGrad2)"
          strokeWidth="1.4"
          strokeDasharray="4 6"
          className="opacity-60"
        />
        <path
          d="M 280 -60 C 380 240, 480 460, 620 720 C 700 880, 740 960, 780 1020"
          stroke="url(#neuralGrad1)"
          strokeWidth="1.2"
          strokeDasharray="8 8"
          className="opacity-45"
        />

        {/* Intersecting Synaptic Nodes with Soft Glowing Halos */}
        <g filter="url(#nodeGlow)">
          <circle cx="260" cy="380" r="3.5" fill="#B9B3FF" />
          <circle cx="520" cy="120" r="4.5" fill="#5B4BDB" />
          <circle cx="840" cy="280" r="5" fill="#F97316" />
          <circle cx="1120" cy="420" r="4" fill="#B9B3FF" />
          <circle cx="1340" cy="180" r="3.5" fill="#8075E8" />
          <circle cx="320" cy="440" r="3" fill="#8075E8" />
          <circle cx="680" cy="720" r="4" fill="#F97316" />
          <circle cx="1020" cy="460" r="4.5" fill="#5B4BDB" />
          <circle cx="480" cy="460" r="3.5" fill="#B9B3FF" />
        </g>
      </svg>

      {/* 6. Subtle Floating Micro-Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 rounded-full bg-[#B9B3FF] blur-[0.5px] animate-float-1" />
        <div className="absolute top-[42%] right-[28%] w-2 h-2 rounded-full bg-[#F97316] blur-[0.5px] animate-float-2" />
        <div className="absolute top-[68%] left-[34%] w-1.5 h-1.5 rounded-full bg-[#8075E8] blur-[0.5px] animate-float-3" />
        <div className="absolute top-[82%] right-[16%] w-2 h-2 rounded-full bg-[#B9B3FF] blur-[0.5px] animate-float-4" />
      </div>

      {/* 7. Gentle Vignette Border Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(7,11,24,0.7)_100%)]" />
    </div>
  );
}
