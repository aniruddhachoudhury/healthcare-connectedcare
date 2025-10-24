"use client";

import { Card } from "@/components/ui/card";
import { Users, Calendar, Headphones, Clock, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Doctors",
    description:
      "Access a network of verified healthcare professionals across multiple specialties.",
    color: "from-primary/20 to-primary/10",
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description:
      "Book appointments in seconds with real-time availability and instant confirmation.",
    color: "from-secondary/20 to-secondary/10",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description:
      "Round-the-clock customer support to assist you with any questions or concerns.",
    color: "from-accent/20 to-accent/10",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description:
      "Choose appointment times that work best for your schedule, including weekends.",
    color: "from-primary/20 to-primary/10",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description:
      "Your health data is encrypted and protected with industry-leading security.",
    color: "from-secondary/20 to-secondary/10",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Get prescriptions and medical records delivered instantly to your inbox.",
    color: "from-accent/20 to-accent/10",
  },
];

export function Features() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Why Choose Cloud Connect?
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Experience healthcare booking like never before with our
            comprehensive platform.
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
