import React from "react";

/**
 * SectionTransition
 * Seamless dark visual connector between page sections
 * - Deep navy gradient blend (#070B18 -> #0B1020 -> #070B18)
 * - Soft purple atmospheric glow
 * - Subtle organic curve & neural connection node
 */
export default function SectionTransition({ variant = "default", className = "" }) {
  return (
    <div
      className={`relative w-full h-4 overflow-hidden pointer-events-none flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
    </div>
  );
}
