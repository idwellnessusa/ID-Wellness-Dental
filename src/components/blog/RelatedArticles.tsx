import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import blogData from '../../data/blog.json';

export default function RelatedArticles({ currentPostId, currentLang }: { currentPostId: string, currentLang: string }) {
  const { t } = useTranslation();
  const relatedPosts = blogData.filter(p => p.id !== currentPostId).slice(0, 2);

  if (relatedPosts.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-3xl font-serif">{t('blog.continueReading')}</h3>
        <Link to="/blog" className="hidden md:flex items-center text-brand-gold hover:text-white transition-colors uppercase tracking-wider text-sm font-medium group">
          {t('blog.viewAllArticles')}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {relatedPosts.map(post => {
          const content = post[currentLang as 'en' | 'es' | 'pt'] || post.en;
          
          return (
            <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
              <div className="flex flex-col sm:flex-row gap-6 items-center bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-brand-gold/30 transition-colors">
                <div className="w-full sm:w-48 aspect-[4/3] rounded-xl overflow-hidden shrink-0">
                  <img 
                    src={post.image} 
                    alt={content.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex-1 py-2">
                  <div className="text-brand-gold text-xs font-medium tracking-wider uppercase mb-2">
                    {post.category}
                  </div>
                  <h4 className="text-xl font-serif mb-3 group-hover:text-brand-gold transition-colors line-clamp-2">
                    {content.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(currentLang, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </time>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTime} {t('blog.minRead')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Link to="/blog" className="inline-flex items-center text-brand-gold hover:text-white transition-colors uppercase tracking-wider text-sm font-medium group">
          {t('blog.viewAllArticles')}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
