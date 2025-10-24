"use client";

import { Button } from "@/components/ui/button";

export function Header() {
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
            <a
              href="#"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Doctors
            </a>
            <a
              href="#"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Services
            </a>
            <a
              href="#"
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              About
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
