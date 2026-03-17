import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TestimonialsCarousel() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const reviews = [
    { id: 1, text: t('testimonials.reviews.1.text'), name: t('testimonials.reviews.1.name') },
    { id: 2, text: t('testimonials.reviews.2.text'), name: t('testimonials.reviews.2.name') },
    { id: 3, text: t('testimonials.reviews.3.text'), name: t('testimonials.reviews.3.name') },
    { id: 4, text: t('testimonials.reviews.4.text'), name: t('testimonials.reviews.4.name') },
    { id: 5, text: t('testimonials.reviews.5.text'), name: t('testimonials.reviews.5.name') },
  ];

  useEffect(() => {
    const updateWidth = () => {
      if (itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const [visibleItems, setVisibleItems] = useState(1);
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth >= 1024) setVisibleItems(3);
      else if (window.innerWidth >= 768) setVisibleItems(2);
      else setVisibleItems(1);
    };
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleItems);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(interval);
  }, [isHovered, maxIndex]);

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x * velocity.x;
    if (swipe < -10000 && currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    } else if (swipe > 10000 && currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif mb-6">{t('testimonials.title')}</h2>
          <p className="text-brand-muted text-lg">{t('testimonials.subtitle')}</p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={containerRef}
        >
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6 cursor-grab active:cursor-grabbing"
              animate={{ x: -(itemWidth + 24) * currentIndex }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ 
                left: -(itemWidth + 24) * maxIndex, 
                right: 0 
              }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {reviews.map((review, idx) => (
                <div 
                  key={review.id} 
                  ref={idx === 0 ? itemRef : null}
                  className="min-w-full md:min-w-[calc(50%-0.75rem)] lg:min-w-[calc(33.333%-1rem)] bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col"
                >
                  <div className="flex text-[#D4AF37] mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-brand-dark italic mb-8 flex-grow leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-serif text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-widest uppercase text-brand-dark">{review.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-brand-muted mt-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        {t('testimonials.verified')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(maxIndex + 1)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="w-12 h-12 flex items-center justify-center group"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-[#D4AF37] w-8' : 'bg-[#D4AF37]/30 w-2 group-hover:bg-[#D4AF37]/60'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
