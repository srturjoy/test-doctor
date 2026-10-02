import React from "react";
import { Award, GraduationCap, Building2, BookOpen, ShieldCheck, Maximize2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { useImageModal } from "../context/ImageModalContext";
import { useDoctorPhotos } from "../context/DoctorPhotosContext";
import { siteContent } from "../data/siteContent";
import { cmdData, institutionalPlacements } from "../data/doctors";

export default function CMDProfile() {
  const { lang } = useLanguage();
  const { openImage } = useImageModal();
  const { getDoctorPhoto } = useDoctorPhotos();
  const cmdPhoto = getDoctorPhoto("fowzia-sharmin-hossain", cmdData.image);

  return (
    <section id="cmd" className="py-16 sm:py-20 lg:py-24 bg-[#070B18] text-white relative overflow-hidden border-t border-purple-500/20">
      {/* Background soft accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Award className="w-3.5 h-3.5 text-orange-400" />
            <span>{siteContent.cmd.badge[lang]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {siteContent.cmd.heading[lang]}
          </h2>
        </div>

        {/* CMD Profile Card */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden mb-20">
          
          {/* Subtle decorative glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* CMD Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                className="relative group max-w-sm w-full cursor-zoom-in"
                onClick={() =>
                  openImage({
                    src: cmdPhoto,
                    alt: cmdData.name[lang] || cmdData.name.en,
                    title: cmdData.name[lang] || cmdData.name.en,
                    subtitle: cmdData.title[lang] || cmdData.title.en,
                    category: "MINDSET Leadership",
                  })
                }
                title={lang === "bn" ? "ছবি বড় করে দেখতে ক্লিক করুন" : "Click to view full image"}
              >
                <div className="relative aspect-3/4 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl bg-indigo-950 flex items-center justify-center">
                  {/* Ambient backdrop to match portrait colors seamlessly */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-25 blur-md scale-110 pointer-events-none"
                    style={{ backgroundImage: `url(${cmdPhoto})` }}
                  />

                  <img
                    src={cmdPhoto}
                    alt={cmdData.name[lang]}
                    className="relative z-10 w-full h-full object-contain object-center group-hover:scale-103 transition-transform duration-500"
                    style={{ objectFit: "contain" }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/logo.png";
                    }}
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Image Lightbox Trigger Badge */}
                  <div className="absolute top-3 right-3 z-20 p-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 text-white/80 group-hover:text-amber-300 group-hover:bg-purple-900/90 group-hover:border-purple-400/60 shadow-md transition-all">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  
                  {/* Floating badge inside portrait */}
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                    <p className="text-xs font-bold text-amber-300">
                      {cmdData.title[lang]}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      MINDSET Psychotherapy &amp; Counseling
                    </p>
                  </div>
                </div>

                {/* Outer decorative ring */}
                <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-orange-500 to-indigo-600 opacity-20 group-hover:opacity-30 blur-sm -z-10 transition-opacity" />
              </div>
            </div>

            {/* CMD Credentials & Bio */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold mb-2">
                  {cmdData.title[lang]}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {cmdData.name[lang]}
                </h3>
                <p className="text-base sm:text-lg font-medium text-amber-300/90 mt-1">
                  {cmdData.designation[lang]}
                </p>
              </div>

              {/* Bio */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {cmdData.bio[lang]}
              </p>

              {/* Qualifications Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-slate-400">
                  <GraduationCap className="w-4 h-4 text-orange-400" />
                  <span>{siteContent.cmd.qualificationsLabel[lang]}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {cmdData.qualifications[lang].map((qual, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-100 flex items-center gap-2 backdrop-blur-xs transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* CLINICAL INTERNSHIPS & INSTITUTIONAL PLACEMENTS */}
        <div className="mt-14 sm:mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/15 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-orange-400" />
              <span>{siteContent.cmd.institutionalLabel[lang]}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {siteContent.cmd.institutionalSub[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {institutionalPlacements.map((inst, index) => (
              <div
                key={inst.id}
                className="group relative p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-purple-500/20 hover:border-purple-400/50 shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded-md border border-orange-500/30">
                      0{index + 1}
                    </span>
                    <Building2 className="w-4 h-4 text-purple-300 group-hover:text-amber-300 transition-colors" />
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mb-2 leading-snug">
                    {inst.name[lang]}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 font-normal leading-relaxed pt-2 border-t border-white/10 mt-2">
                  {inst.description[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
