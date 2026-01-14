
import React, { useState } from 'react';
import { BookingForm, UmrahPackage } from '../types';

interface AdminDashboardProps {
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

  const handleEditJamaah = (j: BookingForm) => {
    setSelectedJamaah(j);
    setIsJamaahModalOpen(true);
  };

  const handleEditPackage = (p: UmrahPackage) => {
    setSelectedPackage(p);
    setIsPackageModalOpen(true);
  };

  const handleAddPackageClick = () => {
    setSelectedPackage(null);
    setIsPackageModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-emerald-950 mb-2">Management Console</h1>
          <p className="text-slate-500">Control center for Ar-Rayan Travel & Tour Operations.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-lg border border-slate-100">
          {(['jamaah', 'packages', 'settings'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-emerald-950 text-white shadow-md' 
                  : 'text-slate-400 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {tab === 'jamaah' ? 'Jamaah' : tab === 'packages' ? 'Paket Umrah' : 'Settings'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'jamaah' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filters & Actions */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="Cari Nama atau Nomor Registrasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 outline-none"
              />
              <svg className="w-5 h-5 absolute left-4 top-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50">Export PDF</button>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                    <th className="px-8 py-5">Jamaah</th>
                    <th className="px-8 py-5">Paket</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredJamaah.map(j => (
                    <tr key={j.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="font-bold text-emerald-950">{j.fullName}</div>
                        <div className="text-[10px] text-slate-400 font-bold">{j.registrationNumber} • {j.phone}</div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-sm font-medium text-slate-700">{packages.find(p => p.id === j.packageId)?.name || 'Paket Dihapus'}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          j.registrationStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {j.registrationStatus}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => { setSelectedJamaah(j); setIsJamaahDetailOpen(true); }} className="p-2 bg-slate-100 rounded-xl hover:bg-emerald-100 text-slate-500 hover:text-emerald-700 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></button>
                          <button onClick={() => handleEditJamaah(j)} className="p-2 bg-slate-100 rounded-xl hover:bg-amber-100 text-slate-500 hover:text-amber-700 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                          <button onClick={() => onDeleteJamaah(j.id)} className="p-2 bg-slate-100 rounded-xl hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredJamaah.length === 0 && (
                <div className="py-20 text-center text-slate-400 font-serif italic">Tidak ada data jamaah.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'packages' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="flex justify-between items-center">
             <h3 className="text-2xl font-serif font-bold text-emerald-950">Active Packages</h3>
             <button 
              onClick={handleAddPackageClick}
              className="px-6 py-3 bg-emerald-950 text-white rounded-xl font-bold flex items-center shadow-lg shadow-emerald-950/20"
             >
               <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
               Tambah Paket Baru
             </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white p-6 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col group">
                <div className="relative h-40 rounded-2xl overflow-hidden mb-4">
                  <img src={pkg.image} className="w-full h-full object-cover" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button onClick={() => handleEditPackage(pkg)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-950 shadow-lg transform hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                    <button onClick={() => onDeletePackage(pkg.id)} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-rose-600 shadow-lg transform hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                  </div>
                </div>
                <h4 className="font-bold text-emerald-950 mb-1">{pkg.name}</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{pkg.departureDate}</p>
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-50">
                  <span className="text-sm font-bold text-emerald-700">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(pkg.price)}</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-bold">{pkg.duration} HARI</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 animate-fadeIn">
          <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-8">Travel Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Nama Travel Agency</label>
              <input type="text" defaultValue="Ar-Rayan Travel & Tour" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Izin Kemenag (PPIU)</label>
              <input type="text" defaultValue="No. 123/2020" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">Email Support</label>
              <input type="email" defaultValue="info@arrayantravel.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">WhatsApp Hotline</label>
              <input type="text" defaultValue="6281234567890" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <button className="px-10 py-4 bg-emerald-950 text-white rounded-2xl font-bold shadow-xl shadow-emerald-900/20">Simpan Pengaturan</button>
          </div>
        </div>
      )}

      {/* Jamaah Edit Modal */}
      {isJamaahModalOpen && selectedJamaah && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={() => setIsJamaahModalOpen(false)}></div>
          <div className="relative bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl p-10 animate-scaleIn overflow-y-auto max-h-[90vh]">
            <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-8">Edit Record Jamaah</h3>
            <form onSubmit={(e) => { e.preventDefault(); onUpdateJamaah(selectedJamaah); setIsJamaahModalOpen(false); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                  <input type="text" value={selectedJamaah.fullName} onChange={(e) => setSelectedJamaah({...selectedJamaah, fullName: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">WhatsApp</label>
                  <input type="text" value={selectedJamaah.phone} onChange={(e) => setSelectedJamaah({...selectedJamaah, phone: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input type="email" value={selectedJamaah.email} onChange={(e) => setSelectedJamaah({...selectedJamaah, email: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Registration Status</label>
                  <select value={selectedJamaah.registrationStatus} onChange={(e) => setSelectedJamaah({...selectedJamaah, registrationStatus: e.target.value as any})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none">
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Payment Status</label>
                  <select value={selectedJamaah.paymentStatus} onChange={(e) => setSelectedJamaah({...selectedJamaah, paymentStatus: e.target.value as any})} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none">
                    <option value="Belum Lunas">Belum Lunas</option>
                    <option value="DP">DP</option>
                    <option value="Lunas">Lunas</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-grow py-5 bg-emerald-950 text-white rounded-2xl font-bold shadow-xl">Update Jamaah</button>
                <button type="button" onClick={() => setIsJamaahModalOpen(false)} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Edit/Add Modal */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={() => setIsPackageModalOpen(false)}></div>
          <div className="relative bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl p-10 animate-scaleIn overflow-y-auto max-h-[90vh]">
            <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-8">{selectedPackage ? 'Edit Paket Umrah' : 'Tambah Paket Baru'}</h3>
            <form 
              onSubmit={(e) => { 
                e.preventDefault(); 
                if (selectedPackage && selectedPackage.id) {
                  onUpdatePackage(selectedPackage);
                } else if (selectedPackage) {
                  onAddPackage(selectedPackage);
                }
                setIsPackageModalOpen(false); 
              }} 
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Paket</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Umrah Syawal VIP"
                    value={selectedPackage?.name || ''} 
                    onChange={(e) => setSelectedPackage(prev => ({...(prev as UmrahPackage), name: e.target.value}))} 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Harga (IDR)</label>
                  <input 
                    type="number" 
                    required
                    value={selectedPackage?.price || 0} 
                    onChange={(e) => setSelectedPackage(prev => ({...(prev as UmrahPackage), price: parseInt(e.target.value)}))} 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Durasi (Hari)</label>
                  <input 
                    type="number" 
                    required
                    value={selectedPackage?.duration || 0} 
                    onChange={(e) => setSelectedPackage(prev => ({...(prev as UmrahPackage), duration: parseInt(e.target.value)}))} 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Maskapai</label>
                  <input 
                    type="text" 
                    required
                    value={selectedPackage?.airline || ''} 
                    onChange={(e) => setSelectedPackage(prev => ({...(prev as UmrahPackage), airline: e.target.value}))} 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Keberangkatan</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: 15 Januari 2025"
                    value={selectedPackage?.departureDate || ''} 
                    onChange={(e) => setSelectedPackage(prev => ({...(prev as UmrahPackage), departureDate: e.target.value}))} 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                  <input 
                    type="text" 
                    required
                    value={selectedPackage?.image || ''} 
                    onChange={(e) => setSelectedPackage(prev => ({...(prev as UmrahPackage), image: e.target.value}))} 
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none focus:border-emerald-500" 
                  />
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button type="submit" className="flex-grow py-5 bg-emerald-950 text-white rounded-2xl font-bold shadow-xl">{selectedPackage?.id ? 'Simpan Perubahan' : 'Terbitkan Paket'}</button>
                <button type="button" onClick={() => setIsPackageModalOpen(false)} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-bold">Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Jamaah Profile Detail Modal */}
      {isJamaahDetailOpen && selectedJamaah && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={() => setIsJamaahDetailOpen(false)}></div>
          <div className="relative bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl p-10 animate-scaleIn overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-3xl font-serif font-bold text-emerald-950">Jamaah Profile</h3>
              <button onClick={() => setIsJamaahDetailOpen(false)} className="p-2 bg-slate-100 rounded-xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nama Lengkap</p>
                  <p className="font-bold text-emerald-950">{selectedJamaah.fullName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nomor Registrasi</p>
                  <p className="font-bold text-emerald-950">{selectedJamaah.registrationNumber}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">WhatsApp</p>
                  <p className="font-bold text-emerald-950">{selectedJamaah.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="font-bold text-emerald-950">{selectedJamaah.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Paket</p>
                  <p className="font-bold text-emerald-950">{packages.find(p => p.id === selectedJamaah.packageId)?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Passport</p>
                  <p className="font-bold text-emerald-950">{selectedJamaah.passportStatus === 'Punya' ? selectedJamaah.passportNumber : 'Belum Ada'}</p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alamat Lengkap</p>
                <p className="text-sm text-slate-700">{selectedJamaah.address}</p>
              </div>
            </div>
            <div className="mt-10 flex gap-4">
               <button onClick={() => { setIsJamaahDetailOpen(false); handleEditJamaah(selectedJamaah); }} className="flex-grow py-5 bg-emerald-950 text-white rounded-2xl font-bold">Edit Profile</button>
               <button onClick={() => window.print()} className="px-10 py-5 bg-slate-100 rounded-2xl font-bold flex items-center"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>Print Summary</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
