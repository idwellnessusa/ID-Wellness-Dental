import { ArrowRight, CheckCircle2, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Financing() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Header Section */}
      <div className="bg-white py-20 border-b border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-6xl font-serif mb-8">{t('financing.title')}</h1>
          <p className="text-lg text-brand-muted max-w-4xl mx-auto leading-relaxed">
            {t('financing.subtitle')}
          </p>
        </div>
      </div>

      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-x-[32px] gap-y-16 mb-24">
          {/* Cherry */}
          <div className="bg-white rounded-[2rem] p-[24px] shadow-sm border border-brand-dark/5 flex flex-col hover:shadow-xl transition-shadow duration-500">
            <div className="h-16 flex items-center mb-4">
              <h3 className="text-3xl font-serif text-brand-gold">{t('financing.cherry_title', 'Cherry')}</h3>
            </div>
            <p className="text-brand-muted mb-8 flex-grow leading-relaxed">
              {t('financing.cherry.desc')}
            </p>
          <ul className="space-y-3 mb-10">
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.cherry.feature1')}
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.cherry.feature2')}
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.cherry.feature3')}
            </li>
          </ul>
          <a 
            href="https://pay.withcherry.com/id-wellness-llc?utm_source=practice&utm_medium=website&m=53774"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-full bg-brand-gold text-white hover:bg-brand-dark transition-colors font-medium flex items-center justify-center gap-2 mt-auto"
          >
            {t('financing.cherry.apply')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* CareCredit */}
        <div className="bg-white rounded-[2rem] p-[24px] shadow-sm border border-brand-dark/5 flex flex-col hover:shadow-xl transition-shadow duration-500">
          <div className="h-16 flex items-center mb-4">
            <h3 className="text-3xl font-serif text-brand-gold">{t('financing.carecredit_title', 'CareCredit')}</h3>
          </div>
          <p className="text-brand-muted mb-8 flex-grow leading-relaxed">
            {t('financing.careCredit.desc')}
          </p>
          <ul className="space-y-3 mb-10">
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.careCredit.feature1')}
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.careCredit.feature2')}
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.careCredit.feature3')}
            </li>
          </ul>
          <a 
            href="https://www.carecredit.com/apply/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-full bg-brand-gold text-white hover:bg-brand-dark transition-colors font-medium flex items-center justify-center gap-2 mt-auto"
          >
            {t('financing.careCredit.apply')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Affirm */}
        <div className="bg-white rounded-[2rem] p-[24px] shadow-sm border border-brand-dark/5 flex flex-col hover:shadow-xl transition-shadow duration-500">
          <div className="h-16 flex items-center mb-4">
            <h3 className="text-3xl font-serif text-brand-gold">Affirm</h3>
          </div>
          <p className="text-brand-muted mb-8 flex-grow leading-relaxed">
            {t('financing.affirm.desc')}
          </p>
          <ul className="space-y-3 mb-10">
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.affirm.feature1')}
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.affirm.feature2')}
            </li>
            <li className="flex items-center gap-3 text-sm font-medium text-brand-dark">
              <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
              {t('financing.affirm.feature3')}
            </li>
          </ul>
          <button 
            className="w-full py-4 rounded-full border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white transition-colors font-medium flex items-center justify-center gap-2 mt-auto"
          >
            {t('financing.affirm.button')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Membership Section */}
      <div id="membership" className="max-w-5xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-serif mb-6">{t('financing.membership.title')}</h2>
          <p className="text-lg text-brand-muted max-w-4xl mx-auto leading-relaxed">
            {t('financing.membership.subtitle')}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-200 via-white to-slate-100 rounded-[2.5rem] p-8 lg:p-12 shadow-lg border border-slate-300 relative overflow-hidden mb-12">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 text-slate-700 text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-current" />
                <span>{t('financing.membership.wrinkleFreeClub.badge')}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-serif text-brand-dark mb-4">
                {t('financing.membership.wrinkleFreeClub.title')}
              </h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-slate-700">{t('financing.membership.wrinkleFreeClub.price')}</span>
                <span className="text-brand-muted">{t('financing.membership.wrinkleFreeClub.unit')}</span>
                <span className="text-xs text-brand-muted ml-2">{t('financing.membership.wrinkleFreeClub.commitment')}</span>
              </div>
              <p className="text-xl font-medium text-brand-dark mb-8 flex items-start gap-3 leading-relaxed">
                <Sparkles className="w-6 h-6 text-slate-500 shrink-0 mt-0.5" />
                {t('financing.membership.wrinkleFreeClub.desc')}
              </p>
              
              <a 
                href="https://wa.me/12018934706?text=I'm%20interested%20in%20the%20Wrinkle-Free%20Membership"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-md hover:shadow-lg"
              >
                {t('financing.membership.wrinkleFreeClub.button')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h4 className="font-serif text-xl mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-500" />
                {t('financing.membership.wrinkleFreeClub.includedTitle')}
              </h4>
              
              <ul className="space-y-4 mb-2">
                <li className="flex items-center gap-3 font-medium text-brand-dark">
                  <div className="w-2 h-2 rounded-full bg-slate-400 shrink-0"></div>
                  {t('financing.membership.wrinkleFreeClub.item1')}
                </li>
                <li className="flex items-start gap-3 font-medium text-brand-dark">
                  <div className="w-2 h-2 rounded-full bg-slate-400 shrink-0 mt-2"></div>
                  <span className="leading-relaxed">{t('financing.membership.wrinkleFreeClub.item2')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-gold/10 via-white to-brand-gold/5 rounded-[2.5rem] p-8 lg:p-12 shadow-lg border border-brand-gold/20 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-semibold mb-6">
                <Star className="w-4 h-4 fill-current" />
                <span>{t('financing.membership.smilePlan.badge')}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-serif text-brand-dark mb-4">
                {t('financing.membership.smilePlan.title')}
              </h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-brand-gold">{t('financing.membership.smilePlan.price')}</span>
                <span className="text-brand-muted">{t('financing.membership.smilePlan.unit')}</span>
                <span className="text-xs text-brand-muted ml-2">{t('financing.membership.smilePlan.commitment')}</span>
              </div>
              <p className="text-xl font-medium text-brand-dark mb-8 flex items-start gap-3 leading-relaxed">
                <Sparkles className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
                {t('financing.membership.smilePlan.desc')}
              </p>
              
              <a 
                href="https://wa.me/12018934706?text=I'm%20interested%20in%20the%20Bright%20Smile%20Plan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-hover text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-md hover:shadow-lg"
              >
                {t('financing.membership.smilePlan.button')}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-brand-gold/20">
              <h4 className="font-serif text-xl mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
                {t('financing.membership.smilePlan.includedTitle')}
              </h4>
              <p className="text-sm text-brand-muted mb-6 italic">{t('financing.membership.smilePlan.guarantee')}</p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 font-medium text-brand-dark">
                  <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></div>
                  {t('financing.membership.smilePlan.item1')}
                </li>
                <li className="flex items-center gap-3 font-medium text-brand-dark">
                  <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></div>
                  {t('financing.membership.smilePlan.item2')}
                </li>
                <li className="flex items-center gap-3 font-medium text-brand-dark">
                  <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></div>
                  {t('financing.membership.smilePlan.item3')}
                </li>
              </ul>

              <div className="bg-brand-gold/10 rounded-2xl p-4 border border-brand-gold/20">
                <p className="text-sm font-semibold text-brand-dark flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  {t('financing.membership.smilePlan.bonusLabel')}
                </p>
                <p className="text-sm text-brand-dark mt-1">{t('financing.membership.smilePlan.bonusDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
