
import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  activePage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
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
    { label: 'Paket', page: 'packages' as Page },
    { label: 'Admin', page: 'admin' as Page },
    { label: 'Pembayaran', page: 'payments' as Page },
    { label: 'Laporan', page: 'reports' as Page },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-colors ${
            isScrolled ? 'bg-emerald-700' : 'bg-white'
          }`}>
            <span className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-emerald-900'}`}>A</span>
          </div>
          <span className={`text-xl font-serif font-bold transition-colors ${
            isScrolled ? 'text-emerald-900' : 'text-white'
          }`}>
            Ar-Rayan <span className="text-amber-500">Travel</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`text-sm font-medium transition-colors hover:text-amber-500 ${
                activePage === link.page 
                  ? 'text-amber-500 font-bold' 
                  : (isScrolled ? 'text-gray-700' : 'text-white')
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('registration')}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all transform hover:scale-105 active:scale-95 ${
              isScrolled 
                ? 'bg-emerald-700 text-white shadow-lg' 
                : 'bg-white text-emerald-900 shadow-xl'
            }`}
          >
            Booking
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t mt-3 animate-fadeIn">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-medium p-2 rounded-lg ${
                  activePage === link.page ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
