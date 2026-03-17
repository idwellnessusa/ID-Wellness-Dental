import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BotWidget({ isVisible }: { isVisible: boolean }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isVisible) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      setTimeout(() => setIsJumping(false), 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "e6b55b4c-5478-4e01-8f75-d3199b302899");
    formData.append("subject", "New Bot Chat Submission");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[90vw] max-w-[340px] bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/40 overflow-hidden transition-all duration-300 origin-bottom-right">
          <div className="bg-brand-gold p-4 flex justify-between items-center text-white">
            <h3 className="font-serif font-medium text-lg">{t('bot.chatTitle')}</h3>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6">
            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-brand-dark mb-2">{t('bot.sentTitle')}</h4>
                <p className="text-brand-muted text-sm mb-6">{t('bot.sentDesc')}</p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2 bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold rounded-full transition-colors text-sm font-medium"
                >
                  {t('bot.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input type="text" name="First Name" required placeholder={t('bot.firstName')} className="w-full px-3 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-white/50 text-sm" />
                  </div>
                  <div>
                    <input type="text" name="Last Name" required placeholder={t('bot.lastName')} className="w-full px-3 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-white/50 text-sm" />
                  </div>
                </div>
                <div>
                  <input type="email" name="Email" required placeholder={t('bot.email')} className="w-full px-3 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-white/50 text-sm" />
                </div>
                <div>
                  <input type="tel" name="Phone" required placeholder={t('bot.phone')} className="w-full px-3 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-white/50 text-sm" />
                </div>
                <div>
                  <textarea name="Message" required rows={3} placeholder={t('bot.message')} className="w-full px-3 py-2.5 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-white/50 text-sm resize-none"></textarea>
                </div>
                
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                {error && <div className="text-red-500 text-xs">{error}</div>}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-gold hover:bg-brand-gold-hover disabled:opacity-70 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? t('bot.sending') : t('bot.sendBtn')}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>
                
                <p className="text-[10px] text-brand-muted leading-tight text-center mt-3">
                  {t('bot.legal')}
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bot Icon & Speech Bubble */}
      <div className="flex items-end gap-3">
        {/* Speech Bubble */}
        {!isOpen && (
          <div className="hidden sm:block bg-white shadow-lg rounded-2xl rounded-br-none px-4 py-3 mb-4 border border-brand-dark/5 relative">
            <p className="text-sm font-medium text-brand-dark">{t('bot.speechBubble')}</p>
            <div className="absolute -bottom-2 right-0 w-4 h-4 bg-white border-b border-r border-brand-dark/5 transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
        
        {/* Bot Icon */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-16 h-16 rounded-full bg-white shadow-xl border border-brand-gold/20 flex items-center justify-center hover:scale-105 transition-transform z-50 ${!isOpen ? 'animate-float' : ''} ${isJumping && !isOpen ? 'animate-jump' : ''}`}
        >
          {/* Custom SVG Bot */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Body */}
            <rect x="6" y="14" width="20" height="14" rx="6" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5"/>
            {/* Head */}
            <path d="M8 12C8 7.58172 11.5817 4 16 4C20.4183 4 24 7.58172 24 12V14H8V12Z" fill="#f8fafc" stroke="#1e293b" strokeWidth="1.5"/>
            {/* Visor / Eyes */}
            <rect x="10" y="8" width="12" height="4" rx="2" fill="#D4AF37" />
            <circle cx="13" cy="10" r="1" fill="white" />
            <circle cx="19" cy="10" r="1" fill="white" />
            {/* Antenna */}
            <path d="M16 4V2" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16" cy="1.5" r="1.5" fill="#D4AF37"/>
            {/* Arms */}
            <path d="M6 18C4 18 3 19 3 21C3 23 4 24 6 24" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M26 18C28 18 29 19 29 21C29 23 28 24 26 24" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          
          {/* Online Indicator */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </div>
  );
}
