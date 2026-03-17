import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-brand-light flex items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin"></div>
    </div>
  );
}
