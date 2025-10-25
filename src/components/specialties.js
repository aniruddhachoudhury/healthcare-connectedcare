"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Zap, Activity, Droplet, Baby, Brain } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function Specialties() {
  const { t } = useI18n();

  const specialties = [
    {
      icon: Heart,
      title: t("spec1"),
      bgColor: "from-purple-100 to-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: Zap,
      title: t("spec2"),
      bgColor: "from-blue-100 to-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Activity,
      title: t("spec3"),
      bgColor: "from-pink-100 to-pink-50",
      iconColor: "text-pink-600",
    },
    {
      icon: Droplet,
      title: t("spec4"),
      bgColor: "from-cyan-100 to-cyan-50",
      iconColor: "text-cyan-600",
    },
    {
      icon: Baby,
      title: t("spec5"),
      bgColor: "from-orange-100 to-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: Brain,
      title: t("spec6"),
      bgColor: "from-red-100 to-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t("specialtiesTitle")}
            </h2>
            <p className="text-foreground/60">{t("specialtiesSubtitle")}</p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex whitespace-nowrap border-primary text-primary hover:bg-primary/5 bg-transparent"
          >
            {t("viewAllSpecialties")}
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {specialties.map((s, index) => {
            const Icon = s.icon;
            return (
              <Card
                key={index}
                className={`group hover:shadow-lg transition-all duration-300 border border-border/50 bg-gradient-to-br ${s.bgColor} overflow-hidden cursor-pointer hover:scale-105`}
              >
                <div className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className={`w-8 h-8 ${s.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    {s.title}
                  </h3>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    {t("consultNow")}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="md:hidden flex justify-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 bg-transparent"
          >
            {t("viewAllSpecialties")}
          </Button>
        </div>
      </div>
    </section>
  );
}
