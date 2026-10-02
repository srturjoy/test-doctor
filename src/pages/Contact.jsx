import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Share2,
  AlertTriangle,
  MessageCircle,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";
import SEO from "../components/SEO";
import MapSection from "../components/MapSection";
import ConnectionNodes3D from "../components/ConnectionNodes3D";
import Button3D from "../components/ui/Button3D";
import { trackContact } from "../tracking/index";
import {
  openWhatsApp,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  SECONDARY_PHONE_DISPLAY,
  SECONDARY_PHONE_TEL,
  CONTACT_EMAIL,
  CHAMBER_ADDRESS_EN,
  CHAMBER_ADDRESS_BN,
  VISITING_HOURS_EN,
  VISITING_HOURS_BN,
  FACEBOOK_URL
} from "../utils/whatsapp";

export default function Contact() {
  const { lang } = useLanguage();

  const [inquiryData, setInquiryData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInquiryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!inquiryData.name || !inquiryData.phone) return;

    setIsSubmitted(true);

    // Silent tracking trigger for Contact event (NEVER sending message)
    try {
      trackContact({
        name: inquiryData.name,
        phone: inquiryData.phone,
        email: inquiryData.email,
      });
    } catch {
      // Non-blocking
    }

    const msg =
      lang === "bn"
        ? `আসসালামু আলাইকুম মাইন্ডসেট,
আমি একটি সাধারণ অনুসন্ধান জানাতে চাই:
• নাম: ${inquiryData.name}
• মোবাইল: ${inquiryData.phone}
${inquiryData.email ? `• ইমেইল: ${inquiryData.email}\n` : ""}• বার্তা: ${inquiryData.message || "কোনো বার্তা নেই"}
ধন্যবাদ।`
        : `Hello MINDSET,
I have an inquiry:
• Name: ${inquiryData.name}
• Phone: ${inquiryData.phone}
${inquiryData.email ? `• Email: ${inquiryData.email}\n` : ""}• Message: ${inquiryData.message || "None"}
Thank you.`;

    setTimeout(() => {
      openWhatsApp(msg);
    }, 500);
  };

  const handleDirectWhatsApp = () => {
    const directMsg =
      lang === "bn"
        ? "আসসালামু আলাইকুম মাইন্ডসেট, আমি সরাসরি যোগাযোগের জন্য লিখছি।"
        : "Hello MINDSET, I am reaching out to connect.";
    openWhatsApp(directMsg);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      <SEO
        title="We’re Here When You’re Ready — Contact & Chamber | MINDSET Dhaka"
        description="Reach out whenever you feel ready. Visit MINDSET Psychotherapy Center at Monowara Plaza (4th Floor), 69/B Green Road, Panthapath, Dhaka-1205. Call +880 1711-345291 or WhatsApp us."
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION: PREMIUM, CALM & REASSURING               */}
      {/* Heading: We’re Here When You’re Ready                     */}
      {/* Short text: Reach out whenever you feel ready.            */}
      {/* Subtle 3D Connection-Node animation                       */}
      {/* ========================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-10 sm:pb-18 bg-gradient-to-b from-[#070B18] via-[#0B1020] to-[#11182D] text-white overflow-hidden border-b border-purple-500/20">
        
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Requested Exact Copy & Actions (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-purple-500/30 text-purple-200 text-xs font-mono font-bold tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>CONFIDENTIAL &amp; COMPASSIONATE CARE</span>
              </div>

              {/* Exact Requested Hero Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {lang === "bn" ? "আপনি প্রস্তুত হলেই আমরা আছি" : "We’re Here When You’re Ready"}
              </h1>

              {/* Exact Requested Short Text */}
              <p className="text-base sm:text-xl lg:text-2xl text-slate-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {lang === "bn"
                  ? "যখনই প্রস্তুত অনুভব করবেন, যোগাযোগ করুন।"
                  : "Reach out whenever you feel ready."}
              </p>

              {/* Concise Quick Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Button3D
                  onClick={handleDirectWhatsApp}
                  variant="emerald"
                  size="md"
                  icon={MessageCircle}
                  className="w-full sm:w-auto"
                >
                  {lang === "bn" ? "হোয়াটসঅ্যাপে লিখুন" : "Chat on WhatsApp"}
                </Button3D>

                <Link to="/appointment" className="w-full sm:w-auto">
                  <Button3D
                    variant="primary"
                    size="md"
                    icon={Calendar}
                    className="w-full sm:w-auto"
                  >
                    {lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুক করুন" : "Book Appointment"}
                  </Button3D>
                </Link>
              </div>

              <p className="text-xs text-slate-400 flex items-center justify-center lg:justify-start gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === "bn"
                    ? "আপনার পরিচয় ও কথোপকথন সম্পূর্ণ গোপনীয় রাখা হয়।"
                    : "Your privacy and discussions remain strictly confidential."}
                </span>
              </p>
            </div>

            {/* Right Column: Subtle 3D Connection-Node Animation (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-[#0B1020]/90 border border-purple-500/30 p-2 shadow-2xl backdrop-blur-md">
                <ConnectionNodes3D
                  height="h-52 sm:h-60"
                  nodeCount={36}
                />
                <div className="text-center py-2 border-t border-purple-500/20">
                  <span className="text-[11px] font-mono text-purple-300 tracking-wider">
                    THERAPEUTIC ALLIANCE &amp; EMPATHETIC CONNECTION
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. COMPACT CONTACT INFORMATION CARDS                      */}
      {/* ADDRESS, VISITING HOURS, PHONE, EMAIL, FACEBOOK           */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
          
          {/* Card 1: ADDRESS */}
          <div className="bg-white/[0.04] backdrop-blur-md p-5 rounded-2xl border border-purple-500/20 shadow-lg space-y-2.5 flex flex-col justify-between text-white hover:border-purple-500/40 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center mb-3">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                {lang === "bn" ? "চেম্বার ঠিকানা" : "Address"}
              </h3>
              <p className="text-xs font-semibold text-white mt-1 leading-snug">
                Monowara Plaza (4th Floor)
              </p>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                69/B Green Road, East Panthapath, Dhaka-1205
              </p>
            </div>
            <a
              href="#map"
              className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 inline-flex items-center gap-1 pt-2 border-t border-white/10"
            >
              <span>{lang === "bn" ? "ম্যাপে দেখুন" : "View on Map"}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          {/* Card 2: VISITING HOURS */}
          <div className="bg-white/[0.04] backdrop-blur-md p-5 rounded-2xl border border-purple-500/20 shadow-lg space-y-2.5 flex flex-col justify-between text-white hover:border-purple-500/40 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                {lang === "bn" ? "ভিজিটিং সময়" : "Visiting Hours"}
              </h3>
              <p className="text-sm font-bold text-white mt-1 font-mono">
                {VISITING_HOURS_EN}
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                {lang === "bn" ? VISITING_HOURS_BN : "Daily (by appointment)"}
              </p>
            </div>
            <span className="text-[11px] text-slate-400 pt-2 border-t border-white/10 block">
              {lang === "bn" ? "প্রতিদিন খোলা" : "7 Days a Week"}
            </span>
          </div>

          {/* Card 3: PHONE */}
          <div className="bg-white/[0.04] backdrop-blur-md p-5 rounded-2xl border border-purple-500/20 shadow-lg space-y-2.5 flex flex-col justify-between text-white hover:border-purple-500/40 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-3">
                <Phone className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                {lang === "bn" ? "ফোন হটলাইন" : "Phone"}
              </h3>
              <div className="space-y-1 mt-1 text-xs">
                <a
                  href={`tel:${PRIMARY_PHONE_TEL}`}
                  className="block font-mono font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  +880 1711-345291
                </a>
                <a
                  href={`tel:${SECONDARY_PHONE_TEL}`}
                  className="block font-mono font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  +880 1991-333503
                </a>
              </div>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium pt-2 border-t border-white/10 block">
              {lang === "bn" ? "কল করতে ট্যাপ করুন" : "Tap to Call"}
            </span>
          </div>

          {/* Card 4: EMAIL */}
          <div className="bg-white/[0.04] backdrop-blur-md p-5 rounded-2xl border border-purple-500/20 shadow-lg space-y-2.5 flex flex-col justify-between text-white hover:border-purple-500/40 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-3">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                {lang === "bn" ? "ইমেইল" : "Email"}
              </h3>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-xs font-mono font-medium text-white hover:text-blue-300 block break-all mt-1 transition-colors"
              >
                fowziahossain1304@gmail.com
              </a>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[11px] text-blue-400 font-semibold inline-flex items-center gap-1 pt-2 border-t border-white/10"
            >
              <span>{lang === "bn" ? "ইমেইল পাঠান" : "Send Email"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 5: FACEBOOK */}
          <div className="bg-white/[0.04] backdrop-blur-md p-5 rounded-2xl border border-purple-500/20 shadow-lg space-y-2.5 flex flex-col justify-between text-white hover:border-purple-500/40 transition-all">
            <div>
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center mb-3">
                <Share2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Facebook
              </h3>
              <p className="text-xs font-semibold text-white mt-1 leading-snug">
                Mindset Psychotherapy &amp; Counseling Center
              </p>
            </div>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-purple-300 font-semibold inline-flex items-center gap-1 pt-2 border-t border-white/10 hover:text-purple-200"
            >
              <span>{lang === "bn" ? "ফেসবুক পেজ" : "Visit Page"}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CONCISE INQUIRY & APPOINTMENT FAST CONNECT             */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quick Message / Inquiry (7 cols) */}
          <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)] space-y-5 text-white">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white tracking-tight">
                {lang === "bn" ? "সংক্ষিপ্ত বার্তা বা অনুসন্ধান" : "Quick Confidential Inquiry"}
              </h3>
              <p className="text-xs text-slate-300 font-normal">
                {lang === "bn"
                  ? "যেকোনো জিজ্ঞাসা থাকলে জানান। আমরা দ্রুত উত্তর দেব।"
                  : "Send a quick question about sessions, fees, or visiting."}
              </p>
            </div>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-100 text-xs flex items-center gap-2 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {lang === "bn"
                    ? "বার্তাটি হোয়াটসঅ্যাপে খোলা হয়েছে। প্রেরণে ট্যাপ করুন।"
                    : "Opening WhatsApp with your inquiry. Tap send to connect."}
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-200 block">
                    {lang === "bn" ? "আপনার নাম" : "Name"} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={inquiryData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden hover:border-purple-400/50"
                    placeholder={lang === "bn" ? "পুরো নাম" : "Your Name"}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-purple-200 block">
                    {lang === "bn" ? "ফোন নম্বর" : "Phone"} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={inquiryData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden hover:border-purple-400/50"
                    placeholder="+880 1..."
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-200 block">
                  {lang === "bn" ? "ইমেইল (ঐচ্ছিক)" : "Email (Optional)"}
                </label>
                <input
                  type="email"
                  name="email"
                  value={inquiryData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden hover:border-purple-400/50"
                  placeholder="name@example.com"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-purple-200 block">
                  {lang === "bn" ? "আপনার বার্তা" : "Message"}
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={inquiryData.message}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-purple-500/30 bg-[#070B18]/80 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-hidden hover:border-purple-400/50"
                  placeholder={
                    lang === "bn"
                      ? "কীভাবে আমরা আপনাকে সহযোগিতা করতে পারি?"
                      : "How can we support you?"
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === "bn" ? "বার্তা পাঠান (হোয়াটসঅ্যাপ)" : "Send via WhatsApp"}</span>
              </button>
            </form>
          </div>

          {/* Direct WhatsApp & Crisis Notice (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Connect Box */}
            <div className="bg-[#0B1020]/90 backdrop-blur-md text-white rounded-3xl p-6 sm:p-7 border border-purple-500/30 space-y-4 shadow-xl">
              <h4 className="text-base font-bold text-white">
                {lang === "bn" ? "সরাসরি যোগাযোগ করুন" : "Direct Intake & Scheduling"}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === "bn"
                  ? "আমাদের কো-অর্ডিনেটরের সাথে সরাসরি কথা বলে আজই সেশন নিশ্চিত করুন।"
                  : "Speak directly with our clinic intake coordinator or schedule online anytime."}
              </p>
              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <Link
                  to="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition-all shadow-md shadow-orange-500/20"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "অ্যাপয়েন্টমেন্ট বুকিং" : "Book Session"}</span>
                </Link>
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-600/20"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Concise Psychiatric Emergency Note */}
            <div className="p-5 rounded-2xl bg-amber-950/40 backdrop-blur-md border border-amber-500/30 text-amber-200 space-y-1.5 shadow-lg">
              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{lang === "bn" ? "জরুরি নির্দেশনা" : "Emergency Care Notice"}</span>
              </div>
              <p className="text-[11px] text-amber-200/80 leading-relaxed">
                {lang === "bn"
                  ? "মাইন্ডসেট রুটিন অ্যাপয়েন্টমেন্ট ভিত্তিক সেন্টার। তীব্র মানসিক স্বাস্থ্য জরুরি অবস্থায় নিকটস্থ হাসপাতাল জরুরি বিভাগে যোগাযোগ করুন।"
                  : "MINDSET provides outpatient psychotherapy. For acute psychiatric emergencies, please contact your nearest hospital emergency department."}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PREMIUM MAP / LOCATION VISUAL                          */}
      {/* ========================================================= */}
      <MapSection />
    </div>
  );
}
