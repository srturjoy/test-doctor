import React from "react";

/**
 * ServiceVisualMetaphor
 * 3D psychology-inspired abstract visual metaphors.
 * Strictly NO brain clipart or generic medical icons.
 *
 * Core Metaphors:
 * - Anxiety: Breathing wave (gentle rhythmic expansion/contraction)
 * - Relationships: Two connected circles (interlocking rings of empathy)
 * - Trauma: Broken line reconnecting (fractured pathway reforming into unity)
 * - CBT: Thought → Emotion → Behavior (cognitive triad loop)
 * Plus specialized representations for Depression, Family, Child Development, etc.
 */

export default function ServiceVisualMetaphor({
  type = "anxiety",
  className = "w-full h-36",
  isHovered = false
}) {
  switch (type) {
    /* ========================================================= */
    /* 1. ANXIETY: BREATHING WAVE                                */
    /* ========================================================= */
    case "anxiety":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          {/* Ambient breathe halo */}
          <div
            className={`absolute w-28 h-28 rounded-full bg-indigo-500/15 blur-xl transition-all duration-700 ${
              isHovered ? "scale-125 bg-indigo-500/25" : "scale-100"
            }`}
          />
          <svg
            className="w-full h-full text-indigo-400"
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#818CF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.5" />
              </linearGradient>
              <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Inhale/Exhale Outer Envelope */}
            <path
              d="M 10 50 Q 65 15, 120 50 T 230 50"
              stroke="url(#waveGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#waveGlow)"
              className="animate-[pulse_4s_ease-in-out_infinite]"
            />
            {/* Secondary harmonic wave */}
            <path
              d="M 10 50 Q 65 85, 120 50 T 230 50"
              stroke="url(#waveGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
              className="opacity-70 animate-[pulse_4s_ease-in-out_infinite] [animation-delay:2s]"
            />
            {/* Somatic anchor nodes */}
            <circle cx="65" cy="32" r="3.5" fill="#818CF8" filter="url(#waveGlow)" />
            <circle cx="65" cy="32" r="1.5" fill="#FFFFFF" />
            <circle cx="120" cy="50" r="4.5" fill="#F97316" filter="url(#waveGlow)" />
            <circle cx="120" cy="50" r="2" fill="#FFFFFF" />
            <circle cx="175" cy="68" r="3.5" fill="#38BDF8" filter="url(#waveGlow)" />
            <circle cx="175" cy="68" r="1.5" fill="#FFFFFF" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-indigo-300 uppercase">
            Inhale • Regulate • Exhale
          </span>
        </div>
      );

    /* ========================================================= */
    /* 2. RELATIONSHIPS: TWO CONNECTED CIRCLES                   */
    /* ========================================================= */
    case "relationships":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div
            className={`absolute w-32 h-24 rounded-full bg-orange-500/10 blur-xl transition-all duration-700 ${
              isHovered ? "scale-125 bg-orange-500/20" : "scale-100"
            }`}
          />
          <svg
            className="w-full h-full text-orange-400"
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="relRingA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
              <linearGradient id="relRingB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <filter id="relGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Left Circle (Self / Partner 1) */}
            <circle
              cx="98"
              cy="50"
              r="34"
              stroke="url(#relRingA)"
              strokeWidth="2.5"
              filter="url(#relGlow)"
              className="transition-transform duration-500"
              style={{
                transform: isHovered ? "translateX(4px)" : "none",
                transformOrigin: "center"
              }}
            />

            {/* Right Circle (Other / Partner 2) */}
            <circle
              cx="142"
              cy="50"
              r="34"
              stroke="url(#relRingB)"
              strokeWidth="2.5"
              filter="url(#relGlow)"
              className="transition-transform duration-500"
              style={{
                transform: isHovered ? "translateX(-4px)" : "none",
                transformOrigin: "center"
              }}
            />

            {/* Central Shared Intersection Point */}
            <circle
              cx="120"
              cy="50"
              r="5"
              fill="#FFFFFF"
              filter="url(#relGlow)"
              className="animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"
            />
            <circle cx="120" cy="50" r="3" fill="#F97316" />

            {/* Orbiting resonance nodes */}
            <circle cx="74" cy="30" r="2.5" fill="#FDBA74" />
            <circle cx="166" cy="70" r="2.5" fill="#C4B5FD" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-orange-300 uppercase">
            Shared Resonance • Mutual Trust
          </span>
        </div>
      );

    /* ========================================================= */
    /* 3. TRAUMA: BROKEN LINE RECONNECTING                       */
    /* ========================================================= */
    case "trauma":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div
            className={`absolute w-32 h-20 rounded-full bg-indigo-600/15 blur-xl transition-all duration-700 ${
              isHovered ? "scale-125 bg-amber-500/20" : "scale-100"
            }`}
          />
          <svg
            className="w-full h-full text-indigo-400"
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="traumaHealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <filter id="traumaGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Left Past Segment */}
            <path
              d="M 20 62 L 60 52 L 80 58"
              stroke="#64748B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="80" cy="58" r="3" fill="#94A3B8" />

            {/* The Fractured Gap Reconnecting with Golden Bridge */}
            <path
              d="M 80 58 Q 105 32, 120 42 T 160 48"
              stroke="url(#traumaHealGrad)"
              strokeWidth="3"
              strokeDasharray="4 3"
              strokeLinecap="round"
              filter="url(#traumaGlow)"
              className="animate-[pulse_2.5s_ease-in-out_infinite]"
            />

            {/* Right Restored Continuity */}
            <path
              d="M 160 48 L 190 40 L 220 38"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#traumaGlow)"
            />
            <circle cx="160" cy="48" r="4" fill="#F59E0B" filter="url(#traumaGlow)" />
            <circle cx="160" cy="48" r="1.5" fill="#FFFFFF" />
            <circle cx="220" cy="38" r="3.5" fill="#10B981" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-amber-300 uppercase">
            Rupture • Repair • Wholeness
          </span>
        </div>
      );

    /* ========================================================= */
    /* 4. CBT: THOUGHT → EMOTION → BEHAVIOR (TRIAD LOOP)        */
    /* ========================================================= */
    case "cbt":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div
            className={`absolute w-28 h-28 rounded-full bg-indigo-500/10 blur-xl transition-all duration-700 ${
              isHovered ? "scale-125 bg-indigo-500/20" : "scale-100"
            }`}
          />
          <svg
            className="w-full h-full text-indigo-400"
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="cbtTriadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <filter id="cbtGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Triad Connecting Vector Path */}
            <path
              d="M 120 18 L 180 72 L 60 72 Z"
              stroke="url(#cbtTriadGrad)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeDasharray="4 3"
              filter="url(#cbtGlow)"
              className="animate-[pulse_3s_ease-in-out_infinite]"
            />

            {/* Center Equilibrium Core */}
            <circle cx="120" cy="54" r="5" fill="#4F46E5" fillOpacity="0.4" />
            <circle cx="120" cy="54" r="2" fill="#A5B4FC" />

            {/* Node 1: Thought (Top) */}
            <g transform="translate(120, 18)">
              <circle r="7" fill="#4F46E5" filter="url(#cbtGlow)" />
              <circle r="3" fill="#FFFFFF" />
              <text y="-10" textAnchor="middle" fill="#C7D2FE" fontSize="8" fontFamily="sans-serif" fontWeight="700">
                THOUGHT
              </text>
            </g>

            {/* Node 2: Emotion (Right) */}
            <g transform="translate(180, 72)">
              <circle r="7" fill="#EC4899" filter="url(#cbtGlow)" />
              <circle r="3" fill="#FFFFFF" />
              <text y="14" textAnchor="middle" fill="#FBCFE8" fontSize="8" fontFamily="sans-serif" fontWeight="700">
                EMOTION
              </text>
            </g>

            {/* Node 3: Behavior (Left) */}
            <g transform="translate(60, 72)">
              <circle r="7" fill="#F59E0B" filter="url(#cbtGlow)" />
              <circle r="3" fill="#FFFFFF" />
              <text y="14" textAnchor="middle" fill="#FDE68A" fontSize="8" fontFamily="sans-serif" fontWeight="700">
                BEHAVIOR
              </text>
            </g>
          </svg>
        </div>
      );

    /* ========================================================= */
    /* 5. DEPRESSION: UPLIFTING RESTORATIVE CURVE                */
    /* ========================================================= */
    case "depression":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute w-28 h-20 rounded-full bg-amber-500/10 blur-xl" />
          <svg className="w-full h-full text-indigo-400" viewBox="0 0 240 100" fill="none">
            <defs>
              <linearGradient id="depGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#475569" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#818CF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              d="M 20 80 C 70 80, 110 65, 150 40 C 180 20, 200 18, 220 18"
              stroke="url(#depGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="20" cy="80" r="3" fill="#64748B" />
            <circle cx="150" cy="40" r="3.5" fill="#818CF8" />
            <circle cx="220" cy="18" r="5" fill="#F59E0B" className="animate-pulse" />
            <circle cx="220" cy="18" r="2" fill="#FFFFFF" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-amber-300 uppercase">
            Shadow • Reconnection • Vitality
          </span>
        </div>
      );

    /* ========================================================= */
    /* 6. CHILD DEVELOPMENT: BUDDING GROWTH                      */
    /* ========================================================= */
    case "child":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute w-28 h-28 rounded-full bg-emerald-500/10 blur-xl" />
          <svg className="w-full h-full text-emerald-400" viewBox="0 0 240 100" fill="none">
            <path
              d="M 120 85 V 40 C 120 25, 145 15, 160 15 C 160 30, 140 38, 120 45"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="animate-[pulse_3s_ease-in-out_infinite]"
            />
            <path
              d="M 120 55 C 105 45, 80 48, 80 60 C 95 62, 110 58, 120 55"
              stroke="#34D399"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="120" cy="85" r="4" fill="#065F46" />
            <circle cx="160" cy="15" r="4" fill="#6EE7B7" />
            <circle cx="80" cy="60" r="3.5" fill="#A7F3D0" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-emerald-300 uppercase">
            Nurture • Milestones • Flourish
          </span>
        </div>
      );

    /* ========================================================= */
    /* 7. ART THERAPY: EXPRESSIVE HARMONIC COLOR WAVES           */
    /* ========================================================= */
    case "art-therapy":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute w-28 h-20 rounded-full bg-purple-500/15 blur-xl" />
          <svg className="w-full h-full" viewBox="0 0 240 100" fill="none">
            <path
              d="M 20 50 C 60 20, 90 80, 130 50 C 170 20, 200 80, 220 50"
              stroke="#A855F7"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 20 60 C 60 90, 100 30, 140 60 C 180 90, 205 35, 220 55"
              stroke="#EC4899"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle cx="75" cy="35" r="3.5" fill="#F472B6" />
            <circle cx="130" cy="50" r="4.5" fill="#C084FC" />
            <circle cx="185" cy="65" r="3.5" fill="#38BDF8" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-purple-300 uppercase">
            Sensory Expression • Creative Healing
          </span>
        </div>
      );

    /* ========================================================= */
    /* 8. ADDICTION: UNBINDING CYCLE INTO FREEDOM               */
    /* ========================================================= */
    case "addiction":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute w-28 h-20 rounded-full bg-indigo-500/10 blur-xl" />
          <svg className="w-full h-full text-indigo-400" viewBox="0 0 240 100" fill="none">
            {/* Breaking loop into horizontal open vector */}
            <circle
              cx="90"
              cy="50"
              r="26"
              stroke="#818CF8"
              strokeWidth="2"
              strokeDasharray="120 40"
              className="animate-[spin_10s_linear_infinite]"
              style={{ transformOrigin: "90px 50px" }}
            />
            <path
              d="M 105 32 L 170 32 L 220 32"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="105" cy="32" r="3.5" fill="#818CF8" />
            <circle cx="220" cy="32" r="4.5" fill="#10B981" className="animate-pulse" />
            <circle cx="220" cy="32" r="2" fill="#FFFFFF" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-emerald-300 uppercase">
            Unbinding • Autonomy • Clarity
          </span>
        </div>
      );

    /* ========================================================= */
    /* 9. FAMILY / TRANSACTIONAL ANALYSIS / OTHER                */
    /* ========================================================= */
    case "family":
    case "transactional-analysis":
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute w-28 h-20 rounded-full bg-orange-500/10 blur-xl" />
          <svg className="w-full h-full text-orange-400" viewBox="0 0 240 100" fill="none">
            <circle cx="120" cy="30" r="14" stroke="#F97316" strokeWidth="2" />
            <circle cx="75" cy="65" r="12" stroke="#6366F1" strokeWidth="1.8" />
            <circle cx="165" cy="65" r="12" stroke="#10B981" strokeWidth="1.8" />
            {/* Equilibrium lines */}
            <path d="M 120 44 L 84 55" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 3" />
            <path d="M 120 44 L 156 55" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 3" />
            <circle cx="120" cy="30" r="3" fill="#F97316" />
            <circle cx="75" cy="65" r="2.5" fill="#6366F1" />
            <circle cx="165" cy="65" r="2.5" fill="#10B981" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-orange-300 uppercase">
            Parent • Adult • Child Dynamic
          </span>
        </div>
      );

    /* ========================================================= */
    /* DEFAULT / PERSON-CENTERED / EXISTENTIAL                   */
    /* ========================================================= */
    default:
      return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute w-24 h-24 rounded-full bg-indigo-500/15 blur-lg" />
          <svg className="w-full h-full text-indigo-400" viewBox="0 0 240 100" fill="none">
            <circle cx="120" cy="50" r="32" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="120" cy="50" r="20" stroke="#6366F1" strokeWidth="2" />
            <circle cx="120" cy="50" r="6" fill="#F59E0B" className="animate-pulse" />
            <circle cx="120" cy="50" r="2" fill="#FFFFFF" />
          </svg>
          <span className="absolute bottom-2 text-[10px] font-mono tracking-widest text-indigo-300 uppercase">
            Empathy • Acceptance • Growth
          </span>
        </div>
      );
  }
}
