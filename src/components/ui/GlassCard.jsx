import React from "react";

/**
 * GlassCard
 * Frosted glass card with subtle depth borders, calibrated blur, and dark-navy gradients.
 */
export default function GlassCard({
  children,
  className = "",
  variant = "dark", // 'dark' | 'dark-subtle' | 'light'
  hover = false,
  onClick,
  ...props
}) {
  const variantClass = {
    dark: "glass-panel-dark text-white",
    "dark-subtle": "glass-panel-dark-subtle text-white",
    light: "glass-panel-light text-slate-900",
  }[variant] || "glass-panel-dark text-white";

  const hoverClass = hover
    ? "transition-all duration-300 hover:border-indigo-400/40 hover:shadow-3d-deep hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 relative overflow-hidden ${variantClass} ${hoverClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
