'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { openCalendlyPopup } from './CalendlyPopup';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Omni AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => 
              item.isPopup ? (
                <button
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    openCalendlyPopup();
                  }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA & Language Selector */}
          <div className="hidden md:flex items-center gap-4">
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
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-medium"
            >
              {t('cta.strategy')}
            </button>
            <LanguageSelector />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => 
                item.isPopup ? (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      openCalendlyPopup();
                    }}
                    className="text-gray-300 hover:text-white transition-colors py-2 text-left"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  openCalendlyPopup();
                }}
                onMouseEnter={() => {
                  // Preload Calendly script on hover for faster loading
                  if (typeof window !== 'undefined' && !(window as any).__calendlyLoaded && !(window as any).Calendly) {
                    const script = document.createElement('script');
                    script.src = 'https://assets.calendly.com/assets/external/widget.js';
                    script.async = true;
                    document.head.appendChild(script);
                  }
                }}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-medium text-center w-full"
              >
                {t('cta.strategy')}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
