import React from "react";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Compass,
  Building,
  Car
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import {
  CHAMBER_ADDRESS_EN,
  CHAMBER_ADDRESS_BN,
  VISITING_HOURS_EN,
  VISITING_HOURS_BN
} from "../utils/whatsapp";

/**
 * GOOGLE_MAP_EMBED_URL
 * We do not invent an unverified iframe embed URL.
 * Instead, if an embed URL is provided here in the future, it renders the iframe.
 * Otherwise, it renders a high-end, realistic spatial schematic visual of Panthapath / Green Road,
 * with precise landmark callouts and the real Google Maps direct directions link.
 */
export const GOOGLE_MAP_EMBED_URL = "";

export default function MapSection() {
  const { lang } = useLanguage();

  // Official direct Google Maps search query URL for Monowara Plaza, Green Road
  const googleMapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "Monowara Plaza, 69/B Green Road, East Panthapath, Dhaka-1205"
  )}`;

  return (
    <section id="map" className="py-8 sm:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#0B1020]/90 backdrop-blur-md rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl">
          
          {GOOGLE_MAP_EMBED_URL ? (
            <div className="w-full h-96">
              <iframe
                title="MINDSET Chamber Location Map"
                src={GOOGLE_MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : (
            /* Premium Location Visual & Spatial Map Matrix */
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Chamber Landmark Details (5 cols) */}
              <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-900 text-white flex flex-col justify-between space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-orange-300 text-xs font-mono font-bold tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>PANTHAPATH • GREEN ROAD</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {lang === "bn" ? "চেম্বার অবস্থান ও পথনির্দেশ" : "Chamber Location & Directions"}
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-orange-400 shrink-0 mt-1" />
                      <div>
                        <strong className="text-white block font-semibold">
                          {lang === "bn" ? "মনোয়ারা প্লাজা (৪র্থ তলা)" : "Monowara Plaza (4th Floor)"}
                        </strong>
                        <span>69/B Green Road, East Panthapath, Dhaka-1205</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Compass className="w-4 h-4 text-purple-400 shrink-0 mt-1" />
                      <div>
                        <strong className="text-white block font-semibold">
                          {lang === "bn" ? "সহজ ল্যান্ডমার্ক" : "Convenient Landmark"}
                        </strong>
                        <span className="text-slate-400 text-xs">
                          {lang === "bn"
                            ? "গ্রীন রোড ও পান্থপথ সিগন্যালের নিকটে, স্কয়ার হাসপাতাল মোড় থেকে স্বল্প দূরত্বে।"
                            : "Near Green Road & Panthapath signal, adjacent to major healthcare hubs."}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Car className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <div>
                        <strong className="text-white block font-semibold">
                          {lang === "bn" ? "ভিজিটিং সময়" : "Visiting Hours"}
                        </strong>
                        <span className="text-emerald-300 font-mono text-xs">
                          {lang === "bn" ? VISITING_HOURS_BN : VISITING_HOURS_EN}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Google Maps Directions Action */}
                <div className="relative z-10 pt-2">
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99]"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>{lang === "bn" ? "গুগল ম্যাপে দিকনির্দেশনা খুলুন" : "Open in Google Maps"}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>

              </div>

              {/* Right Column: Premium Stylized Cartographic Map Vector (7 cols) */}
              <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[340px]">
                
                {/* Visual schematic map grid background */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Stylized transit intersection visual */}
                <div className="relative z-10 w-full max-w-lg min-h-[220px] sm:min-h-[260px] aspect-auto sm:aspect-16/10 rounded-2xl bg-[#0F172A]/90 border border-white/10 p-4 sm:p-5 shadow-2xl flex flex-col justify-between">
                  
                  {/* Map Header Status */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-slate-200">DHAKA-1205 • GREEN ROAD</span>
                    </div>
                    <span className="text-slate-500">23.7516° N, 90.3863° E</span>
                  </div>

                  {/* Road Network Schematic */}
                  <div className="relative my-4 h-32 flex items-center justify-center">
                    {/* Horizontal Avenue: Panthapath */}
                    <div className="absolute w-full h-5 bg-slate-800 rounded-full flex items-center justify-center border-y border-slate-700">
                      <div className="w-full border-t border-dashed border-slate-500" />
                    </div>
                    <span className="absolute left-3 top-1 text-[10px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none">
                      East Panthapath Road
                    </span>

                    {/* Vertical Avenue: Green Road */}
                    <div className="absolute h-full w-5 bg-slate-800 rounded-full flex items-center justify-center border-x border-slate-700">
                      <div className="h-full border-l border-dashed border-slate-500" />
                    </div>
                    <span className="absolute bottom-1 right-4 text-[10px] font-mono text-slate-400 uppercase tracking-widest pointer-events-none">
                      Green Road
                    </span>

                    {/* Target Pin Hub: Monowara Plaza */}
                    <div className="absolute z-20 flex flex-col items-center">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-orange-500/30 rounded-full animate-ping" />
                        <div className="w-10 h-10 rounded-2xl bg-orange-600 text-white flex items-center justify-center shadow-lg border-2 border-white">
                          <MapPin className="w-5 h-5 fill-white text-orange-600" />
                        </div>
                      </div>
                      <div className="mt-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-orange-500/50 shadow-md text-center">
                        <p className="text-[11px] font-bold text-white leading-none">
                          MINDSET Chamber
                        </p>
                        <p className="text-[9px] font-mono text-orange-400 mt-0.5">
                          Monowara Plaza (4th Fl)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Map Footer Prompt */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    <span className="text-slate-400">Easy parking &amp; lift access available</span>
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 font-semibold inline-flex items-center gap-1"
                    >
                      <span>Navigate</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
