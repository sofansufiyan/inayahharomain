
import React from 'react';
import { SystemSettings } from '../types';

interface HeroProps {
  settings: SystemSettings;
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ settings, onExplore }) => {
  return (
    <section className="relative h-[95vh] flex items-center overflow-hidden rounded-b-[4rem] shadow-2xl">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[3s] hover:scale-110"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/70 to-transparent"></div>
        <div className="absolute inset-0 bg-emerald-900/10 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-4xl animate-fadeInUp">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-10 shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mr-3 animate-pulse"></span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-50">Izin Resmi Kemenag {settings.kemenagLicense}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-8 drop-shadow-2xl">
            Mulai Perjalanan <br />
            <span className="text-amber-500 italic">Ibadah Mulia</span> Anda
          </h1>
          
          <p className="text-xl md:text-2xl text-emerald-50/90 mb-12 leading-relaxed max-w-2xl font-medium">
            {settings.agencyName} menghadirkan pengalaman spiritual yang mendalam dengan layanan eksklusif dan bimbingan yang tulus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              onClick={onExplore}
              className="px-10 py-6 bg-amber-500 hover:bg-amber-600 text-emerald-950 rounded-[1.5rem] font-bold text-xl shadow-2xl shadow-amber-500/40 transition-all transform hover:-translate-y-2 active:scale-95"
            >
              Jelajahi Paket Berkah
            </button>
            <div className="flex items-center gap-4 px-6">
               <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-md">
                  <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
               </div>
               <div>
                  <p className="font-bold text-xl leading-none">12K+</p>
                  <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Jamaah Terlayani</p>
               </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Mint Element */}
      <div className="absolute bottom-10 right-10 hidden lg:block animate-fadeIn">
        <div className="w-64 h-64 border border-white/10 rounded-full flex items-center justify-center">
           <div className="w-48 h-48 border border-white/5 rounded-full flex items-center justify-center animate-spin duration-[20s] linear infinite">
              <div className="w-2 h-2 bg-amber-500 rounded-full absolute -top-1"></div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
