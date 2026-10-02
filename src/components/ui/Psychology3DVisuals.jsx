import React from "react";

/**
 * Psychology3DVisuals
 * Elegant, non-literal psychological visual primitives:
 * - Connected synaptic nodes
 * - Organic neural curve pathways
 * - Balanced tension loops
 * - Dynamic breathing wave rings
 * Strictly NO brain clipart or medical crosses.
 */

export function SynapticPathway({ className = "w-full h-16 text-indigo-400" }) {
  return (
    <svg
      viewBox="0 0 600 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 30 C 120 10, 180 50, 300 30 C 420 10, 480 50, 590 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        className="opacity-40"
      />
      <path
        d="M10 30 C 150 45, 220 15, 300 30 C 380 45, 450 15, 590 30"
        stroke="currentColor"
        strokeWidth="1.5"
        className="opacity-60"
      />
      {/* Connected nodes */}
      <circle cx="10" cy="30" r="3" fill="#B9B3FF" />
      <circle cx="150" cy="38" r="2.5" fill="#5B4BDB" />
      <circle cx="300" cy="30" r="4" fill="#F97316" />
      <circle cx="450" cy="22" r="2.5" fill="#5B4BDB" />
      <circle cx="590" cy="30" r="3" fill="#B9B3FF" />
    </svg>
  );
}

export function BreathingRing3D({
  className = "w-48 h-48",
  pulseColor = "rgba(185, 179, 255, 0.2)",
}) {
  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full animate-breathe"
        style={{
          border: `1.5px solid ${pulseColor}`,
          boxShadow: `0 0 40px ${pulseColor}`,
        }}
      />
      <div
        className="absolute inset-4 rounded-full animate-breathe"
        style={{
          animationDelay: "1.2s",
          border: "1px dashed rgba(91, 75, 219, 0.3)",
        }}
      />
      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-indigo-500 to-amber-400 shadow-md animate-pulse" />
    </div>
  );
}

export function BalanceShape({ className = "w-12 h-12 text-indigo-400" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
      <circle cx="28" cy="28" r="8" fill="#F97316" fillOpacity="0.4" />
      <circle cx="20" cy="20" r="3" fill="#B9B3FF" />
    </svg>
  );
}
