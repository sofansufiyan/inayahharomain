
import React, { useState } from 'react';
import { BookingForm, UmrahPackage, SystemSettings } from '../types';

interface AdminDashboardProps {
  settings: SystemSettings;
  onUpdateSettings: (s: SystemSettings) => void;
  jamaahList: BookingForm[];
  packages: UmrahPackage[];
  onUpdateJamaah: (jamaah: BookingForm) => void;
  onDeleteJamaah: (id: string) => void;
  onAddPackage: (pkg: UmrahPackage) => void;
  onUpdatePackage: (pkg: UmrahPackage) => void;
  onDeletePackage: (id: string) => void;
}

type AdminTab = 'jamaah' | 'packages' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  settings,
  onUpdateSettings,
  jamaahList, 
  packages, 
  onUpdateJamaah, 
  onDeleteJamaah,
  onAddPackage,
  onUpdatePackage,
  onDeletePackage
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('jamaah');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Local Settings State for Form
  const [localSettings, setLocalSettings] = useState<SystemSettings>(settings);
  
  // Modals state
  const [selectedJamaah, setSelectedJamaah] = useState<BookingForm | null>(null);
  const [isJamaahModalOpen, setIsJamaahModalOpen] = useState(false);
  const [isJamaahDetailOpen, setIsJamaahDetailOpen] = useState(false);
  
  const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(null);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  const filteredJamaah = jamaahList.filter(j => 
    j.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    alert('Pengaturan berhasil disimpan!');
  };

  const handleEditJamaah = (j: BookingForm) => {
    setSelectedJamaah(j);
    setIsJamaahModalOpen(true);
  };

  const handleEditPackage = (p: UmrahPackage) => {
    setSelectedPackage(p);
    setIsPackageModalOpen(true);
  };

  const statusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Canceled': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 animate-fadeInUp">
        <div>
          <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-xs mb-3 block">Control Center</span>
          <h1 className="text-5xl font-serif font-bold text-emerald-950 mb-2">Konsol Manajemen</h1>
          <p className="text-slate-500 font-medium">Pengelolaan data operasional {settings.agencyName}</p>
        </div>
        
        <div className="flex bg-white/60 backdrop-blur-md p-1.5 rounded-[1.5rem] shadow-xl border border-emerald-100">
          {(['jamaah', 'packages', 'settings'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-[1.2rem] text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-emerald-900 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {tab === 'jamaah' ? 'Jamaah' : tab === 'packages' ? 'Paket' : 'Sistem'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'jamaah' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Cari Nama atau Nomor Registrasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white border border-emerald-100 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none shadow-sm text-emerald-900 font-medium"
              />
              <svg className="w-6 h-6 absolute left-5 top-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="px-10 py-5 bg-white border border-emerald-100 rounded-2xl font-bold text-emerald-800 hover:bg-emerald-50 shadow-sm flex items-center justify-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Export Manifest
            </button>
          </div>

          <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-emerald-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50/50 text-emerald-800 uppercase text-[10px] font-bold tracking-[0.2em]">
                    <th className="px-10 py-6">Data Jamaah</th>
                    <th className="px-10 py-6">Program Paket</th>
                    <th className="px-10 py-6">Status Reg</th>
                    <th className="px-10 py-6 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-50">
                  {filteredJamaah.map(j => (
                    <tr key={j.id} className="hover:bg-emerald-50/30 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="font-bold text-emerald-950 text-lg">{j.fullName}</div>
                        <div className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mt-1">ID: {j.registrationNumber} • {j.phone}</div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="text-sm font-bold text-slate-700">{packages.find(p => p.id === j.packageId)?.name || 'Paket Dihapus'}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{packages.find(p => p.id === j.packageId)?.departureDate}</div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusColor(j.registrationStatus)}`}>
                          {j.registrationStatus}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex justify-center gap-3">
                          <button onClick={() => { setSelectedJamaah(j); setIsJamaahDetailOpen(true); }} className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                          <button onClick={() => handleEditJamaah(j)} className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 hover:bg-amber-600 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                          <button onClick={() => onDeleteJamaah(j.id)} className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 hover:bg-rose-600 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredJamaah.length === 0 && (
                <div className="py-24 text-center">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🔎</div>
                  <p className="text-slate-400 font-serif italic text-xl">Tidak menemukan data jamaah.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'packages' && (
        <div className="space-y-10 animate-fadeIn">
          <div className="flex justify-between items-center">
             <h3 className="text-3xl font-serif font-bold text-emerald-950">Pengaturan Paket</h3>
             <button 
              onClick={() => { setSelectedPackage(null); setIsPackageModalOpen(true); }}
              className="px-8 py-4 bg-emerald-900 text-white rounded-2xl font-bold flex items-center shadow-xl shadow-emerald-900/20 active:scale-95"
             >
               <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
               Tambah Program
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-emerald-100 flex flex-col group">
                <div className="relative h-48 rounded-3xl overflow-hidden mb-6">
                  <img src={pkg.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                    <button onClick={() => handleEditPackage(pkg)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-950 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                    <button onClick={() => onDeletePackage(pkg.id)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-rose-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-emerald-950 mb-2">{pkg.name}</h4>
                <div className="flex justify-between items-center mt-auto pt-6 border-t border-emerald-50">
                  <span className="text-lg font-bold text-emerald-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(pkg.price)}</span>
                  <span className="text-[10px] bg-emerald-50 px-3 py-1.5 rounded-full text-emerald-700 font-bold uppercase tracking-widest">{pkg.duration} HARI</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white/90 backdrop-blur-md p-12 rounded-[3rem] shadow-2xl shadow-emerald-900/5 border border-emerald-100 animate-fadeIn max-w-5xl mx-auto">
          <div className="flex items-center mb-10 pb-6 border-b border-emerald-50">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mr-5 text-emerald-700">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h3 className="text-3xl font-serif font-bold text-emerald-950">Konfigurasi Travel</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 tracking-wide uppercase text-[10px]">Nama Travel Agency</label>
              <input type="text" name="agencyName" value={localSettings.agencyName} onChange={handleSettingsChange} className="w-full px-8 py-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-emerald-950" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 tracking-wide uppercase text-[10px]">Izin Kemenag (PPIU)</label>
              <input type="text" name="kemenagLicense" value={localSettings.kemenagLicense} onChange={handleSettingsChange} className="w-full px-8 py-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-emerald-950" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 tracking-wide uppercase text-[10px]">Email Support</label>
              <input type="email" name="supportEmail" value={localSettings.supportEmail} onChange={handleSettingsChange} className="w-full px-8 py-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-emerald-950" />
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 tracking-wide uppercase text-[10px]">WhatsApp Hotline</label>
              <input type="text" name="hotlineWhatsapp" value={localSettings.hotlineWhatsapp} onChange={handleSettingsChange} className="w-full px-8 py-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-bold text-emerald-950" />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 tracking-wide uppercase text-[10px]">Alamat Kantor</label>
              <textarea name="address" value={localSettings.address} onChange={handleSettingsChange} rows={4} className="w-full px-8 py-5 rounded-3xl bg-emerald-50/50 border border-emerald-100 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 font-medium text-emerald-950 resize-none"></textarea>
            </div>
          </div>
          
          <div className="mt-16 flex justify-end">
            <button type="submit" className="px-12 py-5 bg-emerald-900 text-white rounded-2xl font-bold shadow-2xl shadow-emerald-900/30 hover:bg-black transition-all active:scale-95 flex items-center">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Simpan Perubahan Sistem
            </button>
          </div>
        </form>
      )}

      {/* Modals for Editing/Adding would need similar visual updates */}
      {isJamaahModalOpen && selectedJamaah && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={() => setIsJamaahModalOpen(false)}></div>
          <div className="relative bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl p-12 animate-scaleIn overflow-y-auto max-h-[90vh]">
            <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-10">Update Data Jamaah</h3>
            <form onSubmit={(e) => { e.preventDefault(); onUpdateJamaah(selectedJamaah); setIsJamaahModalOpen(false); }} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Nama Lengkap Sesuai Paspor</label>
                  <input type="text" value={selectedJamaah.fullName} onChange={(e) => setSelectedJamaah({...selectedJamaah, fullName: e.target.value})} className="w-full px-8 py-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 outline-none focus:border-emerald-500 font-bold text-emerald-950" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status Registrasi</label>
                  <select value={selectedJamaah.registrationStatus} onChange={(e) => setSelectedJamaah({...selectedJamaah, registrationStatus: e.target.value as any})} className="w-full px-8 py-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 outline-none font-bold text-emerald-950 appearance-none">
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Status Bayar</label>
                  <select value={selectedJamaah.paymentStatus} onChange={(e) => setSelectedJamaah({...selectedJamaah, paymentStatus: e.target.value as any})} className="w-full px-8 py-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 outline-none font-bold text-emerald-950 appearance-none">
                    <option value="Belum Lunas">Belum Lunas</option>
                    <option value="DP">DP</option>
                    <option value="Lunas">Lunas</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-grow py-5 bg-emerald-900 text-white rounded-2xl font-bold shadow-xl shadow-emerald-900/20 active:scale-95">Update Record</button>
                <button type="button" onClick={() => setIsJamaahModalOpen(false)} className="px-12 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
