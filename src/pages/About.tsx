import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const location = useLocation();
  const { t } = useTranslation();

  const team = [
    {
      id: 'liya-mohammed',
      name: t('about.team.mohammed.name'),
      title: t('about.team.mohammed.title'),
      bio: t('about.team.mohammed.shortBio'),
      image: 'https://i.postimg.cc/KcDssbbB/PHOTO-2024-01-08-23-23-21.jpg',
      hasProfile: true
    },
    {
      id: 'liany-paneca',
      name: t('about.team.paneca.name'),
      title: t('about.team.paneca.title'),
      bio: t('about.team.paneca.shortBio'),
      image: 'https://i.postimg.cc/7Z5d7MQc/Whats-App-Image-2026-03-16-at-22-38-15.jpg',
      hasProfile: true
    },
    {
      id: 'clara-santos',
      name: 'Clara Santos',
      title: t('about.team.santos.title'),
      bio: t('about.team.santos.shortBio'),
      image: 'https://i.postimg.cc/28LnJFRh/IMG-0982.jpg',
      hasProfile: true
    }
  ];

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

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="pt-24 lg:pt-32">
      {/* Hero Section */}
      <section className="py-[80px] bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            {...fadeInUp}
            className="text-5xl lg:text-7xl font-serif font-semibold mb-8 tracking-tight"
          >
            {t('about.title')}
          </motion.h1>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed"
          >
            {t('about.subtitle')}
          </motion.p>
        </div>
      </section>
      
      {/* Evolution Section */}
      <section className="py-[80px] bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-x-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-8 border-white"
          >
            <img 
              src="https://i.postimg.cc/YCFpFjcx/IMG-0979.jpg" 
              alt="ID Wellness Dental Clinic Office" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
          <div className="flex flex-col justify-center">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl lg:text-4xl font-serif font-semibold mb-8 leading-tight"
            >
              {t('about.story.title')}
            </motion.h2>
            <div className="space-y-6 text-base lg:text-lg text-brand-muted leading-relaxed mb-12">
              {[1, 2, 3, 4, 5].map((num) => (
                <motion.p 
                  key={num}
                  {...fadeInUp}
                  transition={{ delay: 0.1 * num }}
                >
                  {t(`about.story.p${num}`)}
                </motion.p>
              ))}
              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.6 }}
                className="font-medium text-brand-dark"
              >
                {t('about.story.p6')}
              </motion.p>
            </div>
            
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-2 gap-8 p-8 bg-white rounded-2xl shadow-sm border border-brand-dark/5"
            >
              <div>
                <div className="text-4xl font-serif font-semibold text-brand-gold mb-1">15+</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">{t('about.stats.experience')}</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-semibold text-brand-gold mb-1">5k+</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted">{t('about.stats.patients')}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section id="medical-team" className="py-[80px] bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl lg:text-4xl font-serif font-semibold mb-8 tracking-tight"
            >
              {t('about.team.title')}
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-base lg:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed"
            >
              {t('about.team.subtitle')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, idx) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: 0.1 * idx }}
                className="flex flex-col items-center text-center group"
              >
                {member.hasProfile ? (
                  <Link to={`/team/${member.id}`} className="block mb-8">
                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-brand-gold transition-all duration-500">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </Link>
                ) : (
                  <div className="w-48 h-48 rounded-full overflow-hidden mb-8 shadow-lg border-4 border-white">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                
                {member.hasProfile ? (
                  <Link to={`/team/${member.id}`} className="hover:text-brand-gold transition-colors">
                    <h3 className="text-2xl font-serif font-semibold text-brand-gold mb-2">{member.name}</h3>
                  </Link>
                ) : (
                  <h3 className="text-2xl font-serif font-semibold text-brand-gold mb-2">{member.name}</h3>
                )}
                
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark mb-4">{member.title}</p>
                <p className="text-brand-muted leading-relaxed text-sm max-w-sm">
                  {member.bio}
                </p>
                
                {member.hasProfile && (
                  <Link 
                    to={`/team/${member.id}`}
                    className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold hover:text-brand-dark transition-all duration-300 border-b border-brand-gold/30 pb-1"
                  >
                    View Full Profile
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA Section */}
      <section className="py-[80px] bg-slate-50/50 border-t border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            {...fadeInUp}
            className="text-3xl lg:text-4xl font-serif font-semibold mb-8"
          >
            {t('cta.haveMoreQuestions')}
          </motion.h2>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full text-base font-medium hover:bg-brand-gold transition-all shadow-lg"
            >
              {t('cta.contactOurTeam')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

