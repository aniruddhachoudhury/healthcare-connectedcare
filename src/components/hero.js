"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";
import { useI18n } from "@/context/i18n-context";

export function Hero() {
  const { t } = useI18n();

  const getStarted = () => {
    redirect("/loginPage");
  };

  return (
    <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-background to-secondary/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-accent/5 via-transparent to-primary/5" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 to-secondary/20 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/25 to-primary/15 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-gradient-to-br from-secondary/20 to-accent/10 rounded-full blur-3xl opacity-40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-primary/10 border border-accent/30 backdrop-blur-sm">
                <span className="text-sm font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  ✨ {t("heroBadge")}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                {t("heroHeading1")}{" "}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {t("heroHeading2")}
                </span>
              </h1>
              <p className="text-lg text-foreground/60 leading-relaxed text-balance">
                {t("heroSub")}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground/80">{t("heroCheck1")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground/80">{t("heroCheck2")}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-foreground/80">{t("heroCheck3")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold"
                onClick={getStarted}
              >
                {t("heroStart")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 bg-gradient-to-r from-transparent to-primary/5 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-all duration-300"
              >
                {t("heroDemo")}
              </Button>
            </div>
          </div>

          {/* Right side - Image placeholder */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/30 to-secondary/20 border border-gradient-to-r from-primary/40 to-secondary/40 shadow-2xl shadow-primary/20">
              <img
                src="/healthcare-professional-doctor-with-stethoscope.jpg"
                alt={t("heroImageAlt")}
                className="w-full h-full object-cover"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {t("heroDocName")}
                    </p>
                    <p className="text-xs text-foreground/60">
                      {t("heroDocAvailable")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
