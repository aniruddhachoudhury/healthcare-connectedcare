"use client";

import React, { useState, useMemo } from 'react';
import { 
    Home, Clipboard, Activity, Heart, Settings, FileText, Globe, Stethoscope, 
    BriefcaseMedical, Clock, CheckCircle, PlusCircle, Calendar, LogOut, 
    User, MapPin, Zap, DollarSign, Leaf, MessageCircle, Phone, TrendingUp, Smile, Search, Briefcase, XCircle, ChevronRight, List, Download, Share2, Mail, Users, BarChart2, Bell,
    Archive, Send, CreditCard, Gift, Star, ThumbsUp
} from 'lucide-react';

// =================================================================
// 0. MULTILINGUAL CONFIGURATION & PROFILE DATA
// =================================================================

const translations = {
    en: {
        platformTitle: "Connected Cloud Treatment & Care",
        logout: "Logout",
        nav: {
            home: "Home",
            opdNight: "OPD Management", 
            treatmentJourney: "Treatment Journey",
            reports: "Reports", 
            learning: "Learning", 
            dashboard: "Dashboard", 
            mentalHealth: "Mental Health", 
            accountSettings: "Account Settings", 
        },
        alerts: {
            alertsTitle: "Alerts & Actions",
            consultation: "Upcoming In-clinic Consultation",
            medicineRefill: "Medicine Refilling Needed",
            radiology: "Upcoming Radiology Test",
            pathology: "Upcoming Pathology Test",
            vaccine: "Vaccine / Injection Alert",
            annualCheckup: "Annual Health Check-up Offer",
            videoTips: "Online Health Tips & Awareness Video",
            insuranceOffer: "New Insurance Offering",
            healthStats: "Patient Health Statistics",
            mentalScore: "Mental Health Score",
            connect: "Chat & Connect With Us",
            raiseIssue: "Raise an Issue",
        },
        opd: {
            title: "OPD Service Search & Booking",
            selectCategory: "Select Service Category:",
            providerList: "Nearby Providers",
            booking: "Book/Manage",
            paymentTitle: "Payment Required",
            paymentAmount: (amount) => `Amount Due: ₹${amount.toFixed(2)}`,
            payNow: "Pay Now (Demo)",
            payLater: "Pay Later at Clinic",
        },
        opdCategories: {
            Doctor: "Doctor", AarogyaBondhu: "Aarogya Bondhu", Physiotherapy: "Physiotherapy",
            ClinicRadiology: "Radiology Clinic", ClinicPathology: "Pathology Clinic", Pharmacy: "Pharmacy",
        },
        booking: {
            title: "Booking Management",
            type: "Consultation Type", inPerson: "In-Person (Clinic)", remote: "Remote (Video Call)",
            new: "New Appointment", edit: "Edit Booking", delete: "Cancel Booking",
            date: "Select Date & Time", availability: "Available Slots",
            bookedMessage: (name, date) => `Booking successful for ${name} on ${date}.`,
            distance: "Distance from you:",
        },
        journey: {
            title: "Your Treatment Journey", searchPlaceholder: "Search treatments, reports or doctors...",
            addTreatment: "Add New Treatment",
            template: {
                title: "In-Clinic Consultation Template", suggestTitle: "Suggested Templates to Add:",
                suggest1: "Chronic Disease Management (Diabetes/BP)", suggest2: "Post-Surgery Recovery Plan",
                close: "Close Template",
                steps: {
                    visit: "Hospital Visit & Check-in", payment: "Payment & Insurance Formalities",
                    vitals: "Vitals Collection & Triage", consultation: "Specialist Consultation",
                    eprescription: "E-Prescription & Follow-up",
                }
            }
        },
        reports: {
            title: "Health Records & Reports", searchPlaceholder: "Search by date, type, or doctor...",
            typePrescription: "Prescriptions", typeConsent: "Consent Forms", typeRadiology: "Radiology Tests", typePathology: "Pathology Tests",
            shareDownload: "Share & Download", shareWhatsApp: "Share to WhatsApp", shareEmail: "Share via Email", shareDoctor: "Share with Doctor/Clinic",
        },
        learning: { 
            title: "Health Tips & Awareness Videos", suggested: "Suggested Videos", historical: "Historical Video List",
            video1: "Managing Blood Pressure at Home", video2: "Diabetes Diet Plan for Indians", video3: "Understanding Your Cholesterol Report",
            video4: "Stress Relief Techniques (5 Mins)", video5: "Child Vaccine Schedule Explained", video6: "Geriatric Care Fundamentals",
        },
        dashboard: { 
            title: "Health Analytics Dashboard", expensesTitle: "Treatment Expenses Overview (Last 6 Months)",
            expenseY: "Monthly Expenditure (INR)", expenseX: "Time (Months)", costSavings: "Cost Saving Suggestions",
            costSavingsDetail: "Your package covers 70% of OPD visits. Consider using nearby network clinics to save on travel and out-of-pocket expenses. Total potential saving: ₹5,500.",
            comparisonTitle: "Travel Cost vs. Local Clinic Usage", comparisonY: "Cost (INR)", compLocal: "Local Clinic Expenses",
            compTravel: "Estimated Travel Cost", subscription: "Subscription Plans", futurePackage: "Future Treatment Package Coverage",
            futureText: "Platinum plan covers 95% of future planned oncology treatment packages.",
        },
        mental: { 
            title: "Mental Wellness & Support", chatConnect: "Connect with a Counselor",
            scoreDetail: "Your score reflects positive engagement with wellness tips.", chatPlaceholder: "Type your thoughts or query...",
            voiceCall: "Start Voice Session",
        },
        settings: {
            title: "Account Management", profile: "Manage Profile & Data",
            upgrade: "Subscription Upgrade / Downgrade", currentPlan: "Current Plan:",
            managePayments: "Manage Payments", archive: "Archive/Pause Account", delete: "Delete Account",
            upgradeButton: "Upgrade Now",
        },
        plans: { 
            Free: "Free", Silver: "Silver", Gold: "Gold", Platinum: "Platinum",
            accounts: "Family Accounts Included", benefits: "Benefits",
            benefit1: "Basic Consultations", benefit2: "Fast Track Appointments",
            benefit3: "Dedicated Health Manager", benefit4: "95% Coverage on Packages",
        },
        feedback: { title: "Feedback", message: "Tell us how we are doing!" },
        dashboardHome: "Overview of Vitals and Key Metrics.",
        healthFocus: (focus) => `Focusing on ${focus} care plan.`,
        nextAction: (focus) => `Schedule follow-up for ${focus} review.`,
        profiles: {
            masterRole: "Head of Family", wifeRole: "Wife", child1Role: "Son/Daughter 1",
            child2Role: "Son/Daughter 2", fatherRole: "Father", motherRole: "Mother", petRole: "Pet",
        },
    },
    hi: {
        platformTitle: "जुड़े हुए क्लाउड उपचार और देखभाल", logout: "लॉग आउट",
        nav: {
            home: "होम", opdNight: "ओपीडी प्रबंधन", treatmentJourney: "उपचार यात्रा", reports: "रिपोर्ट", learning: "सीखना", dashboard: "डैशबोर्ड",
            mentalHealth: "मानसिक स्वास्थ्य", accountSettings: "खाता सेटिंग्स",
        },
        alerts: {
            alertsTitle: "अलर्ट और कार्य", consultation: "आगामी इन-क्लिनिक परामर्श", medicineRefill: "दवा पुनःपूर्ति की आवश्यकता है",
            radiology: "आगामी रेडियोलॉजी टेस्ट", pathology: "आगामी पैथोलॉजी टेस्ट", vaccine: "टीका/इंजेक्शन अलर्ट",
            annualCheckup: "वार्षिक स्वास्थ्य जांच ऑफर", videoTips: "ऑनलाइन स्वास्थ्य सुझाव और जागरूकता वीडियो", insuranceOffer: "नया बीमा ऑफर",
            healthStats: "मरीज़ स्वास्थ्य सांख्यिकी", mentalScore: "मानसिक स्वास्थ्य स्कोर", connect: "चैट और हमसे जुड़ें", raiseIssue: "कोई समस्या उठाएँ",
        },
        opd: {
            title: "ओपीडी सेवा खोज और बुकिंग", selectCategory: "सेवा श्रेणी चुनें:", providerList: "आस-पास के प्रदाता", booking: "बुक/प्रबंधित करें",
            paymentTitle: "भुगतान आवश्यक", paymentAmount: (amount) => `देय राशि: ₹${amount.toFixed(2)}`, payNow: "अभी भुगतान करें (डेमो)",
            payLater: "क्लिनिक पर बाद में भुगतान करें",
        },
        opdCategories: { 
            Doctor: "डॉक्टर", AarogyaBondhu: "आरोग्य बंधु", Physiotherapy: "फिजियोथेरेपी", ClinicRadiology: "रेडियोलॉजी क्लिनिक", ClinicPathology: "पैथोलॉजी क्लिनिक", Pharmacy: "फार्मेसी",
        },
        booking: { 
            title: "बुकिंग प्रबंधन", type: "परामर्श प्रकार", inPerson: "व्यक्तिगत रूप से (क्लिनिक)", remote: "रिमोट (वीडियो कॉल)",
            new: "नया अपॉइंटमेंट", edit: "बुकिंग संपादित करें", delete: "बुकिंग रद्द करें", date: "तिथि और समय चुनें", availability: "उपलब्ध स्लॉट",
            bookedMessage: (name, date) => `${name} के लिए ${date} पर बुकिंग सफल।`, distance: "आपसे दूरी:",
        },
        journey: { 
            title: "आपकी उपचार यात्रा", searchPlaceholder: "उपचार, रिपोर्ट या डॉक्टर खोजें...", addTreatment: "नया उपचार जोड़ें",
            template: {
                title: "इन-क्लिनिक परामर्श टेम्पलेट", suggestTitle: "जोड़ने के लिए सुझाए गए टेम्पलेट:",
                suggest1: "पुरानी बीमारी का प्रबंधन (मधुमेह/बीपी)", suggest2: "सर्जरी के बाद रिकवरी योजना",
                close: "टेम्पलेट बंद करें",
                steps: {
                    visit: "अस्पताल का दौरा और चेक-इन", payment: "भुगतान और बीमा औपचारिकताएं",
                    vitals: "वाइटल्स संग्रह और ट्राइएज", consultation: "विशेषज्ञ परामर्श",
                    eprescription: "ई-पर्चा और अनुवर्ती कार्रवाई",
                }
            }
        },
        reports: { 
            title: "स्वास्थ्य रिकॉर्ड और रिपोर्ट", searchPlaceholder: "तिथि, प्रकार या डॉक्टर द्वारा खोजें...",
            typePrescription: "पर्चे", typeConsent: "सहमति प्रपत्र", typeRadiology: "रेडियोलॉजी टेस्ट", typePathology: "पैथोलॉजी टेस्ट",
            shareDownload: "साझा करें और डाउनलोड करें", shareWhatsApp: "व्हाट्सएप पर साझा करें", shareEmail: "ईमेल द्वारा साझा करें", shareDoctor: "डॉक्टर/क्लिनिक के साथ साझा करें",
        },
        learning: { 
            title: "स्वास्थ्य सुझाव और जागरूकता वीडियो", suggested: "सुझाए गए वीडियो", historical: "ऐतिहासिक वीडियो सूची",
            video1: "घर पर रक्तचाप का प्रबंधन", video2: "भारतीयों के लिए मधुमेह आहार योजना", video3: "अपनी कोलेस्ट्रॉल रिपोर्ट को समझना",
            video4: "तनाव कम करने की तकनीक (5 मिनट)", video5: "बच्चों के टीके का शेड्यूल समझाया गया", video6: "वृद्धावस्था देखभाल के मूल सिद्धांत",
        },
        dashboard: { 
            title: "स्वास्थ्य एनालिटिक्स डैशबोर्ड", expensesTitle: "उपचार व्यय अवलोकन (पिछले 6 महीने)",
            expenseY: "मासिक व्यय (INR)", expenseX: "समय (महीने)", costSavings: "लागत बचत के सुझाव",
            costSavingsDetail: "आपका पैकेज 70% ओपीडी विज़िट को कवर करता है। यात्रा और जेब से होने वाले खर्च को बचाने के लिए आस-पास के नेटवर्क क्लीनिक का उपयोग करने पर विचार करें। कुल संभावित बचत: ₹5,500।",
            comparisonTitle: "यात्रा लागत बनाम स्थानीय क्लिनिक उपयोग", comparisonY: "लागत (INR)", compLocal: "स्थानीय क्लिनिक व्यय",
            compTravel: "अनुमानित यात्रा लागत", subscription: "सदस्यता योजनाएं", futurePackage: "भविष्य के उपचार पैकेज कवरेज",
            futureText: "प्लेटिनम प्लान भविष्य में नियोजित ऑन्कोलॉजी उपचार पैकेजों का 95% कवर करता है।",
        },
        mental: { 
            title: "मानसिक कल्याण और समर्थन", chatConnect: "एक परामर्शदाता से जुड़ें",
            scoreDetail: "आपका स्कोर कल्याण युक्तियों के साथ सकारात्मक जुड़ाव को दर्शाता है।", chatPlaceholder: "अपने विचार या प्रश्न टाइप करें...",
            voiceCall: "वॉयस सेशन शुरू करें",
        },
        settings: {
            title: "खाता प्रबंधन", profile: "प्रोफ़ाइल और डेटा प्रबंधित करें", upgrade: "सदस्यता अपग्रेड/डाउनग्रेड", currentPlan: "वर्तमान योजना:",
            managePayments: "भुगतान प्रबंधित करें", archive: "खाता संग्रह/रोकें", delete: "खाता हटाएँ", upgradeButton: "अभी अपग्रेड करें",
        },
        plans: { 
            Free: "फ्री", Silver: "सिल्वर", Gold: "गोल्ड", Platinum: "प्लेटिनम",
            accounts: "शामिल परिवार खाते", benefits: "लाभ",
            benefit1: "मूल परामर्श", benefit2: "तेज़ ट्रैक अपॉइंटमेंट",
            benefit3: "समर्पित स्वास्थ्य प्रबंधक", benefit4: "पैकेज पर 95% कवरेज",
        },
        feedback: { title: "फीडबैक", message: "हमें बताएं कि हम कैसा कर रहे हैं!" },
        dashboardHome: "वाइटल्स और प्रमुख मेट्रिक्स का अवलोकन।",
        healthFocus: (focus) => `${focus} देखभाल योजना पर ध्यान केंद्रित कर रहे हैं।`,
        nextAction: (focus) => `${focus} समीक्षा के लिए अनुवर्ती अपॉइंटमेंट शेड्यूल करें।`,
        profiles: {
            masterRole: "परिवार के मुखिया", wifeRole: "पत्नी", child1Role: "बेटा/बेटी 1",
            child2Role: "बेटा/बेटी 2", fatherRole: "पिता", motherRole: "माँ", petRole: "पालतू",
        },
    },
    bn: {
        platformTitle: "সংযুক্ত ক্লাউড চিকিৎসা ও যত্ন", logout: "লগ আউট",
        nav: {
            home: "হোম", opdNight: "ওপিডি ব্যবস্থাপনা", treatmentJourney: "চিকিৎসা যাত্রা", reports: "রিপোর্ট", learning: "শিক্ষা", dashboard: "ড্যাশবোর্ড",
            mentalHealth: "মানসিক স্বাস্থ্য", accountSettings: "অ্যাকাউন্ট সেটিংস",
        },
        alerts: {
            alertsTitle: "সতর্কতা ও কার্যক্রম", consultation: "আসন্ন ইন-ক্লিনিক পরামর্শ", medicineRefill: "ওষুধ রিফিলিং প্রয়োজন",
            radiology: "আসন্ন রেডিওলজি পরীক্ষা", pathology: "আসন্ন প্যাথলজি পরীক্ষা", vaccine: "টিকা/ইনজেকশন সতর্কতা",
            annualCheckup: "বার্ষিক স্বাস্থ্য পরীক্ষা অফার", videoTips: "অনলাইন স্বাস্থ্য টিপস এবং সচেতনতা ভিডিও", insuranceOffer: "নতুন বীমা অফার",
            healthStats: "রোগীর স্বাস্থ্য পরিসংখ্যান", mentalScore: "মানসিক স্বাস্থ্য স্কোর", connect: "চ্যাট এবং আমাদের সাথে যোগাযোগ করুন", raiseIssue: "একটি সমস্যা উত্থাপন করুন",
        },
        opd: {
            title: "ওপিডি পরিষেবা অনুসন্ধান ও বুকিং", selectCategory: "পরিষেবা বিভাগ নির্বাচন করুন:", providerList: "আশেপাশের প্রদানকারী", booking: "বুক/পরিচালনা করুন",
            paymentTitle: "পেমেন্ট প্রয়োজন", paymentAmount: (amount) => `বকেয়া পরিমাণ: ₹${amount.toFixed(2)}`, payNow: "এখনই পে করুন (ডেমো)",
            payLater: "ক্লিনিকে পরে পে করুন",
        },
        opdCategories: { 
            Doctor: "ডাক্তার", AarogyaBondhu: "আরোগ্য বন্ধু", Physiotherapy: "ফিজিওথেরাপি", ClinicRadiology: "রেডিওলজি ক্লিনিক", ClinicPathology: "প্যাথলজি ক্লিনিক", Pharmacy: "ফার্মেসি",
        },
        booking: { 
            title: "বুকিং ব্যবস্থাপনা", type: "পরামর্শের প্রকার", inPerson: "ব্যক্তিগতভাবে (ক্লিনিক)", remote: "রিমোট (ভিডিও কল)",
            new: "নতুন অ্যাপয়েন্টমেন্ট", edit: "বুকিং সম্পাদনা করুন", delete: "বুকিং বাতিল করুন", date: "তারিখ ও সময় নির্বাচন করুন", availability: "উপলব্ধ স্লট",
            bookedMessage: (name, date) => `${name} এর জন্য ${date} এ বুকিং সফল হয়েছে।`, distance: "আপনার থেকে দূরত্ব:",
        },
        journey: { 
            title: "আপনার চিকিৎসা যাত্রা", searchPlaceholder: "চিকিৎসা, রিপোর্ট বা ডাক্তার খুঁজুন...", addTreatment: "নতুন চিকিৎসা যোগ করুন",
            template: {
                title: "ইন-ক্লিনিক পরামর্শ টেমপ্লেট", suggestTitle: "যোগ করার জন্য প্রস্তাবিত টেমপ্লেট:",
                suggest1: "দীর্ঘস্থায়ী রোগ ব্যবস্থাপনা (ডায়াবেটিস/বিপি)", suggest2: "অস্ত্রোপচারের পরে পুনরুদ্ধার পরিকল্পনা",
                close: "টেমপ্লেট বন্ধ করুন",
                steps: {
                    visit: "হাসপাতাল পরিদর্শন এবং চেক-ইন", payment: "পেমেন্ট এবং বীমা আনুষ্ঠানিকতা",
                    vitals: "ভাইটালস সংগ্রহ এবং ট্রাইজ", consultation: "বিশেষজ্ঞের পরামর্শ",
                    eprescription: "ই-প্রেসক্রিপশন এবং ফলো-আপ",
                }
            }
        },
        reports: { 
            title: "স্বাস্থ্য রেকর্ড এবং রিপোর্ট", searchPlaceholder: "তারিখ, প্রকার বা ডাক্তার দ্বারা খুঁজুন...",
            typePrescription: "প্রেসক্রিপশন", typeConsent: "সম্মতি ফর্ম", typeRadiology: "রেডিওলজি টেস্ট", typePathology: "প্যাথলজি টেস্ট",
            shareDownload: "শেয়ার ও ডাউনলোড করুন", shareWhatsApp: "হোয়াটসঅ্যাপে শেয়ার করুন", shareEmail: "ইমেলের মাধ্যমে শেয়ার করুন", shareDoctor: "ডাক্তার/ক্লিনিকের সাথে শেয়ার করুন",
        },
        learning: { 
            title: "স্বাস্থ্য টিপস এবং সচেতনতা ভিডিও", suggested: "প্রস্তাবিত ভিডিও", historical: "ঐতিহাসিক ভিডিও তালিকা",
            video1: "বাড়িতে রক্তচাপ নিয়ন্ত্রণ", video2: "ভারতীয়দের জন্য ডায়াবেটিস ডায়েট প্ল্যান", video3: "আপনার কোলেস্টেরল রিপোর্ট বোঝা",
            video4: "মানসিক চাপ কমানোর কৌশল (৫ মিনিট)", video5: "শিশুদের টিকার সময়সূচী ব্যাখ্যা", video6: "জেরিয়াট্রিক যত্নের মূলনীতি",
        },
        dashboard: { 
            title: "স্বাস্থ্য অ্যানালিটিক্স ড্যাশবোর্ড", expensesTitle: "চিকিৎসা ব্যয়ের সংক্ষিপ্ত বিবরণ (গত ৬ মাস)",
            expenseY: "মাসিক ব্যয় (INR)", expenseX: "সময় (মাস)", costSavings: "খরচ সাশ্রয়ের পরামর্শ",
            costSavingsDetail: "আপনার প্যাকেজ 70% ওপিডি ভিজিট কভার করে। ভ্রমণ এবং পকেট থেকে হওয়া খরচ বাঁচাতে কাছাকাছি নেটওয়ার্ক ক্লিনিক ব্যবহার করার কথা ভাবুন। মোট সম্ভাব্য সঞ্চয়: ₹৫,৫০০।",
            comparisonTitle: "ভ্রমণ খরচ বনাম স্থানীয় ক্লিনিক ব্যবহার", comparisonY: "খরচ (INR)", compLocal: "স্থানীয় ক্লিনিক খরচ",
            compTravel: "আনুমানিক ভ্রমণ খরচ", subscription: "সাবস্ক্রিপশন প্ল্যান", futurePackage: "ভবিষ্যতের চিকিৎসার প্যাকেজ কভারেজ",
            futureText: "প্ল্যাটিনাম প্ল্যান ভবিষ্যতে পরিকল্পিত অনকোলজি চিকিৎসার প্যাকেজের 95% কভার করে।",
        },
        mental: { 
            title: "মানসিক সুস্থতা ও সমর্থন", chatConnect: "একজন পরামর্শকের সাথে যোগাযোগ করুন",
            scoreDetail: "আপনার স্কোর সুস্থতার টিপসগুলির সাথে ইতিবাচক যুক্ততাকে প্রতিফলিত করে।", chatPlaceholder: "আপনার চিন্তা বা প্রশ্ন টাইপ করুন...",
            voiceCall: "ভয়েস সেশন শুরু করুন",
        },
        settings: {
            title: "অ্যাকাউন্ট ব্যবস্থাপনা", profile: "প্রোফাইল ও ডেটা পরিচালনা করুন", upgrade: "সাবস্ক্রিপশন আপগ্রেড/ডাউনগ্রেড", currentPlan: "বর্তমান প্ল্যান:",
            managePayments: "পেমেন্ট পরিচালনা করুন", archive: "অ্যাকাউন্ট আর্কাইভ/বিরতি দিন", delete: "অ্যাকাউন্ট মুছে ফেলুন", upgradeButton: "এখনই আপগ্রেড করুন",
        },
        plans: { 
            Free: "ফ্রি", Silver: "সিলভার", Gold: "গোল্ড", Platinum: "প্লাটিনাম",
            accounts: "পরিবারের অ্যাকাউন্ট অন্তর্ভুক্ত", benefits: "সুবিধা",
            benefit1: "মৌলিক পরামর্শ", benefit2: "ফাস্ট ট্র্যাক অ্যাপয়েন্টমেন্ট",
            benefit3: "ডেডিকেটেড স্বাস্থ্য ম্যানেজার", benefit4: "প্যাকেজে 95% কভারেজ",
        },
        feedback: { title: "ফিডব্যাক", message: "আমাদের বলুন আমরা কেমন করছি!" },
        dashboardHome: "ভাইটালস এবং মূল ম্যাট্রিক্সের সংক্ষিপ্ত বিবরণ।",
        healthFocus: (focus) => `${focus} পরিচর্যা পরিকল্পনার উপর মনোযোগ দেওয়া হচ্ছে।`,
        nextAction: (focus) => `${focus} পর্যালোচনার জন্য ফলো-আপ অ্যাপয়েন্টমেন্টের সময়সূচী করুন।`,
        profiles: {
            masterRole: "পরিবারের প্রধান", wifeRole: "স্ত্রী", child1Role: "পুত্র/কন্যা ১",
            child2Role: "পুত্র/কন্যা ২", fatherRole: "পিতা", motherRole: "মাতা", petRole: "পোষা প্রাণী",
        },
    },
};

const useTranslation = (lang) => {
    const t = (key, dynamicArg) => {
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            if (!value || typeof value !== 'object' && typeof value !== 'function') return key;
            value = value[k];
        }
        // If the key resolves to a function (dynamic helper), call it with the argument
        if (typeof value === 'function' && dynamicArg) {
            return value(dynamicArg);
        }
        return typeof value === 'string' ? value : key;
    };
    return { t, language: lang, setLanguage: (l) => console.log(`Language set to ${l}`) };
};

// --- Family Profile Data: Updated with Indian Names, Role Keys, and Health Data ---
const FAMILY_PROFILES = [
    { key: 'master', roleKey: 'masterRole', name: 'Anil Sharma', id: 'P001', location: 'Mumbai, India', healthFocus: 'Cardiology', 
      vitals: {hr: '68 bpm', bp: '130/85 mmHg', status: 'Stable'}, mentalScore: 8.5, currentPlan: 'Gold',
      reports: { type: 'Lipid Panel', date: '2024-02-15', doctor: 'Dr. Neha Kapoor' },
      nextAppointment: 'Cardiologist, 15 Mar', medicineRefill: 'Pravastatin (2 days left)', radiologyTest: 'Pending Chest X-Ray', pathologyTest: 'Pending Lipid Panel', vaccineAlert: 'Flu Shot Due', insuranceStatus: 'Renewal in 3 months' },

    { key: 'wife', roleKey: 'wifeRole', name: 'Rina Sharma', id: 'P002', location: 'Pune, India', healthFocus: 'Diabetes', 
      vitals: {hr: '78 bpm', bp: '120/80 mmHg', status: 'Glucose High'}, mentalScore: 7.0, currentPlan: 'Silver',
      reports: { type: 'HBA1C', date: '2024-01-10', doctor: 'Dr. Diabetologist' },
      nextAppointment: 'Diabetologist, 22 Mar', medicineRefill: 'Insulin Pen (7 days left)', radiologyTest: 'N/A', pathologyTest: 'Due HBA1C', vaccineAlert: 'N/A', insuranceStatus: 'In-network consultation' },

    { key: 'child1', roleKey: 'child1Role', name: 'Rohan Sharma', id: 'P003', location: 'Mumbai, India', healthFocus: 'Pediatrics', 
      vitals: {hr: '95 bpm', bp: '95/60 mmHg', status: 'Normal'}, mentalScore: 9.2, currentPlan: 'Free',
      reports: { type: 'Prescription', date: '2023-11-05', doctor: 'Dr. Pediatrician' },
      nextAppointment: 'Pediatrician, 10 Apr', medicineRefill: 'N/A', radiologyTest: 'N/A', pathologyTest: 'N/A', vaccineAlert: 'MMR booster due', insuranceStatus: 'Zero co-pay for checkups' },

    { key: 'child2', roleKey: 'child2Role', name: 'Neha Sharma', id: 'P004', location: 'Mumbai, India', healthFocus: 'Vaccination', 
      vitals: {hr: '88 bpm', bp: '100/65 mmHg', status: 'Normal'}, mentalScore: 8.9, currentPlan: 'Free',
      reports: { type: 'Consent', date: '2024-03-01', doctor: 'N/A' },
      nextAppointment: 'N/A', medicineRefill: 'N/A', radiologyTest: 'N/A', pathologyTest: 'N/A', vaccineAlert: 'Hepatitis B due soon', insuranceStatus: 'Zero co-pay for checkups' },

    { key: 'father', roleKey: 'fatherRole', name: 'Ramesh Sharma Sr', id: 'P005', location: 'Delhi, India', healthFocus: 'Geriatrics', 
      vitals: {hr: '72 bpm', bp: '145/90 mmHg', status: 'BP High'}, mentalScore: 6.5, currentPlan: 'Platinum',
      reports: { type: 'MRI Scan', date: '2024-02-28', doctor: 'Dr. Ortho' },
      nextAppointment: 'Geriatrician, 05 Mar', medicineRefill: 'All medications good', radiologyTest: 'Upcoming MRI scan', pathologyTest: 'Due Kidney Function', vaccineAlert: 'N/A', insuranceStatus: 'Policy review needed' },

    { key: 'mother', roleKey: 'motherRole', name: 'Deepa Sharma Sr', id: 'P006', location: 'Delhi, India', healthFocus: 'Geriatrics', 
      vitals: {hr: '75 bpm', bp: '140/85 mmHg', status: 'BP High'}, mentalScore: 7.8, currentPlan: 'Platinum',
      reports: { type: 'Bone Density', date: '2023-10-20', doctor: 'Dr. Geriatrician' },
      nextAppointment: 'Geriatrician, 05 Mar', medicineRefill: 'Thyroid medication (1 day left)', radiologyTest: 'N/A', pathologyTest: 'Due Bone Density', vaccineAlert: 'N/A', insuranceStatus: 'Policy review needed' },
      
    { key: 'pet', roleKey: 'petRole', name: 'Sheru (Dog)', id: 'P007', location: 'Mumbai, India', healthFocus: 'Veterinary', 
      vitals: {hr: '110 bpm', bp: 'N/A', status: 'Playful'}, mentalScore: 10.0, currentPlan: 'Free',
      reports: { type: 'Rabies Certificate', date: '2024-03-01', doctor: 'Dr. Vet' },
      nextAppointment: 'Vet Annual Checkup, 01 May', medicineRefill: 'Flea & Tick medication', radiologyTest: 'N/A', pathologyTest: 'N/A', vaccineAlert: 'Rabies vaccine due', insuranceStatus: 'Pet insurance available' },
];

const OPD_SERVICE_PROVIDERS = {
    Doctor: [
        { name: 'Dr. Neha Kapoor (Cardio)', dist: '2.5 km', specialty: 'Cardiologist', remote: true, bookable: true, price: 1000 },
        { name: 'Dr. Vivek Singh (General)', dist: '5.1 km', specialty: 'General Practitioner', remote: true, bookable: true, price: 850 },
        { name: 'Dr. Sanjiv Menon (Ortho)', dist: '12.0 km', specialty: 'Orthopedics', remote: false, bookable: true, price: 1200 },
    ],
    AarogyaBondhu: [
        { name: 'Asha Devi (Sector 5)', dist: '0.8 km', specialty: 'Community Health Support', remote: true, bookable: true, price: 300 },
        { name: 'Raju Sahu (Field Worker)', dist: '3.5 km', specialty: 'Home Sample Collection', remote: false, bookable: true, price: 450 },
    ],
    Physiotherapy: [
        { name: 'Physio Rehab Centre', dist: '4.2 km', specialty: 'Post-Injury & Elderly Care', remote: false, bookable: false, price: 0 },
    ],
    ClinicRadiology: [
        { name: 'Precision MRI & Scan', dist: '7.8 km', specialty: 'MRI, CT Scan, X-Ray', remote: false, bookable: false, price: 0 },
        { name: 'Focus X-Ray Clinic', dist: '3.1 km', specialty: 'X-Ray and Ultrasound', remote: false, bookable: false, price: 0 },
    ],
    ClinicPathology: [
        { name: 'Advanced Diagnostics Lab', dist: '1.2 km', specialty: 'Blood/Urine/HBA1C Tests', remote: true, bookable: false, price: 0 },
    ],
    Pharmacy: [
        { name: 'HealthPlus Pharmacy', dist: '1.5 km', specialty: 'Medicine Delivery & Consults', remote: true, bookable: false, price: 0 },
    ],
};

// =================================================================
// 1. NAVIGATION COMPONENTS (TopNav & Sidebar)
// =================================================================

const TopNav = ({ t, language, setLanguage, setRoute, currentProfile, familyProfiles, setProfileKey }) => (
    <header className="fixed w-full bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg z-30">
        <h1 className="text-xl font-bold">{t('platformTitle')}</h1>

        <div className="flex items-center space-x-6 text-sm">
            
            {/* Profile Selector Dropdown */}
            <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <select
                    value={currentProfile.key}
                    onChange={(e) => setProfileKey(e.target.value)}
                    className="bg-white text-blue-600 rounded-md p-1 cursor-pointer font-medium"
                >
                    {familyProfiles.map(p => (
                        <option key={p.key} value={p.key}>
                            {/* Display Translated Role : Fixed Name */}
                            {t(`profiles.${p.roleKey}`)}: {p.name}
                        </option>
                    ))}
                </select>
                <span className="text-white hidden lg:inline">| ID: {currentProfile.id}</span>
            </div>
            
            <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{currentProfile.location}</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-white text-blue-600 rounded-md p-1 cursor-pointer font-medium"
                >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                    <option value="bn">বাংলা</option>
                </select>
            </div>

            <button 
                onClick={() => setRoute('login')}
                className="flex items-center bg-red-500 hover:bg-red-700 transition duration-150 p-2 rounded-full font-medium"
            >
                <LogOut className="w-4 h-4 mr-1" />
                {t('logout')}
            </button>
        </div>
    </header>
);

const Sidebar = ({ t, setRoute }) => {
    const navItems = useMemo(() => ([
        { name: 'home', icon: Home, route: 'home' },
        { name: 'opdNight', icon: BriefcaseMedical, route: 'opdNight' },
        { name: 'treatmentJourney', icon: Stethoscope, route: 'treatmentJourney' },
        { name: 'reports', icon: Activity, route: 'reports' }, 
        { name: 'learning', icon: FileText, route: 'learning' }, 
        { name: 'dashboard', icon: BarChart2, route: 'dashboard' }, 
        { name: 'mentalHealth', icon: Heart, route: 'mentalHealth' }, 
        { name: 'accountSettings', icon: Settings, route: 'accountSettings' }, 
    ]), []);

    return (
        <nav className="space-y-2">
            <h2 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Dashboard</h2>
            {navItems.map((item) => (
                <button 
                    key={item.name} 
                    onClick={() => setRoute(item.route)}
                    className="w-full text-left flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition duration-150 cursor-pointer focus:outline-none"
                >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{t(`nav.${item.name}`)}</span>
                </button>
            ))}
        </nav>
    );
};

// =================================================================
// 2. RIGHT PANEL COMPONENTS (Health Stats, Chatbot & Feedback)
// =================================================================

const HealthStatsCard = ({ t, profile }) => (
    <div className="p-4 bg-white rounded-xl shadow border border-gray-200">
        <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center"><TrendingUp className="w-5 h-5 mr-2" /> {t('alerts.healthStats')}</h3>
        <div className="space-y-2 text-sm text-gray-700">
            <p className="flex justify-between">
                <span>Heart Rate:</span>
                <span className="font-semibold text-green-600">{profile.vitals.hr}</span>
            </p>
            <p className="flex justify-between">
                <span>Blood Pressure:</span>
                <span className="font-semibold text-red-600">{profile.vitals.bp}</span>
            </p>
            <p className="flex justify-between border-t pt-2 mt-2 border-gray-100">
                <span className="font-semibold flex items-center"><Smile className="w-4 h-4 mr-1 text-purple-600"/> {t('alerts.mentalScore')}:</span>
                <span className={`font-bold text-lg ${profile.mentalScore > 8 ? 'text-green-600' : 'text-yellow-600'}`}>{profile.mentalScore} / 10</span>
            </p>
        </div>
    </div>
);

const ChatbotContactCard = ({ t }) => (
    <div className="p-4 bg-blue-50 rounded-xl shadow border border-blue-200 space-y-3">
        <h3 className="text-lg font-bold text-blue-800 flex items-center"><MessageCircle className="w-5 h-5 mr-2" /> {t('alerts.connect')}</h3>
        
        <button 
            onClick={() => console.log('Simulated Chatbot interaction.')}
            className="w-full text-center text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm"
        >
            Start Chat with AI Assistant
        </button>

        <button 
            onClick={() => window.alert('DEMO: Raising a critical issue for follow-up.')}
            className="w-full text-center text-red-700 bg-red-100 px-4 py-2 rounded-lg hover:bg-red-200 transition font-medium text-sm border border-red-300"
        >
            {t('alerts.raiseIssue')}
        </button>
        
        <div className="flex justify-between text-xs text-gray-600 pt-2 border-t border-gray-200">
            <p className="flex items-center"><Phone className="w-3 h-3 mr-1"/> Support: +91 XXXX XXXXX</p>
        </div>
        
        {/* NEW: Feedback Option */}
        <button 
            onClick={() => window.alert(`DEMO: ${t('feedback.title')} - ${t('feedback.message')}`)}
            className="w-full text-center p-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 flex items-center justify-center space-x-2 font-semibold text-sm mt-3"
            title={t('feedback.title')}
        >
            <ThumbsUp className="w-4 h-4"/>
            <span>{t('feedback.title')}</span>
        </button>
    </div>
);

const RightPanelContent = ({ t, currentProfile }) => (
    <div className="space-y-6">
        <HealthStatsCard t={t} profile={currentProfile} />
        <ChatbotContactCard t={t} />
    </div>
);

// --- Feedback Button (DELETED - Functionality merged into ChatbotContactCard) ---
// const FeedbackButton = ({ t }) => (...);


// =================================================================
// 3. MAIN CONTENT COMPONENTS (Modals & Views)
// =================================================================

// --- Alerts Grid (Home Content) ---
const AlertsGrid = ({ t, profile }) => {
    const alerts = useMemo(() => ([
        { title: t('alerts.consultation'), detail: profile.nextAppointment, icon: Calendar, color: 'text-blue-600', isCritical: profile.nextAppointment !== 'N/A' && profile.nextAppointment !== undefined },
        { title: t('alerts.medicineRefill'), detail: profile.medicineRefill, icon: Clipboard, color: profile.medicineRefill === 'N/A' ? 'text-gray-500' : 'text-red-600', isCritical: profile.medicineRefill && profile.medicineRefill.includes('days left') || profile.medicineRefill === 'Thyroid medication (1 day left)' },
        { title: t('alerts.radiology'), detail: profile.radiologyTest, icon: Zap, color: profile.radiologyTest === 'N/A' ? 'text-gray-500' : 'text-purple-600', isCritical: profile.radiologyTest && profile.radiologyTest.startsWith('Pending') },
        { title: t('alerts.pathology'), detail: profile.pathologyTest, icon: Activity, color: profile.pathologyTest === 'N/A' ? 'text-gray-500' : 'text-orange-600', isCritical: profile.pathologyTest && profile.pathologyTest.startsWith('Due') },
        { title: t('alerts.vaccine'), detail: profile.vaccineAlert, icon: Stethoscope, color: profile.vaccineAlert === 'N/A' ? 'text-gray-500' : 'text-red-500', isCritical: profile.vaccineAlert && profile.vaccineAlert.includes('due') },
        { title: t('alerts.insuranceOffer'), detail: profile.insuranceStatus, icon: DollarSign, color: 'text-green-600', isCritical: profile.insuranceStatus && profile.insuranceStatus.includes('Renewal') },
        { title: t('alerts.annualCheckup'), detail: 'Book your discounted family checkup.', icon: Heart, color: 'text-pink-600', isCritical: false },
        { title: t('alerts.videoTips'), detail: 'Watch: 5 tips for mental wellness.', icon: MessageCircle, color: 'text-indigo-600', isCritical: false },
    ]), [t, profile]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alerts.map((alert, index) => {
                const Icon = alert.icon;
                const isNAGray = alert.detail === 'N/A';
                
                return (
                    <div 
                        key={index} 
                        className={`p-4 rounded-xl shadow-lg transition duration-200 cursor-pointer 
                            ${alert.isCritical && !isNAGray ? 'bg-red-50 border-2 border-red-300 hover:shadow-xl' : 'bg-white border border-gray-100 hover:shadow-md'}
                        `}
                    >
                        <div className="flex items-start justify-between">
                            <Icon className={`w-6 h-6 mb-2 ${alert.color}`} />
                            {alert.isCritical && !isNAGray && (
                                <span className="text-xs font-bold text-red-700 bg-red-200 px-2 py-0.5 rounded-full">ACTION</span>
                            )}
                        </div>
                        <h3 className="text-md font-bold text-gray-800 mb-1">{alert.title}</h3>
                        <p className={`text-sm ${isNAGray ? 'text-gray-400' : 'text-gray-600'}`}>{alert.detail || 'No alerts.'}</p>
                    </div>
                );
            })}
        </div>
    );
};

// --- OPD Payment Modal (New Component) ---
const PaymentModal = ({ t, amount, onClose }) => {
    const handlePayment = (method) => {
        if (method === 'Pay Now') {
            window.alert(`DEMO: Successfully paid ₹${amount.toFixed(2)} via UPI. Confirmation sent.`);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-2xl font-bold text-green-800 flex items-center"><CreditCard className="w-6 h-6 mr-2"/>{t('opd.paymentTitle')}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-300">
                    <p className="text-xl font-bold text-green-700">{t('opd.paymentAmount', amount)}</p>
                    <p className="text-sm text-gray-600 mt-1">Payment is required to confirm your booking.</p>
                </div>

                <div className="space-y-3">
                    <button 
                        onClick={() => handlePayment('Pay Now')}
                        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
                    >
                        <Zap className="w-5 h-5"/> <span>{t('opd.payNow')}</span>
                    </button>
                    <button 
                        onClick={() => handlePayment('Pay Later')}
                        className="w-full py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition border border-gray-300"
                    >
                        {t('opd.payLater')}
                    </button>
                </div>
                <p className="text-xs text-center text-gray-500">Note: This is a demo transaction. No actual charges apply.</p>
            </div>
        </div>
    );
};

// --- Booking Modal (Updated to include PaymentModal) ---
const BookingModal = ({ t, provider, category, onClose }) => {
    const [bookingType, setBookingType] = useState('remote');
    const [action, setAction] = useState('new');
    const [selectedDate, setSelectedDate] = useState('2024-03-25');
    const [showPayment, setShowPayment] = useState(false);
    const appointmentPrice = provider.price;

    const handleBooking = () => {
        if (action === 'new' && appointmentPrice > 0) {
            // Proceed to payment screen after simulated successful booking confirmation
            setShowPayment(true);
        } else {
            const message = t('booking.bookedMessage', provider.name, selectedDate);
            window.alert(message);
            onClose();
        }
    };

    const handlePaymentClose = () => {
        // After payment (or selecting pay later), close the booking modal entirely.
        const message = t('booking.bookedMessage', provider.name, selectedDate);
        window.alert(message);
        onClose();
    };

    const isBookable = provider.bookable;
    if (!isBookable) return null;

    if (showPayment && appointmentPrice > 0) {
        return <PaymentModal t={t} amount={appointmentPrice} onClose={handlePaymentClose} />;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 space-y-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-2xl font-bold text-blue-800">{t('booking.title')}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                {/* Provider Info */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="text-lg font-bold text-blue-900">{provider.name} ({t(`opdCategories.${category}`)})</h4>
                    <p className="text-sm text-gray-700">{provider.specialty}</p>
                    <p className="text-xs text-green-700 mt-1">{t('booking.distance')} {provider.dist} | Price: ₹{appointmentPrice}</p>
                </div>
                
                {/* Action Selector */}
                <div className="flex space-x-2">
                    <button 
                        onClick={() => setAction('new')} 
                        className={`px-4 py-2 rounded-full text-sm font-medium ${action === 'new' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <PlusCircle className="w-4 h-4 inline mr-1" /> {t('booking.new')}
                    </button>
                    <button 
                        onClick={() => setAction('edit')} 
                        className={`px-4 py-2 rounded-full text-sm font-medium ${action === 'edit' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <Zap className="w-4 h-4 inline mr-1" /> {t('booking.edit')}
                    </button>
                    <button 
                        onClick={() => setAction('delete')} 
                        className={`px-4 py-2 rounded-full text-sm font-medium ${action === 'delete' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        <XCircle className="w-4 h-4 inline mr-1" /> {t('booking.delete')}
                    </button>
                </div>

                {/* Consultation Type Toggle */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{t('booking.type')}</label>
                    <div className="flex bg-gray-100 p-1 rounded-lg w-full max-w-md">
                        <button 
                            onClick={() => setBookingType('in-person')} 
                            className={`w-1/2 p-2 rounded-lg text-sm font-medium transition ${bookingType === 'in-person' ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-gray-200'}`}
                        >
                            <User className="w-4 h-4 inline mr-1" /> {t('booking.inPerson')}
                        </button>
                        <button 
                            onClick={() => setBookingType('remote')} 
                            className={`w-1/2 p-2 rounded-lg text-sm font-medium transition ${bookingType === 'remote' ? 'bg-blue-600 text-white shadow' : 'text-gray-700 hover:bg-gray-200'}`}
                        >
                            <Phone className="w-4 h-4 inline mr-1" /> {t('booking.remote')}
                        </button>
                    </div>
                </div>

                {/* Calendar Mock (Date/Time Picker) */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">{t('booking.date')}</label>
                    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <input 
                            type="date" 
                            value={selectedDate} 
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md" 
                        />
                        <select className="p-2 border border-gray-300 rounded-md">
                            <option>10:00 AM</option>
                            <option>11:00 AM</option>
                            <option>2:00 PM</option>
                        </select>
                    </div>
                    <p className="text-xs text-green-600 font-medium">{t('booking.availability')}: Tomorrow, 3 slots available.</p>
                </div>

                {/* Submit/Close Buttons */}
                <div className="flex justify-end space-x-4 pt-4 border-t">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-300 rounded-lg text-gray-800 font-semibold hover:bg-gray-400">Close</button>
                    {action === 'new' && (
                        <button onClick={handleBooking} className="px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700">
                            {appointmentPrice > 0 ? t('opd.payNow') : 'Confirm Booking'}
                        </button>
                    )}
                    {(action === 'edit' || action === 'delete') && (
                        <button onClick={handleBooking} className={`px-6 py-2 rounded-lg text-white font-semibold ${action === 'edit' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-red-600 hover:bg-red-700'}`}>
                            {action === 'edit' ? 'Update Booking' : 'Cancel Appointment'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Subscription Upgrade Modal (New Component) ---
const SubscriptionModal = ({ t, currentPlan, onClose, setProfilePlan }) => {
    const plans = useMemo(() => [
        { key: 'Free', price: 0, accounts: 1, color: 'text-gray-500', benefits: [t('plans.benefit1')], features: 'Free', benefitIcons: [CheckCircle] },
        { key: 'Silver', price: 999, accounts: 3, color: 'text-gray-400', benefits: [t('plans.benefit1'), t('plans.benefit2')], features: 'Silver', benefitIcons: [CheckCircle, Zap] },
        { key: 'Gold', price: 2999, accounts: 5, color: 'text-yellow-600', benefits: [t('plans.benefit1'), t('plans.benefit2'), t('plans.benefit3')], features: 'Gold', benefitIcons: [CheckCircle, Zap, User] },
        { key: 'Platinum', price: 4999, accounts: 7, color: 'text-blue-600', benefits: [t('plans.benefit1'), t('plans.benefit2'), t('plans.benefit3'), t('plans.benefit4')], features: 'Platinum', benefitIcons: [CheckCircle, Zap, User, Star] },
    ], [t]);
    
    // Get all unique benefits for listing
    const allBenefits = useMemo(() => {
        const uniqueBenefits = {};
        plans.forEach(plan => {
            plan.benefits.forEach((benefit, index) => {
                const icon = plan.benefitIcons[index] || CheckCircle; 
                uniqueBenefits[benefit] = { icon, included: false };
            });
        });
        return Object.keys(uniqueBenefits);
    }, [plans]);


    const handleUpgrade = (planKey, price) => {
        if (planKey === currentPlan) {
            window.alert(`DEMO: You are already on the ${t(`plans.${planKey}`)} plan.`);
            return;
        }

        const confirm = window.confirm(`Confirm upgrade to ${t(`plans.${planKey}`)} for ₹${price} / month?`);
        if (confirm) {
            // DEMO PAYMENT MOCK
            window.alert(`DEMO: Redirecting to payment for ₹${price}. Assume success.`);
            
            setProfilePlan(planKey);
            window.alert(`DEMO: Successfully upgraded to ${t(`plans.${planKey}`)}. Thank you!`);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl p-6 space-y-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-2xl font-bold text-blue-800 flex items-center"><Gift className="w-6 h-6 mr-2"/>{t('settings.upgrade')}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                <p className="text-sm text-center text-gray-600">
                    {t('settings.currentPlan')} <span className="font-bold text-blue-600">{t(`plans.${currentPlan}`)}</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {plans.map(plan => (
                        <div 
                            key={plan.key} 
                            className={`p-5 rounded-xl shadow-lg border-4 transition duration-300 relative ${plan.key === currentPlan ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white hover:border-blue-300'}`}
                        >
                             {plan.key === currentPlan && (
                                <span className="absolute top-2 right-2 text-xs font-bold text-green-700 bg-green-200 px-2 py-0.5 rounded-full flex items-center space-x-1">
                                    <CheckCircle className='w-3 h-3'/> Active
                                </span>
                            )}
                            <div className="text-center space-y-2 border-b pb-3 mb-3">
                                <h4 className={`text-2xl font-extrabold ${plan.color}`}>{t(`plans.${plan.key}`)}</h4>
                                <p className="text-sm font-semibold">{plan.price === 0 ? 'Free' : `₹${plan.price} / Month`}</p>
                                <p className="text-xs text-gray-500">{t('plans.accounts')}: {plan.accounts}</p>
                            </div>
                            
                            <h5 className="font-bold text-sm text-gray-700 mb-2">{t('plans.benefits')}</h5>
                            <ul className="space-y-2 text-sm h-32">
                                {allBenefits.map((benefit, index) => (
                                    <li key={index} className={`flex items-start space-x-2 ${plan.benefits.includes(benefit) ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {plan.benefits.includes(benefit) ? 
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0"/> : 
                                            <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0"/>}
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleUpgrade(plan.key, plan.price)}
                                disabled={plan.key === currentPlan}
                                className={`mt-5 w-full py-2 rounded-lg font-semibold transition ${plan.key === currentPlan ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            >
                                {plan.key === currentPlan ? 'Current Plan' : t('settings.upgradeButton')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- Journey Template Modal Component ---
const AddJourneyTemplate = ({ t, onClose }) => {
    const templateSteps = useMemo(() => ([
        { key: 'visit', icon: Home, status: 'Completed' },
        { key: 'payment', icon: DollarSign, status: 'Completed' },
        { key: 'vitals', icon: TrendingUp, status: 'Completed' },
        { key: 'consultation', icon: Stethoscope, status: 'Upcoming' },
        { key: 'eprescription', icon: FileText, status: 'Pending' },
    ]), []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 space-y-6">
                <div className="flex justify-between items-center border-b pb-3">
                    <h3 className="text-2xl font-bold text-green-800 flex items-center"><List className="w-6 h-6 mr-2"/>{t('journey.template.title')}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl leading-none">&times;</button>
                </div>

                {/* Template Steps */}
                <div className="space-y-4">
                    {templateSteps.map((step, index) => {
                        const Icon = step.icon;
                        const statusColor = step.status === 'Completed' ? 'bg-green-500' : step.status === 'Upcoming' ? 'bg-yellow-500' : 'bg-gray-400';
                        const textColor = step.status === 'Completed' ? 'text-green-800' : 'text-gray-800';

                        return (
                            <div key={step.key} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${statusColor}`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1">
                                    <p className={`font-medium ${textColor}`}>{t(`journey.template.steps.${step.key}`)}</p>
                                </div>
                                <Icon className={`w-5 h-5 ${step.status === 'Completed' ? 'text-green-500' : 'text-gray-500'}`} />
                            </div>
                        );
                    })}
                </div>

                {/* Suggestions Block */}
                <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-lg font-bold text-blue-800 mb-3">{t('journey.template.suggestTitle')}</h4>
                    <div className="space-y-2">
                        <button className="w-full text-left p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition shadow-sm">
                            <PlusCircle className="w-4 h-4 inline mr-2"/> {t('journey.template.suggest1')}
                        </button>
                        <button className="w-full text-left p-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition shadow-sm">
                            <PlusCircle className="w-4 h-4 inline mr-2"/> {t('journey.template.suggest2')}
                        </button>
                    </div>
                </div>

                {/* Close Button */}
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-gray-600 rounded-lg text-white font-semibold hover:bg-gray-700">
                        {t('journey.template.close')}
                    </button>
                </div>
            </div>
        </div>
    );
};


// --- Journey Tracker Component ---
const JourneyTracker = ({ t }) => {
    const [showTemplate, setShowTemplate] = useState(false);
    
    // Mock Treatment Journey Data
    const mockSteps = [
        { title: "Oncology Review Board Meeting", status: "Completed", date: "Feb 15, 2024", icon: CheckCircle },
        { title: "Chemotherapy Cycle 1", status: "Upcoming", date: "Mar 01, 2024", icon: Calendar },
        { title: t('journey.template.steps.consultation'), status: "Upcoming", date: "Mar 25, 2024", icon: Clock },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center"><Stethoscope className="w-7 h-7 mr-3 text-blue-600"/>{t('journey.title')}</h2>
            
            {/* Search Bar */}
            <div className="flex space-x-4">
                <div className="relative flex-1">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                    <input
                        type="text"
                        placeholder={t('journey.searchPlaceholder')}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button 
                    onClick={() => setShowTemplate(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition shadow-md font-semibold"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>{t('journey.addTreatment')}</span>
                </button>
            </div>

            {/* Treatment Journey Display */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
                <h3 className="text-xl font-bold text-blue-800">Active Journey: Cancer Care Plan</h3>

                {/* Journey Timeline */}
                <div className="relative border-l-4 border-blue-300 ml-4 pl-6 space-y-8">
                    {mockSteps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className={`absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center ${step.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                <step.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex justify-between items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div>
                                    <p className="font-semibold text-lg text-gray-800">{step.title}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${step.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{step.status}</span>
                                    <p className="text-xs text-gray-500 mt-1">{step.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="text-blue-600 font-medium text-sm flex items-center hover:text-blue-800 transition">
                    View All Past Journeys <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
            
            {showTemplate && <AddJourneyTemplate t={t} onClose={() => setShowTemplate(false)} />}
        </div>
    );
};

// --- Reports Content ---
const ReportsContent = ({ t, profile }) => {
    const reportTypes = ['typePrescription', 'typeConsent', 'typeRadiology', 'typePathology'];
    const reportData = useMemo(() => ({
        type: profile.reports.type,
        date: profile.reports.date,
        doctor: profile.reports.doctor,
    }), [profile]);
    
    const handleShare = (method) => {
        window.alert(`DEMO: Attempting to share report '${reportData.type}' for ${profile.name} via ${method}.`);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center"><Activity className="w-7 h-7 mr-3 text-blue-600"/>{t('reports.title')}</h2>

            {/* Search Bar */}
            <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"/>
                <input
                    type="text"
                    placeholder={t('reports.searchPlaceholder')}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Report Categories */}
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <div className="flex flex-wrap gap-2 mb-4">
                    {reportTypes.map(typeKey => (
                        <button
                            key={typeKey}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition duration-150 border-2 bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200`}
                        >
                            {t(`reports.${typeKey}`)}
                        </button>
                    ))}
                </div>

                {/* Dynamic Report Display */}
                <h3 className="text-xl font-bold text-blue-800 border-t pt-4 mt-4">Latest Report ({t(`reports.type${reportData.type.replace(/\s+/g, '')}`)})</h3>
                <div className="mt-3 p-4 bg-blue-50 rounded-lg space-y-1 border border-blue-200">
                    <p className="font-semibold text-lg text-gray-800">{reportData.type} - {reportData.doctor}</p>
                    <p className="text-sm text-gray-600">Date: {reportData.date}</p>
                    <p className="text-sm text-gray-600">Status: Finalized</p>
                </div>
                
                {/* Share/Download Options */}
                <div className="mt-4 border-t pt-4">
                    <h4 className="font-bold text-gray-700 mb-2 flex items-center"><Share2 className='w-4 h-4 mr-2'/>{t('reports.shareDownload')}</h4>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => window.alert('DEMO: Downloading PDF...')} className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition">
                            <Download className="w-4 h-4"/> <span>Download</span>
                        </button>
                        <button onClick={() => handleShare('WhatsApp')} className="flex items-center space-x-1 px-4 py-2 bg-gray-600 text-white rounded-full text-sm hover:bg-gray-700 transition">
                            <Phone className="w-4 h-4"/> <span>{t('reports.shareWhatsApp')}</span>
                        </button>
                        <button onClick={() => handleShare('Email')} className="flex items-center space-x-1 px-4 py-2 bg-gray-600 text-white rounded-full text-sm hover:bg-gray-700 transition">
                            <Mail className="w-4 h-4"/> <span>{t('reports.shareEmail')}</span>
                        </button>
                        <button onClick={() => handleShare('Doctor/Clinic')} className="flex items-center space-x-1 px-4 py-2 bg-gray-600 text-white rounded-full text-sm hover:bg-gray-700 transition">
                            <Users className="w-4 h-4"/> <span>{t('reports.shareDoctor')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Learning Content ---
const LearningContent = ({ t }) => {
    const suggestedVideos = useMemo(() => ([
        t('learning.video1'),
        t('learning.video2'),
        t('learning.video3'),
    ]), [t]);

    const historicalVideos = useMemo(() => ([
        { title: t('learning.video4'), date: '2 days ago' },
        { title: t('learning.video5'), date: '1 week ago' },
        { title: t('learning.video6'), date: '1 month ago' },
    ]), [t]);
    
    const VideoItem = ({ title, date, isSuggested = false }) => (
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer border border-gray-200">
            <div className="flex items-center space-x-2">
                <MessageCircle className={`w-5 h-5 ${isSuggested ? 'text-blue-500' : 'text-green-500'}`}/>
                <p className="font-medium text-gray-800">{title}</p>
            </div>
            <p className="text-xs text-gray-500">{date || 'New'}</p>
        </div>
    );

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center"><FileText className="w-7 h-7 mr-3 text-blue-600"/>{t('learning.title')}</h2>

            {/* Suggested Videos */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <h3 className="text-xl font-bold text-blue-800 flex items-center"><List className='w-5 h-5 mr-2'/>{t('learning.suggested')}</h3>
                {suggestedVideos.map((title, index) => (
                    <VideoItem key={index} title={title} isSuggested={true} />
                ))}
            </div>

            {/* Historical Videos */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <h3 className="text-xl font-bold text-blue-800 flex items-center"><Clock className='w-5 h-5 mr-2'/>{t('learning.historical')}</h3>
                {historicalVideos.map((video, index) => (
                    <VideoItem key={index} title={video.title} date={video.date} />
                ))}
            </div>
        </div>
    );
};

// --- Dashboard (Analytics) Content ---

const AnalyticsDashboard = ({ t, profile }) => {
    const plan = t(`plans.${profile.currentPlan}`);
    
    // Mock Data based on plan/profile
    const mockData = useMemo(() => ({
        expenses: [15000, 12000, 18000, 14000, 16000, 20000].map(d => d * (profile.mentalScore / 10)),
        travel: [2000, 1500, 3000, 1000, 2500, 1200],
        local: [1000, 1200, 800, 900, 1100, 950],
        months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    }), [profile]);

    const ComparisonChartMock = ({ data, title, labels, color1, color2, label1, label2, yLabel }) => (
        <div className="bg-white p-5 rounded-xl shadow border border-gray-100 h-96">
            <h4 className="font-bold text-lg text-gray-700 mb-4">{title}</h4>
            <div className="h-5/6 relative">
                <div className="absolute inset-0 flex items-end justify-around p-2 text-xs">
                    {data.map((value, index) => (
                        <div key={index} className="flex flex-col items-center h-full justify-end">
                            <span style={{ height: `${value[0] / 200}px`, backgroundColor: color1 }} className="w-4 rounded-t-sm"></span>
                            <span style={{ height: `${value[1] / 200}px`, backgroundColor: color2 }} className="w-4 mt-1 rounded-t-sm"></span>
                            <span className="text-gray-500 mt-1">{labels[index]}</span>
                        </div>
                    ))}
                    {/* Y-Axis Label Mock */}
                    <div className="absolute left-0 top-0 h-full w-0 border-l border-gray-300"></div>
                </div>
                <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 rotate-90 text-xs font-semibold text-gray-500">{yLabel}</div>
                <div className="absolute right-0 top-0 text-xs space-y-1">
                    <p className={`flex items-center text-xs`}><span className='w-2 h-2 mr-1 rounded-full' style={{ backgroundColor: color1 }}></span> {label1}</p>
                    <p className={`flex items-center text-xs`}><span className='w-2 h-2 mr-1 rounded-full' style={{ backgroundColor: color2 }}></span> {label2}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center"><BarChart2 className="w-7 h-7 mr-3 text-blue-600"/>{t('dashboard.title')}</h2>

            {/* Treatment Expenses Overview (Mock Graph) */}
            <ComparisonChartMock
                data={mockData.months.map((m, i) => [mockData.expenses[i], mockData.expenses[i] - mockData.expenses[i] / 5])}
                title={t('dashboard.expensesTitle')}
                labels={mockData.months}
                color1="#3b82f6"
                color2="#93c5fd"
                label1="Total Paid"
                label2="Insurance Covered"
                yLabel={t('dashboard.expenseY')}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Travel vs Local Cost Comparison (Mock Graph) */}
                <ComparisonChartMock
                    data={mockData.months.map((m, i) => [mockData.travel[i], mockData.local[i]])}
                    title={t('dashboard.comparisonTitle')}
                    labels={mockData.months}
                    color1="#ef4444"
                    color2="#10b981"
                    label1={t('dashboard.compTravel')}
                    label2={t('dashboard.compLocal')}
                    yLabel={t('dashboard.comparisonY')}
                />
                
                {/* Savings Suggestions & Subscription */}
                <div className='space-y-6'>
                    <div className="p-5 bg-green-50 rounded-xl shadow border-2 border-green-300">
                        <h4 className="font-bold text-xl text-green-800 flex items-center"><DollarSign className='w-5 h-5 mr-2'/>{t('dashboard.costSavings')}</h4>
                        <p className="text-sm text-gray-600 mt-2">{t('dashboard.costSavingsDetail')}</p>
                    </div>

                    <div className="p-5 bg-yellow-50 rounded-xl shadow border-2 border-yellow-300">
                        <h4 className="font-bold text-xl text-yellow-800 flex items-center"><Bell className='w-5 h-5 mr-2'/>{t('dashboard.futurePackage')}</h4>
                        <p className="text-sm text-gray-600 mt-2">{t('dashboard.futureText')}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
                <h4 className="font-bold text-xl text-blue-800">{t('dashboard.subscription')}</h4>
                <p className="text-sm text-gray-600 mt-1">Current Plan: <span className='font-bold text-blue-600'>{plan}</span></p>
                <button 
                    onClick={() => window.alert('DEMO: Go to Account Settings for upgrade options.')}
                    className="mt-3 px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600"
                >
                    Upgrade Now
                </button>
            </div>
        </div>
    );
};

// --- Mental Health Content ---
const MentalHealthContent = ({ t, profile }) => (
    <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center"><Heart className="w-7 h-7 mr-3 text-pink-600"/>{t('mental.title')}</h2>

        {/* Live Connect Section (Chat/Voice) */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 space-y-4">
            <h3 className="text-xl font-bold text-blue-800 flex items-center"><MessageCircle className='w-5 h-5 mr-2'/>{t('mental.chatConnect')}</h3>
            
            {/* Score Display (Reiterates score from right panel) */}
            <div className="p-3 bg-purple-50 rounded-lg flex justify-between items-center">
                <p className='font-medium text-purple-800'>{t('alerts.mentalScore')}: <span className='font-bold'>{profile.mentalScore} / 10</span></p>
                <p className='text-xs text-purple-600'>{t('mental.scoreDetail')}</p>
            </div>

            {/* Chat Input Mock */}
            <div className="space-y-2">
                <textarea 
                    placeholder={t('mental.chatPlaceholder')}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500"
                ></textarea>
                <div className="flex justify-between">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700">
                        Send Message
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 flex items-center">
                        <Phone className='w-4 h-4 mr-1'/> {t('mental.voiceCall')}
                    </button>
                </div>
            </div>
        </div>

        {/* Tips & Awareness Videos (Linked to Learning Content) */}
        <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">Tips & Resources</h3>
            <LearningContent t={t} />
        </div>
    </div>
);


// --- Account Settings Content ---
const AccountSettingsContent = ({ t, profile, setProfilePlan }) => {
    const plan = t(`plans.${profile.currentPlan}`);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    
    const settingsOptions = [
        { title: t('settings.profile'), detail: "Update personal information and family profiles.", icon: User, action: () => window.alert('DEMO: Profile Management Interface') },
        { title: t('settings.managePayments'), detail: "View billing history and update payment methods.", icon: DollarSign, action: () => window.alert('DEMO: Payment Gateway Mock') },
        { title: t('settings.upgrade'), detail: `Current Plan: ${plan}. Change your subscription level.`, icon: Zap, action: () => setShowUpgradeModal(true) },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center"><Settings className="w-7 h-7 mr-3 text-gray-600"/>{t('settings.title')}</h2>
            
            {/* Primary Settings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {settingsOptions.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-200 cursor-pointer" onClick={item.action}>
                            <Icon className='w-6 h-6 text-blue-600 mb-2'/>
                            <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.detail}</p>
                        </div>
                    );
                })}
            </div>

            {/* Account Management Actions (Archive/Delete) */}
            <div className="pt-4 border-t border-gray-200 space-y-4">
                <h3 className="text-xl font-bold text-red-700">Dangerous Actions</h3>
                
                <button 
                    onClick={() => window.alert('DEMO: Account archived. You can restore it later.')}
                    className="w-full text-left flex items-center justify-between p-4 bg-yellow-50 text-yellow-800 rounded-lg hover:bg-yellow-100 transition border border-yellow-300"
                >
                    <span className='font-semibold'>{t('settings.archive')}</span>
                    <Archive className='w-5 h-5'/>
                </button>
                
                <button 
                    onClick={() => window.confirm('Are you sure you want to permanently delete the account?')}
                    className="w-full text-left flex items-center justify-between p-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition border border-red-300"
                >
                    <span className='font-semibold'>{t('settings.delete')}</span>
                    <XCircle className='w-5 h-5'/>
                </button>
            </div>
            
            {showUpgradeModal && (
                <SubscriptionModal 
                    t={t} 
                    currentPlan={profile.currentPlan} 
                    onClose={() => setShowUpgradeModal(false)}
                    setProfilePlan={setProfilePlan}
                />
            )}
        </div>
    );
};

// --- OPD Management Content ---
const OPDManagementContent = ({ t }) => {
    const [selectedCategory, setSelectedCategory] = useState('Doctor');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const categories = useMemo(() => Object.keys(OPD_SERVICE_PROVIDERS), []);
    const providers = OPD_SERVICE_PROVIDERS[selectedCategory] || [];

    const handleOpenBooking = (provider) => {
        setSelectedProvider(provider);
        setShowBookingModal(true);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center"><BriefcaseMedical className="w-7 h-7 mr-3 text-blue-600"/>{t('opd.title')}</h2>

            {/* Category Selector */}
            <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 mb-3">{t('opd.selectCategory')}</h3>
                <div className="flex flex-wrap gap-3">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-150 border-2 ${selectedCategory === category ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
                        >
                            {t(`opdCategories.${category}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Service Provider List */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 mb-4">{t('opd.providerList')} ({t(`opdCategories.${selectedCategory}`)})</h3>
                <div className="space-y-4">
                    {providers.map((provider, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <div>
                                <h4 className="font-bold text-lg text-gray-800">{provider.name}</h4>
                                <p className="text-sm text-gray-600">{provider.specialty}</p>
                                <p className="text-xs font-medium text-green-700 flex items-center space-x-1 mt-1">
                                    <MapPin className='w-3 h-3'/> <span>{t('booking.distance')} {provider.dist}</span>
                                    {provider.remote && <span className='text-blue-500 ml-2'>| Remote Available</span>}
                                </p>
                            </div>
                            {provider.bookable ? (
                                <button
                                    onClick={() => handleOpenBooking(provider)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition shadow-md"
                                >
                                    {t('opd.booking')}
                                </button>
                            ) : (
                                <span className="text-sm text-gray-500">View Details</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {showBookingModal && selectedProvider && (
                <BookingModal
                    t={t}
                    provider={selectedProvider}
                    category={selectedCategory}
                    onClose={() => setShowBookingModal(false)}
                />
            )}
        </div>
    );
};

const HomeContent = ({ t, profile }) => (
    <div className="space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900">Dashboard Home: {t(`profiles.${profile.roleKey}`)} ({profile.name})</h2>
        <p className="text-lg text-gray-600 border-b pb-4 mb-4">{t('healthFocus', profile.healthFocus)}</p>

        <h3 className="text-2xl font-bold text-blue-800 mb-4">{t('alerts.alertsTitle')}</h3>
        <AlertsGrid t={t} profile={profile} />
    </div>
);

const FallbackContent = ({ t, route }) => {
    let title = t(`nav.${route}`) || route;
    return (
        <div className="text-center p-10 bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300">
            <h2 className="text-3xl font-bold text-blue-800 mb-2">{title}</h2>
            <p className="text-gray-600">Content for this section is currently a placeholder. It will be implemented soon!</p>
        </div>
    );
}

// =================================================================
// 4. MAIN DASHBOARD APPLICATION
// =================================================================

export default function PatientDashboardApp() {
    const [language, setLanguage] = useState('en');
    const [currentRoute, setCurrentRoute] = useState('home');
    const [currentProfileKey, setCurrentProfileKey] = useState('master');
    const [familyProfilesState, setFamilyProfilesState] = useState(FAMILY_PROFILES);

    // Derived state for current profile
    const currentProfile = useMemo(() => 
        familyProfilesState.find(p => p.key === currentProfileKey) || familyProfilesState[0], 
    [currentProfileKey, familyProfilesState]);
    
    const { t, setLanguage: tSetLanguage } = useTranslation(language);

    const handleSetLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
        }
    };
    
    // Handler to update the plan of the current profile (passed to modal)
    const setProfilePlan = (newPlan) => {
        setFamilyProfilesState(prevProfiles =>
            prevProfiles.map(p => 
                p.key === currentProfileKey ? { ...p, currentPlan: newPlan } : p
            )
        );
    };

    // Determine which component to render in the main content area
    const renderContent = () => {
        switch (currentRoute) {
            case 'home':
                return <HomeContent t={t} profile={currentProfile} />; 
            case 'opdNight':
                return <OPDManagementContent t={t} />;
            case 'treatmentJourney':
                return <JourneyTracker t={t} />;
            case 'reports': 
                return <ReportsContent t={t} profile={currentProfile} />;
            case 'learning': 
                return <LearningContent t={t} />;
            case 'dashboard': 
                return <AnalyticsDashboard t={t} profile={currentProfile} />;
            case 'mentalHealth': 
                return <MentalHealthContent t={t} profile={currentProfile} />;
            case 'accountSettings': 
                return <AccountSettingsContent t={t} profile={currentProfile} setProfilePlan={setProfilePlan} />;
            default:
                return <FallbackContent t={t} route={currentRoute} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            {/* Top Navigation Panel (Fixed) */}
            <TopNav 
                t={t} 
                language={language} 
                setLanguage={handleSetLanguage} 
                setRoute={() => console.log("Simulated Logout")} 
                currentProfile={currentProfile}
                familyProfiles={familyProfilesState}
                setProfileKey={setCurrentProfileKey}
            />

            <div className="flex flex-1 pt-16"> {/* pt-16 to offset the fixed TopNav */}
                
                {/* Left Panel (Sidebar - Fixed) */}
                <aside className="w-64 fixed top-16 bottom-0 overflow-y-auto bg-white shadow-lg p-4 z-20 hidden md:block border-r border-gray-100">
                    <Sidebar t={t} setRoute={setCurrentRoute} />
                </aside>
                
                {/* Center Content Area (Scrolls) */}
                <main className="flex-1 p-6 md:ml-64 lg:mr-80 min-h-[calc(100vh-64px)]">
                    {renderContent()}
                </main>

                {/* Right Panel (Ads & Suggestions - Fixed) */}
                <aside className="w-80 fixed top-16 right-0 bottom-0 overflow-y-auto bg-gray-100 p-4 shadow-xl z-20 hidden lg:block border-l border-gray-200">
                    <RightPanelContent t={t} currentProfile={currentProfile} />
                </aside>
            </div>
            
        </div>
    );
}
