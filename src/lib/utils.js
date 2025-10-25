"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export function useLanguage() {
//   const searchParams = useSearchParams();
//   const [language, setLanguage] = useState('en');

//   useEffect(() => {
//     const langParam = searchParams.get('language');
//     if (langParam) {
//       setLanguage(langParam);
//       localStorage.setItem('language', langParam);
//     } else {
//       const langFromStorage = localStorage.getItem('language') || 'en';
//       setLanguage(langFromStorage);
//     }
//   }, [searchParams]);

//   return language;
// }
export function useLanguage() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    setLanguage(storedLang);

    // Listen for custom app-wide event
    const handleLangChange = (e) => {
      setLanguage(e.detail);
    };
    window.addEventListener("languageChange", handleLangChange);

    return () => {
      window.removeEventListener("languageChange", handleLangChange);
    };
  }, []);

  return language;
}
