import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  HeartHandshake
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { doctorsData } from "../data/doctors";
import DoctorCard from "../components/DoctorCard";
import DoctorModal from "../components/DoctorModal";
import SEO from "../components/SEO";
import Button3D from "../components/ui/Button3D";
import { openWhatsApp } from "../utils/whatsapp";

export default function Specialists() {
  const { lang } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="space-y-12 sm:space-y-16 lg:space-y-20 pb-16">
      <SEO
        title="Meet Our Specialists | MINDSET Psychotherapy & Counseling Center"
        description="Experienced professionals, here to listen. Meet our licensed clinical psychologists, art therapists, and addiction professionals in Dhaka."
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION: EDITORIAL 3D ATMOSPHERE                  */}
      {/* Heading: Meet Our Specialists                             */}
      {/* Short text: Experienced professionals, here to listen.    */}
      {/* ========================================================= */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 bg-gradient-to-b from-[#0B1020] via-[#11182D] to-[#0B1020] text-white overflow-hidden border-b border-white/10">
        {/* Soft atmospheric radial gradients */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-indigo-200 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>MINDSET PSYCHOTHERAPY &amp; COUNSELING CENTER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {lang === "bn" ? "আমাদের বিশেষজ্ঞবৃন্দ" : "Meet Our Specialists"}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            {lang === "bn"
              ? "অভিজ্ঞ পেশাদার, আপনার পাশে শুনবার জন্য।"
              : "Experienced professionals, here to listen."}
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Button3D
              to="/appointment"
              variant="primary"
              size="md"
              icon={Calendar}
            >
              {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
            </Button3D>

            <Button3D
              onClick={() =>
                openWhatsApp("Hello MINDSET, I would like to consult with a specialist.")
              }
              variant="emerald"
              size="md"
              icon={MessageCircle}
            >
              {lang === "bn" ? "হোয়াটসঅ্যাপে যোগাযোগ" : "WhatsApp Inquiry"}
            </Button3D>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PREMIUM 3D SPECIALISTS DIRECTORY                       */}
      {/* Displays all 4 Specialists on 3D tilt cards with neural   */}
      {/* connection animations & soft glow.                        */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-orange-400 tracking-wider">
              {lang === "bn" ? "ক্লিনিক্যাল টিম" : "Clinical Directory"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
              {lang === "bn" ? "নিবন্ধিত ক্লিনিক্যাল প্যানেল" : "Resident Clinical Practitioners"}
            </h2>
          </div>
        </div>

        {/* 5 Specialists Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {doctorsData.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

      </section>

      {/* ========================================================= */}
      {/* 3. CLINICAL ETHICS & PROFESSIONAL STANDARDS STRIP        */}
      {/* Replaces hospital tone with ethical privacy assurance    */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1020]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-500/20 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)] text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-purple-500/30 text-purple-300 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "স্বীকৃত প্রাতিষ্ঠানিক ব্যাকগ্রাউন্ড" : "Recognized Academic Foundation"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "সকল বিশেষজ্ঞ ঢাকা বিশ্ববিদ্যালয় থেকে উচ্চতর ডিগ্রিধারী এবং হাসপাতাল-ভিত্তিক ক্লিনিক্যাল প্রশিক্ষণপ্রাপ্ত।"
                    : "All specialists hold recognized university degrees in Psychology with intensive hospital-based clinical training."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-purple-500/30 text-indigo-300 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "সম্পূর্ণ চিকিৎসা গোপনীয়তা" : "Strict Clinical Confidentiality"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "প্রতিটি সেশন এবং তথ্য আন্তর্জাতিক মানসিক স্বাস্থ্য নীতি অনুসারে শতভাগ সুরক্ষিত।"
                    : "Every consultation is strictly confidential and adheres to standard international psychological ethics."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#11182D] to-[#25204A] border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">
                  {lang === "bn" ? "ব্যক্তিগতকৃত চিকিৎসা পরিকল্পনা" : "Tailored Therapeutic Plan"}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === "bn"
                    ? "কোনো সাধারণ টেমপ্লেট নয়; আপনার অনন্য মানসিক প্রয়োজন অনুযায়ী থেরাপির সমন্বয়।"
                    : "Customized therapeutic engagements (CBT, Art Therapy, TA, NLP) aligned with your personal reality."}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DIRECT APPOINTMENT CTA STRIP                           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#10172D] to-indigo-950 text-white p-7 sm:p-10 lg:p-12 text-center relative overflow-hidden border border-white/10 shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lang === "bn" ? "সঠিক বিশেষজ্ঞের সাথে কথা বলুন" : "Begin with the Right Specialist"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === "bn"
                ? "আমাদের টিম আপনাকে সবচেয়ে উপযুক্ত বিশেষজ্ঞের সাথে অ্যাপয়েন্টমেন্ট নির্ধারণে সাহায্য করবে।"
                : "Our care coordinators can assist in matching you with the practitioner most suited to your therapeutic goals."}
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button3D
                to="/appointment"
                variant="primary"
                size="md"
                icon={Calendar}
              >
                {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
              </Button3D>

              <Button3D
                onClick={() =>
                  openWhatsApp("Hello MINDSET, I would like guidance choosing the right specialist.")
                }
                variant="ghost"
                size="md"
                icon={MessageCircle}
              >
                {lang === "bn" ? "পরামর্শ সহায়তা" : "Inquire via WhatsApp"}
              </Button3D>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
