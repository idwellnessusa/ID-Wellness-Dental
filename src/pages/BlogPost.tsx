import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, ArrowLeft } from 'lucide-react';
import blogData from '../data/blog.json';
import BlogLayout from '../components/blog/BlogLayout';
import ServiceSpotlight from '../components/blog/ServiceSpotlight';
import NewsletterCTA from '../components/blog/NewsletterCTA';
import RelatedArticles from '../components/blog/RelatedArticles';

export default function BlogPost() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en') as 'en' | 'es' | 'pt';

  const post = blogData.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">{t('blog.articleNotFound')}</h1>
          <Link to="/blog" className="text-brand-gold hover:underline">{t('blog.returnToJournal')}</Link>
        </div>
      </div>
    );
  }

  const content = post[currentLang as 'en' | 'es' | 'pt'] || post.en;
  
  // Split content into paragraphs for rendering
  const paragraphs = content.content.split('\n\n').filter(p => p.trim() !== '');

  return (
    <BlogLayout post={post} currentLang={currentLang}>
      <article className="max-w-3xl mx-auto px-6 pt-12">
        <Link to="/blog" className="inline-flex items-center text-white/50 hover:text-brand-gold transition-colors mb-12 text-sm uppercase tracking-wider font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('blog.backToJournal')}
        </Link>

        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-brand-gold mb-6 uppercase tracking-widest font-medium">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1 text-white/50">
              <Clock className="w-4 h-4" />
              {post.readingTime} {t('blog.minRead')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mx-auto font-light">
            {content.excerpt}
          </p>
        </header>
      </article>

      <div className="max-w-5xl mx-auto px-6 mb-20">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img 
            src={post.image} 
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-invert prose-lg md:prose-xl max-w-none prose-p:text-white/70 prose-p:leading-relaxed prose-p:font-light prose-headings:font-serif prose-headings:text-white prose-a:text-brand-gold hover:prose-a:text-brand-gold/80">
          {paragraphs.map((paragraph, index) => {
            if (paragraph.trim() === '[SERVICE_SPOTLIGHT]') {
              return (
                <div key={index}>
                  <ServiceSpotlight category={post.category} />
                </div>
              );
            }
            return <p key={index} className="mb-8">{paragraph}</p>;
          })}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-32">
        <NewsletterCTA />
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-32 border-t border-white/10 pt-24">
        <RelatedArticles currentPostId={post.id} currentLang={currentLang} />
      </div>
    </BlogLayout>
  );
}
