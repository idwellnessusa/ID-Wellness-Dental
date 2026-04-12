import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

interface LanguageModalProps {
  onComplete: () => void;
}

export default function LanguageModal({ onComplete }: LanguageModalProps) {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('languageSelected');
  });

  useEffect(() => {
    if (!isVisible) {
      onComplete();
    }
  }, []);

  const handleLanguageSelect = async (lang: string) => {
    try {
      // Set the flag immediately to prevent the modal from showing again on refresh
      localStorage.setItem('languageSelected', 'true');
      
      // Update local state immediately to start the exit animation
      setIsVisible(false);
      
      // Change the language - this is async but we don't want to block the UI transition
      await i18n.changeLanguage(lang);
      
      // For extra safety, call onComplete if it's not already handled by AnimatePresence
      // setIsLanguageSelected(true) is idempotent so calling it twice is fine
      onComplete();
    } catch (error) {
      console.error('Failed to change language:', error);
      // Ensure the modal is dismissed even if language change fails
      setIsVisible(false);
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="language-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-md"
        >
          <motion.div
            key="language-modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-brand-gold max-w-md w-full mx-4 text-center relative overflow-hidden"
          >
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Logo className="items-center" />
            </div>

            {/* Headings */}
            <div className="space-y-2 mb-10">
              <h2 className="font-serif text-2xl text-brand-dark">Welcome to ID WELLNESS DENTAL</h2>
              <h2 className="font-serif text-xl text-brand-dark/80">Bienvenido a ID WELLNESS DENTAL</h2>
              <h2 className="font-serif text-xl text-brand-dark/80">Bem-vindo à ID WELLNESS DENTAL</h2>
            </div>

            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted mb-8">
              Please select your preferred language
            </p>

            {/* Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handleLanguageSelect('en')}
                className="w-full py-4 border border-brand-gold text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium rounded-xl"
              >
                English
              </button>
              <button
                onClick={() => handleLanguageSelect('es')}
                className="w-full py-4 border border-brand-gold text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium rounded-xl"
              >
                Español
              </button>
              <button
                onClick={() => handleLanguageSelect('pt')}
                className="w-full py-4 border border-brand-gold text-brand-dark hover:bg-brand-gold hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium rounded-xl"
              >
                Português
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
