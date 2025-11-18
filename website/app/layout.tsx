import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CalendlyBadge } from '@/components/CalendlyBadge';
import { CalendlyPopup } from '@/components/CalendlyPopup';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://omniaiagency.com'),
  title: 'Omni AI Agency - Business Automation & AI Solutions',
  description: 'Transform your business with intelligent automation. We design AI-powered workflows and messaging systems that reduce manual work and help you scale efficiently.',
  keywords: 'business automation, AI solutions, workflow automation, messaging automation, process optimization',
  authors: [{ name: 'Omni AI Agency' }],
  openGraph: {
    title: 'Omni AI Agency - Business Automation & AI Solutions',
    description: 'Transform your business with intelligent automation. We design AI-powered workflows and messaging systems that reduce manual work and help you scale efficiently.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omni AI Agency - Business Automation & AI Solutions',
    description: 'Transform your business with intelligent automation. We design AI-powered workflows and messaging systems that reduce manual work and help you scale efficiently.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <link rel="preload" href="https://assets.calendly.com/assets/external/widget.js" as="script" />
      </head>
      <body className={`${inter.className} bg-gray-950 text-white`}>
        {/* Calendly Badge Widget - Appears on all pages */}
        <CalendlyBadge />
        <CalendlyPopup />
        <LanguageProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
