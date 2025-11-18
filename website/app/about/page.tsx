'use client';

import { Target, Users, Lightbulb, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { CTAButtons } from '@/components/CTAButtons';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We measure success by the impact on your bottom line, not just the technology we build.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'Your business goals are our priority. We listen, understand, and deliver solutions that fit.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We stay ahead of the curve, using cutting-edge tools and techniques to solve your challenges.'
    },
    {
      icon: Heart,
      title: 'Partnership',
      description: 'We&apos;re not just vendors—we&apos;re your long-term partners in growth and success.'
    }
  ];

  const team = [
    {
      role: 'Automation Experts',
      description: 'Our team combines deep technical expertise with business acumen to deliver solutions that work.'
    },
    {
      role: 'Global Experience',
      description: 'We&apos;ve worked with businesses across multiple countries, understanding diverse markets and cultures.'
    },
    {
      role: 'Continuous Learning',
      description: 'We stay updated with the latest in AI, automation, and business process optimization.'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
            {t('nav.about')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We&apos;re a team of automation experts dedicated to helping businesses scale efficiently through intelligent automation and AI-powered solutions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-900/20 via-gray-900/50 to-emerald-900/20 rounded-2xl border border-gray-700 p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-xl text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
              To empower businesses of all sizes to achieve sustainable growth through intelligent automation, 
              eliminating manual work and enabling teams to focus on what truly matters—building relationships, 
              innovating, and scaling their impact.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Work With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((item, index) => (
              <div key={index} className="p-8 bg-gray-800/50 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{item.role}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-900/20 via-gray-900/50 to-emerald-900/20 rounded-2xl border border-gray-700 p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">83+</div>
                <div className="text-gray-400">Businesses Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-400 mb-2">10+</div>
                <div className="text-gray-400">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">15+</div>
                <div className="text-gray-400">Industries</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 bg-gradient-to-r from-blue-900/20 via-gray-900/50 to-emerald-900/20 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how automation can help you scale efficiently and focus on what you do best.
          </p>
          <CTAButtons size="lg" className="justify-center" />
        </div>
      </div>
    </div>
  );
}
