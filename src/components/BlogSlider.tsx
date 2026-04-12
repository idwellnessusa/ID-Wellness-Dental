import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import blogData from '../data/blog.json';

export default function BlogSlider() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'es' | 'pt';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Get the 4 most recent posts
  const recentPosts = [...blogData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + cardsToShow >= recentPosts.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, recentPosts.length - cardsToShow) : prevIndex - 1
    );
  };

  return (
    <section className="py-24 bg-brand-dark text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-serif mb-4">
              {t('blog.sliderTitle', 'Discover Our Wellness Journal')}
            </h2>
            <p className="text-white/70 text-lg">
              {t('blog.sliderDesc', 'Insights, trends, and expert advice for a healthier, more confident smile.')}
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-brand-gold hover:text-brand-gold transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-brand-gold hover:text-brand-gold transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-6"
              initial={false}
              animate={{ 
                x: `calc(-${currentIndex * (100 / cardsToShow)}% - ${currentIndex * (24 / cardsToShow)}px)` 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {recentPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
                >
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="group block h-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-gold/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post[currentLang].title} 
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                      
                      <div className="absolute top-4 left-4">
                        <span className="bg-brand-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-sm text-white/50 mb-4">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(currentLang, { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-brand-gold"></span>
                        <span>{post.readingTime} {t('blog.minRead', 'min read')}</span>
                      </div>
                      
                      <h3 className="text-2xl font-serif mb-4 group-hover:text-brand-gold transition-colors line-clamp-2">
                        {post[currentLang].title}
                      </h3>
                      
                      <p className="text-white/70 mb-8 line-clamp-3 flex-grow">
                        {post[currentLang].excerpt}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-2 text-brand-gold font-medium group-hover:gap-4 transition-all">
                        {t('blog.readMore', 'Read Article')}
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-white hover:text-brand-dark transition-all"
          >
            {t('blog.viewAll', 'View All Articles')}
          </Link>
        </div>
      </div>
    </section>
  );
}
