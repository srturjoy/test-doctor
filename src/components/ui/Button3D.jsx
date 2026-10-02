import React from "react";
import { Link } from "react-router-dom";

/**
 * Button3D
 * Tactile button with 3D elevation, subtle specular lighting, and micro-press physics.
 * Variants:
 * - 'primary': Warm orange accent (#EA580C -> #F97316) for prominent CTAs
 * - 'purple': Royal purple (#5B4BDB) with soft lavender border
 * - 'emerald': WhatsApp direct action
 * - 'glass': Frosted glass panel with subtle 3D lift
 * - 'outline': Clean border with subtle fill on hover
 */
export default function Button3D({
  children,
  to,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-bold tracking-normal rounded-xl transition-all duration-200 select-none cursor-pointer active:scale-[0.98] active:translate-y-0.5";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-6 py-3.5 text-sm sm:text-base gap-2.5",
  }[size] || "px-5 py-2.5 text-xs sm:text-sm gap-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-3d-glow-orange hover:-translate-y-0.5 border-t border-orange-300/40",
    purple:
      "bg-gradient-to-b from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white shadow-3d-glow-purple hover:-translate-y-0.5 border-t border-indigo-300/30",
    emerald:
      "bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white shadow-lg hover:-translate-y-0.5 border-t border-emerald-300/40",
    glass:
      "glass-panel-dark text-white hover:bg-slate-800/80 hover:-translate-y-0.5 shadow-3d-soft border border-white/15",
    outline:
      "bg-transparent border border-indigo-400/40 text-slate-200 hover:bg-white/10 hover:text-white hover:-translate-y-0.5",
  }[variant] || "bg-orange-600 text-white";

  const disabledClasses = disabled
    ? "opacity-50 pointer-events-none cursor-not-allowed shadow-none transform-none"
    : "";

  const combinedClass = `${baseClasses} ${sizeClasses} ${variantClasses} ${disabledClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        <span>{children}</span>
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClass}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
