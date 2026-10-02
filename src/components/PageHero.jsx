import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

export default function PageHero({
  badge,
  title,
  subtitle,
  breadcrumbCurrent,
  children
}) {
  const { lang } = useLanguage();

  return (
    <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-18 overflow-hidden bg-gradient-to-b from-[#070B18] via-[#11182D] to-[#0B1020] text-white border-b border-purple-500/20">
      {/* Ambient background soft glow shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute -top-24 left-10 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-1/3 right-8 w-80 h-80 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-10 left-1/3 w-72 h-72 rounded-full bg-indigo-500/20 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-5">
            <Link
              to="/"
              className="hover:text-white transition-colors"
            >
              {lang === "bn" ? "মূলপাতা" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-orange-400 font-bold">{breadcrumbCurrent}</span>
          </nav>

          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-indigo-200 text-xs font-bold tracking-wide shadow-xs mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>{badge}</span>
            </div>
          )}

          {/* Page Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.18] mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
              {subtitle}
            </p>
          )}

          {children && (
            <div className="pt-6">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
