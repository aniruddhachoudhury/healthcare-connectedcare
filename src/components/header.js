"use client";

import { useState, useEffect } from "react";
import { MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/context/i18n-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const [location, setLocation] = useState("Fetching location...");
  const [deviceInfo, setDeviceInfo] = useState("");
  const { language, setLanguage, t } = useI18n();
  const router = useRouter();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
        },
        () => setLocation("Location unavailable")
      );
    } else setLocation("Geolocation not supported");
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent;
    const isMobile = /Mobile|Android|iP(hone|od|ad)/i.test(ua);
    setDeviceInfo(isMobile ? "Mobile" : "Desktop");
  }, []);

  const onSignInAction = () => {
    router.push(`/loginPage/?language=${language}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 border-b border-border backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg" />
          <span className="font-bold text-lg">Cloud Connect</span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-primary">
            {t("home")}
          </Link>
          <Link href="#" className="hover:text-primary">
            {t("about")}
          </Link>
          {/* <Link href="#" className="hover:text-primary">
            {t("features")}
          </Link>
          <Link href="#" className="hover:text-primary">
            {t("security")}
          </Link> */}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{location}</span>
            <span>{deviceInfo}</span>
            <Globe className="w-4 h-4" />
          </div>
          <select
            className="border rounded px-2 py-1"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="bn">বাংলা</option>
          </select>
          <Button onClick={onSignInAction}>{t("signIn")}</Button>
        </div>
      </div>
    </header>
  );
}
