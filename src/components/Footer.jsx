import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Share2,
  AlertTriangle,
  Heart,
  ShieldCheck,
  Clock,
  MessageCircle
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { servicesData } from "../data/services";
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

export default function Footer() {
  const { lang } = useLanguage();
  const t = siteContent.footer;

  const quickLinks = [
    { to: "/", label: siteContent.nav.home[lang] },
    { to: "/about", label: siteContent.nav.about[lang] },
    { to: "/specialists", label: siteContent.nav.specialists[lang] },
    { to: "/services", label: siteContent.nav.services[lang] },
    { to: "/expertise", label: siteContent.nav.expertise[lang] },
    { to: "/how-it-works", label: siteContent.nav.howItWorks[lang] },
    { to: "/appointment", label: siteContent.nav.appointment[lang] },
    { to: "/contact", label: siteContent.nav.contact[lang] }
  ];

  return (
    <footer className="bg-[#070B18] text-slate-300 pt-12 pb-8 border-t border-purple-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-8 border-b border-purple-500/15">
          
          {/* Column 1: Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-orange-400/80 shadow-md shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/logo.png"
                  alt="MINDSET Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/favicon.png";
                  }}
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight block group-hover:text-purple-200 transition-colors">
                  MIND<span className="text-orange-500">SET</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider block">
                  Psychotherapy &amp; Counseling Center
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {(t.aboutText || t.tagline)?.[lang] || (t.aboutText || t.tagline)?.en || ""}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span>{lang === "bn" ? VISITING_HOURS_BN : VISITING_HOURS_EN}</span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => openWhatsApp("Hello MINDSET, I would like to book an appointment.")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs transition-all cursor-pointer shadow-xs shadow-emerald-600/20 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{siteContent.nav.bookWhatsApp[lang]}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              {t.quickLinksTitle[lang]}
            </h3>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-orange-400 transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Clinical Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              {t.servicesTitle[lang]}
            </h3>
            <ul className="space-y-1.5 text-xs">
              {servicesData.slice(0, 7).map((srv) => (
                <li key={srv.id}>
                  <Link
                    to="/services"
                    className="text-slate-400 hover:text-white transition-colors block line-clamp-1 py-0.5"
                  >
                    {srv.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Chamber (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
              {t.contactTitle[lang]}
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{lang === "bn" ? CHAMBER_ADDRESS_BN : CHAMBER_ADDRESS_EN}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="space-y-0.5">
                  <a href={`tel:${PRIMARY_PHONE_TEL}`} className="hover:text-white block font-mono">
                    {PRIMARY_PHONE_DISPLAY}
                  </a>
                  <a href={`tel:${SECONDARY_PHONE_TEL}`} className="hover:text-white block font-mono">
                    {SECONDARY_PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white break-all">
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-white transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Mindset Facebook Page</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Clinical Emergency Notice Banner */}
        <div className="my-6 p-4 rounded-2xl bg-[#0B1020]/90 backdrop-blur-md border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 shadow-md">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block mb-0.5">
              {t.emergencyNoticeTitle?.[lang] || (lang === "bn" ? "জরুরি সতর্কতা:" : "Emergency Notice:")}
            </span>
            <p className="leading-relaxed text-amber-200/80">
              {t.emergencyNotice?.[lang] || t.emergencyNotice?.en || ""}
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Confidentiality Guarantee */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 MINDSET Psychotherapy &amp; Counseling Center. All rights reserved.</p>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>{lang === "bn" ? "পূর্ণ চিকিৎসা গোপনীয়তা সুরক্ষিত" : "Clinical Confidentiality Guaranteed"}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
