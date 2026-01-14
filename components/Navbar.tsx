
import React, { useState, useEffect } from 'react';
import { Page, SystemSettings } from '../types';

interface NavbarProps {
  settings: SystemSettings;
  onNavigate: (page: Page) => void;
  activePage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ settings, onNavigate, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', page: 'home' as Page },
    { label: 'Katalog', page: 'packages' as Page },
    { label: 'Admin', page: 'admin' as Page },
    { label: 'Finansial', page: 'payments' as Page },
    { label: 'Laporan', page: 'reports' as Page },
  ];

  const brandNames = settings.agencyName.split(' ');
  const firstName = brandNames[0];
  const restName = brandNames.slice(1).join(' ');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] py-4' : 'bg-transparent py-8'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center mr-4 transition-all duration-500 shadow-xl ${
            isScrolled ? 'bg-emerald-900 rotate-0' : 'bg-white/10 backdrop-blur-md border border-white/20 rotate-45 group-hover:rotate-0'
          }`}>
            <span className={`text-2xl font-bold transition-all ${isScrolled ? 'text-white' : 'text-white -rotate-45 group-hover:rotate-0'}`}>
              {firstName[0]}
            </span>
          </div>
          <div className="flex flex-col">
            <span className={`text-2xl font-serif font-bold leading-tight transition-colors ${
              isScrolled ? 'text-emerald-950' : 'text-white'
            }`}>
              {firstName} <span className="text-amber-500">{restName}</span>
            </span>
            {!isScrolled && <span className="text-[9px] text-white/50 font-bold uppercase tracking-[0.3em] mt-0.5">Ibadah Khidmat</span>}
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-amber-500 relative group ${
                activePage === link.page 
                  ? 'text-amber-500' 
                  : (isScrolled ? 'text-slate-600' : 'text-white/80')
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${activePage === link.page ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
          <button
            onClick={() => onNavigate('registration')}
            className={`px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all transform hover:-translate-y-1 active:scale-95 ${
              isScrolled 
                ? 'bg-emerald-900 text-white shadow-2xl shadow-emerald-900/30' 
                : 'bg-white text-emerald-950 shadow-2xl shadow-white/10'
            }`}
          >
            Daftar Umrah
          </button>
        </div>

        <button 
          className={`lg:hidden p-3 rounded-xl transition-colors ${isScrolled ? 'bg-emerald-50 text-emerald-900' : 'bg-white/10 text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-emerald-950/95 backdrop-blur-2xl animate-fadeIn p-8 flex flex-col justify-center text-center">
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 text-white p-4">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <div className="space-y-8 flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-3xl font-serif font-bold transition-all ${
                  activePage === link.page ? 'text-amber-500 scale-110' : 'text-white/60'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
               onClick={() => { onNavigate('registration'); setIsMobileMenuOpen(false); }}
               className="mt-8 py-6 bg-amber-500 text-emerald-950 text-xl font-bold rounded-[2rem] shadow-2xl shadow-amber-500/20"
            >
              Booking Sekarang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
