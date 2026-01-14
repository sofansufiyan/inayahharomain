
import React from 'react';
import { UmrahPackage } from '../types';

interface PackageModalProps {
  pkg: UmrahPackage;
  isOpen: boolean;
  onClose: () => void;
  onBook: () => void;
}

const PackageModal: React.FC<PackageModalProps> = ({ pkg, isOpen, onClose, onBook }) => {
  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-scaleIn">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-md transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Left Column: Image & Basic Info */}
            <div className="md:w-2/5 relative h-64 md:h-auto">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-emerald-950 to-transparent">
                <h2 className="text-2xl font-serif font-bold text-white mb-2">{pkg.name}</h2>
                <div className="text-amber-400 font-bold text-xl">{formatPrice(pkg.price)}</div>
              </div>
            </div>

            {/* Right Column: Detailed Info */}
            <div className="md:w-3/5 p-8 overflow-y-auto max-h-[90vh] md:max-h-[800px]">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600 uppercase font-bold mb-1">Durasi</p>
                  <p className="text-sm font-bold text-gray-800">{pkg.duration} Hari</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600 uppercase font-bold mb-1">Berangkat</p>
                  <p className="text-sm font-bold text-gray-800">{pkg.departureDate}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600 uppercase font-bold mb-1">Maskapai</p>
                  <p className="text-sm font-bold text-gray-800">{pkg.airline}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <p className="text-xs text-emerald-600 uppercase font-bold mb-1">Hotel Makkah</p>
                  <p className="text-sm font-bold text-gray-800">{pkg.hotelMakkah}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Sudah Termasuk (Inclusions)
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-emerald-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Belum Termasuk (Exclusions)
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={onBook}
                  className="flex-grow py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl transition-all shadow-xl shadow-emerald-700/20"
                >
                  Daftar Sekarang
                </button>
                <button 
                  className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
                >
                  Download Brosur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;
