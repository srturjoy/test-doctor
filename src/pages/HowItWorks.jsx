import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  MessageCircle,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Lock,
  Heart,
  Users,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import PageHero from "../components/PageHero";
import SEO from "../components/SEO";
import { openWhatsApp, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL, VISITING_HOURS_EN, VISITING_HOURS_BN } from "../utils/whatsapp";

export default function HowItWorks() {
  const { lang } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const t = siteContent.howItWorks;

  const faqs = [
    {
      q: {
        en: "What happens during my very first therapy session?",
        bn: "আমার প্রথম থেরাপি সেশনে কী ঘটে?"
      },
      a: {
        en: "Your initial session is an intake and collaborative assessment. The therapist will listen carefully to your concerns, explore what you are seeking help for, explain confidentiality boundaries, and outline a therapeutic plan customized to your needs without any judgment.",
        bn: "আপনার প্রথম সেশনটি একটি সহযোগিতামূলক প্রাথমিক মূল্যায়ন। থেরাপিস্ট কোনো প্রকার বিচার বা সমালোচনা ছাড়া অত্যন্ত সহমর্মিতার সাথে আপনার অভিজ্ঞতা ও উদ্বেগের কথা শুনবেন, গোপনীয়তার নীতিমালা স্পষ্ট করবেন এবং আপনার জন্য উপযুক্ত একটি চিকিৎসা পরিকল্পনা নির্ধারণ করবেন।"
      }
    },
    {
      q: {
        en: "Is my personal identity and discussion strictly confidential?",
        bn: "আমার ব্যক্তিগত তথ্য ও আলোচনা কি সম্পূর্ণ গোপনীয় থাকবে?"
      },
      a: {
        en: "Yes, completely. MINDSET strictly complies with international psychological codes of ethics and patient confidentiality standards. Nothing shared in your consultation is disclosed to family, employers, or third parties without your explicit written consent, except in rare instances mandated by law to prevent imminent physical self-harm.",
        bn: "হ্যাঁ, শতভাগ। মাইন্ডসেট আন্তর্জাতিক ক্লিনিক্যাল মনস্তাত্ত্বিক নৈতিক কোড অনুসরণ করে। আপনার সুস্পষ্ট লিখিত অনুমতি ব্যতিরেকে কোনো তথ্যই পরিবার, কর্মক্ষেত্র বা অন্য কারও সাথে ভাগ করা হয় না (আইনগতভাবে নিজের বা অন্যের জীবনহানির গুরুতর ঝুঁকি ব্যতীত)।"
      }
    },
    {
      q: {
        en: "How long is each consultation session?",
        bn: "প্রতিটি কাউন্সেলিং সেশনের সময়সীমা কতক্ষণ?"
      },
      a: {
        en: "Standard individual psychotherapy sessions typically last 50 to 60 minutes. Couple and family therapy sessions may run between 60 to 75 minutes to allow sufficient time for all participants.",
        bn: "সাধারণ ব্যক্তিগত সাইকোথেরাপি সেশন ৫০ থেকে ৬০ মিনিট স্থায়ী হয়। দম্পতি ও পরিবার কাউন্সেলিং সেশনগুলো সবার ভারসাম্যপূর্ণ অংশগ্রহণের সুবিধার্থে ৬০ থেকে ৭৫ মিনিট সময় নিতে পারে।"
      }
    },
    {
      q: {
        en: "Can I take counseling sessions online via video call?",
        bn: "আমি কি ভিডিও কলের মাধ্যমে অনলাইনে সেশন নিতে পারব?"
      },
      a: {
        en: "Yes. In addition to our comfortable physical chamber at Green Road, Panthapath, Dhaka, we offer secure online video consultations for clients living across Bangladesh or abroad.",
        bn: "হ্যাঁ। ধানমন্ডি/পান্থপথ গ্রিন রোডের ফিজিক্যাল চেম্বারের পাশাপাশি দেশ-বিদেশের যেকোনো প্রান্ত থেকে ক্লায়েন্টদের জন্য নিরাপদ ভিডিও কলের মাধ্যমে অনলাইন কাউন্সেলিং সেবা নিশ্চিত করা হয়।"
      }
    },
    {
      q: {
        en: "What are your visiting and chamber consultation hours?",
        bn: "চেম্বারের ভিজিটিং ও কনসালটেশন সময় কখন?"
      },
      a: {
        en: "Our chamber visiting hours are 03:00 PM to 10:00 PM (Every day). Prior serial booking via WhatsApp or phone is required to prevent waiting time.",
        bn: "আমাদের চেম্বার প্রতিদিন বিকাল ৩:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত খোলা থাকে। অপ্রয়োজনীয় অপেক্ষা এড়াতে অবশ্যই হোয়াটসঅ্যাপ বা ফোনে পূর্ববর্তী সিরিয়াল বুক করতে হয়।"
      }
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-10 lg:space-y-12 pb-14">
      <SEO
        title="How Counseling Works | MINDSET Center"
        description="Understand the 4-step patient journey at MINDSET Psychotherapy Center: Contact, Appointment Scheduling, Specialist Intake, and Evidence-Based Therapy."
      />

      {/* Page Hero */}
      <PageHero
        badge={t?.badge?.[lang] || (lang === "bn" ? "প্রক্রিয়া" : "How It Works")}
        title={t?.heading?.[lang] || (lang === "bn" ? "কাউন্সেলিং প্রক্রিয়া কীভাবে সম্পন্ন হয়" : "How Our Counseling Process Works")}
        subtitle={t?.subtext?.[lang] || ""}
        breadcrumbCurrent={siteContent.nav?.howItWorks?.[lang] || (lang === "bn" ? "কীভাবে কাজ করে" : "How It Works")}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/appointment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{lang === "bn" ? "অ্যাপয়েন্টমেন্ট নিন" : "Book an Appointment"}</span>
          </Link>
        </div>
      </PageHero>

      {/* 4 Steps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === "bn" ? "৪টি ধাপে আপনার কাউন্সেলিং যাত্রা" : "Your 4-Step Patient Journey"}
          </h2>
          <p className="text-sm text-slate-300">
            {lang === "bn"
              ? "প্রথম যোগাযোগ থেকে শুরু করে দীর্ঘমেয়াদী মানসিক স্থিতিশীলতা অর্জনের সুসংগঠিত পথরেখা।"
              : "A transparent, structured, and reassuring path from your initial inquiry to long-term healing."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.steps.map((step, idx) => (
            <div
              key={step.number}
              className="bg-white/[0.04] backdrop-blur-md rounded-3xl p-7 border border-purple-500/20 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] relative flex flex-col justify-between hover:shadow-[0_16px_40px_-8px_rgba(91,75,219,0.35)] hover:border-purple-400/50 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-purple-400/30 font-mono">
                    {step.number}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white">
                  {step.title[lang]}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.description[lang]}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <span className="text-[11px] font-semibold text-purple-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === "bn" ? "সহজ ও বিশ্বস্ত প্রক্রিয়া" : "Simple & Trusted Process"}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What to Expect in Your First Session */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#070B18] via-[#11182D] to-[#25204A] text-white rounded-3xl p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] border border-purple-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-orange-300 text-xs font-bold uppercase tracking-wider">
              <Heart className="w-3.5 h-3.5 text-orange-400" />
              <span>{lang === "bn" ? "প্রথম সেশন কী রকম হবে?" : "What to Expect in Your First Session"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {lang === "bn"
                ? "একটি নিরপেক্ষ, উষ্ণ ও সহায়ক মনস্তাত্ত্বিক পরিবেশ"
                : "A Safe, Respectful, and Judgment-Free Space"}
            </h2>

            <p className="text-sm sm:text-base text-indigo-200/90 leading-relaxed">
              {lang === "bn"
                ? "অনেকের কাছে প্রথমবার কোনো সাইকোথেরাপিস্টের মুখোমুখি হওয়া কিছুটা অস্বস্তিকর বা ভয় লাগার মতো মনে হতে পারে। মাইন্ডসেটে আমরা নিশ্চিত করি যে প্রথম মিনিট থেকেই আপনি নিজেকে নিরাপদ ও গৃহীত অনুভব করবেন। আপনাকে কোনো অপ্রস্তুত প্রশ্নের মুখোমুখি হতে হবে না; আপনি ঠিক যতটুকু প্রস্তুত, ততটুকুই শেয়ার করবেন।"
                : "Attending a first therapy session can sometimes evoke nervousness. At MINDSET, our clinicians ensure you feel welcome, respected, and heard from the very first moment. You pace the conversation—sharing only what you feel ready to explore."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <Lock className="w-5 h-5 text-emerald-400 mb-1" />
                <h4 className="text-xs font-bold text-white">
                  {lang === "bn" ? "পূর্ণ গোপনীয়তা" : "Strict Privacy"}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {lang === "bn" ? "আপনার কোনো তথ্য প্রকাশ পাবে না।" : "Your records remain fully protected."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <Users className="w-5 h-5 text-amber-400 mb-1" />
                <h4 className="text-xs font-bold text-white">
                  {lang === "bn" ? "সহানুভূতিশীল শ্রবণ" : "Empathetic Listening"}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {lang === "bn" ? "কোনো বিচার বা রায় দেওয়া হয় না।" : "Never judged, blamed, or labeled."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
                <Clock className="w-5 h-5 text-orange-400 mb-1" />
                <h4 className="text-xs font-bold text-white">
                  {lang === "bn" ? "সময়নিষ্ঠ ও পেশাদার" : "Punctual Care"}
                </h4>
                <p className="text-[11px] text-slate-300">
                  {lang === "bn" ? "পর্যাপ্ত ৫০-৬০ মিনিট ডেডিকেটেড সেশন।" : "Full 50-60 minutes focused on you."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
            <span>{lang === "bn" ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {lang === "bn" ? "কাউন্সেলিং সম্পর্কে আপনার প্রশ্নসমূহ" : "Everything You Need to Know Before Your Visit"}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/[0.04] backdrop-blur-md rounded-2xl border border-purple-500/20 shadow-md overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.04] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q[lang]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10">
                        {faq.a[lang]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-8 p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div>
            <h4 className="text-sm font-bold text-white">
              {lang === "bn" ? "অন্য কোনো প্রশ্ন আছে?" : "Have More Questions?"}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {lang === "bn" ? "আমাদের টিম আপনাকে যেকোনো তথ্যে সাহায্য করতে প্রস্তুত।" : "Our reception team is happy to guide you with any question."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp("Hello MINDSET, I have a question regarding counseling sessions.")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{lang === "bn" ? "হোয়াটসঅ্যাপে জিজ্ঞেস করুন" : "Ask on WhatsApp"}</span>
          </button>
        </div>
      </section>
    </div>
  );
}
