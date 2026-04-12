import { ReactNode, useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BlogLayoutProps {
  children: ReactNode;
  post: any;
  currentLang: string;
}

export default function BlogLayout({ children, post, currentLang }: BlogLayoutProps) {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Show CTA when scrolled past 10% and hide near the very bottom
      setShowCTA(latest > 0.1 && latest < 0.95);
    });
  }, [scrollYProgress]);

  const content = post[currentLang] || post.en;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "ID Wellness Dental",
      "url": "https://idwellnessdental.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ID Wellness Dental",
      "logo": {
        "@type": "ImageObject",
        "url": "https://idwellnessdental.com/logo.png"
      }
    },
    "description": content.excerpt
  };

  return (
    <>
      <Helmet>
        <title>{content.metaTitle || `${content.title} | ID Wellness Dental Blog`}</title>
        <meta name="description" content={content.metaDescription || content.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-brand-gold origin-left z-50"
        style={{ scaleX }}
      />

      <div className="min-h-screen bg-[#111111] text-white pt-24 pb-12">
        {children}
      </div>

      {/* Sticky CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ 
          opacity: showCTA ? 1 : 0, 
          y: showCTA ? 0 : 50,
          scale: showCTA ? 1 : 0.9
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-8 right-8 z-40 pointer-events-none"
      >
        <button className="pointer-events-auto bg-brand-gold text-black px-6 py-4 rounded-full font-medium shadow-[0_0_20px_rgba(198,168,114,0.3)] hover:shadow-[0_0_30px_rgba(198,168,114,0.5)] transition-all flex items-center gap-3 hover:scale-105">
          <Calendar className="w-5 h-5" />
          {t('nav.bookConsultation', 'Book Consultation')}
        </button>
      </motion.div>
    </>
  );
}
