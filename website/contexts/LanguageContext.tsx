'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn-bd' | 'bn' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      industries: 'Industries',
      caseStudies: 'Case Studies',
      about: 'About',
      contact: 'Contact'
    },
    hero: {
      title: 'Transform Your Business with Intelligent Automation',
      subtitle: 'We design AI-powered workflows and messaging systems that reduce manual work by 80% and help you scale without hiring more staff.',
      trustText: 'Trusted by 83+ businesses across multiple countries'
    },
    trust: {
      headline: 'Join successful businesses that have automated their operations',
      bullets: [
        'Save 20+ hours per week',
        'Reduce operational costs by 60%',
        'Scale without hiring',
        'Never miss a customer again'
      ]
    },
    cta: {
      whatsapp: 'Get Free Consultation',
      strategy: 'Book Strategy Call'
    },
    whatWeDo: {
      title: 'What We Do',
      subtitle: 'We specialize in creating intelligent automation systems that work 24/7 to grow your business',
      services: [
        {
          title: 'Smart Messaging Systems',
          description: 'Automated customer communication that feels personal and converts leads into sales.',
          tag: 'Increase Sales'
        },
        {
          title: 'AI-Powered Workflows',
          description: 'Intelligent processes that handle repetitive tasks so you can focus on growing your business.',
          tag: 'Save Time'
        },
        {
          title: 'Business Process Automation',
          description: 'Streamline operations from lead capture to customer delivery with smart automation.',
          tag: 'Reduce Costs'
        },
        {
          title: 'Custom Integration Solutions',
          description: 'Connect all your business tools to work together seamlessly and eliminate manual data entry.',
          tag: 'Eliminate Errors'
        }
      ]
    },
    whoWeHelp: {
      title: 'Who We Help',
      subtitle: 'We work with ambitious business owners who want to scale efficiently',
      industries: [
        {
          title: 'E-commerce Stores',
          pain: 'Struggling with order management, customer support, and inventory tracking',
          solution: 'Automated order processing, smart customer service, and real-time inventory updates'
        },
        {
          title: 'Service Businesses',
          pain: 'Spending too much time on scheduling, follow-ups, and client communication',
          solution: 'Automated booking systems, client onboarding, and smart follow-up sequences'
        },
        {
          title: 'Real Estate Agencies',
          pain: 'Missing leads, manual property management, and time-consuming client updates',
          solution: 'Lead capture automation, property management systems, and client communication workflows'
        },
        {
          title: 'Healthcare Practices',
          pain: 'Manual appointment scheduling, patient follow-ups, and administrative overhead',
          solution: 'Automated scheduling, patient communication, and streamlined administrative processes'
        },
        {
          title: 'Educational Institutions',
          pain: 'Student enrollment processes, communication gaps, and administrative burden',
          solution: 'Automated enrollment, student communication systems, and administrative workflow automation'
        },
        {
          title: 'Manufacturing Companies',
          pain: 'Supply chain coordination, quality control tracking, and production scheduling',
          solution: 'Supply chain automation, quality management systems, and production workflow optimization'
        }
      ]
    },
    whyUs: {
      title: 'Why Choose Us',
      subtitle: 'We deliver results that matter to your bottom line',
      points: [
        {
          title: 'Proven Results',
          description: 'Our clients typically see 3x ROI within 90 days and save 20+ hours per week on manual tasks.'
        },
        {
          title: 'No Technical Headaches',
          description: 'We handle everything from setup to maintenance. You just enjoy the results while we manage the technology.'
        },
        {
          title: 'Custom Solutions',
          description: 'Every business is unique. We create tailored automation systems that fit your specific needs and goals.'
        },
        {
          title: 'Ongoing Support',
          description: 'We provide continuous optimization and support to ensure your automation keeps delivering results as you grow.'
        }
      ]
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Our proven 4-step process to transform your business operations',
      steps: [
        {
          title: 'Discovery Call',
          description: 'We analyze your current processes and identify automation opportunities that will have the biggest impact.'
        },
        {
          title: 'Custom Strategy',
          description: 'We design a tailored automation roadmap that aligns with your business goals and budget.'
        },
        {
          title: 'Implementation',
          description: 'Our team builds and deploys your automation systems with minimal disruption to your operations.'
        },
        {
          title: 'Optimization',
          description: 'We monitor performance and continuously optimize your systems for maximum efficiency and ROI.'
        }
      ]
    },
    useCases: {
      title: 'Real Success Stories',
      subtitle: 'See how businesses like yours have transformed with our automation solutions',
      cases: [
        {
          title: 'E-commerce Store Automation',
          problem: 'Manual order processing taking 4 hours daily',
          solution: 'Automated order management and customer communication system',
          result: '90% time savings, 40% increase in customer satisfaction'
        },
        {
          title: 'Service Business Optimization',
          problem: 'Missing 30% of leads due to slow response times',
          solution: 'Instant lead capture and automated follow-up sequences',
          result: '95% lead response rate, 60% increase in conversions'
        },
        {
          title: 'Real Estate Lead Management',
          problem: 'Agents spending 6 hours daily on administrative tasks',
          solution: 'Automated lead qualification and client communication workflows',
          result: '70% reduction in admin time, 50% more deals closed'
        },
        {
          title: 'Healthcare Practice Efficiency',
          problem: 'Manual appointment scheduling causing booking conflicts',
          solution: 'Smart scheduling system with automated patient reminders',
          result: '85% reduction in no-shows, 3x faster booking process'
        }
      ]
    },
    finalCta: {
      title: 'Ready to Transform Your Business?',
      subtitle: 'Join 83+ successful businesses that have automated their way to growth.',
      email: 'omnisupport@syedfahim.me'
    },
    footer: {
      tagline: 'Automation, AI, and workflows that actually move your business forward.',
      copyright: '© 2024 Omni AI Agency. All rights reserved.',
      email: 'omnisupport@syedfahim.me'
    }
  },
  'bn-bd': {
    nav: {
      home: 'হোম',
      services: 'সার্ভিস',
      industries: 'ইন্ডাস্ট্রি',
      caseStudies: 'কেস স্টাডি',
      about: 'আমাদের সম্পর্কে',
      contact: 'যোগাযোগ'
    },
    hero: {
      title: 'আপনার বিজনেসকে স্মার্ট অটোমেশনে রূপান্তর করুন',
      subtitle: 'আমরা AI-চালিত ওয়ার্কফ্লো এবং মেসেজিং সিস্টেম ডিজাইন করি যা ৮০% ম্যানুয়াল কাজ কমায় এবং নতুন স্টাফ নিয়োগ ছাড়াই স্কেল করতে সাহায্য করে।',
      trustText: 'কয়েকটি দেশের ৮৩+ ব্যবসার বিশ্বস্ত পার্টনার'
    },
    trust: {
      headline: 'সফল ব্যবসায়ীদের সাথে যোগ দিন যারা তাদের অপারেশন অটোমেট করেছেন',
      bullets: [
        'সপ্তাহে ২০+ ঘন্টা সাশ্রয়',
        'অপারেশনাল খরচ ৬০% কমান',
        'নিয়োগ ছাড়াই স্কেল করুন',
        'কোনো কাস্টমার মিস করবেন না'
      ]
    },
    cta: {
      whatsapp: 'ফ্রি কনসালটেশন নিন',
      strategy: 'স্ট্র্যাটেজি কল বুক করুন'
    },
    whatWeDo: {
      title: 'আমরা কী করি',
      subtitle: 'আমরা ইন্টেলিজেন্ট অটোমেশন সিস্টেম তৈরিতে বিশেষজ্ঞ যা ২৪/৭ আপনার ব্যবসা বৃদ্ধিতে কাজ করে',
      services: [
        {
          title: 'স্মার্ট মেসেজিং সিস্টেম',
          description: 'অটোমেটেড কাস্টমার কমিউনিকেশন যা ব্যক্তিগত মনে হয় এবং লিডকে সেলসে রূপান্তর করে।',
          tag: 'সেলস বৃদ্ধি'
        },
        {
          title: 'AI-চালিত ওয়ার্কফ্লো',
          description: 'ইন্টেলিজেন্ট প্রসেস যা পুনরাবৃত্তিমূলক কাজ সামলায় যাতে আপনি ব্যবসা বৃদ্ধিতে ফোকাস করতে পারেন।',
          tag: 'সময় সাশ্রয়'
        },
        {
          title: 'বিজনেস প্রসেস অটোমেশন',
          description: 'লিড ক্যাপচার থেকে কাস্টমার ডেলিভারি পর্যন্ত স্মার্ট অটোমেশনের মাধ্যমে অপারেশন স্ট্রিমলাইন করুন।',
          tag: 'খরচ কমান'
        },
        {
          title: 'কাস্টম ইন্টিগ্রেশন সলিউশন',
          description: 'আপনার সব বিজনেস টুলকে একসাথে কাজ করার জন্য কানেক্ট করুন এবং ম্যানুয়াল ডেটা এন্ট্রি দূর করুন।',
          tag: 'ভুল দূর করুন'
        }
      ]
    },
    whoWeHelp: {
      title: 'আমরা কাদের সাহায্য করি',
      subtitle: 'আমরা উচ্চাভিলাষী ব্যবসায়ীদের সাথে কাজ করি যারা দক্ষতার সাথে স্কেল করতে চান',
      industries: [
        {
          title: 'ই-কমার্স স্টোর',
          pain: 'অর্ডার ম্যানেজমেন্ট, কাস্টমার সাপোর্ট এবং ইনভেন্টরি ট্র্যাকিং নিয়ে সমস্যা',
          solution: 'অটোমেটেড অর্ডার প্রসেসিং, স্মার্ট কাস্টমার সার্ভিস এবং রিয়েল-টাইম ইনভেন্টরি আপডেট'
        },
        {
          title: 'সার্ভিস ব্যবসা',
          pain: 'শিডিউলিং, ফলো-আপ এবং ক্লায়েন্ট কমিউনিকেশনে অনেক সময় ব্যয়',
          solution: 'অটোমেটেড বুকিং সিস্টেম, ক্লায়েন্ট অনবোর্ডিং এবং স্মার্ট ফলো-আপ সিকোয়েন্স'
        },
        {
          title: 'রিয়েল এস্টেট এজেন্সি',
          pain: 'লিড মিস করা, ম্যানুয়াল প্রপার্টি ম্যানেজমেন্ট এবং সময়সাপেক্ষ ক্লায়েন্ট আপডেট',
          solution: 'লিড ক্যাপচার অটোমেশন, প্রপার্টি ম্যানেজমেন্ট সিস্টেম এবং ক্লায়েন্ট কমিউনিকেশন ওয়ার্কফ্লো'
        },
        {
          title: 'হেলথকেয়ার প্র্যাকটিস',
          pain: 'ম্যানুয়াল অ্যাপয়েন্টমেন্ট শিডিউলিং, পেশেন্ট ফলো-আপ এবং প্রশাসনিক ওভারহেড',
          solution: 'অটোমেটেড শিডিউলিং, পেশেন্ট কমিউনিকেশন এবং স্ট্রিমলাইনড প্রশাসনিক প্রসেস'
        },
        {
          title: 'শিক্ষা প্রতিষ্ঠান',
          pain: 'স্টুডেন্ট এনরোলমেন্ট প্রসেস, কমিউনিকেশন গ্যাপ এবং প্রশাসনিক বোঝা',
          solution: 'অটোমেটেড এনরোলমেন্ট, স্টুডেন্ট কমিউনিকেশন সিস্টেম এবং প্রশাসনিক ওয়ার্কফ্লো অটোমেশন'
        },
        {
          title: 'ম্যানুফ্যাকচারিং কোম্পানি',
          pain: 'সাপ্লাই চেইন কোঅর্ডিনেশন, কোয়ালিটি কন্ট্রোল ট্র্যাকিং এবং প্রোডাকশন শিডিউলিং',
          solution: 'সাপ্লাই চেইন অটোমেশন, কোয়ালিটি ম্যানেজমেন্ট সিস্টেম এবং প্রোডাকশন ওয়ার্কফ্লো অপটিমাইজেশন'
        }
      ]
    },
    whyUs: {
      title: 'কেন আমাদের বেছে নেবেন',
      subtitle: 'আমরা এমন ফলাফল দেই যা আপনার বটম লাইনে গুরুত্বপূর্ণ',
      points: [
        {
          title: 'প্রমাণিত ফলাফল',
          description: 'আমাদের ক্লায়েন্টরা সাধারণত ৯০ দিনের মধ্যে ৩x ROI দেখেন এবং ম্যানুয়াল কাজে সপ্তাহে ২০+ ঘন্টা সাশ্রয় করেন।'
        },
        {
          title: 'কোনো টেকনিক্যাল ঝামেলা নেই',
          description: 'আমরা সেটআপ থেকে মেইনটেনেন্স পর্যন্ত সবকিছু সামলাই। আপনি শুধু ফলাফল উপভোগ করুন আমরা টেকনোলজি ম্যানেজ করি।'
        },
        {
          title: 'কাস্টম সলিউশন',
          description: 'প্রতিটি ব্যবসা অনন্য। আমরা আপনার নির্দিষ্ট প্রয়োজন এবং লক্ষ্যের সাথে মানানসই কাস্টমাইজড অটোমেশন সিস্টেম তৈরি করি।'
        },
        {
          title: 'চলমান সাপোর্ট',
          description: 'আমরা ক্রমাগত অপটিমাইজেশন এবং সাপোর্ট প্রদান করি যাতে আপনার অটোমেশন আপনার বৃদ্ধির সাথে সাথে ফলাফল দিতে থাকে।'
        }
      ]
    },
    howItWorks: {
      title: 'এটি কীভাবে কাজ করে',
      subtitle: 'আপনার ব্যবসায়িক অপারেশন রূপান্তরের জন্য আমাদের প্রমাণিত ৪-ধাপের প্রক্রিয়া',
      steps: [
        {
          title: 'ডিসকভারি কল',
          description: 'আমরা আপনার বর্তমান প্রসেস বিশ্লেষণ করি এবং সবচেয়ে বড় প্রভাব ফেলবে এমন অটোমেশন সুযোগ চিহ্নিত করি।'
        },
        {
          title: 'কাস্টম স্ট্র্যাটেজি',
          description: 'আমরা আপনার ব্যবসায়িক লক্ষ্য এবং বাজেটের সাথে সামঞ্জস্যপূর্ণ একটি কাস্টমাইজড অটোমেশন রোডম্যাপ ডিজাইন করি।'
        },
        {
          title: 'বাস্তবায়ন',
          description: 'আমাদের টিম আপনার অপারেশনে ন্যূনতম ব্যাঘাত ঘটিয়ে আপনার অটোমেশন সিস্টেম তৈরি এবং ডিপ্লয় করে।'
        },
        {
          title: 'অপটিমাইজেশন',
          description: 'আমরা পারফরম্যান্স মনিটর করি এবং সর্বোচ্চ দক্ষতা এবং ROI-এর জন্য আপনার সিস্টেমগুলি ক্রমাগত অপটিমাইজ করি।'
        }
      ]
    },
    useCases: {
      title: 'বাস্তব সাফল্যের গল্প',
      subtitle: 'দেখুন আপনার মতো ব্যবসাগুলি কীভাবে আমাদের অটোমেশন সলিউশনের সাথে রূপান্তরিত হয়েছে',
      cases: [
        {
          title: 'ই-কমার্স স্টোর অটোমেশন',
          problem: 'ম্যানুয়াল অর্ডার প্রসেসিং দৈনিক ৪ ঘন্টা সময় নিচ্ছিল',
          solution: 'অটোমেটেড অর্ডার ম্যানেজমেন্ট এবং কাস্টমার কমিউনিকেশন সিস্টেম',
          result: '৯০% সময় সাশ্রয়, কাস্টমার সন্তুষ্টিতে ৪০% বৃদ্ধি'
        },
        {
          title: 'সার্ভিস ব্যবসা অপটিমাইজেশন',
          problem: 'ধীর রেসপন্স টাইমের কারণে ৩০% লিড মিস করছিল',
          solution: 'তাৎক্ষণিক লিড ক্যাপচার এবং অটোমেটেড ফলো-আপ সিকোয়েন্স',
          result: '৯৫% লিড রেসপন্স রেট, কনভার্শনে ৬০% বৃদ্ধি'
        },
        {
          title: 'রিয়েল এস্টেট লিড ম্যানেজমেন্ট',
          problem: 'এজেন্টরা প্রশাসনিক কাজে দৈনিক ৬ ঘন্টা ব্যয় করছিল',
          solution: 'অটোমেটেড লিড কোয়ালিফিকেশন এবং ক্লায়েন্ট কমিউনিকেশন ওয়ার্কফ্লো',
          result: 'অ্যাডমিন সময়ে ৭০% হ্রাস, ৫০% বেশি ডিল ক্লোজ'
        },
        {
          title: 'হেলথকেয়ার প্র্যাকটিস দক্ষতা',
          problem: 'ম্যানুয়াল অ্যাপয়েন্টমেন্ট শিডিউলিং বুকিং কনফ্লিক্ট সৃষ্টি করছিল',
          solution: 'অটোমেটেড পেশেন্ট রিমাইন্ডার সহ স্মার্ট শিডিউলিং সিস্টেম',
          result: 'নো-শোতে ৮৫% হ্রাস, ৩x দ্রুত বুকিং প্রক্রিয়া'
        }
      ]
    },
    finalCta: {
      title: 'আপনার ব্যবসা রূপান্তর করতে প্রস্তুত?',
      subtitle: '৮৩+ সফল ব্যবসার সাথে যোগ দিন যারা অটোমেশনের মাধ্যমে বৃদ্ধির পথে এগিয়েছে।',
      email: 'omnisupport@syedfahim.me'
    },
    footer: {
      tagline: 'Automation, AI, and workflows that actually move your business forward.',
      copyright: '© 2024 ওমনি AI এজেন্সি। সমস্ত অধিকার সংরক্ষিত।',
      email: 'omnisupport@syedfahim.me'
    }
  },
  bn: {
    nav: {
      home: 'হোম',
      services: 'সেবা',
      industries: 'শিল্প',
      caseStudies: 'কেস স্টাডি',
      about: 'আমাদের সম্পর্কে',
      contact: 'যোগাযোগ'
    },
    hero: {
      title: 'বুদ্ধিমান অটোমেশনের মাধ্যমে আপনার ব্যবসাকে রূপান্তরিত করুন',
      subtitle: 'আমরা AI-চালিত কর্মপ্রবাহ এবং বার্তা প্রেরণ ব্যবস্থা ডিজাইন করি যা ৮০% ম্যানুয়াল কাজ কমায় এবং আরও কর্মী নিয়োগ ছাড়াই স্কেল করতে সাহায্য করে।',
      trustText: 'কয়েকটি দেশের ৮৩+ ব্যবসার বিশ্বস্ত'
    },
    trust: {
      headline: 'সফল ব্যবসায়িকদের সাথে যোগ দিন যারা তাদের কার্যক্রম স্বয়ংক্রিয় করেছেন',
      bullets: [
        'সপ্তাহে ২০+ ঘন্টা সাশ্রয় করুন',
        'পরিচালনা খরচ ৬০% কমান',
        'নিয়োগ ছাড়াই স্কেল করুন',
        'কখনো গ্রাহক হারাবেন না'
      ]
    },
    cta: {
      whatsapp: 'বিনামূল্যে পরামর্শ নিন',
      strategy: 'কৌশল কল বুক করুন'
    },
    whatWeDo: {
      title: 'আমরা কী করি',
      subtitle: 'আমরা বুদ্ধিমান অটোমেশন সিস্টেম তৈরিতে বিশেষজ্ঞ যা ২৪/৭ আপনার ব্যবসা বৃদ্ধিতে কাজ করে',
      services: [
        {
          title: 'স্মার্ট বার্তা প্রেরণ ব্যবস্থা',
          description: 'স্বয়ংক্রিয় গ্রাহক যোগাযোগ যা ব্যক্তিগত মনে হয় এবং লিডকে বিক্রয়ে রূপান্তরিত করে।',
          tag: 'বিক্রয় বৃদ্ধি'
        },
        {
          title: 'AI-চালিত কর্মপ্রবাহ',
          description: 'বুদ্ধিমান প্রক্রিয়া যা পুনরাবৃত্তিমূলক কাজ পরিচালনা করে যাতে আপনি ব্যবসা বৃদ্ধিতে মনোনিবেশ করতে পারেন।',
          tag: 'সময় সাশ্রয়'
        },
        {
          title: 'ব্যবসায়িক প্রক্রিয়া অটোমেশন',
          description: 'লিড ক্যাপচার থেকে গ্রাহক সরবরাহ পর্যন্ত স্মার্ট অটোমেশনের সাথে কার্যক্রম সুগম করুন।',
          tag: 'খরচ কমান'
        },
        {
          title: 'কাস্টম ইন্টিগ্রেশন সমাধান',
          description: 'আপনার সমস্ত ব্যবসায়িক সরঞ্জামকে নির্বিঘ্নে একসাথে কাজ করার জন্য সংযুক্ত করুন এবং ম্যানুয়াল ডেটা এন্ট্রি দূর করুন।',
          tag: 'ত্রুটি দূর করুন'
        }
      ]
    },
    whoWeHelp: {
      title: 'আমরা কাদের সাহায্য করি',
      subtitle: 'আমরা উচ্চাভিলাষী ব্যবসায়িক মালিকদের সাথে কাজ করি যারা দক্ষতার সাথে স্কেল করতে চান',
      industries: [
        {
          title: 'ই-কমার্স দোকান',
          pain: 'অর্ডার ব্যবস্থাপনা, গ্রাহক সহায়তা এবং ইনভেন্টরি ট্র্যাকিং নিয়ে সংগ্রাম',
          solution: 'স্বয়ংক্রিয় অর্ডার প্রক্রিয়াকরণ, স্মার্ট গ্রাহক সেবা এবং রিয়েল-টাইম ইনভেন্টরি আপডেট'
        },
        {
          title: 'সেবা ব্যবসা',
          pain: 'সময়সূচী, ফলো-আপ এবং ক্লায়েন্ট যোগাযোগে অনেক সময় ব্যয়',
          solution: 'স্বয়ংক্রিয় বুকিং সিস্টেম, ক্লায়েন্ট অনবোর্ডিং এবং স্মার্ট ফলো-আপ ক্রম'
        },
        {
          title: 'রিয়েল এস্টেট এজেন্সি',
          pain: 'লিড হারানো, ম্যানুয়াল সম্পত্তি ব্যবস্থাপনা এবং সময়সাপেক্ষ ক্লায়েন্ট আপডেট',
          solution: 'লিড ক্যাপচার অটোমেশন, সম্পত্তি ব্যবস্থাপনা সিস্টেম এবং ক্লায়েন্ট যোগাযোগ কর্মপ্রবাহ'
        },
        {
          title: 'স্বাস্থ্যসেবা অনুশীলন',
          pain: 'ম্যানুয়াল অ্যাপয়েন্টমেন্ট সময়সূচী, রোগী ফলো-আপ এবং প্রশাসনিক ওভারহেড',
          solution: 'স্বয়ংক্রিয় সময়সূচী, রোগী যোগাযোগ এবং সুগম প্রশাসনিক প্রক্রিয়া'
        },
        {
          title: 'শিক্ষা প্রতিষ্ঠান',
          pain: 'ছাত্র ভর্তি প্রক্রিয়া, যোগাযোগের ফাঁক এবং প্রশাসনিক বোঝা',
          solution: 'স্বয়ংক্রিয় ভর্তি, ছাত্র যোগাযোগ ব্যবস্থা এবং প্রশাসনিক কর্মপ্রবাহ অটোমেশন'
        },
        {
          title: 'উৎপাদন কোম্পানি',
          pain: 'সরবরাহ শৃঙ্খল সমন্বয়, গুণমান নিয়ন্ত্রণ ট্র্যাকিং এবং উৎপাদন সময়সূচী',
          solution: 'সরবরাহ শৃঙ্খল অটোমেশন, গুণমান ব্যবস্থাপনা সিস্টেম এবং উৎপাদন কর্মপ্রবাহ অপ্টিমাইজেশন'
        }
      ]
    },
    whyUs: {
      title: 'কেন আমাদের বেছে নেবেন',
      subtitle: 'আমরা এমন ফলাফল প্রদান করি যা আপনার মূল লাইনে গুরুত্বপূর্ণ',
      points: [
        {
          title: 'প্রমাণিত ফলাফল',
          description: 'আমাদের ক্লায়েন্টরা সাধারণত ৯০ দিনের মধ্যে ৩x ROI দেখেন এবং ম্যানুয়াল কাজে সপ্তাহে ২০+ ঘন্টা সাশ্রয় করেন।'
        },
        {
          title: 'কোনো প্রযুক্তিগত মাথাব্যথা নেই',
          description: 'আমরা সেটআপ থেকে রক্ষণাবেক্ষণ পর্যন্ত সবকিছু পরিচালনা করি। আপনি শুধু ফলাফল উপভোগ করুন যখন আমরা প্রযুক্তি পরিচালনা করি।'
        },
        {
          title: 'কাস্টম সমাধান',
          description: 'প্রতিটি ব্যবসা অনন্য। আমরা আপনার নির্দিষ্ট প্রয়োজন এবং লক্ষ্যের সাথে মানানসই কাস্টমাইজড অটোমেশন সিস্টেম তৈরি করি।'
        },
        {
          title: 'চলমান সহায়তা',
          description: 'আমরা ক্রমাগত অপ্টিমাইজেশন এবং সহায়তা প্রদান করি যাতে আপনার অটোমেশন আপনার বৃদ্ধির সাথে সাথে ফলাফল প্রদান করতে থাকে।'
        }
      ]
    },
    howItWorks: {
      title: 'এটি কীভাবে কাজ করে',
      subtitle: 'আপনার ব্যবসায়িক কার্যক্রম রূপান্তরের জন্য আমাদের প্রমাণিত ৪-ধাপের প্রক্রিয়া',
      steps: [
        {
          title: 'আবিষ্কার কল',
          description: 'আমরা আপনার বর্তমান প্রক্রিয়া বিশ্লেষণ করি এবং সবচেয়ে বড় প্রভাব ফেলবে এমন অটোমেশন সুযোগ চিহ্নিত করি।'
        },
        {
          title: 'কাস্টম কৌশল',
          description: 'আমরা আপনার ব্যবসায়িক লক্ষ্য এবং বাজেটের সাথে সামঞ্জস্যপূর্ণ একটি কাস্টমাইজড অটোমেশন রোডম্যাপ ডিজাইন করি।'
        },
        {
          title: 'বাস্তবায়ন',
          description: 'আমাদের দল আপনার কার্যক্রমে ন্যূনতম ব্যাঘাত ঘটিয়ে আপনার অটোমেশন সিস্টেম তৈরি এবং স্থাপন করে।'
        },
        {
          title: 'অপ্টিমাইজেশন',
          description: 'আমরা কর্মক্ষমতা পর্যবেক্ষণ করি এবং সর্বোচ্চ দক্ষতা এবং ROI-এর জন্য আপনার সিস্টেমগুলি ক্রমাগত অপ্টিমাইজ করি।'
        }
      ]
    },
    useCases: {
      title: 'বাস্তব সাফল্যের গল্প',
      subtitle: 'দেখুন আপনার মতো ব্যবসাগুলি কীভাবে আমাদের অটোমেশন সমাধানের সাথে রূপান্তরিত হয়েছে',
      cases: [
        {
          title: 'ই-কমার্স স্টোর অটোমেশন',
          problem: 'ম্যানুয়াল অর্ডার প্রক্রিয়াকরণ দৈনিক ৪ ঘন্টা সময় নিচ্ছিল',
          solution: 'স্বয়ংক্রিয় অর্ডার ব্যবস্থাপনা এবং গ্রাহক যোগাযোগ ব্যবস্থা',
          result: '৯০% সময় সাশ্রয়, গ্রাহক সন্তুষ্টিতে ৪০% বৃদ্ধি'
        },
        {
          title: 'সেবা ব্যবসা অপ্টিমাইজেশন',
          problem: 'ধীর প্রতিক্রিয়ার সময়ের কারণে ৩০% লিড হারাচ্ছিল',
          solution: 'তাৎক্ষণিক লিড ক্যাপচার এবং স্বয়ংক্রিয় ফলো-আপ ক্রম',
          result: '৯৫% লিড প্রতিক্রিয়ার হার, রূপান্তরে ৬০% বৃদ্ধি'
        },
        {
          title: 'রিয়েল এস্টেট লিড ব্যবস্থাপনা',
          problem: 'এজেন্টরা প্রশাসনিক কাজে দৈনিক ৬ ঘন্টা ব্যয় করছিল',
          solution: 'স্বয়ংক্রিয় লিড যোগ্যতা নির্ধারণ এবং ক্লায়েন্ট যোগাযোগ কর্মপ্রবাহ',
          result: 'প্রশাসনিক সময়ে ৭০% হ্রাস, ৫০% বেশি চুক্তি সম্পন্ন'
        },
        {
          title: 'স্বাস্থ্যসেবা অনুশীলন দক্ষতা',
          problem: 'ম্যানুয়াল অ্যাপয়েন্টমেন্ট সময়সূচী বুকিং দ্বন্দ্ব সৃষ্টি করছিল',
          solution: 'স্বয়ংক্রিয় রোগী অনুস্মারক সহ স্মার্ট সময়সূচী ব্যবস্থা',
          result: 'নো-শোতে ৮৫% হ্রাস, ৩x দ্রুত বুকিং প্রক্রিয়া'
        }
      ]
    },
    finalCta: {
      title: 'আপনার ব্যবসা রূপান্তর করতে প্রস্তুত?',
      subtitle: '৮৩+ সফল ব্যবসার সাথে যোগ দিন যারা অটোমেশনের মাধ্যমে বৃদ্ধির পথে এগিয়েছে।',
      email: 'omnisupport@syedfahim.me'
    },
    footer: {
      tagline: 'Automation, AI, and workflows that actually move your business forward.',
      copyright: '© 2024 ওমনি AI এজেন্সি। সমস্ত অধিকার সংরক্ষিত।',
      email: 'omnisupport@syedfahim.me'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      services: 'सेवाएं',
      industries: 'उद्योग',
      caseStudies: 'केस स्टडी',
      about: 'हमारे बारे में',
      contact: 'संपर्क'
    },
    hero: {
      title: 'बुद्धिमान ऑटोमेशन के साथ अपने व्यवसाय को बदलें',
      subtitle: 'हम AI-संचालित वर्कफ़्लो और मैसेजिंग सिस्टम डिज़ाइन करते हैं जो 80% मैन्युअल काम कम करते हैं और अधिक स्टाफ़ हायर किए बिना स्केल करने में मदद करते हैं।',
      trustText: 'कई देशों के 83+ व्यवसायों द्वारा भरोसा किया गया'
    },
    trust: {
      headline: 'सफल व्यवसायों के साथ जुड़ें जिन्होंने अपने संचालन को स्वचालित किया है',
      bullets: [
        'सप्ताह में 20+ घंटे बचाएं',
        'परिचालन लागत 60% कम करें',
        'हायरिंग के बिना स्केल करें',
        'कभी भी ग्राहक न चूकें'
      ]
    },
    cta: {
      whatsapp: 'मुफ्त परामर्श लें',
      strategy: 'रणनीति कॉल बुक करें'
    },
    whatWeDo: {
      title: 'हम क्या करते हैं',
      subtitle: 'हम बुद्धिमान ऑटोमेशन सिस्टम बनाने में विशेषज्ञ हैं जो आपके व्यवसाय को बढ़ाने के लिए 24/7 काम करते हैं',
      services: [
        {
          title: 'स्मार्ट मैसेजिंग सिस्टम',
          description: 'स्वचालित ग्राहक संचार जो व्यक्तिगत लगता है और लीड्स को बिक्री में बदलता है।',
          tag: 'बिक्री बढ़ाएं'
        },
        {
          title: 'AI-संचालित वर्कफ़्लो',
          description: 'बुद्धिमान प्रक्रियाएं जो दोहराए जाने वाले कार्यों को संभालती हैं ताकि आप अपने व्यवसाय को बढ़ाने पर ध्यान दे सकें।',
          tag: 'समय बचाएं'
        },
        {
          title: 'व्यावसायिक प्रक्रिया ऑटोमेशन',
          description: 'लीड कैप्चर से ग्राहक डिलीवरी तक स्मार्ट ऑटोमेशन के साथ संचालन को सुव्यवस्थित करें।',
          tag: 'लागत कम करें'
        },
        {
          title: 'कस्टम इंटीग्रेशन समाधान',
          description: 'अपने सभी व्यावसायिक उपकरणों को निर्बाध रूप से एक साथ काम करने के लिए कनेक्ट करें और मैन्युअल डेटा एंट्री को समाप्त करें।',
          tag: 'त्रुटियां समाप्त करें'
        }
      ]
    },
    whoWeHelp: {
      title: 'हम किसकी मदद करते हैं',
      subtitle: 'हम महत्वाकांक्षी व्यवसाय मालिकों के साथ काम करते हैं जो कुशलता से स्केल करना चाहते हैं',
      industries: [
        {
          title: 'ई-कॉमर्स स्टोर',
          pain: 'ऑर्डर प्रबंधन, ग्राहक सहायता और इन्वेंटरी ट्रैकिंग के साथ संघर्ष',
          solution: 'स्वचालित ऑर्डर प्रोसेसिंग, स्मार्ट ग्राहक सेवा और रियल-टाइम इन्वेंटरी अपडेट'
        },
        {
          title: 'सेवा व्यवसाय',
          pain: 'शेड्यूलिंग, फॉलो-अप और क्लाइंट संचार पर बहुत समय बिताना',
          solution: 'स्वचालित बुकिंग सिस्टम, क्लाइंट ऑनबोर्डिंग और स्मार्ट फॉलो-अप अनुक्रम'
        },
        {
          title: 'रियल एस्टेट एजेंसी',
          pain: 'लीड्स चूकना, मैन्युअल प्रॉपर्टी प्रबंधन और समय लेने वाले क्लाइंट अपडेट',
          solution: 'लीड कैप्चर ऑटोमेशन, प्रॉपर्टी प्रबंधन सिस्टम और क्लाइंट संचार वर्कफ़्लो'
        },
        {
          title: 'हेल्थकेयर प्रैक्टिस',
          pain: 'मैन्युअल अपॉइंटमेंट शेड्यूलिंग, पेशेंट फॉलो-अप और प्रशासनिक ओवरहेड',
          solution: 'स्वचालित शेड्यूलिंग, पेशेंट संचार और सुव्यवस्थित प्रशासनिक प्रक्रियाएं'
        },
        {
          title: 'शैक्षणिक संस्थान',
          pain: 'छात्र नामांकन प्रक्रियाएं, संचार अंतराल और प्रशासनिक बोझ',
          solution: 'स्वचालित नामांकन, छात्र संचार सिस्टम और प्रशासनिक वर्कफ़्लो ऑटोमेशन'
        },
        {
          title: 'विनिर्माण कंपनियां',
          pain: 'आपूर्ति श्रृंखला समन्वय, गुणवत्ता नियंत्रण ट्रैकिंग और उत्पादन शेड्यूलिंग',
          solution: 'आपूर्ति श्रृंखला ऑटोमेशन, गुणवत्ता प्रबंधन सिस्टम और उत्पादन वर्कफ़्लो अनुकूलन'
        }
      ]
    },
    whyUs: {
      title: 'हमें क्यों चुनें',
      subtitle: 'हम ऐसे परिणाम देते हैं जो आपकी बॉटम लाइन के लिए महत्वपूर्ण हैं',
      points: [
        {
          title: 'सिद्ध परिणाम',
          description: 'हमारे क्लाइंट आमतौर पर 90 दिनों के भीतर 3x ROI देखते हैं और मैन्युअल कार्यों पर सप्ताह में 20+ घंटे बचाते हैं।'
        },
        {
          title: 'कोई तकनीकी सिरदर्द नहीं',
          description: 'हम सेटअप से लेकर रखरखाव तक सब कुछ संभालते हैं। आप बस परिणामों का आनंद लें जबकि हम तकनीक का प्रबंधन करते हैं।'
        },
        {
          title: 'कस्टम समाधान',
          description: 'हर व्यवसाय अनोखा है। हम आपकी विशिष्ट आवश्यकताओं और लक्ष्यों के अनुकूल कस्टमाइज़्ड ऑटोमेशन सिस्टम बनाते हैं।'
        },
        {
          title: 'निरंतर सहायता',
          description: 'हम निरंतर अनुकूलन और सहायता प्रदान करते हैं ताकि आपका ऑटोमेशन आपकी वृद्धि के साथ परिणाम देता रहे।'
        }
      ]
    },
    howItWorks: {
      title: 'यह कैसे काम करता है',
      subtitle: 'आपके व्यावसायिक संचालन को बदलने के लिए हमारी सिद्ध 4-चरणीय प्रक्रिया',
      steps: [
        {
          title: 'डिस्कवरी कॉल',
          description: 'हम आपकी वर्तमान प्रक्रियाओं का विश्लेषण करते हैं और ऑटोमेशन के अवसरों की पहचान करते हैं जिनका सबसे बड़ा प्रभाव होगा।'
        },
        {
          title: 'कस्टम रणनीति',
          description: 'हम आपके व्यावसायिक लक्ष्यों और बजट के साथ संरेखित एक कस्टमाइज़्ड ऑटोमेशन रोडमैप डिज़ाइन करते हैं।'
        },
        {
          title: 'कार्यान्वयन',
          description: 'हमारी टीम आपके संचालन में न्यूनतम व्यवधान के साथ आपके ऑटोमेशन सिस्टम का निर्माण और तैनाती करती है।'
        },
        {
          title: 'अनुकूलन',
          description: 'हम प्रदर्शन की निगरानी करते हैं और अधिकतम दक्षता और ROI के लिए आपके सिस्टम को लगातार अनुकूलित करते हैं।'
        }
      ]
    },
    useCases: {
      title: 'वास्तविक सफलता की कहानियां',
      subtitle: 'देखें कि आपके जैसे व्यवसायों ने हमारे ऑटोमेशन समाधानों के साथ कैसे बदलाव किया है',
      cases: [
        {
          title: 'ई-कॉमर्स स्टोर ऑटोमेशन',
          problem: 'मैन्युअल ऑर्डर प्रोसेसिंग में दैनिक 4 घंटे लग रहे थे',
          solution: 'स्वचालित ऑर्डर प्रबंधन और ग्राहक संचार सिस्टम',
          result: '90% समय की बचत, ग्राहक संतुष्टि में 40% वृद्धि'
        },
        {
          title: 'सेवा व्यवसाय अनुकूलन',
          problem: 'धीमी प्रतिक्रिया समय के कारण 30% लीड्स चूक रहे थे',
          solution: 'तत्काल लीड कैप्चर और स्वचालित फॉलो-अप अनुक्रम',
          result: '95% लीड प्रतिक्रिया दर, रूपांतरण में 60% वृद्धि'
        },
        {
          title: 'रियल एस्टेट लीड प्रबंधन',
          problem: 'एजेंट प्रशासनिक कार्यों पर दैनिक 6 घंटे बिता रहे थे',
          solution: 'स्वचालित लीड योग्यता और क्लाइंट संचार वर्कफ़्लो',
          result: 'प्रशासनिक समय में 70% कमी, 50% अधिक डील बंद'
        },
        {
          title: 'हेल्थकेयर प्रैक्टिस दक्षता',
          problem: 'मैन्युअल अपॉइंटमेंट शेड्यूलिंग से बुकिंग संघर्ष हो रहे थे',
          solution: 'स्वचालित पेशेंट रिमाइंडर के साथ स्मार्ट शेड्यूलिंग सिस्टम',
          result: 'नो-शो में 85% कमी, 3x तेज़ बुकिंग प्रक्रिया'
        }
      ]
    },
    finalCta: {
      title: 'अपने व्यवसाय को बदलने के लिए तैयार हैं?',
      subtitle: 'सैकड़ों सफल व्यवसायों के साथ जुड़ें जिन्होंने ऑटोमेशन के माध्यम से वृद्धि का रास्ता अपनाया है।',
      email: 'omnisupport@syedfahim.me'
    },
    footer: {
      tagline: 'Automation, AI, and workflows that actually move your business forward.',
      copyright: '© 2024 ओमनी AI एजेंसी। सभी अधिकार सुरक्षित।',
      email: 'omnisupport@syedfahim.me'
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const getNestedTranslation = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };

  const value = {
    language,
    setLanguage,
    t: getNestedTranslation,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
