import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getServicesList } from '../data/services';

export default function Services() {
  const { t } = useTranslation();
  const servicesList = getServicesList(t);

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white py-20 border-b border-brand-dark/5">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 text-center">
          <h1 className="text-5xl lg:text-6xl font-serif mb-8">{t('services.title')}</h1>
          <p className="text-lg text-brand-muted max-w-4xl mx-auto leading-relaxed">
            {t('services.desc')}
          </p>
        </div>
      </div>
      
      <div className="bg-slate-50 py-24">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 grid md:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-16">
          {servicesList.map((card, index) => (
            <div key={index} className="group rounded-[2rem] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-dark/5 flex flex-col">
              <div className="aspect-[4/3] overflow-hidden relative bg-brand-dark/5">
                <Link to={`/service/${card.id}`} className="block w-full h-full relative group">
                  <img 
                    src={card.image} 
                    alt={`${card.title} - ID WELLNESS DENTAL`} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 opacity-0 transition-all duration-700"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                    referrerPolicy="no-referrer"
                    width="800"
                    height="600"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-gold/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-white font-serif text-2xl mb-2">{card.title}</h3>
                    <span className="text-white/80 text-sm uppercase tracking-widest font-medium">{t('services.viewCategory')}</span>
                  </div>
                </Link>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <Link to={`/service/${card.id}`}>
                  <h3 className="text-3xl font-serif mb-4 hover:text-brand-gold transition-colors">{card.title}</h3>
                </Link>
                <p className="text-brand-muted mb-8 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>
              <ul className="space-y-3 mb-10 flex-grow">
                {card.services.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0"></div>
                    <Link to={`/service/${card.id}#${service.id}`} className="hover:text-brand-gold transition-colors">
                      {t(`serviceDetails.${card.id}.services.${service.key}.name`)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link to={`/service/${card.id}`} className="w-full py-4 rounded-full border border-brand-dark/20 hover:border-brand-gold hover:text-brand-gold transition-colors font-medium flex items-center justify-center gap-2 mt-auto">
                {card.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
