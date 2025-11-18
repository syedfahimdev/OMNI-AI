'use client';

import { TrendingUp, Clock, Users, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import { CTAButtons } from '@/components/CTAButtons';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CaseStudies() {
  const { t } = useLanguage();

  const caseStudies = [
    {
      industry: 'Healthcare',
      title: 'Multi-Location Clinic Reduces No-Shows by 45%',
      client: 'Regional Healthcare Network',
      challenge: 'A 5-location healthcare network was losing $50,000 monthly due to no-shows and last-minute cancellations. Manual reminder calls were inconsistent and time-consuming.',
      solution: 'Implemented automated appointment reminders via SMS and WhatsApp, with personalized messages in multiple languages. Added easy rescheduling options and pre-visit preparation instructions.',
      results: [
        '45% reduction in no-shows',
        '$30,000 monthly revenue recovery',
        '8 hours daily saved on manual calls',
        '92% patient satisfaction with communication'
      ],
      metrics: {
        timeframe: '6 months',
        roi: '400%',
        implementation: '3 weeks'
      }
    },
    {
      industry: 'Beauty & Wellness',
      title: 'Salon Chain Increases Rebookings by 60%',
      client: 'Premium Salon Chain',
      challenge: 'A 12-location salon chain struggled with inconsistent client follow-up, leading to low rebooking rates and missed upselling opportunities.',
      solution: 'Created personalized post-service follow-up sequences with service feedback collection, rebooking incentives, and targeted promotions based on service history.',
      results: [
        '60% increase in rebookings',
        '35% boost in average transaction value',
        '25% improvement in client retention',
        '4.8/5 average service rating'
      ],
      metrics: {
        timeframe: '4 months',
        roi: '320%',
        implementation: '2 weeks'
      }
    },
    {
      industry: 'Education',
      title: 'Coaching Institute Automates Student Journey',
      client: 'Professional Coaching Institute',
      challenge: 'A growing coaching institute was overwhelmed with manual student onboarding, progress tracking, and parent communication, limiting their ability to scale.',
      solution: 'Built comprehensive student lifecycle automation including enrollment, progress tracking, automated reports to parents, and payment reminders.',
      results: [
        '70% faster student onboarding',
        '90% parent satisfaction with communication',
        '5 hours daily saved on admin tasks',
        '40% increase in course completion rates'
      ],
      metrics: {
        timeframe: '5 months',
        roi: '280%',
        implementation: '4 weeks'
      }
    },
    {
      industry: 'E-commerce',
      title: 'Online Store Recovers 30% of Abandoned Carts',
      client: 'Fashion E-commerce Brand',
      challenge: 'An online fashion retailer was losing significant revenue to cart abandonment, with no systematic follow-up process for potential customers.',
      solution: 'Implemented intelligent cart abandonment sequences with personalized product recommendations, limited-time offers, and multi-channel follow-up.',
      results: [
        '30% cart abandonment recovery',
        '$75,000 additional monthly revenue',
        '50% increase in customer lifetime value',
        '25% improvement in email engagement'
      ],
      metrics: {
        timeframe: '3 months',
        roi: '450%',
        implementation: '2 weeks'
      }
    },
    {
      industry: 'Professional Services',
      title: 'Law Firm Streamlines Client Communication',
      client: 'Corporate Law Firm',
      challenge: 'A busy law firm struggled with client communication, case updates, and document collection, leading to client dissatisfaction and inefficiencies.',
      solution: 'Automated client onboarding, regular case updates, document requests, and milestone notifications with secure client portal integration.',
      results: [
        '85% improvement in client satisfaction',
        '50% reduction in communication overhead',
        '40% faster case resolution',
        '95% document collection completion rate'
      ],
      metrics: {
        timeframe: '6 months',
        roi: '250%',
        implementation: '5 weeks'
      }
    },
    {
      industry: 'Real Estate',
      title: 'Agency Increases Lead Conversion by 40%',
      client: 'Residential Real Estate Agency',
      challenge: 'A real estate agency was losing leads due to slow response times and inconsistent follow-up, especially during off-hours.',
      solution: 'Created instant lead response system with qualification questions, automated showing scheduling, and nurture sequences for different buyer types.',
      results: [
        '40% increase in lead conversion',
        '300% faster initial response time',
        '60% more property showings booked',
        '25% shorter average sales cycle'
      ],
      metrics: {
        timeframe: '4 months',
        roi: '380%',
        implementation: '3 weeks'
      }
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
            {t('nav.caseStudies')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real businesses, real results. See how automation has transformed operations and bottom lines across different industries.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="p-8 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 border-b border-gray-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-3">
                      {study.industry}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{study.title}</h2>
                    <p className="text-gray-400">{study.client}</p>
                  </div>
                  <div className="flex gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{study.metrics.roi}</div>
                      <div className="text-sm text-gray-400">ROI</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{study.metrics.timeframe}</div>
                      <div className="text-sm text-gray-400">Timeline</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">{study.metrics.implementation}</div>
                      <div className="text-sm text-gray-400">Setup</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Challenge */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      Challenge
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{study.challenge}</p>
                  </div>

                  {/* Solution */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      Solution
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{study.solution}</p>
                  </div>

                  {/* Results */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-emerald-400 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                      Results
                    </h3>
                    <ul className="space-y-3">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start gap-3 text-gray-300">
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-400 mb-2">350%</div>
            <div className="text-gray-400">Average ROI</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <Clock className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-emerald-400 mb-2">15hrs</div>
            <div className="text-gray-400">Weekly Time Saved</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-purple-400 mb-2">92%</div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
          <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
            <DollarSign className="w-8 h-8 text-orange-400 mx-auto mb-4" />
            <div className="text-3xl font-bold text-orange-400 mb-2">$2M+</div>
            <div className="text-gray-400">Revenue Generated</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center p-12 bg-gradient-to-r from-blue-900/20 via-gray-900/50 to-emerald-900/20 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Every business is unique, but the results speak for themselves. Let&apos;s discuss how automation can transform your operations and drive measurable growth.
          </p>
          <CTAButtons size="lg" className="justify-center" />
        </div>
      </div>
    </div>
  );
}
