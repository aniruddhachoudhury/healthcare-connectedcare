"use client";

import React, { useState } from "react";
import {
  Stethoscope,
  Building,
  Activity,
  Scan,
  Pill,
  Lock,
  Heart,
} from "lucide-react";

const SegmentedAdsCards = ({ segmentedAds, t }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categoryConfig = {
    Doctors: {
      icon: Stethoscope,
      bgColor: "bg-blue-500",
      hoverBorder: "hover:border-blue-500",
      borderColor: "border-blue-500",
      distanceBg: "bg-blue-500",
    },
    Hospitals: {
      icon: Building,
      bgColor: "bg-purple-500",
      hoverBorder: "hover:border-purple-500",
      borderColor: "border-purple-500",
      distanceBg: "bg-purple-500",
    },
    ["Diagnostic Centers"]: {
      icon: Activity,
      bgColor: "bg-green-500",
      hoverBorder: "hover:border-green-500",
      borderColor: "border-green-500",
      distanceBg: "bg-green-500",
    },
    "Radiology Centers": {
      icon: Scan,
      bgColor: "bg-red-500",
      hoverBorder: "hover:border-red-500",
      borderColor: "border-red-500",
      distanceBg: "bg-red-500",
    },
    Pharmacies: {
      icon: Pill,
      bgColor: "bg-orange-500",
      hoverBorder: "hover:border-orange-500",
      borderColor: "border-orange-500",
      distanceBg: "bg-orange-500",
    },
    "Insurance Agents": {
      icon: Lock,
      bgColor: "bg-indigo-500",
      hoverBorder: "hover:border-indigo-500",
      borderColor: "border-indigo-500",
      distanceBg: "bg-indigo-500",
    },
    "Asha Workers": {
      icon: Heart,
      bgColor: "bg-pink-500",
      hoverBorder: "hover:border-pink-500",
      borderColor: "border-pink-500",
      distanceBg: "bg-pink-500",
    },
  };

  const handleCategoryClick = (segmentKey) => {
    setActiveCategory(activeCategory === segmentKey ? null : segmentKey);
  };

  const handleClose = () => {
    setActiveCategory(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-slate-900 text-slate-50 min-h-screen">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Top Healthcare Near By Services
      </h1>
      <p className="text-center text-slate-300 mb-12 text-lg">
        Select a category to explore available services
      </p>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {segmentedAds.map((segment, index) => {
          const config = categoryConfig[segment.title] || {};
          const Icon = config.icon;
          const isActive = activeCategory === segment.title;

          return (
            <div
              key={index}
              onClick={() => handleCategoryClick(segment.title)}
              className={`
                bg-slate-800 rounded-2xl p-6 cursor-pointer 
                transition-all duration-300 ease-in-out
                border-2 hover:scale-105 hover:shadow-2xl
                ${isActive ? `${config.borderColor} shadow-2xl ${config.glowClass}` : 'border-transparent'}
                ${config.hoverBorder}
                relative overflow-hidden
            `}
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${config.bgColor}`}
              ></div>

              {/* Icon */}
              <div
                className={`w-16 h-16 ${config.bgColor} rounded-xl flex items-center justify-center mb-4`}
              >
                {Icon && <Icon size={32} className="text-white" />}
              </div>

              {/* Title */}
              <div className="text-xl font-semibold text-slate-50 mb-2">
                {segment.title}
              </div>

              {/* Count */}
              <div className="text-slate-400 text-sm">
                {segment.ads.length}{" "}
                {segment.title === "Doctors" ? "specialists" : "facilities"}{" "}
                available
              </div>
            </div>
          );
        })}
      </div>

      {/* Horizontal Lists */}
      {segmentedAds.map((segment, index) => {
        const config = categoryConfig[segment.title] || {};
        const isActive = activeCategory === segment.title;

        if (!isActive) return null;

        return (
          <div key={index} className="animate-fade-in">
            {/* List Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-semibold text-slate-50">
                {segment.title}
              </h2>
              <button
                onClick={handleClose}
                className="bg-slate-800 hover:bg-blue-600 text-slate-50 px-6 py-3 rounded-lg transition-all duration-300 font-medium"
              >
                ✕ Close
              </button>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-4 horizontal-scroll">
              {segment.ads.map((ad, adIndex) => (
                <div
                  key={adIndex}
                  className={`
                    min-w-[320px] bg-slate-800 rounded-xl p-6 
                    border-2 transition-all duration-300
                    hover:-translate-y-2 hover:shadow-xl
                    ${config.borderColor}
                  `}
                >
                  {/* Item Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="text-xl font-semibold text-slate-50 mb-1">
                        {ad.name}
                      </div>
                      <div className="text-slate-400 text-sm">
                        {ad.speciality}
                      </div>
                    </div>
                    <div
                      className={`${config.distanceBg} text-white px-3 py-1 rounded-full text-sm whitespace-nowrap ml-2`}
                    >
                      {ad.distance} km
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="flex gap-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-semibold">
                        ⭐ {ad.googleRating}
                      </span>
                      <span className="text-slate-400 text-sm">Google</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-semibold">
                        ⭐ {ad.platformRating}
                      </span>
                      <span className="text-slate-400 text-sm">Platform</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SegmentedAdsCards;
