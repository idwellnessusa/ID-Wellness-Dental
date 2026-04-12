import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function SEO() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language || 'en';
  }, [i18n.language]);

  const title = t('seo.title');
  const description = t('seo.description');
  const image = 'https://i.postimg.cc/G2rbTCsn/IMG-0024.jpg';
  const url = window.location.href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Dentistry, Facial Esthetics, Aesthetic Wellness, Newark NJ, Ironbound, New Jersey, Wrinkle Relaxers, Dental Implants, ID WELLNESS DENTAL" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}
