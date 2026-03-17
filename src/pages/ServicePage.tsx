import { useEffect, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Calendar, Activity, Clock, Sparkles, Star, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getServicesList } from '../data/services';

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { t } = useTranslation();

  const servicesData = useMemo(() => {
    const list = getServicesList(t);
    return list.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as Record<string, any>);
  }, [t]);

  const service = id ? servicesData[id] : null;

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  if (!service) {
    return (
      <div className="pt-48 pb-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif mb-4">{t('servicePage.notFound')}</h1>
        <Link to="/" className="text-brand-gold hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> {t('servicePage.backToHome')}
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-32 pb-20">
      {/* Hero Image */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 mb-16">
        <Link to="/#services" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> {t('servicePage.backToServices')}
        </Link>
        <div className="aspect-[21/9] rounded-[2rem] overflow-hidden relative shadow-lg bg-brand-dark/5">
          <img 
            src={service.image} 
            alt={`${service.title} - ID WELLNESS DENTAL`} 
            className="w-full h-full object-cover object-center opacity-0 transition-opacity duration-700"
            style={{ maxWidth: '100%', height: 'auto' }}
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            referrerPolicy="no-referrer"
            width="1200"
            height="514"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/40 flex items-end p-8 lg:p-16">
            <h1 className="text-5xl lg:text-7xl font-serif text-white">{service.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-12 grid lg:grid-cols-4 gap-16">
        <div className="lg:col-span-3">
          <h2 className="text-3xl font-serif mb-6">{t('servicePage.overview')}</h2>
          <p className="text-lg text-brand-muted leading-relaxed mb-12">
            {service.longDescription}
          </p>
          
          <h2 className="text-3xl font-serif mb-6">{t('servicePage.whatWeOffer')}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {service.services.map((item: { key: string, id: string, image: string }, idx: number) => {
              const name = t(`serviceDetails.${id}.services.${item.key}.name`);
              const description = t(`serviceDetails.${id}.services.${item.key}.description`);
              const painLevel = t(`serviceDetails.${id}.services.${item.key}.painLevel`);
              const downtime = t(`serviceDetails.${id}.services.${item.key}.downtime`);
              const results = t(`serviceDetails.${id}.services.${item.key}.results`);
              
              return (
              <div 
                key={idx} 
                id={item.id}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-dark/5 cursor-pointer flex flex-col bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-dark/5">
                  <img 
                    src={item.image} 
                    alt={`${name} - ID WELLNESS DENTAL`} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 opacity-0 transition-all duration-700"
                    style={{ maxWidth: '100%', height: 'auto' }}
                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                    referrerPolicy="no-referrer"
                    width="600"
                    height="450"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
                    <span className="text-white font-serif text-xl font-medium">{name}</span>
                  </div>
                  {/* Hover Overlay - Desktop Only */}
                  <div className="hidden md:flex absolute inset-0 bg-brand-gold/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col justify-center items-center p-6 text-center">
                    <h3 className="text-white font-serif text-xl font-medium mb-3">{name}</h3>
                    <p className="text-white/90 text-sm leading-relaxed">{description}</p>
                  </div>
                </div>

                {/* Mobile Description - Visible below image on mobile */}
                <div className="md:hidden p-6 border-t border-brand-dark/5">
                  <p className="text-brand-muted text-sm leading-relaxed">{description}</p>
                </div>
                {/* Treatment Experience Data Bar */}
                {(painLevel || downtime || results) && (
                  <div className="grid grid-cols-3 divide-x divide-brand-dark/10 border-t border-brand-dark/10 bg-brand-dark/5 p-4 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Activity className="w-4 h-4 text-brand-gold mb-1" />
                      <span className="text-[10px] uppercase tracking-wider text-brand-muted font-semibold mb-0.5">{t('servicePage.painLevel')}</span>
                      <span className="text-xs font-medium text-brand-dark">{painLevel || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Clock className="w-4 h-4 text-brand-gold mb-1" />
                      <span className="text-[10px] uppercase tracking-wider text-brand-muted font-semibold mb-0.5">{t('servicePage.downtime')}</span>
                      <span className="text-xs font-medium text-brand-dark">{downtime || 'N/A'}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <Sparkles className="w-4 h-4 text-brand-gold mb-1" />
                      <span className="text-[10px] uppercase tracking-wider text-brand-muted font-semibold mb-0.5">{t('servicePage.results')}</span>
                      <span className="text-xs font-medium text-brand-dark">{results || 'N/A'}</span>
                    </div>
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-brand-dark text-white p-8 rounded-[2rem] sticky top-32">
            <h3 className="text-2xl font-serif mb-4">{t('servicePage.readyToTransform')}</h3>
            <p className="text-white/70 mb-8">
              {t('servicePage.scheduleConsultation')}
            </p>
            <a 
              href="https://bookit.dentrixascend.com/soe/new/dental?pid=ASC64000000020970&mode=externalLink"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-brand-gold hover:bg-brand-gold-hover text-white px-6 py-4 rounded-full text-base font-medium transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {t('servicePage.bookConsultation')}
            </a>
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <section className="py-20 bg-white border-t border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif mb-8">{t('cta.haveMoreQuestionsTreatment')}</h2>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full text-base font-medium hover:bg-brand-gold transition-all shadow-lg"
          >
            {t('cta.contactOurTeam')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
