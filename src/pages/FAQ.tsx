import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import FAQSection from '../components/FAQSection';

export default function FAQ() {
  const { t } = useTranslation();

  const faqs = useMemo(() => [
    { q: t('faq.q.cosmetic1.q'), a: t('faq.q.cosmetic1.a') },
    { q: t('faq.q.cosmetic2.q'), a: t('faq.q.cosmetic2.a') },
    { q: t('faq.q.cosmetic3.q'), a: t('faq.q.cosmetic3.a') },
    { q: t('faq.q.general1.q'), a: t('faq.q.general1.a') },
    { q: t('faq.q.general2.q'), a: t('faq.q.general2.a') },
    { q: t('faq.q.general3.q'), a: t('faq.q.general3.a') },
    { q: t('faq.q.ortho1.q'), a: t('faq.q.ortho1.a') },
    { q: t('faq.q.ortho2.q'), a: t('faq.q.ortho2.a') },
    { q: t('faq.q.ortho3.q'), a: t('faq.q.ortho3.a') },
    { q: t('faq.q.implants1.q'), a: t('faq.q.implants1.a') },
    { q: t('faq.q.implants2.q'), a: t('faq.q.implants2.a') },
    { q: t('faq.q.implants3.q'), a: t('faq.q.implants3.a') },
    { q: t('faq.q.endo1.q'), a: t('faq.q.endo1.a') },
    { q: t('faq.q.endo2.q'), a: t('faq.q.endo2.a') },
    { q: t('faq.q.endo3.q'), a: t('faq.q.endo3.a') },
    { q: t('faq.q.surgical1.q'), a: t('faq.q.surgical1.a') },
    { q: t('faq.q.surgical2.q'), a: t('faq.q.surgical2.a') },
    { q: t('faq.q.surgical3.q'), a: t('faq.q.surgical3.a') },
    { q: t('faq.q.facial1.q'), a: t('faq.q.facial1.a') },
    { q: t('faq.q.facial2.q'), a: t('faq.q.facial2.a') },
    { q: t('faq.q.facial3.q'), a: t('faq.q.facial3.a') },
    { q: t('faq.q.financing1.q'), a: t('faq.q.financing1.a') },
    { q: t('faq.q.financing2.q'), a: t('faq.q.financing2.a') },
    { q: t('faq.q.financing3.q'), a: t('faq.q.financing3.a') }
  ], [t]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{t('faq.title', 'Frequently Asked Questions')} | ID Wellness Dental</title>
        <meta name="description" content={t('faq.subtitle', 'Find answers to common questions about our treatments, financing options, and what to expect during your visit.')} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <FAQSection className="pt-32 pb-20" showTitle={true} />
    </>
  );
}
