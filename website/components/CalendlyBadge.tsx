'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export function CalendlyBadge() {
  useEffect(() => {
    const initCalendly = () => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        try {
          // Initialize badge widget for all pages
          (window as any).Calendly.initBadgeWidget({
            url: 'https://calendly.com/omniaillc0?hide_landing_page_details=1&hide_gdpr_banner=1',
            text: 'Schedule time with me',
            color: '#0069ff',
            textColor: '#ffffff',
            branding: true
          });
        } catch (error) {
          console.error('Error initializing Calendly badge:', error);
        }
      }
    };

    // Check if Calendly is already loaded
    if (typeof window !== 'undefined' && (window as any).Calendly) {
      initCalendly();
    } else {
      // Poll for Calendly to be available
      const checkInterval = setInterval(() => {
        if (typeof window !== 'undefined' && (window as any).Calendly) {
          initCalendly();
          clearInterval(checkInterval);
        }
      }, 100);

      // Cleanup after 10 seconds if Calendly doesn't load
      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <>
      <Script
        id="calendly-widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Script loaded, ensure Calendly is available globally
          if (typeof window !== 'undefined') {
            (window as any).__calendlyLoaded = true;
          }
        }}
      />
    </>
  );
}

