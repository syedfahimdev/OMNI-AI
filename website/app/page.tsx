'use client';

import { ArrowRight, CheckCircle, Zap, MessageSquare, Brain, Workflow, Users, TrendingUp, Clock, Target } from 'lucide-react';
import { CTAButtons } from '@/components/CTAButtons';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-emerald-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-emerald-100 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <CTAButtons size="lg" className="justify-center mb-6" />
            <p className="text-sm text-gray-400">
              {t('hero.trustText')}
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-300 mb-8">
              {t('trust.headline')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t('trust.bullets').map((bullet: string, index: number) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-gray-300">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('whatWeDo.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('whatWeDo.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
              { icon: Brain, color: 'from-emerald-500 to-emerald-600' },
              { icon: Workflow, color: 'from-purple-500 to-purple-600' },
              { icon: Zap, color: 'from-orange-500 to-orange-600' }
            ].map((item, index) => {
              const service = t('whatWeDo.services')[index];
              return (
                <div key={index} className="group p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-all duration-300 border border-gray-700 hover:border-gray-600">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{service.description}</p>
                  <span className="text-sm text-blue-400 font-medium">{service.tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('whoWeHelp.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('whoWeHelp.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t('whoWeHelp.industries').map((industry: any, index: number) => (
              <div key={index} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                <h3 className="text-xl font-semibold mb-3 text-emerald-400">{industry.title}</h3>
                <p className="text-gray-400 mb-3">{industry.pain}</p>
                <p className="text-gray-300">{industry.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('whyUs.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('whyUs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t('whyUs.points').map((point: any, index: number) => (
              <div key={index} className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">{point.title}</h3>
                <p className="text-gray-300 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, color: 'text-blue-400' },
              { icon: Target, color: 'text-emerald-400' },
              { icon: Zap, color: 'text-purple-400' },
              { icon: TrendingUp, color: 'text-orange-400' }
            ].map((item, index) => {
              const step = t('howItWorks.steps')[index];
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto border-2 border-gray-700">
                      <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('useCases.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('useCases.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t('useCases.cases').map((useCase: any, index: number) => (
              <div key={index} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-emerald-500/50 transition-all group">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors">{useCase.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-400"><span className="text-red-400">Problem:</span> {useCase.problem}</p>
                  <p className="text-gray-400"><span className="text-blue-400">Solution:</span> {useCase.solution}</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {useCase.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 via-gray-900 to-emerald-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('finalCta.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {t('finalCta.subtitle')}
          </p>
          <CTAButtons size="lg" className="justify-center mb-6" />
          <p className="text-gray-400">
            Or email us directly: <a href={`mailto:${t('finalCta.email')}`} className="text-blue-400 hover:text-blue-300">{t('finalCta.email')}</a>
          </p>
        </div>
      </section>
    </div>
  );
}
