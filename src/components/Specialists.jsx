import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Users, Sparkles, ShieldCheck } from "lucide-react";
import DoctorCard from "./DoctorCard";
import DoctorModal from "./DoctorModal";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { doctorsData } from "../data/doctors";

export default function Specialists({ selectedDoctor, onSelectDoctor, onCloseModal }) {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCards, setVisibleCards] = useState(3);
  
  // Touch gesture tracking for mobile swipe
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const carouselContainerRef = useRef(null);

  const totalDoctors = doctorsData.length;

  // Responsive visible cards count
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, totalDoctors - visibleCards);

  // Next and Prev handlers
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay timer with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500); // smooth, unhurried pace

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  return (
    <section
      id="specialists"
      className="py-20 lg:py-28 bg-slate-50/50 relative overflow-hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Our Specialists Carousel Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="w-3.5 h-3.5 text-indigo-700" />
              <span>{siteContent.specialists.badge[lang]}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {siteContent.specialists.heading[lang]}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">
              {siteContent.specialists.subtext[lang]}
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              id="spec-prev-btn"
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-indigo-950 hover:bg-slate-100 shadow-xs transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 cursor-pointer"
              aria-label="Previous Specialist"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              id="spec-next-btn"
              onClick={handleNext}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-indigo-950 hover:bg-slate-100 shadow-xs transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-600 cursor-pointer"
              aria-label="Next Specialist"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div
          ref={carouselContainerRef}
          className="relative overflow-hidden -mx-2 sm:-mx-3 px-2 sm:px-3 py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Inner sliding track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}
          >
            {doctorsData.map((doc) => (
              <div
                key={doc.id}
                className="shrink-0 px-2 sm:px-3 transition-opacity duration-300"
                style={{
                  width: `${100 / visibleCards}%`,
                }}
              >
                <DoctorCard
                  doctor={doc}
                  onViewProfile={onSelectDoctor}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Indicators */}
        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-slate-400 italic">
            {siteContent.specialists.carouselHint[lang]}
          </p>

          <div className="flex items-center gap-1.5" role="tablist" aria-label="Specialists Carousel Dots">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 bg-indigo-950"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-selected={currentIndex === idx}
                role="tab"
              />
            ))}
          </div>
        </div>

      </div>

      {/* Doctor Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={Boolean(selectedDoctor)}
        onClose={onCloseModal}
      />
    </section>
  );
}
