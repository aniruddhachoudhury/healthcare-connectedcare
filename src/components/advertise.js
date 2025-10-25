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
  const [activeCategory, setActiveCategory] = useState('Doctors');

  const categoryConfig = {
    Doctors: {
      icon: Stethoscope,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "bg-blue-500",
      hoverBorder: "hover:border-blue-500",
      borderColor: "border-blue-500",
      distanceBg: "bg-blue-500",
      glowClass: "border-glow-blue",
      textColor: "text-blue-900"
    },
    Hospitals: {
      icon: Building,
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      iconColor: "bg-purple-500",
      hoverBorder: "hover:border-purple-500",
      borderColor: "border-purple-500",
      distanceBg: "bg-purple-500",
      glowClass: "border-glow-purple",
      textColor: "text-purple-900"
    },
    "Diagnostic Centers": {
      icon: Activity,
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      iconColor: "bg-emerald-500",
      hoverBorder: "hover:border-emerald-500",
      borderColor: "border-emerald-500",
      distanceBg: "bg-emerald-500",
      glowClass: "border-glow-green",
      textColor: "text-emerald-900"
    },
    "Radiology Centers": {
      icon: Scan,
      bgColor: "bg-gradient-to-br from-rose-50 to-rose-100",
      iconColor: "bg-rose-500",
      hoverBorder: "hover:border-rose-500",
      borderColor: "border-rose-500",
      distanceBg: "bg-rose-500",
      glowClass: "border-glow-red",
      textColor: "text-rose-900"
    },
    Pharmacies: {
      icon: Pill,
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      iconColor: "bg-amber-500",
      hoverBorder: "hover:border-amber-500",
      borderColor: "border-amber-500",
      distanceBg: "bg-amber-500",
      glowClass: "border-glow-orange",
      textColor: "text-amber-900"
    },
    "Insurance Agents": {
      icon: Lock,
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100",
      iconColor: "bg-indigo-500",
      hoverBorder: "hover:border-indigo-500",
      borderColor: "border-indigo-500",
      distanceBg: "bg-indigo-500",
      glowClass: "border-glow-indigo",
      textColor: "text-indigo-900"
    },
    "Asha Workers": {
      icon: Heart,
      bgColor: "bg-gradient-to-br from-pink-50 to-pink-100",
      iconColor: "bg-pink-500",
      hoverBorder: "hover:border-pink-500",
      borderColor: "border-pink-500",
      distanceBg: "bg-pink-500",
      glowClass: "border-glow-pink",
      textColor: "text-pink-900"
    },
  };

  const handleCategoryClick = (segmentKey) => {
    setActiveCategory(activeCategory === segmentKey ? null : segmentKey);
  };

  const handleClose = () => {
    setActiveCategory(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Title Section */}
      <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Top Healthcare Near By Services
      </h1>
      <p className="text-center text-gray-600 mb-12 text-lg">
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
                ${config.bgColor} rounded-2xl p-6 cursor-pointer 
                transition-all duration-300 ease-in-out
                border-2 hover:scale-105 hover:shadow-xl
                ${isActive ? `${config.borderColor} shadow-xl ${config.glowClass}` : 'border-white'}
                ${config.hoverBorder}
                relative overflow-hidden
            `}
            >
              {/* Top accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${config.iconColor}`}
              ></div>

              {/* Icon */}
              <div
                className={`w-16 h-16 ${config.iconColor} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
              >
                {Icon && <Icon size={32} className="text-white" />}
              </div>

              {/* Title */}
              <div className={`text-xl font-semibold mb-2 ${config.textColor}`}>
                {segment.title}
              </div>

              {/* Count */}
              <div className="text-gray-600 text-sm font-medium">
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
              <h2 className={`text-3xl font-semibold ${config.textColor}`}>
                {segment.title}
              </h2>
              {/* <button
                onClick={handleClose}
                className={`${config.iconColor} hover:opacity-90 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium shadow-md`}
              >
                ✕ Close
              </button> */}
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-4 horizontal-scroll">
              {segment.ads.map((ad, adIndex) => (
                <div
                  key={adIndex}
                  className={`
                    min-w-[320px] bg-white rounded-xl p-6 
                    border-2 transition-all duration-300 shadow-md
                    hover:-translate-y-2 hover:shadow-xl
                    ${config.borderColor}
                  `}
                >
                  {/* Item Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="text-xl font-semibold text-gray-900 mb-1">
                        {ad.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {ad.speciality}
                      </div>
                    </div>
                    <div
                      className={`${config.distanceBg} text-white px-3 py-1 rounded-full text-sm whitespace-nowrap ml-2 font-medium shadow-sm`}
                    >
                      {ad.distance} km
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-semibold">
                        ⭐ {ad.googleRating}
                      </span>
                      <span className="text-gray-500 text-sm">Google</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-semibold">
                        ⭐ {ad.platformRating}
                      </span>
                      <span className="text-gray-500 text-sm">Platform</span>
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
