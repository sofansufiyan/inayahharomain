
import React from 'react';
import { Page, SystemSettings } from '../types';

interface FooterProps {
  settings: SystemSettings;
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center mr-3">
                <span className="text-xl font-bold text-emerald-950">{settings.agencyName[0]}</span>
              </div>
              <span className="text-2xl font-serif font-bold">
                {settings.agencyName.split(' ')[0]} <span className="text-amber-500">{settings.agencyName.split(' ').slice(1).join(' ')}</span>
              </span>
            </div>
            <p className="text-emerald-100/60 leading-relaxed">
              Penyelenggara Perjalanan Ibadah Umrah (PPIU) resmi yang mengutamakan kekhusyukan dan kenyamanan jamaah.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Tautan Cepat</h4>
            <ul className="space-y-4">
              {['Beranda', 'Paket Umrah', 'Pendaftaran'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      if (item === 'Beranda') onNavigate('home');
                      if (item === 'Paket Umrah') onNavigate('packages');
                      if (item === 'Pendaftaran') onNavigate('registration');
                    }}
                    className="text-emerald-100/60 hover:text-white hover:translate-x-1 transition-all flex items-center"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                <span className="text-emerald-100/60">{settings.address}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className="text-emerald-100/60">{settings.hotlineWhatsapp}</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="text-emerald-100/60">{settings.supportEmail}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-amber-500">Izin Resmi</h4>
            <p className="text-emerald-100/60 mb-2 text-sm">PPIU: {settings.kemenagLicense}</p>
            <div className="mt-4 flex space-x-2">
              <div className="px-3 py-1 bg-white/10 rounded text-[10px] font-bold">IATA Member</div>
              <div className="px-3 py-1 bg-white/10 rounded text-[10px] font-bold">HIMPUH</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-emerald-100/40 text-sm">
          <p>&copy; 2024 {settings.agencyName}. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
