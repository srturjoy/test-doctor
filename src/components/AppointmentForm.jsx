import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Send
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteContent } from "../data/siteContent";
import { createAppointmentMessage, openWhatsApp } from "../utils/whatsapp";

export default function AppointmentForm() {
  const { lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const t = siteContent.appointmentForm;

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
      newErrors.name = t.validation.nameRequired[lang];
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = t.validation.phoneRequired[lang];
    }

    if (!formData.service) {
      newErrors.service = t.validation.serviceRequired[lang];
    }

    if (!formData.date) {
      newErrors.date = t.validation.dateRequired[lang];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSuccess(true);

    // Prepare message
    const formattedMsg = createAppointmentMessage(formData, lang);

    // Open WhatsApp
    setTimeout(() => {
      openWhatsApp(formattedMsg);
      setIsSuccess(false);
    }, 600);
  };

  return (
    <section id="appointment" className="py-20 lg:py-28 bg-slate-50/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5 text-indigo-700" />
            <span>{t.badge[lang]}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.heading[lang]}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.subtext[lang]}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl relative">
          
          {isSuccess && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm animate-in fade-in duration-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.validation.success[lang]}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="field-name"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{t.labels.name[lang]}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.placeholders.name[lang]}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                    errors.name ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-slate-50/50 hover:bg-white"
                  }`}
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <label
                  htmlFor="field-phone"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{t.labels.phone[lang]}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.placeholders.phone[lang]}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-600 ${
                    errors.phone ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-slate-50/50 hover:bg-white"
                  }`}
                  aria-invalid={Boolean(errors.phone)}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Select Service */}
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="field-service"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>{t.labels.service[lang]}</span>
                  <span className="text-red-500">*</span>
                </label>
                <select
                  id="field-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-600 cursor-pointer ${
                    errors.service ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-slate-50/50 hover:bg-white"
                  }`}
                  aria-invalid={Boolean(errors.service)}
                >
                  <option value="">{t.placeholders.service[lang]}</option>
                  {t.servicesList.map((srv) => (
                    <option key={srv.id} value={srv[lang]}>
                      {srv[lang]}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.service}</span>
                  </p>
                )}
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label
                  htmlFor="field-date"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{t.labels.date[lang]}</span>
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="field-date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-600 cursor-pointer ${
                    errors.date ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-slate-50/50 hover:bg-white"
                  }`}
                  aria-invalid={Boolean(errors.date)}
                />
                {errors.date && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.date}</span>
                  </p>
                )}
              </div>

              {/* Preferred Time Window */}
              <div className="space-y-2">
                <label
                  htmlFor="field-time"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{t.labels.time[lang]}</span>
                </label>
                <select
                  id="field-time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-600 cursor-pointer"
                >
                  <option value="">{t.placeholders.time[lang]}</option>
                  {t.timesList.map((timeSlot) => (
                    <option key={timeSlot.id} value={timeSlot[lang]}>
                      {timeSlot[lang]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message / Brief Note */}
              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="field-message"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-700" />
                  <span>{t.labels.message[lang]}</span>
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.placeholders.message[lang]}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white text-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-indigo-600 resize-y"
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                id="submit-appointment-btn"
                className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSuccess ? t.labels.submitting[lang] : t.labels.submit[lang]}</span>
              </button>
            </div>

            <p className="text-center text-[11px] text-slate-400">
              {lang === "bn"
                ? "অনুরোধ পাঠানোর সাথে সাথে আপনার হোয়াটসঅ্যাপে বার্তাটি লোড হবে এবং আমাদের টিম দ্রুত উত্তর দেবে।"
                : "Upon submitting, WhatsApp will open with your pre-filled message for immediate confirmation."}
            </p>
          </form>

        </div>

      </div>
    </section>
  );
}
