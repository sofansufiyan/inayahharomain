
import React from 'react';
import { CONTACT_INFO } from '../constants';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-emerald-950">A</span>
              </div>
              <span className="text-2xl font-serif font-bold">
                Ar-Rayan <span className="text-amber-500">Travel</span>
              </span>
            </div>
            <p className="text-emerald-100/60 leading-relaxed">
              Penyelenggara Perjalanan Ibadah Umrah (PPIU) resmi yang mengutamakan kekhusyukan dan kenyamanan jamaah.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-500 hover:text-emerald-950 transition-all">
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Tautan Cepat</h4>
            <ul className="space-y-4">
              {['Beranda', 'Paket Umrah', 'Pendaftaran', 'Syarat & Ketentuan', 'Kebijakan Privasi'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      if (item === 'Beranda') onNavigate('home');
                      if (item === 'Paket Umrah') onNavigate('packages');
                      if (item === 'Pendaftaran') onNavigate('registration');
                    }}
                    className="text-emerald-100/60 hover:text-white hover:translate-x-1 transition-all flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-emerald-100/60">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="text-emerald-100/60">{CONTACT_INFO.whatsapp}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="text-emerald-100/60">{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Buletin Haji & Umrah</h4>
            <p className="text-emerald-100/60 mb-4 text-sm">Dapatkan info jadwal keberangkatan dan tips ibadah langsung di email Anda.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Anda"
                className="bg-white/10 border border-white/20 rounded-l-xl px-4 py-2 outline-none focus:ring-1 focus:ring-amber-500 w-full text-sm"
              />
              <button className="bg-amber-500 text-emerald-950 px-4 py-2 rounded-r-xl font-bold text-sm hover:bg-amber-600 transition-colors">
                Daftar
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-emerald-100/40 text-sm">
          <p>&copy; 2024 Ar-Rayan Travel & Tour. Seluruh Hak Cipta Dilindungi.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
              PPIU No: 123/2020
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
              IATA Member
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
