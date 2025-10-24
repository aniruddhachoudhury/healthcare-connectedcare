"use client";

import { Button } from "@/components/ui/button";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Keyboard,
  Scan,
  Mic,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  // --- Utility function for Device Info (Pure) ---
  const getDeviceInfo = () => {
    const ua = navigator.userAgent;

    const isMobile =
      /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Opera Mini/i.test(ua);
    const isTablet = /Tablet|iPad/i.test(ua);
    let deviceType = "Desktop";
    if (isMobile) deviceType = "Mobile";
    else if (isTablet) deviceType = "Tablet";

    let browserName = "Unknown Browser";
    if (/Chrome/.test(ua)) browserName = "Chrome";
    else if (/Firefox/.test(ua)) browserName = "Firefox";
    else if (/Safari/.test(ua) && !/Chrome/.test(ua)) browserName = "Safari";
    else if (/Edge/.test(ua)) browserName = "Edge";
    else if (/OPR/.test(ua)) browserName = "Opera";

    let os = "Unknown OS";
    if (/Windows NT/.test(ua)) os = "Windows";
    else if (/Mac OS X/.test(ua)) os = "Mac OS";
    else if (/Android/.test(ua)) os = "Android";
    else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
    else if (/Linux/.test(ua)) os = "Linux";

    return `${deviceType} - ${os} ${browserName}`;
  };
  const [language, setLanguage] = useState("en");
  const [location, setLocation] = useState("Fetching location..");
  const [deviceInfo, setDeviceInfo] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  // Geolocation Effect
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
        },
        (error) => {
          // Update location to indicate the reason for failure (e.g., permission denied)
          if (error.code === error.PERMISSION_DENIED) {
            setLocation("Location blocked (Permission Denied)");
          } else {
            setLocation("Location unavailable");
          }
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  // Device Info Effect
  useEffect(() => {
    setDeviceInfo(getDeviceInfo());
  }, []);

  const onlanguagechange = (e) => {
    if (language !== e.target.value) {
      const nextLang = e.target.value;
      setLanguage(e.target.value);
      const newParams = new URLSearchParams();
      newParams.set("language", nextLang);
      router.push(`?${newParams.toString()}`);
    }
  };

  const onSignInAction = () => {
    redirect(`/loginPage/?language=${language}`);
  };
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">
              Connected Cloud
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Home
            </Link>
            {/* <a
              href= "./doctor"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Doctors
            </a>
            <a
              href= "./patients"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Patients
            </a> */}
            {/* <a
              href="#"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Services
            </a> */}
            <a
              href="#"
              className="text-sm font-medium  text-foreground/70 hover:text-foreground transition"
            >
              About
            </a>
          </nav>

          <div className="flex items-center justify-between p-4 ">
            <div className="flex items-center gap-6">
              <span className="text-sm font-semibold flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {location}
              </span>
              <span className="text-sm font-semibold">{deviceInfo}</span>
              <Globe className="w-5 h-5" />
            </div>
            <select
              className="border-2 border-white rounded-full px-3 py-1 text-black bg-white cursor-pointer"
              value={language}
              onChange={(e) => onlanguagechange(e)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
            </select>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden sm:inline-flex"
              onClick={onSignInAction}
            >
              Sign In
            </Button>
            {/* <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground">
              Book Now
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
