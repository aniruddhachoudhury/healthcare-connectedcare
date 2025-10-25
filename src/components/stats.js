"use client";

import { useI18n } from "@/context/i18n-context";

export function Stats() {
  const { t } = useI18n();

  const stats = [
    { number: "50K+", label: t("patients") },
    { number: "500+", label: t("doctors") },
    { number: "98%", label: t("satisfaction") },
    { number: "24/7", label: t("support") },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.number}
              </div>
              <p className="text-foreground/60 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
