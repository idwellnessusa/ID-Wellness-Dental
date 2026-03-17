import React, { useState, useMemo } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-brand-dark/10 rounded-2xl overflow-hidden mb-4 bg-white transition-all duration-300 hover:border-brand-gold/50">
      <button
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-serif text-lg font-medium pr-8">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-brand-gold shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-brand-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

interface FAQSectionProps {
  className?: string;
  limit?: number; // Option to limit number of categories or questions if needed
  showTitle?: boolean;
}

export default function FAQSection({ className = "", limit, showTitle = true }: FAQSectionProps) {
  const { t } = useTranslation();

  const faqs = useMemo(() => [
    {
      category: t('faq.categories.cosmetic', 'Cosmetic Dentistry'),
      questions: [
        { q: t('faq.q.cosmetic1.q'), a: t('faq.q.cosmetic1.a') },
        { q: t('faq.q.cosmetic2.q'), a: t('faq.q.cosmetic2.a') },
        { q: t('faq.q.cosmetic3.q'), a: t('faq.q.cosmetic3.a') }
      ]
    },
    {
      category: t('faq.categories.general', 'General Dentistry'),
      questions: [
        { q: t('faq.q.general1.q'), a: t('faq.q.general1.a') },
        { q: t('faq.q.general2.q'), a: t('faq.q.general2.a') },
        { q: t('faq.q.general3.q'), a: t('faq.q.general3.a') }
      ]
    },
    {
      category: t('faq.categories.ortho', 'Orthodontics'),
      questions: [
        { q: t('faq.q.ortho1.q'), a: t('faq.q.ortho1.a') },
        { q: t('faq.q.ortho2.q'), a: t('faq.q.ortho2.a') },
        { q: t('faq.q.ortho3.q'), a: t('faq.q.ortho3.a') }
      ]
    },
    {
      category: t('faq.categories.implants', 'Dental Implants'),
      questions: [
        { q: t('faq.q.implants1.q'), a: t('faq.q.implants1.a') },
        { q: t('faq.q.implants2.q'), a: t('faq.q.implants2.a') },
        { q: t('faq.q.implants3.q'), a: t('faq.q.implants3.a') }
      ]
    },
    {
      category: t('faq.categories.endo', 'Endodontics'),
      questions: [
        { q: t('faq.q.endo1.q'), a: t('faq.q.endo1.a') },
        { q: t('faq.q.endo2.q'), a: t('faq.q.endo2.a') },
        { q: t('faq.q.endo3.q'), a: t('faq.q.endo3.a') }
      ]
    },
    {
      category: t('faq.categories.surgical', 'Surgical & Periodontics'),
      questions: [
        { q: t('faq.q.surgical1.q'), a: t('faq.q.surgical1.a') },
        { q: t('faq.q.surgical2.q'), a: t('faq.q.surgical2.a') },
        { q: t('faq.q.surgical3.q'), a: t('faq.q.surgical3.a') }
      ]
    },
    {
      category: t('faq.categories.facial', 'Facial Esthetics'),
      questions: [
        { q: t('faq.q.facial1.q'), a: t('faq.q.facial1.a') },
        { q: t('faq.q.facial2.q'), a: t('faq.q.facial2.a') },
        { q: t('faq.q.facial3.q'), a: t('faq.q.facial3.a') }
      ]
    },
    {
      category: t('faq.categories.financing', 'Financing & Membership'),
      questions: [
        { q: t('faq.q.financing1.q'), a: t('faq.q.financing1.a') },
        { q: t('faq.q.financing2.q'), a: t('faq.q.financing2.a') },
        { q: t('faq.q.financing3.q'), a: t('faq.q.financing3.a') }
      ]
    }
  ], [t]);

  return (
    <section className={`py-20 bg-brand-light/30 ${className}`}>
      <div className="max-w-4xl mx-auto px-6">
        {showTitle && (
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">{t('faq.title', 'Frequently Asked Questions')}</h2>
            <p className="text-lg text-brand-muted max-w-2xl mx-auto">
              {t('faq.subtitle', 'Find answers to common questions about our treatments, financing options, and what to expect during your visit.')}
            </p>
          </div>
        )}

        <div className="space-y-12">
          {faqs.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-2xl font-serif mb-6 text-brand-dark border-b border-brand-gold/20 pb-2 inline-block">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, fIdx) => (
                  <AccordionItem key={fIdx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions section */}
        <div className="mt-20 bg-brand-gold/5 rounded-[2rem] p-10 text-center border border-brand-gold/20">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MessageCircle className="w-8 h-8 text-brand-gold" />
          </div>
          <h3 className="text-3xl font-serif mb-4">{t('faq.stillHaveQuestions', 'Still have questions?')}</h3>
          <p className="text-brand-muted mb-8 max-w-lg mx-auto">
            {t('faq.contactUs', 'Can\'t find the answer you\'re looking for? Our friendly team is here to help you with any additional information you need.')}
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-4 rounded-full text-base font-medium transition-all"
          >
            {t('faq.contactBtn', 'Contact Us')}
          </Link>
        </div>
      </div>
    </section>
  );
}
