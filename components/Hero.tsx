
import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=1920&q=80)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 to-emerald-900/40"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl animate-fadeInUp">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 mr-2 animate-pulse"></span>
            <span className="text-sm font-medium tracking-wide uppercase">Travel Umrah Berizin Resmi PPIU</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            Penuhi Panggilan-Nya dengan <span className="text-amber-500">Kenyamanan & Khidmat</span>
          </h1>
          
          <p className="text-lg md:text-xl text-emerald-50/80 mb-10 leading-relaxed max-w-2xl">
            Ar-Rayan Travel mendampingi perjalanan ibadah Anda menuju Baitullah dengan pelayanan prima, bimbingan sesuai sunnah, dan akomodasi bintang lima.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onExplore}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-emerald-950 rounded-xl font-bold text-lg shadow-lg shadow-amber-500/30 transition-all transform hover:-translate-y-1"
            >
              Lihat Paket Umrah
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl font-bold text-lg transition-all flex items-center justify-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              Tonton Video Manasik
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm border-t border-white/10 py-6 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 divide-x divide-white/20">
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">10k+</p>
              <p className="text-sm text-emerald-100/60 uppercase tracking-widest">Jamaah Terangkat</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">99%</p>
              <p className="text-sm text-emerald-100/60 uppercase tracking-widest">Tingkat Kepuasan</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">12+</p>
              <p className="text-sm text-emerald-100/60 uppercase tracking-widest">Tahun Pengalaman</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-amber-500">Official</p>
              <p className="text-sm text-emerald-100/60 uppercase tracking-widest">IATA & PPIU Certified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
