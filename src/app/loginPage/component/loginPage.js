"use client";
import React, { useState, useMemo } from "react";

import {
  Keyboard,
  Scan,
  Mic,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Globe,
  User,
  Lock,
  Heart,
  Stethoscope,
  Users,
  Building,
  Clipboard,
  Activity,
  LogOut,
  FileText,
  Calendar,
  Home,
} from "lucide-react";

import PatientDashboard from "../../patients/components/PatientDashboard";
import DoctorDashboard from "../../doctor/component/DoctorDashboard";
import { Header } from "../../../components/header";
import { getLanguage, useLanguage } from "@/lib/utils";

// --- Global Translation Data ---
const translations = {
  en: {
    platformTitle: "Connected Cloud Treatment & Care",
    logout: "Logout",
    login: {
      title: "Welcome to Unified Health",
      subtitle: "Select your role and log in.",
      role: "Select Your Persona",
      userId: "User ID, Email, or Phone Number (Demo: demo)",
      password: "Password (Demo: demo)",
      loginButton: "Log In",
      register: "Register Now",
      forgotPassword: "Forgot Password?",
    },
    dashboard: {
      greeting: "Hello",
      contextCancer: "You are currently managing your Oncology treatment plan.",
      contextDiabetes: "You are currently managing your Diabetes care plan.",
      contextGeneral: "Welcome to your general health dashboard.",
      journeyTitle: "Your Current Care Journey",
      actionBookAppointment: "Book New Appointment",
      descBookAppointment:
        "Schedule a video or in-clinic consultation with your specialist.",
      actionViewReports: "View Latest Reports",
      descViewReports:
        "Access prescriptions, lab results, and diagnostic scans.",
      actionMedication: "Medication Refill",
      descMedication:
        "Order repeat prescriptions and view your medication schedule.",
      descChat: "Connect instantly with a human agent or AI assistant.",
      step1: "Asha Worker Onboarding",
      step2: "Specialist Consultation",
      step3: "Diagnostic Testing Scheduled",
    },
    register: {
      title: "New Account Registration",
      role: "Select Persona for Registration",
      successMessage:
        "Registration submitted! Awaiting administrator approval.",
    },
    ads: { title: "Nearby Service Advertisements (Live Feed)" },
    adsSegmentTitle: "Top relevant Advertisements", // NEW TITLE
    // *** UPDATED: Segment Titles ***
    segmentTitles: {
      Doctors: "Doctors",
      Hospitals: "Hospitals",
      DiagnosticCenters: "Diagnostic Centers",
      RadiologyCenters: "Radiology Centers",
      Pharmacies: "Pharmacies",
      InsuranceAgents: "Insurance Agents",
      AshaWorkers: "Asha Workers",
    },
    roles: {
      patient: "Patient",
      doctor: "Doctor",
      aarogya_bondhu: "Aarogya Bondhu",
      connected_cloud: "Connected Cloud",
      clinical_institution: "Clinical Institution",
      patient_cancer: "Patient (Oncology)",
      patient_diabetes: "Patient (Diabetes)",
      asha_worker: "Asha Worker (Community Health)",
      cloud_admin: "Cloud Admin",
      doctor_cancer: "Doctor (Oncology Specialist)",
      hospital_staff: "Hospital Staff / Nurse",
      diagnostic_center: "Diagnostic Lab Admin",
      pharmacy: "Pharmacy Admin",
      radiologist: "Radiologist",
    },
    onboarding: {
      title: "Patient Onboarding",
      inputTabs: {
        typing: "Typing Input",
        scan: "Aadhaar/ID Scan",
        voice: "Voice Input",
      },
      fields: {
        fullName: "Patient Full Name",
        age: "Age",
        phone: "Phone Number",
        condition: "Health Status / Condition (e.g., Cancer Care, Diabetes)",
      },
      scanPlaceholder: "Place Aadhaar / ID under scanner...",
      voicePlaceholder: "Hold to Speak Patient Details...",
      buttons: { save: "Save / Submit", cancel: "Cancel" },
    },
    chat: {
      connectUs: "Connect With Us / Chatbot",
      startChat: "Start Chat",
      phone: "Phone: +91 XXXX XXXXX",
      email: "Email: support@xxxxxx.com",
      modalTitle: "AI Health Assistant",
      greeting:
        "Hello! How can I assist you with your health query or booking today?",
      exampleQuery: "How do I book a Radiology test?",
      exampleResponse:
        "Navigate to OPD Booking > Radiology > Select Center > Choose Slot. We can help you start the process.",
      typeMessage: "Type your message...",
      send: "Send",
    },
    services: {
      doctor: "Dr. Priya Sharma – Cancer Specialist",
      diagnostic_center: "Advanced Diagnostics Lab",
      hospital: "City Care Hospital",
      radiology: "Precision Radiology Center",
      insurance: "SecureLife Insurance Agent",
      asha_worker: "Asha Devi – Community Health Worker",
      pharmacy: "HealthPlus Pharmacy",
    },
  },
  hi: {
    platformTitle: "जुड़े हुए क्लाउड उपचार और देखभाल",
    logout: "लॉग आउट",
    login: {
      title: "एकीकृत स्वास्थ्य में आपका स्वागत है",
      subtitle: "अपनी भूमिका चुनें और लॉग इन करें।",
      role: "अपनी भूमिका चुनें",
      userId: "यूजर आईडी, ईमेल, या फ़ोन नंबर (डेमो: demo)",
      password: "पासवर्ड (डेमो: demo)",
      loginButton: "लॉग इन करें",
      register: "अभी पंजीकरण करें",
      forgotPassword: "पासवर्ड भूल गए?",
    },
    dashboard: {
      greeting: "नमस्ते",
      contextCancer:
        "आप वर्तमान में अपनी कैंसर उपचार योजना का प्रबंधन कर रहे हैं।",
      contextDiabetes:
        "आप वर्तमान में अपनी मधुमेह देखभाल योजना का प्रबंधन कर रहे हैं।",
      contextGeneral: "आपके सामान्य स्वास्थ्य डैशबोर्ड में आपका स्वागत है।",
      journeyTitle: "आपकी वर्तमान देखभाल यात्रा",
      actionBookAppointment: "नया अपॉइंटमेंट बुक करें",
      descBookAppointment:
        "अपने विशेषज्ञ के साथ एक वीडियो या इन-क्लिनिक परामर्श शेड्यूल करें।",
      actionViewReports: "नवीनतम रिपोर्ट देखें",
      descViewReports: "नुस्खे, लैब परिणाम और नैदानिक ​​स्कैन एक्सेस करें।",
      actionMedication: "दवा की पुनःपूर्ति",
      descMedication: "दोबारा नुस्खे ऑर्डर करें और अपनी दवा का शेड्यूल देखें।",
      descChat: "मानव एजेंट या एआई सहायक के साथ तुरंत जुड़ें।",
      step1: "आशा कार्यकर्ता ऑनबोर्डिंग",
      step2: "विशेषज्ञ परामर्श",
      step3: "नैदानिक ​​परीक्षण निर्धारित",
    },
    register: {
      title: "नया खाता पंजीकरण",
      role: "पंजीकरण के लिए भूमिका चुनें",
      successMessage:
        "पंजीकरण जमा कर दिया गया है! व्यवस्थापक की मंजूरी का इंतजार है।",
    },
    ads: { title: "निकटवर्ती सेवा विज्ञापन (लाइव फ़ीड)" },
    adsSegmentTitle: "शीर्ष प्रासंगिक विज्ञापन", // NEW TITLE
    // *** UPDATED: Segment Titles ***
    segmentTitles: {
      Doctors: "डॉक्टर",
      Hospitals: "अस्पताल",
      DiagnosticCenters: "डायग्नोस्टिक केंद्र",
      RadiologyCenters: "रेडियोलॉजी केंद्र",
      Pharmacies: "फार्मेसी",
      InsuranceAgents: "बीमा एजेंट",
      AshaWorkers: "आशा कार्यकर्ता",
    },
    roles: {
      patient: "मरीज़",
      doctor: "डॉक्टर",
      aarogya_bondhu: "आरोग्य बंधु",
      connected_cloud: "कनेक्टेड क्लाउड",
      clinical_institution: "क्लिनिकल संस्थान",
      patient_cancer: "मरीज़ (कैंसर)",
      patient_diabetes: "मरीज़ (मधुमेह)",
      asha_worker: "आशा कार्यकर्ता (सामुदायिक स्वास्थ्य)",
      cloud_admin: "क्लाउड प्रशासक",
      doctor_cancer: "डॉक्टर (कैंसर विशेषज्ञ)",
      hospital_staff: "अस्पताल कर्मचारी / नर्स",
      diagnostic_center: "डायग्नोस्टिक लैब प्रशासक",
      pharmacy: "फार्मेसी प्रशासक",
      radiologist: "रेडियोलॉजिस्ट",
    },
    onboarding: {
      title: "मरीज़ ऑनबोर्डिंग",
      inputTabs: {
        typing: "टाइपिंग इनपुट",
        scan: "आधार/आईडी स्कैन",
        voice: "वॉयस इनपुट",
      },
      fields: {
        fullName: "मरीज़ का पूरा नाम",
        age: "आयु",
        phone: "फ़ोन नंबर",
        condition: "स्वास्थ्य स्थिति / हालत (जैसे, कैंसर केयर, मधुमेह)",
      },
      scanPlaceholder: "स्कैनर के नीचे आधार/आईडी रखें...",
      voicePlaceholder: "मरीज़ का विवरण बोलने के लिए होल्ड करें...",
      buttons: { save: "सेव / सबमिट करें", cancel: "रद्द करें" },
    },
    chat: {
      connectUs: "हमसे संपर्क करें / चैटबॉट",
      startChat: "चैट शुरू करें",
      phone: "फ़ोन: +91 98765 43210",
      email: "ईमेल: support@unifiedhealth.com",
      modalTitle: "एआई स्वास्थ्य सहायक",
      greeting:
        "नमस्ते! मैं आपके स्वास्थ्य संबंधी प्रश्न या बुकिंग में कैसे सहायता कर सकता हूँ?",
      exampleQuery: "मैं एक रेडियोलॉजी टेस्ट कैसे बुक करूं?",
      exampleResponse:
        "ओपीडी बुकिंग > रेडियोलॉजी > सेंटर चुनें > स्लॉट चुनें पर नेविगेट करें। हम आपकी प्रक्रिया शुरू करने में सहायता कर सकते हैं।",
      typeMessage: "अपना संदेश टाइप करें...",
      send: "भेजें",
    },
    services: {
      doctor: "डॉ. प्रिया शर्मा – कैंसर विशेषज्ञ",
      diagnostic_center: "एडवांस्ड डायग्नोस्टिक लैब",
      hospital: "सिटी केयर अस्पताल",
      radiology: "प्रिसिजन रेडियोलॉजी सेंटर",
      insurance: "सिक्योरलाइफ इंश्योरेंस एजेंट",
      asha_worker: "आशा देवी – सामुदायिक स्वास्थ्य कार्यकर्ता",
      pharmacy: "हेल्थप्लस फार्मेसी",
    },
  },
  bn: {
    platformTitle: "সংযুক্ত ক্লাউড চিকিৎসা ও যত্ন",
    logout: "লগ আউট",
    login: {
      title: "ইউনিফাইড হেলথে আপনাকে স্বাগতম",
      subtitle: "আপনার ভূমিকা নির্বাচন করুন এবং লগইন করুন।",
      role: "আপনার ভূমিকা নির্বাচন করুন",
      userId: "ইউজার আইডি, ইমেল, বা ফোন নম্বর (ডেমো: demo)",
      password: "পাসওয়ার্ড (ডেমো: demo)",
      loginButton: "লগইন করুন",
      register: "এখন নিবন্ধন করুন",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    },
    dashboard: {
      greeting: "নমস্কার",
      contextCancer:
        "আপনি বর্তমানে আপনার অনকোলজি চিকিৎসা পরিকল্পনা পরিচালনা করছেন।",
      contextDiabetes:
        "আপনি বর্তমানে আপনার ডায়াবেটিস পরিচর্যা পরিকল্পনা পরিচালনা করছেন।",
      contextGeneral: "আপনার সাধারণ স্বাস্থ্য ড্যাশবোর্ডে স্বাগতম।",
      journeyTitle: "আপনার বর্তমান পরিচর্যা যাত্রা",
      actionBookAppointment: "নতুন অ্যাপয়েন্টমেন্ট বুক করুন",
      descBookAppointment:
        "আপনার বিশেষজ্ঞের সাথে একটি ভিডিও বা ইন-ক্লিনিক পরামর্শের সময়সূচী করুন।",
      actionViewReports: "সর্বশেষ রিপোর্ট দেখুন",
      descViewReports:
        "প্রেসক্রিপশন, ল্যাব ফলাফল এবং ডায়াগনস্টিক স্ক্যান অ্যাক্সেস করুন।",
      actionMedication: "ওষুধ রিফিল",
      descMedication:
        "পুনরাবৃত্তি প্রেসক্রিপশন অর্ডার করুন এবং আপনার ওষুধের সময়সূচী দেখুন।",
      descChat: "মানব এজেন্ট বা এআই সহকারীর সাথে তাত্ক্ষণিকভাবে সংযোগ করুন।",
      step1: "আশা কর্মী অনবোর্ডিং",
      step2: "বিশেষজ্ঞের পরামর্শ",
      step3: "ডায়াগনস্টিক টেস্টিং নির্ধারিত",
    },
    register: {
      title: "নয়া অ্যাকাউন্ট নিবন্ধন",
      role: "পঞ্জিকরণের জন্য ভূমিকা নির্বাচন করুন",
      successMessage:
        "পঞ্জিকরণ জমা দেওয়া হয়েছে! প্রশাসকের অনুমোদনের জন্য অপেক্ষা করা হচ্ছে।",
    },
    ads: { title: "আশেপাশের পরিষেবা বিজ্ঞাপন (লাইভ ফিড)" },
    adsSegmentTitle: "শীর্ষ প্রাসঙ্গিক বিজ্ঞাপন", // NEW TITLE
    // *** UPDATED: Segment Titles ***
    segmentTitles: {
      Doctors: "ডাক্তার",
      Hospitals: "হাসপাতাল",
      DiagnosticCenters: "ডায়াগনস্টিক কেন্দ্র",
      RadiologyCenters: "রেডিওলজি কেন্দ্র",
      Pharmacies: "ফার্মেসি",
      InsuranceAgents: "বীমা এজেন্ট",
      AshaWorkers: "আশা কর্মী",
    },
    roles: {
      patient: "রোগী",
      doctor: "ডাক্তার",
      aarogya_bondhu: "আরোগ্য বন্ধু",
      connected_cloud: "সংযুক্ত মেঘ",
      clinical_institution: "ক্লিনিক্যাল প্রতিষ্ঠান",
      patient_cancer: "রোগী (অনকোলজি)",
      patient_diabetes: "রোগী (ডায়াবেটিস)",
      asha_worker: "আশা কর্মী (কমিউনিটি হেলথ)",
      cloud_admin: "ক্লাউড প্রশাসক",
      doctor_cancer: "ডাক্তার (ক্যান্সার বিশেষজ্ঞ)",
      hospital_staff: "হাসপাতাল কর্মী / নার্স",
      diagnostic_center: "ডায়াগনস্টিক ল্যাব প্রশাসক",
      pharmacy: "ফার্মেসি প্রশাসক",
      radiologist: "রেডিওলজিস্ট",
    },
    onboarding: {
      title: "রোগী অনবোর্ডিং",
      inputTabs: {
        typing: "টাইপিং ইনপুট",
        scan: "আধার/আইডি স্ক্যান",
        voice: "ভয়েস ইনপুট",
      },
      fields: {
        fullName: "রোগীর সম্পূর্ণ নাম",
        age: "বয়স",
        phone: "ফোন নম্বর",
        condition:
          "স্বাস্থ্য স্থিতি / অবস্থা (যেমন, ক্যান্সার কেয়ার, ডায়াবেটিস)",
      },
      scanPlaceholder: "স্ক্যানারের নিচে আধার/আইডি রাখুন...",
      voicePlaceholder: "রোগীর বিবরণ বলার জন্য ধরে রাখুন...",
      buttons: { save: "সেভ / জমা দিন", cancel: "বাতিল" },
    },
    chat: {
      connectUs: "আমাদের সাথে যোগাযোগ / চ্যাটবট",
      startChat: "চ্যাট শুরু করুন",
      phone: "ফোন: +91 98765 43210",
      email: "ইমেল: support@unifiedhealth.com",
      modalTitle: "এআই স্বাস্থ্য সহকারী",
      greeting:
        "হ্যালো! আমি আপনার স্বাস্থ্য সংক্রান্ত প্রশ্ন বা বুকিংয়ে কিভাবে সাহায্য করতে পারি?",
      exampleQuery: "আমি একটি রেডিওলজি পরীক্ষা কিভাবে বুক করব?",
      exampleResponse:
        "ওপিডি বুকিং > রেডিওলজি > সেন্টার নির্বাচন > স্লট নির্বাচন-এ নেভিগেট করুন। আমরা আপনাকে প্রক্রিয়া শুরু করতে সাহায্য করতে পারি।",
      typeMessage: "আপনার বার্তা টাইপ করুন...",
      send: "পাঠান",
    },
    services: {
      doctor: "ডা. প্রিয়া শর্মা – ক্যান্সার বিশেষজ্ঞ",
      diagnostic_center: "অ্যাডভান্সড ডায়াগনস্টিক ল্যাব",
      hospital: "সিটি কেয়ার হাসপাতাল",
      radiology: "প্রিসিশন রেডিওলজি সেন্টার",
      insurance: "সিকিউরলাইফ ইনস্যুরেন্স এজেন্ট",
      asha_worker: "আশা দেবী – কমিউনিটি হেলথ ওয়ার্কার",
      pharmacy: "হেলথপ্লাস ফার্মেসি",
    },
  },
};

// Simplified translation lookup function
const useTranslationMock = (lang) => {
  const t = (key) => {
    // Navigate through the nested key structure (e.g., 'login.title')
    const keys = key.split(".");
    let value = translations[lang];
    for (const k of keys) {
      if (!value || typeof value !== "object") return key; // Fallback to key if not found
      value = value[k];
    }
    return typeof value === "string" ? value : key;
  };
  return { t, language: lang };
};

// --- Mock Data Constants & Helpers for Segmented Ads ---
const DOCTOR_NAMES = {
  en: [
    "Dr. Rohan Patel",
    "Dr. Anjali Rao",
    "Dr. Vivek Singh",
    "Dr. Neha Kapoor",
    "Dr. Amit Verma",
    "Dr. S. K. Khan",
    "Dr. M. L. Gupta",
    "Dr. Sunita Devi",
    "Dr. Rajesh K.",
    "Dr. K. N. Rao",
  ],
  hi: [
    "डॉ. रोहन पटेल",
    "डॉ. अंजलि राव",
    "डॉ. विवेक सिंह",
    "डॉ. नेहा कपूर",
    "डॉ. अमित वर्मा",
    "डॉ. एस. के. खान",
    "डॉ. एम. एल. गुप्ता",
    "डॉ. सुनीता देवी",
    "डॉ. राजेश के.",
    "डॉ. के. एन. राव",
  ],
  bn: [
    "ডা. রোহান প্যাটেল",
    "ডা. অঞ্জলি রাও",
    "ডা. বিবেক সিং",
    "ডা. নেহা কাপুর",
    "ডা. অমিত বর্মা",
    "ডা. এস. কে. খান",
    "ডা. এম. এল. গুপ্তা",
    "ডা. সুনিতা দেবী",
    "ডা. রাজেশ কে.",
    "ডা. কে. এন. রাও",
  ],
};
const LAB_NAMES = {
  en: [
    "Precision Diagnostics",
    "Medi Lab",
    "Apex Testing Center",
    "Star Sample Point",
    "Reliable Diagnostics",
    "Central Lab",
    "True Testing Center",
    "City Diagnostics",
    "Metro Lab",
    "Prime Testing",
  ],
  hi: [
    "प्रिसिजन डायग्नोस्टिक्स",
    "मेडी लैब",
    "एपेक्स टेस्टिंग सेंटर",
    "स्टार सैंपल पॉइंट",
    "रिलायबल डायग्नोस्टिक्स",
    "सेंट्रल लैब",
    "ट्रू टेस्टिंग सेंटर",
    "सिटी डायग्नोस्टिक्स",
    "मेट्रो लैब",
    "प्राइम टेस्टिंग",
  ],
  bn: [
    "প্রিসিশন ডায়াগনস্টিকস",
    "মেডি ল্যাব",
    "এপেক্স টেস্টিং সেন্টার",
    "স্টার স্যাম্পল পয়েন্ট",
    "রিলায়বেল ডায়াগনস্টিকস",
    "সেন্ট্রাল ল্যাব",
    "ট্রু টেস্টিং সেন্টার",
    "সিটি ডায়াগনস্টিকস",
    "মেট্রো ল্যাব",
    "প্রাইম টেস্টিং",
  ],
};
const HOSPITAL_NAMES = {
  en: [
    "Apollo Hospital",
    "Max Care",
    "Fortis Health Center",
    "City Multi-Speciality",
    "Global Hospital",
    "Metro Care",
    "Prime Hospital",
    "Trust Health",
    "Holy Care Center",
    "East Hospital",
  ],
  hi: [
    "अपोलो अस्पताल",
    "मैक्स केयर",
    "फोर्टिस हेल्थ सेंटर",
    "सिटी मल्टी-स्पेशलिटी",
    "ग्लोबल अस्पताल",
    "मेट्रो केयर",
    "प्राइम अस्पताल",
    "ट्रस्ट हेल्थ",
    "होली केयर सेंटर",
    "ईस्ट अस्पताल",
  ],
  bn: [
    "অ্যাপোলো হাসপাতাল",
    "ম্যাক্স কেয়ার",
    "ফর্টিস হেলথ সেন্টার",
    "সিটি মাল্টি-স্পেশালিটি",
    "গ্লোবাল হাসপাতাল",
    "মেট্রো কেয়ার",
    "প্রাইম হাসপাতাল",
    "ট্রাস্ট হেলথ",
    "হোলি কেয়ার সেন্টার",
    "ইস্ট হাসপাতাল",
  ],
};
const RADIOLOGY_NAMES = {
  en: [
    "Scan & Imaging",
    "Ray Digital",
    "Focus X-Ray",
    "Modern Scans",
    "Precision MRI",
    "Quick Scan",
    "Ultra Sound",
    "Xpress X-Ray",
    "True Vision",
    "Deep Scan",
  ],
  hi: [
    "स्कैन एंड इमेजिंग",
    "रे डिजिटल",
    "फोकस एक्स-रे",
    "मॉडर्न स्कैन्स",
    "प्रिसिजन एमआरआई",
    "क्विक स्कैन",
    "अल्ट्रा साउंड",
    "एक्सप्रेस एक्स-रे",
    "ट्रू विजन",
    "डीप स्कैन",
  ],
  bn: [
    "স্ক্যান ও ইমেজিং",
    "রে ডিজিটাল",
    "ফোকাস এক্স-রে",
    "মডার্ন স্ক্যান",
    "প্রিসিশন এমআরআই",
    "কুইক স্ক্যান",
    "আল্ট্রা সাউন্ড",
    "এক্সপ্রেস এক্স-রে",
    "ট্রু ভিশন",
    "ডিপ স্ক্যান",
  ],
};
const INSURANCE_NAMES = {
  en: [
    "Bima Suraksha Agent",
    "Jeevan Kalyan Agent",
    "HealthFirst Agent",
    "Secure Life Agent",
    "Future Health Agent",
    "Pradhan Mantri Agent",
    "State Health Agent",
    "Rural Trust Agent",
    "Arogya Agent",
    "Saral Bima Agent",
  ],
  hi: [
    "बीमा सुरक्षा एजेंट",
    "जीवन कल्याण एजेंट",
    "हेल्थफर्स्ट एजेंट",
    "सिक्योर लाइफ एजेंट",
    "फ्यूचर हेल्थ एजेंट",
    "प्रधान मंत्री एजेंट",
    "स्टेट हेल्थ एजेंट",
    "ग्रामीण ट्रस्ट एजेंट",
    "आरोग्य एजेंट",
    "सरल बीमा एजेंट",
  ],
  bn: [
    "বীমা সুরক্ষা এজেন্ট",
    "জীবন কল্যাণ এজেন্ট",
    "হেলথফার্স্ট এজেন্ট",
    "সিকিউর লাইফ এজেন্ট",
    "ফিউচার হেলথ এজেন্ট",
    "প্রধানমন্ত্রী এজেন্ট",
    "স্টেট হেলথ এজেন্ট",
    "গ্রামীণ ট্রাস্ট এজেন্ট",
    "আরোগ্য এজেন্ট",
    "সরল বীমা এজেন্ট",
  ],
};
const PHARMACY_NAMES = {
  en: [
    "Green Leaf Pharmacy",
    "Trust Medico",
    "City Chemists",
    "QuickMed Store",
    "Pill Corner",
    "24x7 Drugs",
    "Arogya Store",
    "Jana Aushadhi",
    "Vaidya Meds",
    "Apollo Pharma",
  ],
  hi: [
    "ग्रीन लीफ फार्मेसी",
    "ट्रस्ट मेडिको",
    "सिटी केमिस्ट्स",
    "क्विकमेड स्टोर",
    "पिल कॉर्नर",
    "24x7 ड्रग्स",
    "आरोग्य स्टोर",
    "जन औषधि",
    "वैद्य मेड्स",
    "अपोलो फार्मा",
  ],
  bn: [
    "গ্রিন লিফ ফার্মেসি",
    "ট্রাস্ট মেডিকো",
    "সিটি কেমিস্টস",
    "কুইকমেড স্টোর",
    "পিল কর্নার",
    "24x7 ড্রাগস",
    "আরোগ্যা স্টোর",
    "জন ঔষধি",
    "বৈদ্য মেড্স",
    "অ্যাপোলো ফার্মা",
  ],
};
const WORKER_NAMES = {
  en: [
    "Ms. Sunita Devi",
    "Ms. Renu Sahu",
    "Ms. Pooja Kumari",
    "Ms. Rajeshwari Singh",
    "Ms. Geeta Rao",
    "Ms. Meena Sharma",
    "Ms. Sarla Bhati",
    "Ms. Kiran Yadav",
    "Ms. Shalini M.",
    "Ms. Gita D.",
  ],
  hi: [
    "सुनीता देवी जी",
    "रेनू साहू जी",
    "पूजा कुमारी जी",
    "राजेश्वरी सिंह जी",
    "गीता राव जी",
    "मीना शर्मा जी",
    "सरला भाटी जी",
    "किरण यादव जी",
    "शालिनी एम. जी",
    "गीता डी. जी",
  ],
  bn: [
    "মিস সুনিতা দেবী",
    "মিস রেনু সাহু",
    "মিস পূজা কুমারী",
    "মিস রাজেশ্বরী সিং",
    "মিস গীতা রাও",
    "মিস মিনা শর্মা",
    "মিস সরলা ভাটি",
    "মিস কিরণ যাদব",
    "মিস শালিনী এম.",
    "মিস গীতা ডি.",
  ],
};

const generateRandomItem = (list) =>
  list[Math.floor(Math.random() * list.length)];
const getRandomDistance = () => (Math.random() * 10 + 0.5).toFixed(1);
const getRandomRating = () => (Math.random() * 1.5 + 3.5).toFixed(1);

const generateDoctorName = (lang) =>
  generateRandomItem(DOCTOR_NAMES[lang] || DOCTOR_NAMES.en);
const generateLabName = (lang) =>
  generateRandomItem(LAB_NAMES[lang] || LAB_NAMES.en);
const generateHospitalName = (lang) =>
  generateRandomItem(HOSPITAL_NAMES[lang] || HOSPITAL_NAMES.en);
const generateRadiologyName = (lang) =>
  generateRandomItem(RADIOLOGY_NAMES[lang] || RADIOLOGY_NAMES.en);
const generateInsuranceName = (lang) =>
  generateRandomItem(INSURANCE_NAMES[lang] || INSURANCE_NAMES.en);
const generateAshaName = (lang) =>
  generateRandomItem(WORKER_NAMES[lang] || WORKER_NAMES.en);
const generatePharmacyName = (lang) =>
  generateRandomItem(PHARMACY_NAMES[lang] || PHARMACY_NAMES.en);

// Structure defining the segments and their content sources
const SEGMENTED_ADVERTISERS_DEFINITION = [
  {
    key: "Doctors",
    icon: Stethoscope,
    generateName: generateDoctorName,
    specialties: {
      en: "Oncology, Cardiology, Pediatrics",
      hi: "कैंसर विज्ञान, हृदयरोग, बाल रोग",
      bn: "অনকোলজি, কার্ডিওলজি, পেডিয়াট্রিক্স",
    },
  },
  {
    key: "Hospitals",
    icon: Building,
    generateName: generateHospitalName,
    specialties: {
      en: "24/7 Emergency & Trauma Care",
      hi: "24/7 आपातकालीन और आघात देखभाल",
      bn: "24/7 জরুরি ও ট্রমা কেয়ার",
    },
  },
  {
    key: "DiagnosticCenters",
    icon: Activity,
    generateName: generateLabName,
    specialties: {
      en: "Blood/Urine Testing, Home Sample",
      hi: "रक्त/मूत्र परीक्षण, होम सैंपल",
      bn: "রক্ত/মূত্র পরীক্ষা, হোম স্যাম্পল",
    },
  },
  {
    key: "RadiologyCenters",
    icon: Scan,
    generateName: generateRadiologyName,
    specialties: {
      en: "MRI, CT, X-Ray, Ultrasound",
      hi: "एमआरआई, सीटी, एक्स-रे, अल्ट्रासाउंड",
      bn: "এমআরআই, সিটি, এক্স-রে, আল্ট্রাসাউন্ড",
    },
  },
  {
    key: "Pharmacies",
    icon: Clipboard,
    generateName: generatePharmacyName,
    specialties: {
      en: "Medicine Delivery & Consults",
      hi: "दवा वितरण और परामर्श",
      bn: "ঔষধ বিতরণ ও পরামর্শ",
    },
  },
  {
    key: "InsuranceAgents",
    icon: Lock,
    generateName: generateInsuranceName,
    specialties: {
      en: "Health & Life Insurance Plans",
      hi: "स्वास्थ्य और जीवन बीमा योजनाएँ",
      bn: "স্বাস্থ্য ও জীবন বীমা প্ল্যান",
    },
  },
  {
    key: "AshaWorkers",
    icon: Heart,
    generateName: generateAshaName,
    specialties: {
      en: "Local Patient Onboarding & Support",
      hi: "स्थानीय मरीज़ ऑनबोर्डिंग और समर्थन",
      bn: "স্থানীয় রোগী অনবোর্ডিং ও সাপোর্ট",
    },
  },
];

// Function to populate segmented ads with translated and dynamic data
const populateSegmentedAds = (t, language) => {
  return SEGMENTED_ADVERTISERS_DEFINITION.map((segment) => {
    const ads = Array.from({ length: 10 }, (_, i) => ({
      name: segment.generateName(language),
      speciality: segment.specialties[language] || segment.specialties.en,
      distance: getRandomDistance(),
      googleRating: getRandomRating(),
      platformRating: getRandomRating(),
    }));
    return {
      title: t(`segmentTitles.${segment.key}`),
      icon: segment.icon,
      ads: ads,
    };
  });
};

// --- Mock Data Setup (from original file) ---
const nearbyServicesData = [
  { key: "doctor", icon: Stethoscope },
  { key: "diagnostic_center", icon: Activity },
  { key: "hospital", icon: Building },
  { key: "radiology", icon: Activity },
  { key: "insurance", icon: Lock },
  { key: "asha_worker", icon: Heart },
  { key: "pharmacy", icon: Clipboard },
];

const getNearbyServices = (t) =>
  nearbyServicesData.map((s) => ({
    name: t(`services.${s.key}`),
    distance: (Math.random() * 10 + 0.5).toFixed(1),
    googleRating: (Math.random() * 2 + 3).toFixed(1),
    platformRating: (Math.random() * 2 + 3).toFixed(1),
    icon: s.icon,
  }));

const allRoles = [
  "patient",
  "doctor",
  "aarogya_bondhu",
  "connected_cloud",
  "clinical_institution",
];

// =================================================================
// 2. MODAL AND AD COMPONENTS
// =================================================================

// --- Chatbot Modal Component ---
const ChatbotModal = ({ t, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[80vh] flex flex-col relative">
        <div className="p-4 bg-blue-600 text-white rounded-t-2xl flex justify-between items-center">
          <h3 className="text-xl font-bold flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" /> {t("chat.modalTitle")}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Chat History Mock */}
        <div className="flex-grow p-4 space-y-3 overflow-y-auto bg-gray-50">
          <div className="flex justify-start">
            <div className="bg-blue-100 text-blue-900 p-3 rounded-xl max-w-[80%] shadow-sm">
              <p className="font-medium">{t("chat.greeting")}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-100 text-green-900 p-3 rounded-xl max-w-[80%] shadow-sm">
              <p>{t("chat.exampleQuery")}</p>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-blue-100 text-blue-900 p-3 rounded-xl max-w-[80%] shadow-sm">
              <p>{t("chat.exampleResponse")}</p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 flex space-x-2">
          <input
            type="text"
            placeholder={t("chat.typeMessage")}
            className="flex-grow px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition font-semibold">
            {t("chat.send")}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Contact & Chatbot Card ---
const ContactChatbotCard = ({ t, setShowChatModal }) => (
  <div className="p-6 bg-blue-50 rounded-xl shadow-inner space-y-4 border border-blue-200 mt-4">
    <h3 className="text-xl font-bold text-blue-900 flex items-center">
      <MessageCircle className="w-5 h-5 mr-2" /> {t("chat.connectUs")}
    </h3>
    <p className="text-gray-600 flex items-center">
      <Phone className="w-4 h-4 mr-2" />
      {t("chat.phone")}
    </p>
    <p className="text-gray-600 flex items-center">
      <User className="w-4 h-4 mr-2" />
      {t("chat.email")}
    </p>
    <button
      onClick={() => setShowChatModal(true)}
      className="text-sm text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition duration-150 shadow-md cursor-pointer"
    >
      {t("chat.startChat")}
    </button>
  </div>
);

// --- Multi-Input Onboarding Modal Component ---
const OnboardingModal = ({ t, onClose }) => {
  const [inputMethod, setInputMethod] = useState("typing");
  const [selectedRole, setSelectedRole] = useState("");

  const allRoles = [
    "patient_cancer",
    "patient_diabetes",
    "asha_worker",
    "cloud_admin",
    "doctor_cancer",
    "hospital_staff",
    "diagnostic_center",
    "pharmacy",
    "radiologist",
  ];

  const inputMap = useMemo(
    () => ({
      typing: { icon: Keyboard, title: t("onboarding.inputTabs.typing") },
      scan: {
        icon: Scan,
        title: t("onboarding.inputTabs.scan"),
        color: "text-red-700",
        bg: "bg-red-50",
        border: "border-red-300",
        placeholder: t("onboarding.scanPlaceholder"),
      },
      voice: {
        icon: Mic,
        title: t("onboarding.inputTabs.voice"),
        color: "text-green-700",
        bg: "bg-green-50",
        border: "border-green-300",
        placeholder: t("onboarding.voicePlaceholder"),
      },
    }),
    [t]
  );

  const handleOnboardingSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      window.alert(t("register.successMessage"));
      onClose();
    } else {
      window.alert("Please select a persona.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8 space-y-6">
        <h3 className="text-2xl font-bold text-blue-800 border-b pb-3 mb-4">
          {t("onboarding.title")}
        </h3>

        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            {t("register.role")}
          </label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
            required
          >
            <option value="">-- {t("login.role")} --</option>
            {allRoles.map((r) => (
              <option key={r} value={r}>
                {t(`roles.${r}`)}
              </option>
            ))}
          </select>
        </div>

        {/* Input Method Tabs */}
        <div className="flex justify-around bg-blue-50 p-1 rounded-xl shadow-inner">
          {Object.entries(inputMap).map(([method, data]) => {
            const Icon = data.icon;
            const isActive = inputMethod === method;
            return (
              <button
                key={method}
                onClick={() => setInputMethod(method)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition duration-150 w-1/3 justify-center text-sm cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{data.title}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleOnboardingSubmit} className="space-y-4">
          {inputMethod === "typing" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder={t("onboarding.fields.fullName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="number"
                placeholder={t("onboarding.fields.age")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="tel"
                placeholder={t("onboarding.fields.phone")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="text"
                placeholder={t("onboarding.fields.condition")}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          )}

          {inputMethod === "scan" && (
            <div
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl"
              style={{
                backgroundColor: inputMap.scan.bg,
                borderColor: inputMap.scan.border,
              }}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="scan-upload"
              />
              <label
                htmlFor="scan-upload"
                className={`flex flex-col items-center text-center cursor-pointer ${inputMap.scan.color}`}
              >
                <Scan className="w-10 h-10 mb-3" />
                <p className="font-semibold">{inputMap.scan.placeholder}</p>
                <p className="text-sm">
                  Mock Scan Interface - Click to Upload ID Image
                </p>
              </label>
            </div>
          )}

          {inputMethod === "voice" && (
            <div
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl"
              style={{
                backgroundColor: inputMap.voice.bg,
                borderColor: inputMap.voice.border,
              }}
            >
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                id="voice-upload"
              />
              <label
                htmlFor="voice-upload"
                className={`flex flex-col items-center text-center cursor-pointer ${inputMap.voice.color}`}
              >
                <Mic className="w-10 h-10 mb-3 animate-pulse" />
                <p className="font-semibold">{inputMap.voice.placeholder}</p>
                <p className="text-sm">
                  Mock Voice Recording - Click to Upload Audio File
                </p>
              </label>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-black rounded-xl hover:bg-gray-400 font-semibold transition cursor-pointer"
            >
              {t("onboarding.buttons.cancel")}
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition cursor-pointer"
            >
              {t("onboarding.buttons.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Segmented Ads Section Component ---
const SegmentedAdsSection = ({ t, language }) => {
  // Recalculate ads only when language changes
  const segmentedAds = useMemo(
    () => populateSegmentedAds(t, language),
    [t, language]
  );

  // Custom scrollbar hiding style block
  const scrollbarStyle = `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `;

  return (
    <div className="w-full bg-black p-4 md:p-8 mt-4 text-white">
      <style>{scrollbarStyle}</style>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 border-b border-blue-800 pb-3">
          {t("adsSegmentTitle")}
        </h2>

        {segmentedAds.map((segment, index) => (
          <div key={index} className="mb-10">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center">
              <segment.icon className="w-5 h-5 mr-3 text-blue-300" />
              {/* Renders the translated segment title */}
              {segment.title}
            </h3>

            {/* Horizontal Scrolling Container */}
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {segment.ads.map((ad, adIndex) => (
                <div
                  key={adIndex}
                  className="flex-shrink-0 w-72 bg-blue-900 text-white p-4 rounded-xl shadow-lg border-2 border-blue-700 hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-2">
                    {/* Renders the translated mock ad name */}
                    <p className="font-bold text-lg text-blue-200 truncate">
                      {ad.name}
                    </p>
                    <span className="flex items-center text-xs font-bold text-lime-300 flex-shrink-0">
                      <MapPin className="w-3 h-3 mr-1" />
                      {ad.distance} km
                    </span>
                  </div>

                  <p className="text-sm font-medium text-white">
                    {ad.speciality}
                  </p>

                  <div className="mt-3 flex items-center justify-between p-2 bg-blue-800 rounded-lg">
                    <span className="text-xs font-medium text-white">
                      Google:{" "}
                      <span className="font-bold text-yellow-300">
                        {ad.googleRating}
                      </span>
                      <Star className="w-3 h-3 inline ml-0.5 fill-yellow-300" />
                    </span>
                    <span className="text-xs font-medium text-white">
                      Platform:{" "}
                      <span className="font-bold text-blue-300">
                        {ad.platformRating}
                      </span>
                      <Star className="w-3 h-3 inline ml-0.5 fill-blue-300" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// =================================================================
// 3. MAIN APP COMPONENT (LoginPage)
// =================================================================

export default function LoginPage() {
  // const params = useSearchParams();
  const [userRole, setUserRole] = useState(null); // Tracks the currently selected role/logged-in user's role
  const [userName, setUserName] = useState(null); // Tracks the logged-in user's name
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const language = useLanguage();
 

  // --- Geolocation and Device Info State ---
  //   const [location, setLocation] = useState("Fetching location...");`
  //   const [deviceInfo, setDeviceInfo] = useState("");

  //   // Geolocation Effect
  //   useEffect(() => {
  //     if ("geolocation" in navigator) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           setLocation(
  //             `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
  //           );
  //         },
  //         (error) => {
  //           // Update location to indicate the reason for failure (e.g., permission denied)
  //           if (error.code === error.PERMISSION_DENIED) {
  //             setLocation("Location blocked (Permission Denied)");
  //           } else {
  //             setLocation("Location unavailable");
  //           }
  //         }
  //       );
  //     } else {
  //       setLocation("Geolocation not supported");
  //     }
  //   }, []);

  //   // Device Info Effect
  //   useEffect(() => {
  //     setDeviceInfo(getDeviceInfo());
  //   }, []);
  // -----------------------------------------------------------------

  // Use custom translation hook
  const { t } = useTranslationMock(language);

  // Memoize nearby services data to prevent regeneration on every render
  const nearbyServices = useMemo(() => getNearbyServices(t), [language, t]);

  // Handler to set the user state (used for Login and Logout)
  const handleUserSet = (role, name) => {
    setUserRole(role);
    setUserName(name);
    // Reset inputs on successful login or logout
    setUserId("");
    setPassword("");
  };

  // --- Login Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === "demo" && password === "demo") {
      let mockName = "User";
      let actualRole = userRole;
      switch (userRole) {
        case "patient":
          mockName = "Arif Khan Patient";
          // Assign detailed patient sub-role randomly for dashboard context
          actualRole =
            Math.random() < 0.5 ? "patientcancer" : "patientdiabetes";
          break;
        case "doctor":
          mockName = "Dr. Priya Sharma";
          break;
        case "aarogyabondhu":
          mockName = "Asha Devi";
          break;
        case "connectedcloud":
          mockName = "Cloud Admin";
          break;
        case "clinicalinstitution":
          mockName = "City Care Hospital";
          break;
        default:
          window.alert("Invalid Persona");
          return;
      }
      handleUserSet(actualRole, mockName); // sets userRole and userName states
    } else {
      window.alert("Invalid credentials. Use demo/demo.");
    }
  };

  // =================================================================
  // LOGIN COMPONENT - CONDITIONAL RENDERING (MOCK ROUTING)
  // =================================================================

  // 1. Patient Dashboard (handles both patient_cancer and patient_diabetes)
  if (userRole && userRole.startsWith("patient")) {
    return (
      <PatientDashboard
        t={t}
        userName={userName}
        userRole={userRole}
        setRole={handleUserSet} // Passed as setRole for the logout button
        language={language}
      />
    );
  }

  if (userRole && userRole.startsWith("doctor")) {
    return (
      <DoctorDashboard
        userName={userName}
        userRole={userRole}
        setRole={handleUserSet}
        language={language}
      />
    );
  }

  // 2. Mock Dashboards for other authenticated roles

  // Note: userRole holds the actual login role here ('doctor', 'aarogya_bondhu', etc.)
  const mockScreenClasses =
    "min-h-screen flex items-center justify-center bg-gray-50 text-3xl font-bold p-10";

  if (userRole === "doctor") {
    return (
      <div className={`${mockScreenClasses} text-blue-800`}>
        Doctor Dashboard Coming Soon
      </div>
    );
  } else if (userRole === "aarogya_bondhu") {
    return (
      <div className={`${mockScreenClasses} text-green-800`}>
        Aarogya Bondhu Console Coming Soon
      </div>
    );
  } else if (userRole === "connected_cloud") {
    return (
      <div className={`${mockScreenClasses} text-purple-800`}>
        Connected Cloud Panel Coming Soon
      </div>
    );
  } else if (userRole === "clinical_institution") {
    return (
      <div className={`${mockScreenClasses} text-orange-800`}>
        Clinical Institution Dashboard Coming Soon
      </div>
    );
  }

  // 3. Fallback to Login Page (when userRole is null or not authenticated)
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans text-black">
      {/* Header */}
      <header>
        {/* <span className="font-bold text-xl">{t("platformTitle")}</span> */}
        <Header></Header>
        <div className="flex items-center space-x-4">
          {/* <Globe className="w-5 h-5" />
          <select
            className="border-2 border-white rounded-full px-3 py-1 text-black bg-white cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="bn">বাংলা</option>
          </select> */}

          {/* Location display - Added MapPin for clarity */}
          {/* <span className="text-white text-sm font-semibold flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </span> */}

          {/* Device info display */}
          {/* <span className="text-white text-sm font-semibold">{deviceInfo}</span> */}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Left: Login Form & Contact/Chatbot */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-start p-8 order-2 lg:order-1">
          <div className="w-full max-w-md">
            {/* Login Form Card */}
            <div className="p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
              <h1 className="text-3xl font-bold mb-2 text-center text-black">
                {t("login.title")}
              </h1>
              <p className="text-sm text-center text-blue-600 mb-6">
                {t("login.subtitle")}
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Role Selector */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    {t("login.role")}
                  </label>
                  <select
                    value={userRole || ""} // Use userRole state for select, set to empty string if null
                    onChange={(e) => handleUserSet(e.target.value, null)} // Only set role here, name is set upon successful login
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
                    required
                  >
                    <option value="">-- {t("login.role")} --</option>
                    {allRoles.map((r) => (
                      <option key={r} value={r}>
                        {t(`roles.${r}`)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* User ID */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    <User className="w-4 h-4 inline mr-1 text-blue-500" />
                    {t("login.userId")}
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="demo"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    <Lock className="w-4 h-4 inline mr-1 text-blue-500" />
                    {t("login.password")}
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-3 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="demo"
                    required
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={!userRole}
                  className={`w-full text-white font-semibold py-3 rounded-xl transition shadow-lg ${
                    userRole
                      ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {t("login.loginButton")}
                </button>

                {/* Links */}
                <div className="flex justify-between text-sm pt-2">
                  <span
                    className="text-blue-600 hover:underline cursor-pointer font-medium"
                    onClick={() => setShowRegister(true)}
                  >
                    {t("login.register")}
                  </span>
                  <span className="text-gray-500 hover:text-black cursor-pointer">
                    {t("login.forgotPassword")}
                  </span>
                </div>
              </form>
            </div>

            {/* Contact/Chatbot Card (placed below the login form) */}
            <ContactChatbotCard t={t} setShowChatModal={setShowChatModal} />
          </div>
        </div>

        {/* Right: Advertisements (Live Feed) */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-start p-8 bg-blue-50 overflow-y-auto order-1 lg:order-2 shadow-inner">
          <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center">
            <MapPin className="w-5 h-5 mr-2" /> {t("ads.title")}
          </h2>
          <div className="space-y-4 w-full">
            {nearbyServices.map((s, idx) => {
              const Icon = s.icon || MessageCircle;
              return (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl shadow border border-gray-200 text-sm hover:shadow-lg transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-black flex items-center">
                      <Icon className="w-4 h-4 mr-2 text-blue-600" />
                      {s.name}
                    </h3>
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                      {s.distance} km
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1 flex items-center space-x-4">
                    <span>
                      Google:{" "}
                      <span className="font-bold text-yellow-600">
                        {s.googleRating}
                      </span>
                      <Star className="w-3 h-3 inline ml-0.5 fill-yellow-600" />
                    </span>
                    <span>
                      Platform:{" "}
                      <span className="font-bold text-blue-600">
                        {s.platformRating}
                      </span>
                      <Star className="w-3 h-3 inline ml-0.5 fill-blue-600" />
                    </span>
                    <span className="text-blue-500 font-medium flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      Call Now
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Segmented Ads Section at the bottom */}
      <SegmentedAdsSection t={t} language={language} />

      {/* Modals */}
      {showRegister && (
        <OnboardingModal t={t} onClose={() => setShowRegister(false)} />
      )}
      {showChatModal && (
        <ChatbotModal t={t} onClose={() => setShowChatModal(false)} />
      )}
    </div>
  );
}
