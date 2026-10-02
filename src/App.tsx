/**
 * MINDSET Psychotherapy & Counseling Center
 * Official Multi-Page Web Application
 */
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LanguageProvider } from "./hooks/useLanguage";
import { ImageModalProvider } from "./context/ImageModalContext";
import { DoctorPhotosProvider } from "./context/DoctorPhotosContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import AnimatedBackground from "./components/AnimatedBackground";
import { trackPageView } from "./tracking/index";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Specialists from "./pages/Specialists";
import Services from "./pages/Services";
import Expertise from "./pages/Expertise";
import HowItWorks from "./pages/HowItWorks";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";

/**
 * Invisible route tracker for server-side marketing conversions
 */
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ImageModalProvider>
          <DoctorPhotosProvider>
            <ScrollToTop />
            <PageTracker />
            <div className="min-h-screen bg-[#070B18] text-[#F4F2FF] flex flex-col selection:bg-purple-600 selection:text-white font-sans antialiased overflow-x-hidden w-full max-w-[100vw] relative">
              {/* Reusable 3D Dark Psychology Background System */}
              <AnimatedBackground />

              {/* Main Global Header with Multi-Page Nav */}
              <Header />

              {/* Dynamic Page Views */}
              <main className="flex-1 w-full overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/specialists" element={<Specialists />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/expertise" element={<Expertise />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/appointment" element={<Appointment />} />
                  <Route path="/contact" element={<Contact />} />
                  {/* Catch-all redirect */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Global Footer */}
              <Footer />

              {/* Floating WhatsApp Action Button */}
              <WhatsAppButton />
            </div>
          </DoctorPhotosProvider>
        </ImageModalProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}
