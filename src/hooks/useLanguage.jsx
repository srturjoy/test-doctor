import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

const STORAGE_KEY = "mindset_preferred_language";

export function LanguageProvider({ children }) {
  // Read persisted language or default to 'en'
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === "bn" || saved === "en") {
          return saved;
        }
      } catch (e) {
        console.warn("Could not read language from localStorage", e);
      }
    }
    return "en";
  });

  // Keep localStorage and document lang attribute updated
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        console.warn("Could not save language to localStorage", e);
      }
      document.documentElement.setAttribute("lang", lang);
    }
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  };

  const setLanguage = (newLang) => {
    if (newLang === "en" || newLang === "bn") {
      setLang(newLang);
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
