import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Calendar, Instagram, Facebook, ShieldCheck, Activity, Lock, ChevronDown, Globe } from 'lucide-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageModal from './LanguageModal';
import BotWidget from './BotWidget';
import Logo from './Logo';

export default function Layout() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isLanguageSelected, setIsLanguageSelected] = useState(() => {
    return !!localStorage.getItem('languageSelected');
  });
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const navLinks: { name: string; path: string; isExternal?: boolean }[] = [
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.blog'), path: '/blog' },
  ];

  return (
    <div className="min-h-screen bg-brand-light text-brand-dark selection:bg-brand-gold selection:text-white flex flex-col">
      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/70 backdrop-blur-lg shadow-sm py-3' : 'bg-white/70 backdrop-blur-lg py-5'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Right Side: Nav & CTAs */}
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Desktop Nav & CTAs Grouped */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <nav className="flex items-center gap-4 lg:gap-6">
                {navLinks.map((item) => (
                  item.isExternal ? (
                    <a
                      key={item.name}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative text-xs uppercase tracking-[0.2em] text-slate-600 font-medium transition-colors hover:text-brand-dark"
                    >
                      {item.name}
                      <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="group relative text-xs uppercase tracking-[0.2em] text-slate-600 font-medium transition-colors hover:text-brand-dark"
                    >
                      {item.name}
                      <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <Link 
                  to="/financing"
                  className="flex items-center gap-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all"
                >
                  {t('nav.financing')}
                </Link>
                <a 
                  href={"https://bookit.dentrixascend.com/soe/new/dental?pid=ASC64000000020970&mode=externalLink"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-white px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {t('nav.bookConsultation')}
                </a>

                {/* Language Switcher */}
                <div 
                  className="relative" 
                  ref={langRef}
                  onMouseEnter={() => setIsLangOpen(true)}
                  onMouseLeave={() => setIsLangOpen(false)}
                >
                  <button 
                    className="group relative text-xs uppercase tracking-[0.2em] text-slate-600 font-medium transition-colors hover:text-brand-dark flex items-center gap-1 py-2"
                    onClick={() => setIsLangOpen(!isLangOpen)}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {i18n.language.split('-')[0].toUpperCase()}
                  </button>
                  
                  <div 
                    className={`absolute top-full right-0 mt-2 w-24 bg-white/90 backdrop-blur-md border border-brand-gold/20 rounded-xl shadow-xl overflow-hidden transition-all duration-300 origin-top z-50 ${
                      isLangOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                    }`}
                  >
                    <div className="py-2 flex flex-col items-center">
                      <button onClick={() => changeLanguage('en')} className="w-full py-2 text-xs uppercase tracking-widest text-slate-600 hover:text-brand-gold hover:bg-brand-gold/5 transition-colors">EN</button>
                      <button onClick={() => changeLanguage('es')} className="w-full py-2 text-xs uppercase tracking-widest text-slate-600 hover:text-brand-gold hover:bg-brand-gold/5 transition-colors">ES</button>
                      <button onClick={() => changeLanguage('pt')} className="w-full py-2 text-xs uppercase tracking-widest text-slate-600 hover:text-brand-gold hover:bg-brand-gold/5 transition-colors">PT</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="md:hidden p-2 text-brand-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto pb-10">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map((item) => (
              item.isExternal ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl font-serif hover:text-brand-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-2xl font-serif hover:text-brand-gold transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Mobile Language Switcher */}
            <div className="mt-4 pt-6 border-t border-brand-dark/10 flex flex-col gap-4">
              <div className="flex justify-center gap-6">
                <button onClick={() => changeLanguage('en')} className={`text-sm font-medium uppercase tracking-widest ${i18n.language.startsWith('en') ? 'text-brand-gold' : 'text-brand-muted'}`}>EN</button>
                <button onClick={() => changeLanguage('es')} className={`text-sm font-medium uppercase tracking-widest ${i18n.language.startsWith('es') ? 'text-brand-gold' : 'text-brand-muted'}`}>ES</button>
                <button onClick={() => changeLanguage('pt')} className={`text-sm font-medium uppercase tracking-widest ${i18n.language.startsWith('pt') ? 'text-brand-gold' : 'text-brand-muted'}`}>PT</button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-brand-dark/10 flex flex-col gap-4">
              <Link 
                to="/financing"
                className="flex items-center justify-center gap-2 border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-8 py-4 rounded-full text-lg font-medium w-full transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.financing')}
              </Link>
              <a 
                href={"https://bookit.dentrixascend.com/soe/new/dental?pid=ASC64000000020970&mode=externalLink"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-brand-gold text-white px-8 py-4 rounded-full text-lg font-medium w-full"
              >
                <Calendar className="w-5 h-5" />
                {t('nav.bookConsultation')}
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Logo light />
            </div>
            <p className="text-white/60 max-w-sm mb-8">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/idwellnessdental" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold transition-colors flex items-center justify-center text-white hover:text-white group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 group-hover:text-white text-brand-gold transition-colors" />
              </a>
              <a 
                href="https://www.facebook.com/share/14bwHGSfSQA/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold transition-colors flex items-center justify-center text-white hover:text-white group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 group-hover:text-white text-brand-gold transition-colors" />
              </a>
              <a 
                href="https://www.tiktok.com/@idwellnessNJ" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-gold transition-colors flex items-center justify-center text-white hover:text-white group"
                aria-label="TikTok"
              >
                <svg 
                  className="w-5 h-5 group-hover:text-white text-brand-gold transition-colors fill-current" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-lg mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/services" className="hover:text-brand-gold transition-colors">{t('nav.services')}</Link></li>
              <li><Link to="/faq" className="hover:text-brand-gold transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/blog" className="hover:text-brand-gold transition-colors">{t('nav.blog')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-white/60">
              <li>99 Van Buren St<br/>Newark, NJ 07105</li>
              <li>201-893-4706</li>
              <li>idwellnessusa@gmail.com</li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">{t('footer.workingHours')}</h4>
            <ul className="space-y-4 text-white/60">
              <li>{t('footer.schedule.mon')}</li>
              <li>{t('footer.schedule.thu')}</li>
              <li>{t('footer.schedule.fri')}</li>
              <li>{t('footer.schedule.sat')}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-5 shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-gold" aria-label="HIPAA Compliance" />
              <Activity className="w-6 h-6 text-brand-gold" aria-label="Medical Oversight" />
              <Lock className="w-6 h-6 text-brand-gold" aria-label="Confidentiality" />
            </div>
            <p className="text-xs md:text-sm text-white/50 leading-relaxed">
              <span className="text-brand-gold font-medium">{t('footer.medicalSafety')}</span> {t('footer.medicalDesc')}
            </p>
          </div>
          <div className="text-center text-white/40 text-sm">
            &copy; 2021 {t('footer.rights')}
          </div>
        </div>
      </footer>
      
      <BotWidget isVisible={isLanguageSelected} />
      <LanguageModal onComplete={() => setIsLanguageSelected(true)} />
    </div>
  );
}
