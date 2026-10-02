import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MessageCircle, Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { openWhatsApp, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from "../utils/whatsapp";

export default function Header() {
  const { lang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", path: "/", label: siteContent.nav.home[lang] },
    { id: "about", path: "/about", label: siteContent.nav.about[lang] },
    { id: "specialists", path: "/specialists", label: siteContent.nav.specialists[lang] },
    { id: "services", path: "/services", label: siteContent.nav.services[lang] },
    { id: "expertise", path: "/expertise", label: siteContent.nav.expertise[lang] },
    { id: "how-it-works", path: "/how-it-works", label: siteContent.nav.howItWorks[lang] },
    { id: "appointment", path: "/appointment", label: siteContent.nav.appointment[lang] },
    { id: "contact", path: "/contact", label: siteContent.nav.contact[lang] }
  ];

  return (
    <>
      <header
        id="main-header"
        className="relative w-full z-40 bg-[#070B18] border-b border-purple-500/20 py-3 sm:py-3.5 shadow-md shadow-black/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 group focus:outline-hidden focus:ring-2 focus:ring-purple-500 rounded-lg p-0.5"
            aria-label="MINDSET Psychotherapy & Counseling Center Home"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 rounded-full overflow-hidden border border-orange-400/80 shadow-md group-hover:scale-105 transition-transform bg-white">
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
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-white group-hover:text-purple-200 transition-colors leading-none">
                MIND<span className="text-orange-500">SET</span>
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold tracking-wider text-purple-300/80 uppercase mt-0.5 truncate max-w-[130px] sm:max-w-none">
                Psychotherapy &amp; Counseling
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden xl:flex items-center gap-1 text-xs font-semibold"
            aria-label="Primary Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-orange-400 bg-orange-500/15 border border-orange-500/30 font-bold shadow-xs"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Switcher */}
            <LanguageSwitcher className="inline-flex" />

            {/* Quick WhatsApp Appointment CTA */}
            <button
              type="button"
              id="header-whatsapp-cta"
              onClick={() => openWhatsApp("Hello MINDSET, I would like to inquire about booking an appointment.")}
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all duration-200 cursor-pointer hover:shadow-md hover:shadow-emerald-600/20 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>{siteContent.nav.bookWhatsApp[lang]}</span>
            </button>

            {/* Direct Call Button (desktop) */}
            <a
              href={`tel:${PRIMARY_PHONE_TEL}`}
              className="hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/30 hover:border-purple-400 text-slate-200 hover:text-white text-xs font-medium bg-white/5 transition-colors"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-mono text-[11px]">{PRIMARY_PHONE_DISPLAY}</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-purple-500/25 text-slate-200 hover:text-white transition-all focus:outline-hidden focus:ring-2 focus:ring-purple-500 cursor-pointer active:scale-95 shadow-xs"
              aria-label="Open mobile navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

