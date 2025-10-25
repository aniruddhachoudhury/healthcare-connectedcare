"use client";

import { Shield, Lock, Users, CheckCircle2, Award } from "lucide-react";
import { useI18n } from "@/context/i18n-context";

export function Security() {
  const { t } = useI18n();

  const trustPoints = [
    {
      icon: Lock,
      title: t("sec1Title"),
      description: t("sec1Desc"),
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      icon: Users,
      title: t("sec2Title"),
      description: t("sec2Desc"),
      bgColor: "from-teal-50 to-teal-100",
    },
    {
      icon: Shield,
      title: t("sec3Title"),
      description: t("sec3Desc"),
      bgColor: "from-purple-50 to-purple-100",
    },
  ];

  const securityBadges = [
    { icon: Award, label: "ISO 27001", sublabel: "certified" },
    { icon: Lock, label: "256-bit", sublabel: "encryption" },
    { icon: Shield, label: "HIPAA", sublabel: "compliant" },
  ];

  const patientSecurityPoints = [
    t("patient1"),
    t("patient2"),
    t("patient3"),
    t("patient4"),
    t("patient5"),
  ];

  const doctorSecurityPoints = [
    t("doctor1"),
    t("doctor2"),
    t("doctor3"),
    t("doctor4"),
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-slate-50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 mb-20">
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div
                    className={`bg-gradient-to-br ${point.bgColor} rounded-2xl p-12 flex items-center justify-center min-h-64`}
                  >
                    <Icon className="w-24 h-24 text-primary opacity-40" />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    {point.title}
                  </h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl p-12 mb-20 shadow-lg border border-slate-100">
          <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            {t("securePlace")}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {securityBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-6 mb-4">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                  <p className="font-bold text-slate-900 text-lg">
                    {badge.label}
                  </p>
                  <p className="text-slate-600">{badge.sublabel}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              <h4 className="text-2xl font-bold text-slate-900">
                {t("patientSecurityTitle")}
              </h4>
            </div>
            <ul className="space-y-4">
              {patientSecurityPoints.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              <h4 className="text-2xl font-bold text-slate-900">
                {t("doctorSecurityTitle")}
              </h4>
            </div>
            <ul className="space-y-4">
              {doctorSecurityPoints.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
