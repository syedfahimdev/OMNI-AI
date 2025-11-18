'use client';

import Link from 'next/link';
import { Zap, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { openCalendlyPopup } from './CalendlyPopup';

export function Footer() {
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.industries'), href: '/industries' },
    { name: t('nav.caseStudies'), href: '/case-studies' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '#', isPopup: true },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Omni AI Agency</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              {t('footer.tagline')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:omnisupport@syedfahim.me"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {t('footer.email')}
              </a>
              <a
                href="https://wa.me/1234567890"
                className="flex items-center gap-2 text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => 
                item.isPopup ? (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      openCalendlyPopup();
                    }}
                    className="text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get Started</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  openCalendlyPopup();
                }}
                onMouseEnter={() => {
                  // Preload Calendly script on hover for faster loading
                  if (typeof window !== 'undefined' && !(window as any).__calendlyLoaded && !(window as any).Calendly) {
                    // Check if script is already being loaded
                    const existingScript = document.querySelector('script[src*="calendly.com/assets/external/widget.js"]');
                    if (!existingScript) {
                      const script = document.createElement('script');
                      script.src = 'https://assets.calendly.com/assets/external/widget.js';
                      script.async = true;
                      script.id = 'calendly-widget-hover';
                      document.head.appendChild(script);
                    }
                  }
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-medium text-center w-full"
              >
                {t('cta.bookCall')}
              </button>
              <a
                href="https://wa.me/1234567890"
                className="px-4 py-2 border border-emerald-600 text-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white transition-all font-medium text-center"
              >
                {t('cta.whatsapp')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Omni AI Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
