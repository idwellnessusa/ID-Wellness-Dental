import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, GraduationCap, Languages, Award, Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function DoctorProfile() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamProfiles: Record<string, any> = {
    'liya-mohammed': {
      name: t('about.team.mohammed.name'),
      title: t('about.team.mohammed.title'),
      image: 'https://i.postimg.cc/KcDssbbB/PHOTO-2024-01-08-23-23-21.jpg',
      fullBio: [
        t('about.team.mohammed.fullBio.p1'),
        t('about.team.mohammed.fullBio.p2'),
        t('about.team.mohammed.fullBio.p3'),
        t('about.team.mohammed.fullBio.p4'),
      ],
      quote: t('about.team.mohammed.fullBio.p5'),
      quickInfo: [
        { icon: GraduationCap, label: t('about.team.labels.education'), value: 'NYU College of Dentistry, 2014' },
        { icon: Languages, label: t('about.team.labels.languages'), value: 'English, Amharic, Spanish, Portuguese' }
      ],
      ctaText: 'Book a Consultation with Dr. Mohammed'
    },
    'liany-paneca': {
      name: t('about.team.paneca.name'),
      title: t('about.team.paneca.title'),
      image: 'https://i.postimg.cc/7Z5d7MQc/Whats-App-Image-2026-03-16-at-22-38-15.jpg',
      fullBio: [
        t('about.team.paneca.fullBio.p1'),
        t('about.team.paneca.fullBio.p2'),
        t('about.team.paneca.fullBio.p3'),
        t('about.team.paneca.fullBio.p4'),
      ],
      quickInfo: [
        { icon: GraduationCap, label: t('about.team.labels.education'), value: 'University of Pennsylvania – Penn Dental Medicine' },
        { icon: Languages, label: t('about.team.labels.languages'), value: 'English, Spanish' }
      ],
      ctaText: 'Book a Consultation with Dr. Paneca'
    },
    'clara-santos': {
      name: 'Clara Santos',
      title: t('about.team.santos.title'),
      image: 'https://i.postimg.cc/28LnJFRh/IMG-0982.jpg',
      fullBio: [
        t('about.team.santos.fullBio.p1'),
        t('about.team.santos.fullBio.p2'),
        t('about.team.santos.fullBio.p3'),
        t('about.team.santos.fullBio.p4'),
      ],
      quickInfo: [
        { icon: Award, label: t('about.team.labels.experience'), value: 'Dental Office Management' },
        { icon: Languages, label: t('about.team.labels.languages'), value: 'English, Spanish, Portuguese' }
      ],
      ctaText: 'Message Clara for Support'
    }
  };

  const profile = id ? teamProfiles[id] : null;

  if (!profile) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-serif mb-6">Profile Not Found</h1>
        <Link to="/about" className="text-brand-gold hover:underline">Back to About Us</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-32 pb-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">{t('about.team.labels.backToTeam')}</span>
        </button>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Image & Quick Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={profile.image} 
                alt={profile.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {profile.quickInfo.map((info: any, idx: number) => (
                <div key={idx} className="p-6 rounded-2xl bg-white shadow-sm border border-brand-dark/5">
                  <info.icon className="w-6 h-6 text-brand-gold mb-3" />
                  <h4 className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-1">{info.label}</h4>
                  <p className="text-sm text-brand-muted">{info.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Detailed Bio */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="mb-10">
              <span className="inline-block px-4 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-4">
                {profile.title}
              </span>
              <h1 className="text-5xl lg:text-6xl font-serif text-brand-dark mb-6">{profile.name}</h1>
              <div className="w-20 h-1 bg-brand-gold" />
            </div>

            <div className="space-y-8 text-lg text-brand-muted leading-relaxed">
              {profile.quote && (
                <p className="text-brand-dark font-medium italic">
                  "{profile.quote}"
                </p>
              )}
              {profile.fullBio.map((p: string, idx: number) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-brand-dark/10">
              <h3 className="text-2xl font-serif text-brand-dark mb-8">{t('about.team.labels.philosophy')}</h3>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark mb-1">Patient-Centered</h4>
                    <p className="text-sm text-brand-muted">Tailored treatment plans focused on your unique needs and comfort.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark mb-1">Excellence</h4>
                    <p className="text-sm text-brand-muted">Commitment to the highest clinical standards and long-term results.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <Link 
                to="/contact"
                className="inline-block bg-brand-dark text-white px-10 py-5 rounded-full font-medium tracking-widest uppercase text-sm hover:bg-brand-gold transition-all duration-300 shadow-xl hover:shadow-brand-gold/20"
              >
                {profile.ctaText}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
