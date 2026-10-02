import React, { useEffect, useRef } from "react";
import { X, Phone, Calendar, MapPin, GraduationCap, Award, CheckCircle2, ShieldCheck, Maximize2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";
import { useImageModal } from "../context/ImageModalContext";
import { useDoctorPhotos } from "../context/DoctorPhotosContext";
import { siteContent } from "../data/siteContent";
import { openWhatsApp, CHAMBER_ADDRESS_EN, CHAMBER_ADDRESS_BN } from "../utils/whatsapp";

export default function DoctorModal({ doctor, isOpen, onClose }) {
  const { lang } = useLanguage();
  const { openImage } = useImageModal();
  const { getDoctorPhoto } = useDoctorPhotos();
  const isClosedByPopRef = useRef(false);
  const historyPushedRef = useRef(false);

  // Handle Browser Back, Mobile Swipe-back, Backspace key, Escape key and body scroll locking
  // Prevents user from accidentally exiting the website when closing doctor details!
  useEffect(() => {
    if (!isOpen) return;

    isClosedByPopRef.current = false;
    historyPushedRef.current = true;

    // Push state into browser history so pressing browser Back or mobile back swipe closes the modal instead of leaving the website
    window.history.pushState({ doctorModalOpen: true }, "");

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
        // Prevent Backspace from navigating away from the website
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

      // If closed through UI (X button, backdrop, or appointment CTA) and not by popstate, unwind the pushed history state
      if (!isClosedByPopRef.current && historyPushedRef.current) {
        if (window.history.state && window.history.state.doctorModalOpen) {
          window.history.back();
        }
      }
    };
  }, [isOpen, onClose]);

  const handleBookSpecialist = () => {
    if (!doctor) return;
    const docName = doctor.name?.[lang] || doctor.name?.en || "";
    const message = lang === "bn"
      ? `আসসালামু আলাইকুম, আমি মাইন্ডসেট বিশেষজ্ঞ "${docName}" এর সাথে একটি অ্যাপয়েন্টমেন্ট বুক করতে আগ্রহী।`
      : `Hello MINDSET, I would like to book an appointment with specialist "${docName}".`;
    openWhatsApp(message);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && doctor && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="doctor-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-3xl bg-[#0B1020] rounded-3xl shadow-[0_24px_64px_-12px_rgba(0,0,0,0.9)] z-10 max-h-[90vh] overflow-y-auto border border-purple-500/30 text-white"
          >
            {/* Sticky Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-[#11182D]/90 hover:bg-[#25204A] text-slate-300 hover:text-white shadow-md border border-white/20 transition-colors focus:outline-hidden focus:ring-2 focus:ring-purple-500 cursor-pointer"
              aria-label={siteContent.specialists.modal.close[lang]}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Modal Header Grid */}
            <div className="p-5 sm:p-8 bg-gradient-to-br from-[#11182D] via-[#1E1842] to-[#0B1020] text-white relative overflow-hidden border-b border-white/10">
              {/* Subtle background glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center relative z-10 pt-4 sm:pt-0">
                {/* Doctor Large Image */}
                <div className="sm:col-span-4 flex flex-col items-center sm:items-start">
                  <div
                    className="w-44 h-56 sm:w-full sm:aspect-3/4 rounded-2xl overflow-hidden border-2 border-purple-400/40 shadow-xl bg-[#070B18] cursor-zoom-in group relative flex items-center justify-center"
                    onClick={() =>
                      openImage({
                        src: getDoctorPhoto(doctor.id, doctor.image),
                        alt: doctor.name?.[lang] || doctor.name?.en,
                        title: doctor.name?.[lang] || doctor.name?.en,
                        subtitle: doctor.designation?.[lang] || doctor.designation?.en,
                        category: lang === "bn" ? "মাইন্ডসেট সাইকোলজিস্ট" : "MINDSET Specialist",
                      })
                    }
                    title={lang === "bn" ? "ছবি বড় করে দেখতে ক্লিক করুন" : "Click to view full image"}
                  >
                    {/* Ambient backdrop */}
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-30 blur-md scale-110 pointer-events-none"
                      style={{ backgroundImage: `url(${getDoctorPhoto(doctor.id, doctor.image)})` }}
                    />

                    <img
                      src={getDoctorPhoto(doctor.id, doctor.image)}
                      alt={doctor.name?.[lang] || doctor.name?.en}
                      className="relative z-10 w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                      style={{ objectFit: "contain" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/logo.png";
                      }}
                    />
                    <div className="absolute inset-0 z-10 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="p-2 rounded-full bg-purple-600/80 backdrop-blur-md text-white shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Core Titles */}
                <div className="sm:col-span-8 space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    {doctor.title && (
                      <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                        {doctor.title?.[lang] || doctor.title?.en}
                      </span>
                    )}
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold border border-orange-400/30">
                      {doctor.designation?.[lang] || doctor.designation?.en}
                    </span>
                  </div>
                  <h3 id="doctor-modal-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    {doctor.name?.[lang] || doctor.name?.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-indigo-200/90 font-medium">
                    {Array.isArray(doctor.qualifications?.[lang])
                      ? doctor.qualifications[lang].join(" • ")
                      : doctor.qualifications?.[lang] || doctor.qualifications?.en || ""}
                  </p>

                  {/* Direct Phone */}
                  <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
                    <a
                      href={`tel:${doctor.phoneTel || doctor.phone}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs font-mono transition-colors border border-white/10"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>{doctor.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Body Details */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-200">
              
              {/* Bio & Clinical Vision */}
              {doctor.bio && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{lang === "bn" ? "পরিচিতি ও ক্লিনিক্যাল দৃষ্টিভঙ্গি" : "About & Clinical Vision"}</span>
                  </h4>
                  <p className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {doctor.bio?.[lang] || doctor.bio?.en}
                  </p>
                </div>
              )}

              {/* Qualifications & Internships */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-400" />
                  <span>{siteContent.specialists.modal.qualifications[lang]}</span>
                </h4>
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-sm text-slate-200 space-y-2 font-medium">
                  {Array.isArray(doctor.qualifications?.[lang]) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {doctor.qualifications[lang].map((qual, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-semibold text-slate-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{qual}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{doctor.qualifications?.[lang] || doctor.qualifications?.en || ""}</p>
                  )}
                  {doctor.internship && (
                    <p className="text-xs text-indigo-200/80 flex items-center gap-1.5 pt-2 border-t border-white/10">
                      <span className="font-bold text-white">
                        {siteContent.specialists?.modal?.internship?.[lang] || (lang === "bn" ? "ইন্টার্নশিপ" : "Internship")}:
                      </span>
                      <span>
                        {typeof doctor.internship === "object"
                          ? doctor.internship?.[lang] || doctor.internship?.en || ""
                          : doctor.internship}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Specialized Training */}
              {doctor.training && doctor.training[lang] && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span>{siteContent.specialists.modal.training[lang]}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {doctor.training[lang].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Specializations */}
              {doctor.specializations && doctor.specializations[lang] && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{siteContent.specialists.modal.specializations[lang]}</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations[lang].map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-200 font-medium text-xs shadow-2xs"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Chamber Location in Modal */}
              <div className="p-4 rounded-2xl bg-[#11182D]/80 border border-purple-500/30 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white">
                    {siteContent.specialists.modal.chamber[lang]}
                  </p>
                  <p className="text-xs text-indigo-200/80 mt-0.5">
                    {lang === "bn" ? CHAMBER_ADDRESS_BN : CHAMBER_ADDRESS_EN}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-6 bg-[#0B1020] border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-white/20 text-slate-300 hover:bg-white/10 font-semibold text-xs transition-colors cursor-pointer"
              >
                {siteContent.specialists.modal.close[lang]}
              </button>
              <button
                type="button"
                onClick={handleBookSpecialist}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer border border-purple-400/40"
              >
                <Calendar className="w-4 h-4 text-amber-300" />
                <span>{siteContent.specialists.modal.bookWithSpecialist[lang]}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

