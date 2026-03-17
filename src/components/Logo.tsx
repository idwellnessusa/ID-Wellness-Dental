import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export default function Logo({ className = '', light = false }: LogoProps) {
  return (
    <Link to="/" className={`flex flex-col items-center leading-none group ${className}`}>
      <span className={`font-serif text-[10px] md:text-xs tracking-[0.4em] font-medium transition-colors duration-300 ${light ? 'text-white' : 'text-brand-gold'}`}>
        ID WELLNESS
      </span>
      <span className={`font-serif text-[10px] md:text-xs tracking-[0.4em] mt-0.5 font-medium transition-colors duration-300 ${light ? 'text-white/80' : 'text-brand-gold/80'}`}>
        DENTAL CLINIC
      </span>
    </Link>
  );
}
