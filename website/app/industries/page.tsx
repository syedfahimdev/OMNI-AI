'use client';

import { Heart, Scissors, GraduationCap, ShoppingBag, Briefcase, Building, Stethoscope, Dumbbell } from 'lucide-react';
import { CTAButtons } from '@/components/CTAButtons';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Industries() {
  const { t } = useLanguage();

  const industries = [
    {
      icon: Stethoscope,
      title: 'Healthcare & Clinics',
      description: 'Streamline patient care and administrative processes',
      challenges: [
        'High no-show rates costing revenue',
        'Manual appointment scheduling chaos',
        'Patient follow-up falling through cracks',
        'Insurance and billing complications'
      ],
      solutions: [
        'Automated appointment reminders via SMS/WhatsApp',
        'Patient intake forms and pre-visit preparation',
        'Follow-up care instructions and check-ins',
        'Insurance verification and billing automation'
      ],
      results: [
        '40% reduction in no-shows',
        '3 hours saved daily on admin tasks',
        '95% patient satisfaction scores',
        '25% increase in appointment bookings'
      ]
    },
    {
      icon: Scissors,
      title: 'Beauty, Salons & Wellness',
      description: 'Enhance client experience and operational efficiency',
      challenges: [
        'Double bookings and scheduling conflicts',
        'Inconsistent client communication',
        'Manual inventory tracking',
        'Difficulty upselling services'
      ],
      solutions: [
        'Smart booking system with availability sync',
        'Personalized service reminders and promotions',
        'Automated inventory alerts and reordering',
        'Post-service feedback and rebooking flows'
      ],
      results: [
        '60% fewer scheduling conflicts',
        '35% increase in rebookings',
        '50% improvement in inventory management',
        '20% boost in average transaction value'
      ]
    },
    {
      icon: GraduationCap,
      title: 'Education & Coaching',
      description: 'Focus on teaching while automation handles administration',
      challenges: [
        'Time-consuming student onboarding',
        'Manual progress tracking and reporting',
        'Inconsistent parent/student communication',
        'Payment and enrollment management'
      ],
      solutions: [
        'Automated student enrollment and onboarding',
        'Progress tracking with automated reports',
        'Regular updates to parents and students',
        'Payment reminders and enrollment management'
      ],
      results: [
        '70% faster onboarding process',
        '5 hours weekly saved on admin',
        '90% parent satisfaction with communication',
        '30% improvement in payment collection'
      ]
    },
    {
      icon: ShoppingBag,
      title: 'Retail & E-commerce',
      description: 'Maximize sales and customer lifetime value',
      challenges: [
        'Cart abandonment and lost sales',
        'Manual inventory management',
        'Inconsistent customer follow-up',
        'Time-consuming order processing'
      ],
      solutions: [
        'Abandoned cart recovery sequences',
        'Automated inventory alerts and reordering',
        'Post-purchase follow-up and reviews',
        'Order processing and fulfillment automation'
      ],
      results: [
        '25% recovery of abandoned carts',
        '40% reduction in stockouts',
        '50% increase in customer reviews',
        '3x faster order processing'
      ]
    },
    {
      icon: Briefcase,
      title: 'Agencies & Service Businesses',
      description: 'Scale operations without scaling overhead',
      challenges: [
        'Complex client onboarding processes',
        'Manual project management and reporting',
        'Inconsistent client communication',
        'Time tracking and billing inefficiencies'
      ],
      solutions: [
        'Streamlined client onboarding workflows',
        'Automated project updates and reporting',
        'Regular client check-ins and feedback collection',
        'Time tracking integration and automated billing'
      ],
      results: [
        '50% faster client onboarding',
        '4 hours weekly saved per project',
        '95% client satisfaction scores',
        '30% improvement in billing accuracy'
      ]
    },
    {
      icon: Building,
      title: 'Real Estate',
      description: 'Convert more leads and close deals faster',
      challenges: [
        'Lead follow-up delays and missed opportunities',
        'Manual property showing coordination',
        'Complex transaction management',
        'Client communication gaps'
      ],
      solutions: [
        'Instant lead response and qualification',
        'Automated showing scheduling and reminders',
        'Transaction milestone tracking and updates',
        'Regular client communication throughout process'
      ],
      results: [
        '300% faster lead response time',
        '45% increase in showing attendance',
        '25% shorter time to close',
        '40% more referrals from satisfied clients'
      ]
    },
    {
      icon: Dumbbell,
      title: 'Fitness & Gyms',
      description: 'Keep members engaged and reduce churn',
      challenges: [
        'High member churn rates',
        'Manual class scheduling and management',
        'Inconsistent member engagement',
        'Payment and membership management'
      ],
      solutions: [
        'Member engagement and retention campaigns',
        'Automated class booking and waitlist management',
        'Personalized workout reminders and progress tracking',
        'Payment processing and membership renewals'
      ],
      results: [
        '35% reduction in member churn',
        '60% increase in class attendance',
        '80% improvement in member engagement',
        '25% boost in membership renewals'
      ]
    },
    {
      icon: Heart,
      title: 'Professional Services',
      description: 'Deliver exceptional client experiences at scale',
      challenges: [
        'Complex consultation scheduling',
        'Manual document and contract management',
        'Inconsistent client communication',
        'Time-consuming administrative tasks'
      ],
      solutions: [
        'Automated consultation booking and preparation',
        'Document generation and e-signature workflows',
        'Regular client updates and milestone communication',
        'Administrative task automation and delegation'
      ],
      results: [
        '50% reduction in scheduling back-and-forth',
        '70% faster contract processing',
        '90% client satisfaction with communication',
        '6 hours weekly saved on admin tasks'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
            {t('whoWeHelp.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We work with businesses across industries and geographies, from local operations to international enterprises. Here&apos;s how automation transforms different sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {industries.map((industry, index) => (
            <div key={index} className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all">
              {/* Header */}
              <div className="p-8 bg-gradient-to-r from-blue-900/20 to-emerald-900/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{industry.title}</h2>
                    <p className="text-gray-400">{industry.description}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Challenges */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-red-400">Common Challenges</h3>
                  <ul className="space-y-2">
                    {industry.challenges.map((challenge, challengeIndex) => (
                      <li key={challengeIndex} className="flex items-start gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">Our Solutions</h3>
                  <ul className="space-y-2">
                    {industry.solutions.map((solution, solutionIndex) => (
                      <li key={solutionIndex} className="flex items-start gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-emerald-400">Typical Results</h3>
                  <ul className="space-y-2">
                    {industry.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start gap-3 text-gray-300">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Reach Section */}
        <div className="mt-20 text-center p-12 bg-gradient-to-r from-blue-900/20 via-gray-900/50 to-emerald-900/20 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6">Global Reach, Local Understanding</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We design systems that work across cultures, time zones, and business practices. Whether your customers are in New York, London, Dubai, Mumbai, or Dhaka, we ensure your automation feels natural and effective.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
              <div className="text-gray-400">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">15+</div>
              <div className="text-gray-400">Industries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">4</div>
              <div className="text-gray-400">Languages</div>
            </div>
          </div>
          <CTAButtons size="lg" className="justify-center" />
        </div>
      </div>
    </div>
  );
}
