import { useState } from 'react';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NewsletterCTA() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Action: JSON Storage via Backend API
      const apiResponse = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          language: i18n.language 
        }),
      });

      const apiData = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(apiData.error || 'Subscription failed');
      }

      // 2. Action: Email Notification via Formspree
      // Using the provided email as the Formspree endpoint (assuming it's a registered Formspree email)
      await fetch('https://formspree.io/f/idwellnessusa@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          message: `New newsletter subscription from ${email} (Language: ${i18n.language})`,
          _subject: 'New Newsletter Subscriber - ID Wellness Dental',
        }),
      }).catch(err => console.error('Formspree error:', err)); // Non-blocking if Formspree fails

      setStatus('success');
      setEmail('');
    } catch (error: any) {
      console.error('Subscription error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white/5 border border-brand-gold/30 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/10 to-transparent opacity-50" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-brand-gold" />
          </div>
          <h3 className="text-3xl md:text-4xl font-serif mb-4">
            {t('blog.newsletterSuccessTitle', 'Welcome to the Club!')}
          </h3>
          <p className="text-white/80 max-w-lg mx-auto text-lg">
            {t('blog.newsletterSuccessDesc', 'You have joined the Club! You will soon receive news in your inbox.')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent opacity-50" />
      
      <div className="relative z-10">
        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-brand-gold" />
        </div>
        
        <h3 className="text-3xl md:text-4xl font-serif mb-4">{t('blog.newsletterTitle')}</h3>
        <p className="text-white/60 mb-10 max-w-lg mx-auto text-lg">
          {t('blog.newsletterDesc')}
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="flex-1 relative">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('blog.newsletterPlaceholder')} 
              className={`w-full bg-black/50 border ${status === 'error' ? 'border-red-500' : 'border-white/10'} rounded-full px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors`}
              required
              disabled={status === 'loading'}
            />
            {status === 'error' && (
              <p className="absolute -bottom-6 left-6 text-red-500 text-xs">{errorMessage}</p>
            )}
          </div>
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="bg-brand-gold text-black px-8 py-4 rounded-full font-medium hover:bg-white transition-colors whitespace-nowrap flex items-center justify-center gap-2 min-w-[140px]"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('blog.newsletterLoading', 'Loading...')}
              </>
            ) : (
              t('blog.newsletterSubscribe')
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
