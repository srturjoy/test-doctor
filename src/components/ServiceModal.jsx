import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Calendar,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight,
  Maximize2
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useImageModal } from "../context/ImageModalContext";
import ServiceVisualMetaphor from "./ServiceVisualMetaphor";
import Button3D from "./ui/Button3D";
import { openWhatsApp } from "../utils/whatsapp";

export default function ServiceModal({ service, isOpen, onClose }) {
  const { lang } = useLanguage();
  const { openImage } = useImageModal();
  const isClosedByPopRef = useRef(false);
  const historyPushedRef = useRef(false);

  // Close on Escape, Backspace, or Browser/Mobile Back without leaving the site
  useEffect(() => {
    if (!isOpen) return;

    isClosedByPopRef.current = false;
    historyPushedRef.current = true;
    window.history.pushState({ serviceModalOpen: true }, "");

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
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);

      if (!isClosedByPopRef.current && historyPushedRef.current) {
        if (window.history.state && window.history.state.serviceModalOpen) {
          window.history.back();
        }
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const serviceTitle = service.title?.[lang] || service.title?.en || "";
  const categoryTitle = service.category?.[lang] || service.category?.en || "";
  const oneLiner = service.oneLiner?.[lang] || service.oneLiner?.en || "";
  const fullDesc = service.description?.[lang] || service.description?.en || "";
  const detailsList = service.details?.[lang] || service.details?.en || [];
  const whoForList = service.whoIsItFor?.[lang] || service.whoIsItFor?.en || [];
  const approach = service.therapeuticApproach?.[lang] || service.therapeuticApproach?.en || "";

  const handleBookViaWhatsApp = () => {
    const message = lang === "bn"
      ? `আসসালামু আলাইকুম, আমি মাইন্ডসেট-এর "${serviceTitle}" সেবাটির ব্যাপারে বিস্তারিত জানতে ও সেশন বুক করতে আগ্রহী।`
      : `Hello MINDSET, I am interested in scheduling a consultation for "${serviceTitle}".`;
    openWhatsApp(message);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0B1020] rounded-3xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9)] border border-purple-500/30 text-white overflow-hidden my-8 transform transition-all animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================= */}
        {/* MODAL HEADER WITH 3D METAPHOR BANNER                    */}
        {/* ======================================================= */}
        <div className="relative bg-gradient-to-b from-[#070B18] via-[#11182D] to-[#0B1020] p-6 sm:p-8 text-white border-b border-white/10 overflow-hidden">
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold mb-3 tracking-wide backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{categoryTitle}</span>
          </div>

          <h2
            id="service-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
          >
            {serviceTitle}
          </h2>

          <p className="text-sm text-indigo-200/90 font-light mt-1 max-w-lg leading-relaxed">
            {oneLiner}
          </p>

          {/* Embedded 3D Visual Metaphor */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <ServiceVisualMetaphor
              type={service.metaphorType || "anxiety"}
              className="w-full h-28"
              isHovered={true}
            />
          </div>
        </div>

        {/* ======================================================= */}
        {/* MODAL BODY                                              */}
        {/* ======================================================= */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-slate-200">
          
          {/* Full description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-1.5 font-mono">
              {lang === "bn" ? "ক্লিনিক্যাল লক্ষ্য ও ওভারভিউ" : "Clinical Overview"}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {fullDesc}
            </p>
          </div>

          {/* Service Image Gallery Box */}
          {service.image && (
            <div
              onClick={() =>
                openImage({
                  src: service.image,
                  alt: serviceTitle,
                  title: serviceTitle,
                  subtitle: oneLiner || categoryTitle,
                  category: categoryTitle,
                })
              }
              className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-purple-500/30 bg-[#070B18] cursor-zoom-in group shadow-lg"
              title={lang === "bn" ? "ছবি বড় করে দেখতে ক্লিক করুন" : "Click to view full image"}
            >
              <img
                src={service.image}
                alt={serviceTitle}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo.png";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                <span className="font-semibold text-purple-200 truncate">{serviceTitle}</span>
                <span className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-md bg-purple-900/80 border border-purple-400/40 text-[11px] text-amber-300 font-mono">
                  <Maximize2 className="w-3 h-3" />
                  <span>{lang === "bn" ? "বড় করুন" : "Zoom"}</span>
                </span>
              </div>
            </div>
          )}

          {/* What We Address (Details) */}
          {detailsList.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                {lang === "bn" ? "থেরাপিউটিক মূল উপাদানসমূহ" : "Core Therapeutic Elements"}
              </h3>
              <ul className="space-y-2.5">
                {detailsList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Who is this for? */}
          {whoForList.length > 0 && (
            <div className="p-4 rounded-2xl bg-purple-900/20 border border-purple-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-purple-200 font-bold text-xs sm:text-sm">
                <Users className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{lang === "bn" ? "যাঁদের জন্য এই সেবাটি বিশেষ উপযোগী:" : "Who is this service specifically for?"}</span>
              </div>
              <ul className="space-y-2">
                {whoForList.map((who, idx) => (
                  <li key={idx} className="text-xs text-indigo-200/90 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                    <span>{who}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Therapeutic Approach / Modalities */}
          {approach && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">
                  {lang === "bn" ? "প্রযুক্ত থেরাপিউটিক ফ্রেমওয়ার্ক: " : "Applied Modality: "}
                </strong>
                <span>{approach}</span>
              </div>
            </div>
          )}

        </div>

        {/* ======================================================= */}
        {/* MODAL FOOTER ACTIONS                                    */}
        {/* ======================================================= */}
        <div className="p-4 sm:p-6 bg-[#0B1020] border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-medium text-center sm:text-left">
            {lang === "bn" ? "১০০% গোপনীয় ও লাইসেন্সপ্রাপ্ত সেবা" : "100% Confidential & Clinically Monitored"}
          </div>

          <div className="flex items-center justify-center gap-2.5">
            <Button3D
              onClick={handleBookViaWhatsApp}
              variant="emerald"
              size="sm"
              icon={MessageCircle}
            >
              {lang === "bn" ? "হোয়াটসঅ্যাপ বার্তা" : "WhatsApp"}
            </Button3D>

            <Button3D
              to="/appointment"
              variant="primary"
              size="sm"
              icon={Calendar}
            >
              {lang === "bn" ? "অ্যাপয়েন্টমেন্ট নিন" : "Book Session"}
            </Button3D>
          </div>
        </div>
      </div>
    </div>
  );
}
