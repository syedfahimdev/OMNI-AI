'use client';

import { useEffect, useState } from 'react';

interface CalendlyPopupProps {
  url?: string;
}

export function openCalendlyPopup(url: string = 'https://calendly.com/omniaillc0?hide_landing_page_details=1&hide_gdpr_banner=1') {
  if (typeof window === 'undefined') return;

  const tryOpen = () => {
    if ((window as any).Calendly) {
      try {
        (window as any).Calendly.initPopupWidget({
          url: url,
          text: 'Schedule time with me',
          color: '#0069ff',
          textColor: '#ffffff',
          branding: true
        });
        (window as any).Calendly.showPopupWidget(url);
      } catch (error) {
        console.error('Error opening Calendly popup:', error);
        // Fallback: open in new tab
        window.open(url, '_blank');
      }
    } else {
      // Calendly not loaded yet, wait for it
      let attempts = 0;
      const maxAttempts = 40; // 2 seconds max wait (40 * 50ms)
      
      const checkInterval = setInterval(() => {
        attempts++;
        if ((window as any).Calendly) {
          clearInterval(checkInterval);
          tryOpen();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          // Fallback: open in new tab after timeout
          window.open(url, '_blank');
        }
      }, 50);
    }
  };

  tryOpen();
}

export function CalendlyPopup({ url = 'https://calendly.com/omniaillc0?hide_landing_page_details=1&hide_gdpr_banner=1' }: CalendlyPopupProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkCalendly = () => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        setIsReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkCalendly()) {
      return;
    }

    // Poll faster for readiness
    const interval = setInterval(() => {
      if (checkCalendly()) {
        clearInterval(interval);
      }
    }, 25); // Check every 25ms

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setIsReady(true); // Show anyway after 2 seconds
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null; // This component doesn't render anything, it's just for the utility function
}

