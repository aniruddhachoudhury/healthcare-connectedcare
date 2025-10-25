"use client";

import { createContext, useContext, useState, useEffect } from "react";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";
import bn from "@/locales/bn.json";

const translations = { en, hi, bn };

const I18nContext = createContext({
  language: "en",
  t: (key) => key,
  setLanguage: () => {},
});

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved) setLanguage(saved);
  }, []);

  const t = (key) => {
    return translations[language][key] || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }));
  };

  return (
    <I18nContext.Provider value={{ language, t, setLanguage: changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
