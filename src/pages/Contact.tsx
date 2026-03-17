import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "e6b55b4c-5478-4e01-8f75-d3199b302899");

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
        setError(data.message || t('contact.form.error.generic'));
      }
    } catch (err) {
      setError(t('contact.form.error.failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white py-20 border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-serif mb-6">{t('contact.title')}</h1>
          <p className="text-lg text-brand-muted max-w-4xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>
      
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-24">
          {/* Form */}
          <div className="w-full max-w-[700px] mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-brand-dark/5">
            <h2 className="text-4xl font-serif mb-12 text-center">{t('contact.form.title')}</h2>
          {isSuccess ? (
            <div className="bg-green-50 text-green-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <div>
                <h3 className="text-xl font-medium mb-1">{t('contact.form.success.title')}</h3>
                <p className="text-green-700">{t('contact.form.success.desc')}</p>
              </div>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-4 px-6 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-full transition-colors text-sm font-medium"
              >
                {t('contact.form.success.btn')}
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-dark">{t('contact.form.firstName')}</label>
                  <input type="text" name="First Name" required className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-brand-light/50" placeholder="Jane" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-brand-dark">{t('contact.form.lastName')}</label>
                  <input type="text" name="Last Name" required className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-brand-light/50" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-brand-dark">{t('contact.form.email')}</label>
                <input type="email" name="Email" required className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-brand-light/50" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-brand-dark">{t('contact.form.phone')}</label>
                <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-brand-light/50" placeholder="(555) 123-4567" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-brand-dark">{t('contact.form.message')}</label>
                <textarea name="Message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-brand-dark/10 focus:outline-none focus:border-brand-gold transition-colors bg-brand-light/50" placeholder={t('contact.form.messagePlaceholder')}></textarea>
              </div>
              
              {/* Optional: Add a subject line hidden field or honeypot if desired */}
              <input type="hidden" name="subject" value="New Contact Form Submission from ID WELLNESS DENTAL" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-gold hover:bg-brand-gold-hover disabled:opacity-70 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
              </button>
            </form>
          )}
        </div>
        
        {/* Info */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                <MapPin className="w-7 h-7 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-xl font-serif mb-3">{t('contact.info.visit')}</h3>
                <p className="text-brand-muted leading-relaxed text-lg">99 Van Buren St<br />Newark, NJ 07105</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-xl font-serif mb-3">{t('contact.info.call')}</h3>
                <p className="text-brand-muted leading-relaxed text-lg">201-893-4706<br />{t('contact.info.hours')}</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0">
                <Mail className="w-7 h-7 text-brand-gold" />
              </div>
              <div>
                <h3 className="text-xl font-serif mb-3">{t('contact.info.email')}</h3>
                <p className="text-brand-muted leading-relaxed text-lg">idwellnessusa@gmail.com<br />{t('contact.info.reply')}</p>
              </div>
            </div>
          </div>
          
          {/* Google Map */}
          <div className="w-full h-96 rounded-[2.5rem] overflow-hidden shadow-lg border border-brand-dark/5">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=99+Van+Buren+St,+Newark,+NJ+07105&t=&z=15&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
