import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Users,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Send,
  MessageCircle,
  MapPin,
  Heart,
  Video,
  Building,
  ShieldCheck,
  ArrowDown
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";
import { doctorsData } from "../data/doctors";
import { servicesData } from "../data/services";
import SEO from "../components/SEO";
import BreathingSphere3D from "../components/BreathingSphere3D";
import Button3D from "../components/ui/Button3D";
import { trackAppointmentStart, trackAppointmentSubmit } from "../tracking/index";
import {
  createAppointmentMessage,
  openWhatsApp,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  SECONDARY_PHONE_DISPLAY,
  SECONDARY_PHONE_TEL,
  CHAMBER_ADDRESS_EN,
  CHAMBER_ADDRESS_BN,
  VISITING_HOURS_EN,
  VISITING_HOURS_BN
} from "../utils/whatsapp";

export default function Appointment() {
  const { lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    specialist: "",
    message: "",
    consultationType: "in-person"
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const timeSlots = [
    { id: "slot-1", label: { en: "03:00 PM – 04:00 PM", bn: "বিকাল ০৩:০০ - ০৪:০০" } },
    { id: "slot-2", label: { en: "04:00 PM – 05:00 PM", bn: "বিকাল ০৪:০০ - ০৫:০০" } },
    { id: "slot-3", label: { en: "05:00 PM – 06:00 PM", bn: "বিকাল ০৫:০০ - ০৬:০০" } },
    { id: "slot-4", label: { en: "06:00 PM – 07:00 PM", bn: "সন্ধ্যা ০৬:০০ - ০৭:০০" } },
    { id: "slot-5", label: { en: "07:00 PM – 08:00 PM", bn: "সন্ধ্যা ০৭:০০ - ০৮:০০" } },
    { id: "slot-6", label: { en: "08:00 PM – 09:00 PM", bn: "রাত ০৮:০০ - ০৯:০০" } },
    { id: "slot-7", label: { en: "09:00 PM – 10:00 PM", bn: "রাত ০৯:০০ - ১০:০০" } }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = lang === "bn" ? "অনুগ্রহ করে আপনার পুরো নাম লিখুন।" : "Please enter your name.";
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = lang === "bn" ? "অনুগ্রহ করে সঠিক মোবাইল নম্বর প্রদান করুন।" : "Please provide a valid phone number.";
    }

    if (!formData.date) {
      newErrors.date = lang === "bn" ? "পছন্দের তারিখ নির্বাচন করুন।" : "Please select your preferred date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const chosenType =
      formData.consultationType === "online"
        ? (lang === "bn" ? "অনলাইন ভিডিও কনসালটেশন" : "Online Video Consultation")
        : (lang === "bn" ? "চেম্বার কনসালটেশন (গ্রীন রোড, ঢাকা)" : "In-Person Chamber Consultation (Green Road)");

    const submission = {
      ...formData,
      consultationType: chosenType
    };

    setSubmittedData(submission);
    setIsSuccess(true);

    // Silent marketing conversion trigger (CRITICAL: Private message is NEVER passed)
    try {
      trackAppointmentSubmit({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        specialist: formData.specialist,
        service: formData.service,
        consultationType: chosenType,
      });
    } catch {
      // Non-blocking
    }

    const formattedMsg = createAppointmentMessage(submission, lang);

    setTimeout(() => {
      openWhatsApp(formattedMsg);
    }, 600);
  };

  const handleDirectWhatsApp = () => {
    const directMsg =
      lang === "bn"
        ? "আসসালামু আলাইকুম, মাইন্ডসেট-এ অ্যাপয়েন্টমেন্ট বুক করার জন্য সরাসরি যোগাযোগ করছি।"
        : "Hello MINDSET, I would like to schedule an appointment.";
    openWhatsApp(directMsg);
  };

  const scrollToForm = () => {
    const element = document.getElementById("appointment-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      <SEO
        title="Take the First Step — Request an Appointment | MINDSET Center Dhaka"
        description="Whenever you're ready, we're here to listen. Request an in-person or online psychotherapy appointment with certified psychologists in Dhaka."
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION: PREMIUM, CALM ATMOSPHERE                 */}
      {/* Background: Deep navy + soft purple + subtle particles    */}
      {/* Visual: Calm 3D Breathing Sphere (expands & contracts)    */}
      {/* Heading: Take the First Step                              */}
      {/* Short text: Whenever you’re ready, we’re here to listen.  */}
      {/* ========================================================= */}
      <section className="relative pt-6 sm:pt-10 pb-6 sm:pb-8 bg-gradient-to-b from-[#070B18] via-[#0B1020] to-[#11182D] text-white overflow-hidden">
        
        {/* Ambient atmospheric radial glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -right-16 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-16 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Editorial Hero Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-purple-500/30 text-purple-200 text-xs font-mono font-bold tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>MINDSET PSYCHOTHERAPY &amp; COUNSELING</span>
              </div>

              {/* Exact requested Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {lang === "bn" ? "প্রথম পদক্ষেপটি নিন" : "Take the First Step"}
              </h1>

              {/* Exact requested Short Text */}
              <p className="text-base sm:text-xl lg:text-2xl text-slate-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {lang === "bn"
                  ? "আপনি যখনই প্রস্তুত, আমরা শুনতে প্রস্তুত।"
                  : "Whenever you’re ready, we’re here to listen."}
              </p>

              {/* Call-to-actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Button3D
                  onClick={scrollToForm}
                  variant="primary"
                  size="md"
                  icon={ArrowDown}
                  className="w-full sm:w-auto"
                >
                  {lang === "bn" ? "অ্যাপয়েন্টমেন্ট ফর্ম পূরণ করুন" : "Fill Appointment Form"}
                </Button3D>

                {/* Secondary WhatsApp Appointment Option in Hero */}
                <Button3D
                  onClick={handleDirectWhatsApp}
                  variant="emerald"
                  size="md"
                  icon={MessageCircle}
                  className="w-full sm:w-auto"
                >
                  {lang === "bn" ? "হোয়াটসঅ্যাপে যোগাযোগ" : "Book via WhatsApp"}
                </Button3D>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-purple-400" />
                  <span>{lang === "bn" ? "নিরাপদ ও সহমর্মী পরিবেশ" : "Empathetic & Safe Space"}</span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{lang === "bn" ? "চেম্বার ও অনলাইন সেশন" : "In-Person & Online"}</span>
                </div>
              </div>
            </div>

            {/* Right: Calm 3D Breathing Sphere Visual (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <BreathingSphere3D
                className="w-full max-w-md mx-auto"
                height="h-[200px] sm:h-[240px] lg:h-[280px]"
                showGuidance={true}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. ELEGANT APPOINTMENT FORM SECTION                       */}
      {/* Fields:                                                   */}
      {/* - Name                                                    */}
      {/* - Phone                                                   */}
      {/* - Email                                                   */}
      {/* - Preferred Date                                          */}
      {/* - Preferred Time                                          */}
      {/* - Preferred Specialist                                    */}
      {/* - Message                                                 */}
      {/* Primary button: Request Appointment                       */}
      {/* Privacy reassurance: Your information is handled with care.*/}
      {/* Secondary WhatsApp appointment option                     */}
      {/* ========================================================= */}
      <section id="appointment-form-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Main Appointment Form (8 cols) */}
          <div className="lg:col-span-8 bg-white/[0.04] backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-purple-500/20 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] space-y-8 text-white">
            
            {/* Form Header */}
            <div className="space-y-2 border-b border-white/10 pb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lang === "bn" ? "পরামর্শ সেশনের জন্য অনুরোধ" : "Request a Consultation Session"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-normal">
                {lang === "bn"
                  ? "নিচের সাধারণ তথ্যগুলো পূরণ করে আপনার পছন্দের সময় জানান। আমরা দ্রুত আপনার সাথে যোগাযোগ করব।"
                  : "Please share your preferred details below. Our care team will confirm your confidential session."}
              </p>
            </div>

            {/* Success Message Banner */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 space-y-2"
              >
                <div className="flex items-center gap-2.5 font-bold text-base text-emerald-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>
                    {lang === "bn"
                      ? "আপনার অনুরোধ প্রস্তুত হয়েছে!"
                      : "Your Appointment Request is Ready!"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                  {lang === "bn"
                    ? "মাইন্ডসেট-এর অফিসিয়াল হোয়াটসঅ্যাপে আপনার অনুরোধটি সাজিয়ে পাঠানো হচ্ছে। চূড়ান্ত নিশ্চয়তার জন্য হোয়াটসঅ্যাপে 'Send' চাপুন।"
                    : "Opening official MINDSET WhatsApp with your pre-formatted appointment details. Simply tap Send to confirm."}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              
              {/* Consultation Format Selector (In-Person / Online) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-purple-200">
                  {lang === "bn" ? "সেশনের ধরন" : "Session Format"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      formData.consultationType === "in-person"
                        ? "border-orange-500 bg-orange-500/20 text-white font-bold shadow-md shadow-orange-500/10"
                        : "border-purple-500/20 bg-white/[0.02] hover:bg-white/[0.05] text-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="consultationType"
                      value="in-person"
                      checked={formData.consultationType === "in-person"}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500 bg-slate-900 border-slate-700"
                    />
                    <div className="flex items-center gap-2.5">
                      <Building className="w-4 h-4 text-orange-400 shrink-0" />
                      <div>
                        <span className="text-xs block">
                          {lang === "bn" ? "চেম্বার ভিজিট (গ্রীন রোড)" : "In-Person Chamber Visit"}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          East Panthapath, Dhaka
                        </span>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      formData.consultationType === "online"
                        ? "border-purple-400 bg-purple-600/20 text-white font-bold shadow-md shadow-purple-500/10"
                        : "border-purple-500/20 bg-white/[0.02] hover:bg-white/[0.05] text-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="consultationType"
                      value="online"
                      checked={formData.consultationType === "online"}
                      onChange={handleChange}
                      className="text-purple-400 focus:ring-purple-500 bg-slate-900 border-slate-700"
                    />
                    <div className="flex items-center gap-2.5">
                      <Video className="w-4 h-4 text-purple-400 shrink-0" />
                      <div>
                        <span className="text-xs block">
                          {lang === "bn" ? "অনলাইন ভিডিও সেশন" : "Online Video Session"}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          Google Meet / Zoom
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* 1. Name & 2. Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Field: Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-name"
                    className="block text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-orange-400" />
                    <span>{lang === "bn" ? "আপনার নাম" : "Name"}</span>
                    <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={lang === "bn" ? "উদা: রাহিম আহমেদ" : "e.g. John Doe"}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-orange-500 ${
                      errors.name ? "border-red-400 bg-red-950/30 text-white" : "border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 hover:border-purple-400/50"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Field: Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-400" />
                    <span>{lang === "bn" ? "ফোন নম্বর" : "Phone"}</span>
                    <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={lang === "bn" ? "০১XXXXXXXXX" : "+880 1XXXXXXXXX"}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-orange-500 ${
                      errors.phone ? "border-red-400 bg-red-950/30 text-white" : "border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 hover:border-purple-400/50"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* 3. Email & 4. Preferred Specialist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Field: Email */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-email"
                    className="block text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-orange-400" />
                    <span>{lang === "bn" ? "ইমেইল" : "Email"}</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 hover:border-purple-400/50 text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Field: Preferred Specialist */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-specialist"
                    className="block text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5 text-orange-400" />
                    <span>{lang === "bn" ? "পছন্দের বিশেষজ্ঞ" : "Preferred Specialist"}</span>
                  </label>
                  <select
                    id="form-specialist"
                    name="specialist"
                    value={formData.specialist}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 bg-[#070B18] text-white hover:border-purple-400/50 text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="" className="bg-[#070B18] text-white">
                      {lang === "bn" ? "যেকোনো উপলব্ধ বিশেষজ্ঞ" : "Any Available Specialist"}
                    </option>
                    {doctorsData.map((doc) => (
                      <option key={doc.id} value={doc.name[lang]} className="bg-[#070B18] text-white">
                        {doc.name[lang]} — {doc.designation[lang]}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* 5. Preferred Date & 6. Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Field: Preferred Date */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-date"
                    className="block text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-orange-400" />
                    <span>{lang === "bn" ? "পছন্দের তারিখ" : "Preferred Date"}</span>
                    <span className="text-orange-400">*</span>
                  </label>
                  <input
                    id="form-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer ${
                      errors.date ? "border-red-400 bg-red-950/30 text-white" : "border-purple-500/30 bg-[#070B18]/80 text-white hover:border-purple-400/50"
                    }`}
                  />
                  {errors.date && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.date}</span>
                    </p>
                  )}
                </div>

                {/* Field: Preferred Time */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="form-time"
                    className="block text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{lang === "bn" ? "পছন্দের সময়" : "Preferred Time"}</span>
                  </label>
                  <select
                    id="form-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-purple-500/30 bg-[#070B18] text-white hover:border-purple-400/50 text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="" className="bg-[#070B18] text-white">
                      {lang === "bn" ? "যেকোনো সময় (বিকাল ৩:০০ - রাত ১০:০০)" : "Any Time (03:00 PM – 10:00 PM)"}
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot.id} value={slot.label[lang]} className="bg-[#070B18] text-white">
                        {slot.label[lang]}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* 7. Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="form-message"
                  className="block text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-orange-400" />
                  <span>{lang === "bn" ? "বার্তা বা বিশেষ উদ্বেগ (ঐচ্ছিক)" : "Message"}</span>
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    lang === "bn"
                      ? "আপনার মানসিক অবস্থা বা যে বিষয়ে কথা বলতে চান তা সংক্ষেপে লিখতে পারেন..."
                      : "Briefly describe what you would like support with..."
                  }
                  className="w-full px-4 py-3 rounded-xl border border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 hover:border-purple-400/50 text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Action Buttons: Primary 'Request Appointment' + Secondary WhatsApp */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                
                {/* Primary Button */}
                <button
                  type="submit"
                  className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === "bn" ? "অ্যাপয়েন্টমেন্টের অনুরোধ পাঠান" : "Request Appointment"}</span>
                </button>

                {/* Secondary WhatsApp Appointment Option */}
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="py-4 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{lang === "bn" ? "হোয়াটসঅ্যাপে বুকিং" : "Book via WhatsApp"}</span>
                </button>

              </div>

              {/* Privacy Reassurance (Small & Grounded, no unsupported legal claims) */}
              <div className="pt-1 text-center">
                <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>
                    {lang === "bn"
                      ? "আপনার তথ্য অত্যন্ত যত্ন ও সুরক্ষার সাথে সংরক্ষণ করা হয়।"
                      : "Your information is handled with care."}
                  </span>
                </p>
              </div>

            </form>
          </div>

          {/* Right Sidebar: Direct Contact, Visiting Hours, Chamber Address (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* WhatsApp Direct Appointment Box */}
            <div className="bg-emerald-950/40 backdrop-blur-md rounded-3xl p-6 border border-emerald-500/30 space-y-4 shadow-lg">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-emerald-200">
                  {lang === "bn" ? "সরাসরি হোয়াটসঅ্যাপে অ্যাপয়েন্টমেন্ট" : "WhatsApp Appointment"}
                </h3>
                <p className="text-xs text-emerald-300/80 mt-1 leading-relaxed">
                  {lang === "bn"
                    ? "ফর্ম পূরণ ছাড়াও আমাদের অ্যাপয়েন্টমেন্ট কো-অর্ডিনেটরের সাথে তাৎক্ষণিক চ্যাট করতে পারেন।"
                    : "Prefer to chat? Connect directly with our appointment coordinator."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === "bn" ? "এখনই হোয়াটসঅ্যাপে লিখুন" : "Chat on WhatsApp"}</span>
              </button>
            </div>

            {/* Direct Phone Serials */}
            <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl p-6 border border-purple-500/20 shadow-lg space-y-4 text-white">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span>{lang === "bn" ? "সিরিয়াল ও তথ্য হটলাইন" : "Serial & Information Lines"}</span>
              </h3>

              <div className="space-y-3">
                <a
                  href={`tel:${PRIMARY_PHONE_TEL}`}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-purple-900/30 border border-purple-500/20 flex items-center justify-between gap-3 text-xs transition-colors block"
                >
                  <div>
                    <span className="text-[10px] text-purple-300 uppercase font-bold block">
                      {lang === "bn" ? "প্রধান সিরিয়াল" : "Primary Serial"}
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      {PRIMARY_PHONE_DISPLAY}
                    </span>
                  </div>
                  <Phone className="w-4 h-4 text-emerald-400" />
                </a>

                <a
                  href={`tel:${SECONDARY_PHONE_TEL}`}
                  className="p-3 rounded-xl bg-white/[0.03] hover:bg-purple-900/30 border border-purple-500/20 flex items-center justify-between gap-3 text-xs transition-colors block"
                >
                  <div>
                    <span className="text-[10px] text-purple-300 uppercase font-bold block">
                      {lang === "bn" ? "বিকল্প সিরিয়াল" : "Secondary Serial"}
                    </span>
                    <span className="font-mono font-bold text-white text-sm">
                      {SECONDARY_PHONE_DISPLAY}
                    </span>
                  </div>
                  <Phone className="w-4 h-4 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Chamber & Visiting Hours */}
            <div className="bg-white/[0.04] backdrop-blur-md rounded-3xl p-6 border border-purple-500/20 shadow-lg space-y-4 text-white">
              <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-400" />
                <span>{lang === "bn" ? "ভিজিটিং ও কনসালটেশন সময়" : "Visiting & Chamber Hours"}</span>
              </h3>

              <div className="text-xs text-slate-300 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-slate-400">{lang === "bn" ? "প্রতিদিন" : "Every Day"}</span>
                  <span className="font-bold text-white">{lang === "bn" ? VISITING_HOURS_BN : VISITING_HOURS_EN}</span>
                </div>
                <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                  <span>{lang === "bn" ? CHAMBER_ADDRESS_BN : CHAMBER_ADDRESS_EN}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
