import React from "react";

/**
 * PsychologyVisuals
 * Abstract, elegant visual components representing neural connection,
 * emotional balance, and psychological safety.
 * (Strictly avoids clipart brains or medical crosses).
 */

export function NeuralLines({ className = "w-full h-full text-indigo-400/20" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M 20 180 C 140 60, 260 210, 400 120 C 540 30, 660 160, 780 80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <path
        d="M 60 80 C 180 200, 320 40, 460 150 C 600 230, 700 70, 760 140"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Interconnected Synaptic Nodes */}
      <circle cx="140" cy="115" r="3.5" fill="#5B4BDB" opacity="0.6" />
      <circle cx="260" cy="200" r="2.5" fill="#B9B3FF" opacity="0.7" />
      <circle cx="400" cy="120" r="4.5" fill="#F97316" opacity="0.7" />
      <circle cx="540" cy="50" r="3" fill="#5B4BDB" opacity="0.6" />
      <circle cx="660" cy="150" r="3.5" fill="#B9B3FF" opacity="0.7" />
    </svg>
  );
}

export function BreathingCircle({ className = "w-32 h-32" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute inset-0 rounded-full bg-indigo-500/10 animate-ping opacity-30" />
      <div className="absolute inset-2 rounded-full border border-indigo-400/30 animate-breathe" />
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-500/10 to-orange-500/10 backdrop-blur-xs" />
      <div className="w-3 h-3 rounded-full bg-orange-500/80 shadow-xs" />
    </div>
  );
}

export function ThoughtPathway({ className = "w-full h-16 text-indigo-300/30" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M 0 30 Q 150 5, 300 30 T 600 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="150" cy="17" r="3" fill="#B9B3FF" />
      <circle cx="300" cy="30" r="4" fill="#F97316" />
      <circle cx="450" cy="43" r="3" fill="#5B4BDB" />
    </svg>
  );
}

export function EmotionalWaveIcon({ type = "anxiety", className = "w-5 h-5 text-indigo-600" }) {
  switch (type) {
    case "anxiety":
      // Calming sine wave
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 12c2.5-5 5-5 7.5 0s5 5 7.5 0 5-5 5-5" />
        </svg>
      );
    case "depression":
      // Uplifting curved pathway with rising node
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 18c6-2 10-12 18-12" />
          <circle cx="21" cy="6" r="2" fill="currentColor" />
        </svg>
      );
    case "relationship":
      // Two interlocking empathic rings
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="9" cy="12" r="6" strokeDasharray="32" strokeDashoffset="4" />
          <circle cx="15" cy="12" r="6" />
        </svg>
      );
    case "trauma":
      // Healing bridge: broken segment reforming into connection
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 14h5" />
          <path d="M16 10h5" />
          <path d="M8 14c3-1 5-3 8-4" strokeDasharray="2 3" />
        </svg>
      );
    case "family":
      // Clustered organic nodes in harmony
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="7" r="3" />
          <circle cx="6" cy="17" r="2.5" />
          <circle cx="18" cy="17" r="2.5" />
          <path d="M9 16l2-6 2 6" strokeDasharray="2 2" />
        </svg>
      );
    case "child":
      // Nurturing spiral / sprouting leaf form
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 21V11" />
          <path d="M12 11c0-4 4-7 8-7-1 4-3 7-8 7z" />
          <path d="M12 15c0-3-3-5-6-5 1 3 2 5 6 5z" />
        </svg>
      );
    case "cbt":
      // Triad: Thought - Emotion - Behavior loop
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3l8 14H4L12 3z" />
          <circle cx="12" cy="3" r="1.5" fill="currentColor" />
          <circle cx="20" cy="17" r="1.5" fill="currentColor" />
          <circle cx="4" cy="17" r="1.5" fill="currentColor" />
        </svg>
      );
    case "addiction":
      // Unbinding / breaking cycle into freedom
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6L6 18" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

/* ========================================================= */
/* 6 ABSTRACT 3D PSYCHOLOGY VISUALS FOR "WHAT WE HELP WITH"   */
/* No brain clipart, no medical crosses, purely abstract 3D  */
/* ========================================================= */

/**
 * 1. Anxiety: Flowing breathing waveform with calming rhythm
 */
export function AnxietyWaveVisual({ className = "w-12 h-12" }) {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-tr from-[#11182D] via-[#25204A] to-[#1E1B4B] p-2.5 border border-purple-500/25 shadow-[0_4px_16px_rgba(91,75,219,0.25)] flex items-center justify-center group-hover:border-purple-400/50 transition-colors ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="anxietyWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B4BDB" />
            <stop offset="50%" stopColor="#B9B3FF" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        {/* Calming expanding aura */}
        <circle cx="24" cy="24" r="18" stroke="#8075E8" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="3 3" />
        {/* Flowing breathing waveform */}
        <path
          d="M 6 24 C 11 15, 17 15, 22 24 C 27 33, 33 33, 38 24 C 41 18, 44 21, 46 24"
          stroke="url(#anxietyWaveGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* Synaptic resonance node */}
        <circle cx="22" cy="24" r="3" fill="#B9B3FF" />
        <circle cx="22" cy="24" r="5" stroke="#B9B3FF" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

/**
 * 2. Depression: Soft rising light curve moving from darkness to illumination
 */
export function DepressionLightVisual({ className = "w-12 h-12" }) {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-tr from-[#11182D] via-[#1F173B] to-[#2E1A47] p-2.5 border border-purple-500/25 shadow-[0_4px_16px_rgba(249,115,22,0.2)] flex items-center justify-center group-hover:border-orange-400/50 transition-colors ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="depressRisingGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#25204A" />
            <stop offset="50%" stopColor="#8075E8" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="75%" cy="25%" r="40%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        {/* Ambient rising aura */}
        <circle cx="36" cy="14" r="12" fill="url(#sunGlow)" />
        {/* Rising trajectory curve */}
        <path
          d="M 8 38 C 16 36, 22 28, 36 14"
          stroke="url(#depressRisingGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Base shadow node transitioning to golden dawn */}
        <circle cx="8" cy="38" r="2" fill="#5B4BDB" opacity="0.6" />
        <circle cx="36" cy="14" r="3.5" fill="#F97316" />
        <circle cx="36" cy="14" r="6" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * 3. Relationships: Two connected translucent glowing spheres with mutual resonance
 */
export function RelationshipSpheresVisual({ className = "w-12 h-12" }) {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-tr from-[#11182D] via-[#201D47] to-[#2C1D42] p-2.5 border border-purple-500/25 shadow-[0_4px_16px_rgba(185,179,255,0.2)] flex items-center justify-center group-hover:border-purple-300/50 transition-colors ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
        <defs>
          <radialGradient id="sphereLeft" cx="40%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#B9B3FF" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#5B4BDB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#11182D" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="sphereRight" cx="60%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#EA580C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#11182D" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        {/* Mutual harmonic bridge line */}
        <path d="M 18 24 Q 24 20 30 24" stroke="#F4F2FF" strokeWidth="1.5" strokeDasharray="2 3" />
        {/* Left Sphere (Self) */}
        <circle cx="18" cy="24" r="11" fill="url(#sphereLeft)" stroke="#8075E8" strokeWidth="1.2" strokeOpacity="0.7" />
        {/* Right Sphere (Other) */}
        <circle cx="30" cy="24" r="11" fill="url(#sphereRight)" stroke="#F97316" strokeWidth="1.2" strokeOpacity="0.7" />
        {/* Core connection singularity */}
        <circle cx="24" cy="24" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
}

/**
 * 4. Trauma: Broken line gradually reconnecting into a coherent bridge
 */
export function TraumaReconnectionVisual({ className = "w-12 h-12" }) {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-tr from-[#11182D] via-[#241A3D] to-[#2B1B35] p-2.5 border border-purple-500/25 shadow-[0_4px_16px_rgba(249,115,22,0.2)] flex items-center justify-center group-hover:border-orange-400/50 transition-colors ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="reconnectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B4BDB" />
            <stop offset="50%" stopColor="#B9B3FF" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
        {/* Past fragment */}
        <path d="M 7 28 L 17 28" stroke="#8075E8" strokeWidth="2.2" strokeLinecap="round" />
        {/* Future grounded line */}
        <path d="M 31 20 L 41 20" stroke="#F97316" strokeWidth="2.2" strokeLinecap="round" />
        {/* Healing organic golden/lavender bridge */}
        <path
          d="M 17 28 C 22 28, 25 20, 31 20"
          stroke="url(#reconnectGrad)"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        {/* Reconnection anchors */}
        <circle cx="17" cy="28" r="3" fill="#B9B3FF" />
        <circle cx="24" cy="24" r="2" fill="#F4F2FF" />
        <circle cx="31" cy="20" r="3" fill="#F97316" />
      </svg>
    </div>
  );
}

/**
 * 5. Stress: Compressed erratic wave transitioning into smooth, calm rhythm
 */
export function StressSmoothingVisual({ className = "w-12 h-12" }) {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-tr from-[#11182D] via-[#221B45] to-[#1E1938] p-2.5 border border-purple-500/25 shadow-[0_4px_16px_rgba(91,75,219,0.2)] flex items-center justify-center group-hover:border-purple-300/50 transition-colors ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="stressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="45%" stopColor="#8075E8" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        {/* Erratic stress wave converting into calm sine wave */}
        <path
          d="M 6 24 L 11 16 L 15 31 L 20 18 L 24 28 C 29 20, 34 20, 38 24 C 41 26, 43 24, 46 24"
          stroke="url(#stressGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Calm equilibrium point */}
        <circle cx="38" cy="24" r="2.5" fill="#10B981" />
        <circle cx="38" cy="24" r="5" stroke="#10B981" strokeOpacity="0.4" />
      </svg>
    </div>
  );
}

/**
 * 6. Child Development: Growing organic connected nodes branching gracefully upward
 */
export function ChildDevelopmentVisual({ className = "w-12 h-12" }) {
  return (
    <div className={`relative rounded-2xl bg-gradient-to-tr from-[#11182D] via-[#172535] to-[#142C38] p-2.5 border border-emerald-500/25 shadow-[0_4px_16px_rgba(16,185,129,0.2)] flex items-center justify-center group-hover:border-emerald-400/50 transition-colors ${className}`}>
      <svg className="w-full h-full" viewBox="0 0 48 48" fill="none">
        <defs>
          <linearGradient id="growthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
        {/* Central stem */}
        <path d="M 24 40 V 18" stroke="url(#growthGrad)" strokeWidth="2.4" strokeLinecap="round" />
        {/* Branch Left */}
        <path d="M 24 28 C 19 26, 14 22, 13 16" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
        {/* Branch Right */}
        <path d="M 24 22 C 29 20, 34 16, 35 10" stroke="#6EE7B7" strokeWidth="1.8" strokeLinecap="round" />
        {/* Budding nodes */}
        <circle cx="24" cy="40" r="2" fill="#047857" />
        <circle cx="13" cy="16" r="2.5" fill="#34D399" />
        <circle cx="24" cy="18" r="3" fill="#10B981" />
        <circle cx="35" cy="10" r="3.5" fill="#FBBF24" />
      </svg>
    </div>
  );
}
