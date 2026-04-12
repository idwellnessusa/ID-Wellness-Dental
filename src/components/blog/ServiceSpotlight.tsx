import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ServiceSpotlight({ category }: { category: string }) {
  const { t } = useTranslation();

  // Map categories to specific services
  const serviceMap: Record<string, { title: string, desc: string, link: string, img: string }> = {
    'Cosmetic Dentistry': {
      title: t('blog.spotlightCosmeticTitle'),
      desc: t('blog.spotlightCosmeticDesc'),
      link: '/service/cosmetic',
      img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop'
    },
    'Implants': {
      title: t('blog.spotlightImplantsTitle'),
      desc: t('blog.spotlightImplantsDesc'),
      link: '/service/implants',
      img: 'https://images.unsplash.com/photo-1598256989800-fea5ce51426c?q=80&w=400&auto=format&fit=crop'
    },
    'Facial Esthetics': {
      title: t('blog.spotlightFacialTitle'),
      desc: t('blog.spotlightFacialDesc'),
      link: '/service/facial',
      img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?q=80&w=400&auto=format&fit=crop'
    }
  };

  const spotlight = serviceMap[category] || serviceMap['Cosmetic Dentistry'];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-brand-gold/20 p-8 flex flex-col md:flex-row items-center gap-8 not-prose my-12 group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
        <Sparkles className="w-32 h-32 text-brand-gold" />
      </div>
      
      <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shrink-0 relative z-10">
        <img src={spotlight.img} alt={spotlight.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      
      <div className="flex-1 relative z-10">
        <div className="text-brand-gold text-sm font-medium tracking-widest uppercase mb-2">{t('blog.serviceSpotlight')}</div>
        <h3 className="text-2xl md:text-3xl font-serif text-white mb-3">{spotlight.title}</h3>
        <p className="text-white/70 mb-8 leading-relaxed text-lg">
          {spotlight.desc}
        </p>
        <Link 
          to={spotlight.link}
          className="inline-flex items-center justify-center px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-brand-gold transition-colors group/btn"
        >
          {t('blog.exploreService')}
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
