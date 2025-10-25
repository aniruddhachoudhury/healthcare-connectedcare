"use client";

import { Card } from "@/components/ui/card";
import { Users, Calendar, Headphones, Clock, Shield, Zap } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function Features() {
  const { t } = useI18n();

  const features = [
    {
      icon: Users,
      title: t("feature1Title"),
      description: t("feature1Desc"),
      color: "from-primary/20 to-primary/10",
    },
    {
      icon: Calendar,
      title: t("feature2Title"),
      description: t("feature2Desc"),
      color: "from-secondary/20 to-secondary/10",
    },
    {
      icon: Headphones,
      title: t("feature3Title"),
      description: t("feature3Desc"),
      color: "from-accent/20 to-accent/10",
    },
    {
      icon: Clock,
      title: t("feature4Title"),
      description: t("feature4Desc"),
      color: "from-primary/20 to-primary/10",
    },
    {
      icon: Shield,
      title: t("feature5Title"),
      description: t("feature5Desc"),
      color: "from-secondary/20 to-secondary/10",
    },
    {
      icon: Zap,
      title: t("feature6Title"),
      description: t("feature6Desc"),
      color: "from-accent/20 to-accent/10",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t("featuresTitle")}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            {t("featuresSubtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/30 bg-white/50 backdrop-blur"
              >
                <div className="p-8">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
