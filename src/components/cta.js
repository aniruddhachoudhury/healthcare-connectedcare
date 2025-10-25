"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function CTA() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent p-12 md:p-20 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              {t("ctaTitle")}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {t("ctaSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                {t("ctaStart")} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
              >
                {t("ctaLearn")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
