
import React from 'react';
import { UmrahPackage, SystemSettings } from '../types';

interface PackageCardProps {
  pkg: UmrahPackage;
  settings: SystemSettings;
  onBookNow: () => void;
  onPreview: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, settings, onBookNow, onPreview }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Halo ${settings.agencyName}, saya tertarik dengan paket *${pkg.name}* (${pkg.departureDate}). Mohon informasi pendaftarannya.`);
    window.open(`https://wa.me/${settings.hotlineWhatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-emerald-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2">
      {/* Image Header */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={pkg.image} 
          alt={pkg.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-emerald-700/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
            {pkg.duration} Hari
          </div>
          {pkg.isPopular && (
            <div className="bg-amber-500 text-emerald-950 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              Terlaris
            </div>
          )}
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-emerald-50 text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Jadwal Keberangkatan</p>
          <p className="text-white text-lg font-serif font-bold">{pkg.departureDate}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">
          {pkg.name}
        </h3>
        
        <div className="flex items-baseline text-emerald-700 font-bold mb-6">
          <span className="text-3xl font-serif">{formatPrice(pkg.price)}</span>
          <span className="text-xs text-slate-400 font-normal ml-2">/ orang</span>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="flex items-center text-sm text-slate-600 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/30">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-emerald-700">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-7h.01M9 16h.01"></path></svg>
            </div>
            <span className="font-medium">{pkg.airline}</span>
          </div>
          <div className="flex items-center text-sm text-slate-600 bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/30">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-emerald-700">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <span className="truncate font-medium">{pkg.hotelMakkah}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex flex-col gap-3">
          <button 
            onClick={onBookNow}
            className="w-full py-4 bg-emerald-900 hover:bg-black text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
          >
            Booking Sekarang
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onPreview}
              className="py-3 px-2 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-bold rounded-xl transition-all text-[11px] uppercase tracking-widest flex items-center justify-center"
            >
              Lihat Detail
            </button>
            <button 
              onClick={handleWhatsApp}
              className="py-3 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl transition-all text-[11px] uppercase tracking-widest flex items-center justify-center border border-emerald-100"
            >
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
