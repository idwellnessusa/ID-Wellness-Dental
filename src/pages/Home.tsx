import { ArrowRight, Star, ShieldCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getServicesList } from '../data/services';
import TestimonialsCarousel from '../components/TestimonialsCarousel';

export default function Home() {
  const { t } = useTranslation();
  const servicesList = getServicesList(t);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden min-h-[85vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.postimg.cc/YCFpFjcx/IMG-0979.jpg"
            alt="Premium Dental Studio - ID WELLNESS DENTAL"
            className="w-full h-full object-cover object-center opacity-0 transition-opacity duration-1000"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
            referrerPolicy="no-referrer"
            width="1920"
            height="1080"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-12 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/20 text-brand-gold text-sm font-semibold mb-6 backdrop-blur-sm border border-brand-gold/30">
              <Star className="w-4 h-4 fill-current" />
              <span>{t('hero.badge')}</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] mb-6 text-white">
              {t('hero.title1')} <span className="text-brand-gold italic">{t('hero.title2')}</span>
            </h1>
            <p className="text-lg text-white/90 mb-10 leading-relaxed max-w-xl">
              {t('hero.desc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://bookit.dentrixascend.com/soe/new/dental?pid=ASC64000000020970&mode=externalLink"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-4 rounded-full text-base font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-brand-gold/20"
              >
                {t('hero.bookBtn')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services" className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-brand-dark px-8 py-4 rounded-full text-base font-medium transition-all flex items-center justify-center">
                {t('hero.exploreBtn')}
              </a>
            </div>

            {/* Mobile Badge - Sits below buttons */}
            <div className="lg:hidden bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-[240px] mt-12">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img key={i} src={`https://loremflickr.com/100/100/face,smile?lock=${i}`} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white" referrerPolicy="no-referrer" width="40" height="40" />
                  ))}
                </div>
                <div className="flex text-brand-gold">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
              <p className="text-sm font-medium text-brand-dark">{t('hero.trustedBy')}</p>
            </div>
          </div>
        </div>

        {/* Desktop Badge - Forced to bottom-right corner of the section */}
        <div className="hidden lg:block absolute bottom-10 right-12 z-20 bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-[280px]">
          <div className="flex items-center gap-4 mb-3">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img key={i} src={`https://loremflickr.com/100/100/face,smile?lock=${i}`} alt="Patient" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" referrerPolicy="no-referrer" width="48" height="48" />
              ))}
            </div>
            <div className="flex text-brand-gold">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
          </div>
          <p className="text-base font-semibold text-brand-dark leading-tight">{t('hero.trustedBy')}</p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="border-y border-brand-dark/5 bg-white py-10 mt-12 lg:mt-0">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-brand-dark/5">
          {[
            { icon: Star, title: t('trust.starTitle'), desc: t('trust.starDesc'), link: 'https://maps.app.goo.gl/TU4iTLwktrdBKKNC9' },
            { icon: ShieldCheck, title: t('trust.teamTitle'), desc: t('trust.teamDesc'), link: '/about#medical-team', isInternal: true },
            { icon: Calendar, title: t('trust.payTitle'), desc: t('trust.payDesc'), link: '/financing', isInternal: true },
          ].map((item, idx) => {
            const innerContent = (
              <>
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-brand-gold" />
                </div>
                <div>
                  <h2 className="font-serif font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-brand-muted">{item.desc}</p>
                </div>
              </>
            );

            return (
              <div key={idx} className="pt-8 md:pt-0 md:px-8 first:pt-0 first:px-0">
                {item.link ? (
                  item.isInternal ? (
                    <Link 
                      to={item.link}
                      className="flex items-center gap-4 hover:scale-105 cursor-pointer transition-transform duration-300"
                    >
                      {innerContent}
                    </Link>
                  ) : (
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 hover:scale-105 cursor-pointer transition-transform duration-300"
                    >
                      {innerContent}
                    </a>
                  )
                ) : (
                  <div className="flex items-center gap-4">
                    {innerContent}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-24 bg-brand-dark/5">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">{t('goals.title')}</h2>
            <p className="text-brand-muted text-lg">
              {t('goals.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { title: t('goals.brighterSmile'), link: '/financing#membership', image: 'https://i.postimg.cc/ZKbZnV6b/Chat-GPT-Image-Mar-3-2026-10-25-34-AM.png', description: t('goals.affordableSmileDesc'), badge: t('goals.memberExclusive') },
              { title: t('goals.straightenTeeth'), link: '/service/orthodontics#invisalign', image: 'https://i.postimg.cc/cHCV6r5V/Chat-GPT-Image-Mar-3-2026-05-36-10-PM.png' },
              { title: t('goals.sharpJawline'), link: '/service/facial-esthetics#dermal-fillers', image: 'https://i.postimg.cc/HLHFvL3G/Chat-GPT-Image-Mar-3-2026-10-41-07-AM.png' },
              { title: t('goals.healthyGums'), link: '/service/periodontics', image: 'https://i.postimg.cc/kXPqYvHS/Chat-GPT-Image-Mar-3-2026-05-37-51-PM.png' },
              { title: t('goals.wrinkleFree'), link: '/financing#membership', image: 'https://i.postimg.cc/BnwMHQyF/unnamed-(1).jpg', badge: t('goals.bestSeller'), description: t('goals.wrinkleFreeDesc') },
              { title: t('goals.idBrightSmilePlan'), link: '/financing#membership', image: 'https://i.postimg.cc/wT4hb4VB/unnamed-(2).jpg', badge: t('goals.memberExclusive'), description: t('goals.idBrightSmilePlanDesc') },
            ].map((goal, idx) => (
              <Link 
                key={idx} 
                to={goal.link}
                className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer block bg-brand-dark/5"
              >
                <img 
                  src={goal.image} 
                  alt={`${goal.title} - ID WELLNESS DENTAL`} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 opacity-0 transition-all duration-700"
                  style={{ maxWidth: '100%', height: 'auto' }}
                  onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                  referrerPolicy="no-referrer"
                  width="600"
                  height="600"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300">
                  <span className="text-white font-serif text-2xl font-medium group-hover:text-brand-gold transition-colors duration-300 mb-1">{goal.title}</span>
                  {goal.description && (
                    <p className="text-white/80 text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">{goal.description}</p>
                  )}
                </div>
                {goal.badge && (
                  <div className="absolute top-4 right-4 bg-brand-gold text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    {goal.badge}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif mb-6">{t('services.title')}</h2>
            <p className="text-brand-muted text-lg">
              {t('services.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {servicesList.map((card, index) => (
              <div key={index} className="group rounded-[2rem] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-dark/5 flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative bg-brand-dark/5">
                  <Link to={`/service/${card.id}`} className="block w-full h-full relative group">
                    <img 
                      src={card.image} 
                      alt={`${card.title} - ID WELLNESS DENTAL`} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 opacity-0 transition-all duration-700"
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
                <div className="p-10 flex flex-col flex-grow">
                  <Link to={`/service/${card.id}`}>
                    <h3 className="text-3xl font-serif mb-4 hover:text-brand-gold transition-colors">{card.title}</h3>
                  </Link>
                  <p className="text-brand-muted mb-8 line-clamp-2">
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
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* FAQ CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-8">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{t('cta.questions')}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif mb-8">{t('cta.haveMoreQuestions')}</h2>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full text-base font-medium hover:bg-brand-gold transition-all shadow-lg"
          >
            {t('cta.contactOurTeam')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
