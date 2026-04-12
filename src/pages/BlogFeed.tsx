import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import blogData from '../data/blog.json';

export default function BlogFeed() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language as 'en' | 'es' | 'pt';

  const sortedBlogData = [...blogData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-[#111111] text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif mb-6"
          >
            {t('blog.title')} <span className="text-brand-gold italic">{t('blog.titleHighlight')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg"
          >
            {t('blog.subtitle')}
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {sortedBlogData.map((post, index) => {
            const content = post[currentLang] || post.en;
            
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid group cursor-pointer"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 hover:border-brand-gold/50 hover:bg-white/10">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10 opacity-80" />
                      <img 
                        src={post.image} 
                        alt={content.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-3 py-1 text-xs font-medium tracking-wider uppercase bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-brand-gold">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 relative z-20 -mt-12">
                      <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString(currentLang, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readingTime} {t('blog.minRead')}
                        </span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-serif mb-4 group-hover:text-brand-gold transition-colors line-clamp-3">
                        {content.title}
                      </h2>
                      
                      <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                        {content.excerpt}
                      </p>

                      <div className="flex items-center text-brand-gold text-sm font-medium tracking-wide uppercase group/btn">
                        {t('blog.readArticle')} 
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
