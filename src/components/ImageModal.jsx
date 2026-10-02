import React, { useEffect, useRef } from "react";
import { X, Maximize, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

/**
 * ImageModal - Premium Full-Screen Image Lightbox
 * Features:
 * - Maintains aspect ratio with zero distortion (object-contain)
 * - Deep dark atmospheric backdrop with 3D psychological radial glows
 * - Subtle glassmorphism and 3D container borders
 * - Accessible close button (large touch target for mobile)
 * - ESC key support with immediate event stop to prevent bubbling
 * - Outside click to close (clicking image does not close)
 * - Body scroll lock preservation
 */
export default function ImageModal({ isOpen, imageData, onClose }) {
  const { lang } = useLanguage();
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      isClosingRef.current = false;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Handle ESC and Backspace keys during capturing phase to prioritize ImageModal
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopImmediatePropagation();
          handleClose();
        } else if (e.key === "Backspace") {
          const target = e.target;
          const isInput =
            target &&
            (target.tagName === "INPUT" ||
              target.tagName === "TEXTAREA" ||
              target.isContentEditable);
          if (!isInput) {
            e.preventDefault();
            e.stopImmediatePropagation();
            handleClose();
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown, { capture: true });

      return () => {
        document.body.style.overflow = prevOverflow || "";
        window.removeEventListener("keydown", handleKeyDown, { capture: true });
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    onClose();
  };

  if (!isOpen && !imageData) return null;

  const src = imageData?.src || "";
  const alt = imageData?.alt || "MINDSET Image";
  const title = imageData?.title || "";
  const subtitle = imageData?.subtitle || "";
  const category = imageData?.category || "";

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-5 md:p-8 select-none overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={title || alt}
          onClick={handleClose}
        >
          {/* ======================================================= */}
          {/* 1. DARK ATMOSPHERIC BACKDROP WITH AMBIENT 3D GLOWS      */}
          {/* ======================================================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#04060F]/92 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          >
            {/* Soft Ambient Radial Lights */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[540px] sm:h-[540px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* ======================================================= */}
          {/* 2. TOP ACTIONS BAR: LARGE CLOSE BUTTON (MOBILE TOUCH)   */}
          {/* ======================================================= */}
          <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[95] flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="p-3 sm:p-3.5 rounded-full bg-[#0E1528]/90 hover:bg-[#1E1B4B] active:scale-95 text-white/90 hover:text-white border border-purple-400/30 hover:border-purple-400/60 shadow-[0_8px_24px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all cursor-pointer flex items-center gap-1.5 focus:outline-hidden focus:ring-2 focus:ring-purple-400 min-w-[48px] min-h-[48px] justify-center"
              aria-label={lang === "bn" ? "ছবি বন্ধ করুন (ESC)" : "Close image viewer (ESC)"}
              title="Close (ESC)"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline text-xs font-semibold pr-1">
                {lang === "bn" ? "বন্ধ করুন" : "Close"}
              </span>
            </button>
          </div>

          {/* ======================================================= */}
          {/* 3. CENTERED IMAGE LIGHTBOX CONTAINER                    */}
          {/* ======================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[85] max-w-[96vw] max-h-[88vh] sm:max-w-[85vw] sm:max-h-[85vh] lg:max-w-3xl xl:max-w-4xl flex flex-col items-center justify-center my-auto"
          >
            {/* 3D Glass Container around Image */}
            <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/12 via-white/[0.04] to-purple-500/15 backdrop-blur-2xl border border-purple-500/30 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(91,75,219,0.22)] flex flex-col items-center overflow-hidden">
              
              {/* Inner Image Canvas */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#070B18] flex items-center justify-center max-h-[68vh] sm:max-h-[72vh] w-full">
                <img
                  src={src}
                  alt={alt}
                  className="w-auto h-auto max-w-full max-h-[68vh] sm:max-h-[72vh] object-contain select-none transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/logo.png";
                  }}
                />
              </div>

              {/* Caption Strip: Title, Subtitle, Category */}
              {(title || subtitle || category) && (
                <div className="w-full px-4 py-2.5 sm:px-5 sm:py-3 mt-2 rounded-xl bg-[#0B1020]/95 border border-purple-500/25 flex items-center justify-between gap-3 text-left">
                  <div className="min-w-0 flex-1">
                    {category && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold block mb-0.5">
                        {category}
                      </span>
                    )}
                    {title && (
                      <h4 className="text-sm sm:text-base font-bold text-white truncate">
                        {title}
                      </h4>
                    )}
                    {subtitle && (
                      <p className="text-xs text-slate-300 truncate">
                        {subtitle}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-[11px] text-amber-300/90 font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span className="hidden sm:inline">MINDSET</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
