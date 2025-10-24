"use client";

import { Card } from "@/components/ui/card";
import { Video, MapPin, Beaker, Stethoscope } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: Video,
    title: "Instant Video Consultation",
    description: "Connect within 60 secs",
    bgColor: "from-blue-100 to-blue-50",
    borderColor: "border-blue-200",
    image: "/doctor-video-consultation-on-phone.jpg",
  },
  {
    icon: MapPin,
    title: "Find Doctors Near You",
    description: "Confirmed appointments",
    bgColor: "from-teal-100 to-teal-50",
    borderColor: "border-teal-200",
    image: "/professional-doctor-portrait-stethoscope.jpg",
  },
  {
    icon: Beaker,
    title: "Lab Tests",
    description: "Safe and trusted lab tests",
    bgColor: "from-purple-100 to-purple-50",
    borderColor: "border-purple-200",
    image: "/lab-technician-blood-test-sample.jpg",
  },
  {
    icon: Stethoscope,
    title: "Surgeries",
    description: "Safe and trusted surgery centers",
    bgColor: "from-indigo-100 to-indigo-50",
    borderColor: "border-indigo-200",
    image: "/female-surgeon-doctor-in-green-scrubs.jpg",
  },
];

export function Services() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor} bg-gradient-to-br ${service.bgColor} overflow-hidden cursor-pointer hover:scale-105`}
              >
                <div className="flex flex-col items-start text-center h-full">
                  <div className="w-full h-56 relative overflow-hidden bg-gradient-to-br from-white/40 to-white/20">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 flex flex-col items-center flex-1">
                    <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
