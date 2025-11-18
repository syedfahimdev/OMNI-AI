'use client';

import { MessageSquare, Brain, Workflow, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { CTAButtons } from '@/components/CTAButtons';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: MessageSquare,
      title: 'Messaging Automation',
      description: 'Transform your customer communication with intelligent messaging flows that work 24/7.',
      features: [
        'Automated appointment reminders and confirmations',
        'FAQ handling and instant responses',
        'Follow-up sequences for leads and customers',
        'Multi-channel messaging (WhatsApp, SMS, Email)',
        'Personalized customer journeys',
        'Integration with your existing systems'
      ],
      useCases: [
        'Reduce no-shows by 40% with smart reminders',
        'Convert 60% more leads with instant follow-ups',
        'Handle customer queries without human intervention',
        'Nurture prospects through automated sequences'
      ]
    },
    {
      icon: Brain,
      title: 'AI-Powered Assistants',
      description: 'Deploy intelligent assistants that understand context, make decisions, and take action.',
      features: [
        'Natural language understanding',
        'Context-aware responses',
        'Task automation and delegation',
        'Integration with business systems',
        'Learning from interactions',
        'Multi-language support'
      ],
      useCases: [
        'Qualify leads automatically before human handoff',
        'Provide instant customer support 24/7',
        'Schedule appointments and manage calendars',
        'Process orders and handle basic transactions'
      ]
    },
    {
      icon: Workflow,
      title: 'Process & Workflow Automation',
      description: 'Streamline your operations by connecting systems and automating repetitive tasks.',
      features: [
        'Custom workflow design and implementation',
        'System integration and data synchronization',
        'Automated reporting and analytics',
        'Error handling and notifications',
        'Scalable architecture',
        'Real-time monitoring and optimization'
      ],
      useCases: [
        'Eliminate manual data entry across systems',
        'Automate invoice generation and processing',
        'Sync customer data between platforms',
        'Generate reports automatically'
      ]
    },
    {
      icon: Target,
      title: 'Strategy & Consulting',
      description: 'Get expert guidance on where to start and how to maximize your automation ROI.',
      features: [
        'Process audit and optimization recommendations',
        'Automation roadmap development',
        'ROI analysis and business case development',
        'Change management support',
        'Training and knowledge transfer',
        'Ongoing optimization and support'
      ],
      useCases: [
        'Identify high-impact automation opportunities',
        'Develop phased implementation plans',
        'Calculate expected ROI and payback periods',
        'Ensure successful team adoption'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
            {t('nav.services')} & Solutions
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Complete automation solutions designed to transform how your business operates, reduce manual work, and accelerate growth.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-20">
          {services.map((service, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                </div>
                <p className="text-xl text-gray-300 mb-8">{service.description}</p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-emerald-400">Real-World Results</h3>
                  <div className="space-y-3">
                    {service.useCases.map((useCase, useCaseIndex) => (
                      <div key={useCaseIndex} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-2xl"></div>
                  <div className="relative">
                    <service.icon className="w-24 h-24 text-blue-400 mx-auto mb-6" />
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-gray-400">Streamlined, intelligent, and built for scale</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center p-12 bg-gradient-to-r from-blue-900/20 via-gray-900/50 to-emerald-900/20 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss which automation solutions will have the biggest impact on your operations and bottom line.
          </p>
          <CTAButtons size="lg" className="justify-center" />
        </div>
      </div>
    </div>
  );
}
