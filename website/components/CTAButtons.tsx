'use client';

import { MessageCircle, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { openCalendlyPopup } from './CalendlyPopup';

interface CTAButtonsProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CTAButtons({ className = '', size = 'md' }: CTAButtonsProps) {
  const { t } = useLanguage();

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
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
        className={`${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 transition-all font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl`}
      >
        <Calendar className="w-5 h-5" />
        {t('cta.strategy')}
      </button>
      <a
        href="https://wa.me/1234567890"
        className={`${sizeClasses[size]} border border-emerald-600 text-emerald-400 rounded-lg hover:bg-emerald-600 hover:text-white transition-all font-medium flex items-center justify-center gap-2`}
      >
        <MessageCircle className="w-5 h-5" />
        {t('cta.whatsapp')}
      </a>
    </div>
  );
}
