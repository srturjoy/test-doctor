import React, { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { openWhatsApp } from "../utils/whatsapp";

export default function WhatsAppButton() {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Show after minor scroll or delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Friendly Tooltip / Callout bubble (dismissable) */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-2xl bg-white text-slate-800 text-xs font-semibold shadow-xl border border-slate-200/80 animate-in fade-in slide-in-from-right-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>
            {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বা তথ্যের জন্য চ্যাট করুন" : "Chat for appointments & info"}
          </span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        type="button"
        id="floating-whatsapp-btn"
        onClick={() => openWhatsApp("Hello MINDSET, I am interested in psychotherapy and counseling services.")}
        className="group relative flex items-center gap-2.5 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-hidden focus:ring-4 focus:ring-emerald-400/50"
        aria-label="Chat on WhatsApp"
      >
        {/* Soft pulsing ring */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />

        <MessageCircle className="w-6 h-6 text-white shrink-0 group-hover:scale-110 transition-transform" />

        {/* Text for desktop, icon-only / compact for mobile */}
        <span className="hidden sm:inline font-bold tracking-tight">
          {lang === "bn" ? "হোয়াটসঅ্যাপে চ্যাট করুন" : "Chat on WhatsApp"}
        </span>
      </button>
    </div>
  );
}
