import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-full bg-[#11182D]/90 border border-purple-500/30 text-slate-200 shadow-xs backdrop-blur-md shrink-0 ${className}`}
      role="group"
      aria-label="Language Switcher"
    >
      <div className="pl-1.5 pr-0.5 text-purple-300">
        <Globe className="w-3.5 h-3.5" aria-hidden="true" />
      </div>
      <button
        type="button"
        id="btn-lang-bn"
        onClick={() => setLang("bn")}
        className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
          lang === "bn"
            ? "bg-purple-600 text-white shadow-xs font-extrabold"
            : "text-slate-300 hover:text-white hover:bg-white/10"
        }`}
        aria-pressed={lang === "bn"}
        title="বাংলা ভাষা নির্বাচন করুন"
      >
        বাংলা
      </button>
      <button
        type="button"
        id="btn-lang-en"
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer ${
          lang === "en"
            ? "bg-purple-600 text-white shadow-xs font-extrabold"
            : "text-slate-300 hover:text-white hover:bg-white/10"
        }`}
        aria-pressed={lang === "en"}
        title="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
