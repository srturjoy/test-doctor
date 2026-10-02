import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { X, MessageCircle, Phone, MapPin, Clock, Globe, ChevronRight } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { openWhatsApp, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL, CHAMBER_ADDRESS_EN, CHAMBER_ADDRESS_BN, VISITING_HOURS_EN, VISITING_HOURS_BN } from "../utils/whatsapp";

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  const { lang, setLang } = useLanguage();
  const isClosedByPopRef = useRef(false);
  const historyPushedRef = useRef(false);

  // Close on Escape, Backspace, or Mobile/Browser Back without leaving the site
  useEffect(() => {
    if (!isOpen) return;

    isClosedByPopRef.current = false;
    historyPushedRef.current = true;
    window.history.pushState({ mobileMenuOpen: true }, "");

    const handlePopState = () => {
      isClosedByPopRef.current = true;
      onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      } else if (e.key === "Backspace") {
        const target = e.target;
        const isInput =
          target &&
          (target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable);
        if (!isInput) {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);

      if (!isClosedByPopRef.current && historyPushedRef.current) {
        if (window.history.state && window.history.state.mobileMenuOpen) {
          window.history.back();
        }
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 xl:hidden flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-sm bg-[#0B1020] h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto border-l border-purple-500/25 animate-in slide-in-from-right duration-300 text-white">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-500/20 flex items-center justify-between bg-[#070B18]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-orange-400/80 shadow-xs bg-white shrink-0">
              <img
                src="/logo.png"
                alt="MINDSET Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/favicon.png";
                }}
              />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block">
                MIND<span className="text-orange-500">SET</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider block">
                Psychotherapy Center
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 focus:outline-hidden focus:ring-2 focus:ring-purple-500 cursor-pointer"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 sm:px-5 py-5 space-y-5 flex-1">
          {/* Prominent Mobile Language Switcher Card */}
          <div className="bg-[#11182D]/90 p-3.5 rounded-2xl border border-purple-500/30 space-y-2.5 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="text-purple-200 font-semibold flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-orange-400" />
                <span>{lang === "bn" ? "ভাষা পরিবর্তন করুন" : "Select Language"}</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20">
                {lang === "bn" ? "বাংলা" : "English"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#070B18] rounded-xl border border-white/10">
              <button
                type="button"
                id="mobile-btn-lang-bn"
                onClick={() => setLang("bn")}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lang === "bn"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                aria-pressed={lang === "bn"}
              >
                <span>বাংলা</span>
                {lang === "bn" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs" />}
              </button>
              
              <button
                type="button"
                id="mobile-btn-lang-en"
                onClick={() => setLang("en")}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  lang === "en"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
                aria-pressed={lang === "en"}
              >
                <span>English</span>
                {lang === "en" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-xs" />}
              </button>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="space-y-1" aria-label="Mobile Navigation Links">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end={link.path === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                    isActive
                      ? "bg-orange-500/15 text-orange-400 border border-orange-500/30 font-bold shadow-xs"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-orange-400 shadow-xs shadow-orange-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Quick chamber info block */}
          <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-purple-500/20 space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{lang === "bn" ? VISITING_HOURS_BN : VISITING_HOURS_EN}</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{lang === "bn" ? CHAMBER_ADDRESS_BN : CHAMBER_ADDRESS_EN}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-purple-500/20 space-y-2.5 bg-[#070B18]">
          <button
            type="button"
            onClick={() => {
              onClose();
              openWhatsApp("Hello MINDSET, I would like to book an appointment.");
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm shadow-md transition-all cursor-pointer min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{siteContent.nav.bookWhatsApp[lang]}</span>
          </button>
          <a
            href={`tel:${PRIMARY_PHONE_TEL}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.05] border border-purple-500/30 text-slate-200 hover:bg-white/[0.1] font-medium text-xs transition-colors min-h-[40px]"
          >
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            <span>{PRIMARY_PHONE_DISPLAY}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
