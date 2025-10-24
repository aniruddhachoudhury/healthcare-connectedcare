// Doctor Dashboard Application
// This file is designed to mimic the structure and functionality of the PatientDashboardApp
// but tailored for a doctor's workflow and using a distinct color scheme (Indigo).

"use client";

import React, { useState, useMemo } from "react";
import {
  Home,
  Clock,
  Activity,
  Users,
  Settings,
  FileText,
  Globe,
  Stethoscope,
  BriefcaseMedical,
  Calendar,
  LogOut,
  User,
  MapPin,
  Zap,
  MessageCircle,
  Star,
  TrendingUp,
  BarChart,
  ClipboardList,
  Briefcase,
  ChevronDown,
  CheckCircle,
  XCircle,
} from "lucide-react";

// =================================================================
// 0. MULTILINGUAL CONFIGURATION & MOCK DATA
// =================================================================

const translations = {
  en: {
    platformTitle: "Connected Cloud Clinical Console",
    doctorName: "Dr. Priya Sharma (Oncologist)",
    doctorSpecialty: "Oncology Specialist",
    doctorRating: 4.8,
    logout: "Logout",

    // Seating Options
    seating: {
      title: "Current Seating",
      consolidated: "Main Consolidated Practice",
      clinicA: "City Care Hospital (Clinic A)",
      opdOffice: "Own OPD Office (Remote)",
      pharmacy: "Local Partner Pharmacy",
    },

    // Navigation
    nav: {
      dashboard: "Dashboard",
      schedule: "Schedule & Queue",
      patientRecords: "Patient Records",
      clinicalAnalytics: "Clinical Analytics",
      continuingEd: "Continuing Education",
      settings: "Settings",
    },

    // Doctor Panel Content
    stats: {
      appointmentsToday: "Appointments Today",
      pendingReports: "Pending Reports",
      newPatients: "New Patients This Week",
      avgRating: "Average Rating",
    },
    alerts: {
      title: "Urgent Alerts & Reminders",
      alert1: "High-Risk Patients Flagged",
      alert1Detail:
        "2 patients flagged today based on BP > 160/100 mmHg. Review charts immediately.",
      alert2: "New Teleconsultation Request",
      alert2Detail: "Dr. A. Singh requested a co-consult for P007.",
      alert3: "Pending E-Signature",
      alert3Detail: "3 prescriptions awaiting your e-signature.",
    },

    // Main Content Titles
    scheduleTitle: "Today's Schedule & Patient Queue",
    recordsTitle: "Search Patient Medical Records",
    analyticsTitle: "Clinical Performance Analytics",
    ceTitle: "Continuing Education & Guidelines",
  },
  hi: {
    platformTitle: "जुड़े हुए क्लाउड क्लिनिकल कंसोल",
    doctorName: "डॉ. प्रिया शर्मा (कैंसर विशेषज्ञ)",
    doctorSpecialty: "कैंसर विशेषज्ञ",
    doctorRating: 4.8,
    logout: "लॉग आउट",

    // Seating Options
    seating: {
      title: "वर्तमान स्थान",
      consolidated: "मुख्य समेकित अभ्यास",
      clinicA: "सिटी केयर अस्पताल (क्लिनिक ए)",
      opdOffice: "खुद का ओपीडी कार्यालय (रिमोट)",
      pharmacy: "स्थानीय पार्टनर फार्मेसी",
    },

    // Navigation
    nav: {
      dashboard: "डैशबोर्ड",
      schedule: "शेड्यूल और कतार",
      patientRecords: "रोगी रिकॉर्ड",
      clinicalAnalytics: "क्लिनिकल एनालिटिक्स",
      continuingEd: "सतत शिक्षा",
      settings: "सेटिंग्स",
    },

    // Doctor Panel Content
    stats: {
      appointmentsToday: "आज के अपॉइंटमेंट",
      pendingReports: "लंबित रिपोर्ट",
      newPatients: "इस सप्ताह नए रोगी",
      avgRating: "औसत रेटिंग",
    },
    alerts: {
      title: "अति आवश्यक अलर्ट और रिमाइंडर",
      alert1: "उच्च जोखिम वाले रोगी फ़्लैग किए गए",
      alert1Detail:
        "2 रोगी आज बीपी > 160/100 mmHg के आधार पर फ़्लैग किए गए। तुरंत चार्ट की समीक्षा करें।",
      alert2: "नया टेलीकंसल्टेशन अनुरोध",
      alert2Detail: "डॉ. ए. सिंह ने P007 के लिए सह-परामर्श का अनुरोध किया।",
      alert3: "लंबित ई-हस्ताक्षर",
      alert3Detail: "3 नुस्खे आपके ई-हस्ताक्षर की प्रतीक्षा कर रहे हैं।",
    },

    // Main Content Titles
    scheduleTitle: "आज का शेड्यूल और रोगी कतार",
    recordsTitle: "रोगी मेडिकल रिकॉर्ड खोजें",
    analyticsTitle: "क्लिनिकल प्रदर्शन एनालिटिक्स",
    ceTitle: "सतत शिक्षा और दिशानिर्देश",
  },
  bn: {
    platformTitle: "সংযুক্ত ক্লাউড ক্লিনিক্যাল কনসোল",
    doctorName: "ডা. প্রিয়া শর্মা (অনকোলজিস্ট)",
    doctorSpecialty: "অনকোলজি বিশেষজ্ঞ",
    doctorRating: 4.8,
    logout: "লগ আউট",

    // Seating Options
    seating: {
      title: "বর্তমান আসন",
      consolidated: "প্রধান একত্রিত অনুশীলন",
      clinicA: "সিটি কেয়ার হাসপাতাল (ক্লিনিক এ)",
      opdOffice: "নিজস্ব ওপিডি অফিস (রিমোট)",
      pharmacy: "স্থানীয় অংশীদার ফার্মেসি",
    },

    // Navigation
    nav: {
      dashboard: "ড্যাশবোর্ড",
      schedule: "সময়সূচী ও কিউ",
      patientRecords: "রোগীর রেকর্ড",
      clinicalAnalytics: "ক্লিনিক্যাল অ্যানালিটিক্স",
      continuingEd: "ধারাবাহিক শিক্ষা",
      settings: "সেটিংস",
    },

    // Doctor Panel Content
    stats: {
      appointmentsToday: "আজকের অ্যাপয়েন্টমেন্ট",
      pendingReports: "বকেয়া রিপোর্ট",
      newPatients: "এই সপ্তাহে নতুন রোগী",
      avgRating: "গড় রেটিং",
    },
    alerts: {
      title: "জরুরী সতর্কতা ও অনুস্মারক",
      alert1: "ঝুঁকিপূর্ণ রোগীদের পতাকাঙ্কিত করা হয়েছে",
      alert1Detail:
        "BP > 160/100 mmHg এর ভিত্তিতে আজ 2 জন রোগীকে পতাকাঙ্কিত করা হয়েছে। অবিলম্বে চার্ট পর্যালোচনা করুন।",
      alert2: "নতুন টেলি-পরামর্শের অনুরোধ",
      alert2Detail: "ডা. এ. সিং P007 এর জন্য সহ-পরামর্শের অনুরোধ করেছেন।",
      alert3: "বকেয়া ই-স্বাক্ষর",
      alert3Detail: "3টি প্রেসক্রিপশন আপনার ই-স্বাক্ষরের জন্য অপেক্ষা করছে।",
    },

    // Main Content Titles
    scheduleTitle: "আজকের সময়সূচী ও রোগীর সারি",
    recordsTitle: "রোগীর মেডিকেল রেকর্ড অনুসন্ধান করুন",
    analyticsTitle: "ক্লিনিক্যাল পারফরম্যান্স অ্যানালিটিক্স",
    ceTitle: "ধারাবাহিক শিক্ষা ও নির্দেশিকা",
  },
};

const useTranslation = (lang) => {
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys) {
      if (!value || typeof value !== "object") return key;
      value = value[k];
    }
    return typeof value === "string" ? value : key;
  };
  return { t, language: lang };
};

// =================================================================
// 1. NAVIGATION COMPONENTS (TopNav & Sidebar)
// =================================================================

const TopNavDoctor = ({
  t,
  language,
  setLanguage,
  setRoute,
  currentSeating,
  setCurrentSeating,
}) => {
  const seatingOptions = useMemo(
    () => [
      { key: "consolidated", label: t("seating.consolidated") },
      { key: "clinicA", label: t("seating.clinicA") },
      { key: "opdOffice", label: t("seating.opdOffice") },
      { key: "pharmacy", label: t("seating.pharmacy") },
    ],
    [t]
  );

  return (
    <header className="fixed w-full bg-indigo-700 text-white p-4 flex justify-between items-center shadow-xl z-30">
      <h1 className="text-xl font-bold">{t("platformTitle")}</h1>

      <div className="flex items-center space-x-6 text-sm">
        {/* Doctor Name & Specialty */}
        <div className="hidden sm:flex items-center space-x-2 text-indigo-100 font-semibold">
          <Stethoscope className="w-4 h-4" />
          <span>{t("doctorName")}</span>
        </div>

        {/* Location/Seating Selector */}
        <div className="flex items-center space-x-2 bg-indigo-600 p-2 rounded-lg shadow-inner">
          <MapPin className="w-4 h-4 text-indigo-300" />
          <select
            value={currentSeating}
            onChange={(e) => setCurrentSeating(e.target.value)}
            className="bg-indigo-600 text-white cursor-pointer focus:outline-none"
          >
            {seatingOptions.map((opt) => (
              <option
                key={opt.key}
                value={opt.key}
                className="text-black bg-white"
              >
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-white text-indigo-700 rounded-md p-1 cursor-pointer font-medium"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="bn">বাংলা</option>
          </select>
        </div>

        <button
          onClick={() => setRoute("login")}
          className="flex items-center bg-red-600 hover:bg-red-700 transition duration-150 p-2 rounded-full font-medium"
        >
          <LogOut className="w-4 h-4 mr-1" />
          {t("logout")}
        </button>
      </div>
    </header>
  );
};

const DoctorSidebar = ({ t, setRoute }) => {
  const navItems = useMemo(
    () => [
      { name: "dashboard", icon: BarChart, route: "dashboard" },
      { name: "schedule", icon: Calendar, route: "schedule" },
      { name: "patientRecords", icon: FileText, route: "patientRecords" },
      {
        name: "clinicalAnalytics",
        icon: TrendingUp,
        route: "clinicalAnalytics",
      },
      { name: "continuingEd", icon: Briefcase, route: "continuingEd" },
      { name: "settings", icon: Settings, route: "settings" },
    ],
    []
  );

  return (
    <nav className="space-y-2">
      <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">
        {t("doctorSpecialty")}
      </h2>
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setRoute(item.route)}
          className="w-full text-left flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150 cursor-pointer focus:outline-none"
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium">{t(`nav.${item.name}`)}</span>
        </button>
      ))}
    </nav>
  );
};

// =================================================================
// 2. RIGHT PANEL COMPONENTS (DoctorRightPanel)
// =================================================================

const DoctorStatCard = ({ t, titleKey, value, Icon, color }) => (
  <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
    <div className="flex items-center justify-between">
      <Icon className={`w-8 h-8 ${color}`} />
      <span className="text-3xl font-extrabold text-gray-900">{value}</span>
    </div>
    <p className="text-sm text-gray-500 mt-2">{t(`stats.${titleKey}`)}</p>
  </div>
);

const DoctorAlertItem = ({ t, titleKey, detailKey, icon: Icon, color }) => (
  <div
    className="p-3 bg-white rounded-lg shadow-sm border-l-4"
    style={{ borderColor: color }}
  >
    <h4 className="flex items-center text-sm font-semibold text-gray-800">
      <Icon className="w-4 h-4 mr-2" style={{ color: color }} />
      {t(`alerts.${titleKey}`)}
    </h4>
    <p className="text-xs text-gray-500 mt-1">{t(`alerts.${detailKey}`)}</p>
    <button className="mt-2 text-xs text-indigo-500 hover:underline">
      Review
    </button>
  </div>
);

const DoctorRightPanel = ({ t }) => {
  const alerts = useMemo(
    () => [
      {
        titleKey: "alert1",
        detailKey: "alert1Detail",
        icon: Zap,
        color: "#ef4444",
      }, // Red for urgency
      {
        titleKey: "alert2",
        detailKey: "alert2Detail",
        icon: MessageCircle,
        color: "#3b82f6",
      }, // Blue for communication
      {
        titleKey: "alert3",
        detailKey: "alert3Detail",
        icon: ClipboardList,
        color: "#f59e0b",
      }, // Amber for tasks
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <DoctorStatCard
          t={t}
          titleKey="appointmentsToday"
          value={12}
          Icon={Calendar}
          color="text-indigo-600"
        />
        <DoctorStatCard
          t={t}
          titleKey="pendingReports"
          value={7}
          Icon={FileText}
          color="text-yellow-600"
        />
        <DoctorStatCard
          t={t}
          titleKey="newPatients"
          value={3}
          Icon={Users}
          color="text-green-600"
        />
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex flex-col justify-center">
          <p className="text-3xl font-extrabold text-gray-900 flex items-center">
            {t("doctorRating")}{" "}
            <Star className="w-5 h-5 ml-1 text-yellow-500 fill-yellow-500" />
          </p>
          <p className="text-sm text-gray-500 mt-1">{t("stats.avgRating")}</p>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="p-4 bg-indigo-50 rounded-xl shadow border border-indigo-200">
        <h3 className="text-lg font-bold text-indigo-800 mb-3">
          {t("alerts.title")}
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <DoctorAlertItem key={index} t={t} {...alert} />
          ))}
        </div>
      </div>
    </div>
  );
};

// =================================================================
// 3. MAIN CONTENT COMPONENTS (Dashboard, Schedule, Records, Analytics, CE)
// =================================================================

const DoctorDashboardContent = ({ t }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">{t("nav.dashboard")}</h2>
    <p className="text-gray-600">
      Quick overview of daily statistics and critical patient alerts.
    </p>

    {/* Mock Charts */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg h-64 flex items-center justify-center">
        <p className="text-indigo-500 font-semibold">
          Mock: Daily Consultations (Bar Chart)
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg h-64 flex items-center justify-center">
        <p className="text-indigo-500 font-semibold">
          Mock: Patient Demographics (Pie Chart)
        </p>
      </div>
    </div>
  </div>
);

const DoctorScheduleContent = ({ t }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">{t("scheduleTitle")}</h2>
    <p className="text-gray-600">
      Manage appointments and check patient status in the queue.
    </p>

    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-indigo-700">
        Today: Tuesday, Oct 22
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 border-b">
          <span className="font-medium">10:00 AM - Asha Devi (P011)</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            In Queue
          </span>
        </div>
        <div className="flex justify-between items-center p-3 border-b">
          <span className="font-medium">10:30 AM - Vinay Gupta (P012)</span>
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Consulting
          </span>
        </div>
        <div className="flex justify-between items-center p-3">
          <span className="font-medium">11:00 AM - Sanjay Kumar (P013)</span>
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            Waiting
          </span>
        </div>
      </div>
      <button className="mt-4 text-white bg-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-700">
        View Full Schedule
      </button>
    </div>
  </div>
);

const DoctorRecordsContent = ({ t }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">{t("recordsTitle")}</h2>
    <p className="text-gray-600">
      Search patient history, diagnostic reports, and notes.
    </p>
    <input
      type="text"
      placeholder="Search by Patient ID, Name, or Report Type..."
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
    />
    <div className="bg-white p-6 rounded-xl shadow-lg h-48 flex items-center justify-center">
      <p className="text-gray-500">List of Patient Records will appear here.</p>
    </div>
  </div>
);

const DoctorAnalyticsContent = ({ t }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">{t("analyticsTitle")}</h2>
    <p className="text-gray-600">
      Review clinical efficiency and outcome metrics.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-green-100 p-4 rounded-xl shadow">
        Outcome Success Rate: 85%
      </div>
      <div className="bg-yellow-100 p-4 rounded-xl shadow">
        Average Consultation Time: 18 min
      </div>
      <div className="bg-blue-100 p-4 rounded-xl shadow">
        E-Prescription Adoption: 98%
      </div>
    </div>
  </div>
);

const DoctorCEContent = ({ t }) => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold text-gray-900">{t("ceTitle")}</h2>
    <p className="text-gray-600">
      Access latest research, guidelines, and continuing education modules.
    </p>
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <p className="font-semibold text-indigo-700">
        New Oncology Guidelines (2025)
      </p>
      <p className="text-sm text-gray-500">
        Video Module available now. Complete by Nov 30.
      </p>
      <button className="mt-3 text-sm text-white bg-indigo-500 px-3 py-1 rounded-full hover:bg-indigo-600">
        Start Module
      </button>
    </div>
  </div>
);

const DoctorFallbackContent = ({ t, route }) => {
  const routeName = t(`nav.${route}`) || route;
  return (
    <div className="text-center p-10 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
      <h2 className="text-3xl font-bold text-indigo-800 mb-2">{routeName}</h2>
      <p className="text-gray-600">
        Content for this professional area is currently under development.
      </p>
    </div>
  );
};

// =================================================================
// 4. MAIN DASHBOARD APPLICATION
// =================================================================

export default function DoctorDashboardApp() {
  const [language, setLanguage] = useState("en");
  const [currentRoute, setCurrentRoute] = useState("dashboard");
  const [currentSeating, setCurrentSeating] = useState("consolidated");

  const { t } = useTranslation(language);

  const handleSetLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  // Determine which component to render in the main content area
  const renderContent = () => {
    switch (currentRoute) {
      case "dashboard":
        return <DoctorDashboardContent t={t} />;
      case "schedule":
        return <DoctorScheduleContent t={t} />;
      case "patientRecords":
        return <DoctorRecordsContent t={t} />;
      case "clinicalAnalytics":
        return <DoctorAnalyticsContent t={t} />;
      case "continuingEd":
        return <DoctorCEContent t={t} />;
      case "settings":
        // Using a fallback for settings in this version
        return <DoctorFallbackContent t={t} route={currentRoute} />;
      default:
        return <DoctorFallbackContent t={t} route={currentRoute} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Top Navigation Panel (Fixed) */}
      <TopNavDoctor
        t={t}
        language={language}
        setLanguage={handleSetLanguage}
        setRoute={() => console.log("Simulated Logout")}
        currentSeating={currentSeating}
        setCurrentSeating={setCurrentSeating}
      />

      <div className="flex flex-1 pt-16">
        {" "}
        {/* pt-16 to offset the fixed TopNav */}
        {/* Left Panel (Sidebar - Fixed) */}
        <aside className="w-64 fixed top-16 bottom-0 overflow-y-auto bg-white shadow-lg p-4 z-20 hidden md:block border-r border-gray-100">
          <DoctorSidebar t={t} setRoute={setCurrentRoute} />
        </aside>
        {/* Center Content Area (Scrolls) */}
        <main className="flex-1 p-6 md:ml-64 lg:mr-80 min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
        {/* Right Panel (Stats & Alerts - Fixed) */}
        <aside className="w-80 fixed top-16 right-0 bottom-0 overflow-y-auto bg-gray-100 p-4 shadow-xl z-20 hidden lg:block border-l border-gray-200">
          <DoctorRightPanel t={t} />
        </aside>
      </div>
    </div>
  );
}
