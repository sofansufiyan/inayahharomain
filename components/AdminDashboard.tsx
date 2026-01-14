
import React, { useState } from 'react';
import { BookingForm, UmrahPackage } from '../types';
import { UMRAH_PACKAGES } from '../constants';

interface AdminDashboardProps {
  jamaahList: BookingForm[];
  onUpdate: (jamaah: BookingForm) => void;
  onDelete: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ jamaahList, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPackage, setFilterPackage] = useState('');
  const [selectedJamaah, setSelectedJamaah] = useState<BookingForm | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredList = jamaahList.filter(j => 
    (j.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     j.registrationNumber?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterPackage === '' || j.packageId === filterPackage)
  );

  const stats = {
    total: jamaahList.length,
    confirmed: jamaahList.filter(j => j.registrationStatus === 'Confirmed').length,
    pending: jamaahList.filter(j => j.registrationStatus === 'Pending').length,
    lunas: jamaahList.filter(j => j.paymentStatus === 'Lunas').length,
  };

  const handleEdit = (j: BookingForm) => {
    setSelectedJamaah(j);
    setIsEditModalOpen(true);
  };

  const handleView = (j: BookingForm) => {
    setSelectedJamaah(j);
    setIsDetailModalOpen(true);
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJamaah) {
      onUpdate(selectedJamaah);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-emerald-950 mb-2">Manajemen Jamaah</h1>
          <p className="text-slate-500 font-medium">Panel Administrator Resmi Ar-Rayan Travel</p>
        </div>
        <div className="flex bg-white p-2 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
           <div className="px-6 py-2 border-r border-slate-100 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Total</span>
              <span className="text-2xl font-bold text-emerald-950">{stats.total}</span>
           </div>
           <div className="px-6 py-2 text-center">
              <span className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5">Lunas</span>
              <span className="text-2xl font-bold text-emerald-600">{stats.lunas}</span>
           </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 mb-10 flex flex-col md:flex-row gap-6">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Cari Nama atau Nomor Registrasi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium"
          />
          <svg className="w-6 h-6 absolute left-5 top-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <select 
          value={filterPackage}
          onChange={(e) => setFilterPackage(e.target.value)}
          className="px-8 py-5 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none appearance-none font-bold text-emerald-900 pr-12 bg-no-repeat bg-[right_1.5rem_center]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23064e3b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1.2em' }}
        >
          <option value="">Semua Paket Umrah</option>
          {UMRAH_PACKAGES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      {/* Modern Table Card */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fadeIn">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-emerald-950 text-white uppercase text-[10px] font-bold tracking-[0.2em]">
                <th className="px-8 py-6">ID & Pendaftar</th>
                <th className="px-8 py-6">Pilihan Paket</th>
                <th className="px-8 py-6">Paspor</th>
                <th className="px-8 py-6">Status Reg</th>
                <th className="px-8 py-6">Keuangan</th>
                <th className="px-8 py-6 text-center">Menu Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map(j => (
                <tr key={j.id} className="hover:bg-slate-50/80 transition-all duration-300">
                  <td className="px-8 py-6">
                    <div className="text-xs font-bold text-slate-400 mb-1">{j.registrationNumber}</div>
                    <div className="font-bold text-emerald-950 text-lg">{j.fullName}</div>
                    <div className="text-xs text-slate-500 font-medium">{j.phone}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-700">{UMRAH_PACKAGES.find(p => p.id === j.packageId)?.name}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold mt-1">Berangkat: {UMRAH_PACKAGES.find(p => p.id === j.packageId)?.departureDate}</div>
                  </td>
                  <td className="px-8 py-6">
                    {j.passportStatus === 'Punya' ? (
                      <span className="flex items-center text-emerald-600 font-bold text-sm">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                        {j.passportNumber}
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-500 font-bold text-sm">
                        <div className="w-2 h-2 rounded-full bg-amber-400 mr-2"></div>
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block ${
                      j.registrationStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                      j.registrationStatus === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {j.registrationStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block ${
                      j.paymentStatus === 'Lunas' ? 'bg-blue-100 text-blue-700' :
                      j.paymentStatus === 'DP' ? 'bg-violet-100 text-violet-700' :
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {j.paymentStatus}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center items-center gap-2">
                       <button onClick={() => handleView(j)} className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-emerald-100 hover:text-emerald-700 transition-all shadow-sm">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                       </button>
                       <button onClick={() => handleEdit(j)} className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-amber-100 hover:text-amber-700 transition-all shadow-sm">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                       </button>
                       <button onClick={() => onDelete(j.id)} className="p-3 bg-slate-100 text-slate-500 rounded-2xl hover:bg-rose-100 hover:text-rose-700 transition-all shadow-sm">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredList.length === 0 && (
            <div className="py-32 text-center">
              <span className="text-5xl block mb-6">🔍</span>
              <p className="text-slate-400 font-serif italic text-xl">Tidak ada data jamaah yang ditemukan.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedJamaah && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={() => setIsDetailModalOpen(false)}></div>
          <div className="relative bg-white rounded-[3rem] w-full max-w-2xl shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-12 overflow-y-auto max-h-[90vh] animate-scaleIn border border-slate-100">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-1">Profil Jama'ah</h3>
                <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">ID: {selectedJamaah.registrationNumber}</p>
              </div>
              <button onClick={() => setIsDetailModalOpen(false)} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="space-y-12">
               {/* Data Section */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] uppercase font-bold text-emerald-600 tracking-[0.2em] border-b border-emerald-50 pb-2">I. Data Diri</h4>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">NAMA LENGKAP</span><span className="font-bold text-slate-800">{selectedJamaah.fullName}</span></div>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">TTL</span><span className="font-bold text-slate-800">{selectedJamaah.placeOfBirth}, {selectedJamaah.dateOfBirth} ({selectedJamaah.age} Thn)</span></div>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">WHATSAPP</span><span className="font-bold text-slate-800">{selectedJamaah.phone}</span></div>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">EMAIL</span><span className="font-bold text-slate-800">{selectedJamaah.email}</span></div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] uppercase font-bold text-emerald-600 tracking-[0.2em] border-b border-emerald-50 pb-2">II. Perjalanan</h4>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">PAKET TERPILIH</span><span className="font-bold text-slate-800">{UMRAH_PACKAGES.find(p => p.id === selectedJamaah.packageId)?.name}</span></div>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">STATUS REG</span><span className="font-bold text-slate-800">{selectedJamaah.registrationStatus}</span></div>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">PASPOR</span><span className="font-bold text-slate-800">{selectedJamaah.passportStatus === 'Punya' ? selectedJamaah.passportNumber : 'Masih Proses'}</span></div>
                    <div className="flex flex-col"><span className="text-[10px] text-slate-400 font-bold mb-0.5">KEUANGAN</span><span className="font-bold text-emerald-600">{selectedJamaah.paymentStatus}</span></div>
                  </div>
                  <div className="md:col-span-2 space-y-6">
                    <h4 className="text-[10px] uppercase font-bold text-emerald-600 tracking-[0.2em] border-b border-emerald-50 pb-2">III. Alamat & Catatan</h4>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <p className="text-sm font-medium text-slate-700 leading-relaxed">{selectedJamaah.address}</p>
                    </div>
                    {selectedJamaah.notes && (
                       <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100">
                         <p className="text-sm font-bold text-amber-800 italic">" {selectedJamaah.notes} "</p>
                       </div>
                    )}
                  </div>
               </div>

               <div className="pt-10 flex gap-4">
                  <button onClick={() => window.print()} className="flex-grow py-5 bg-emerald-950 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-emerald-950/20 flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    Cetak Kartu Jama'ah
                  </button>
                  <button onClick={() => window.open(`https://wa.me/${selectedJamaah.phone}`, '_blank')} className="px-8 py-5 bg-amber-500 text-emerald-950 font-bold rounded-2xl hover:bg-amber-600 transition-all flex items-center justify-center shadow-xl shadow-amber-500/20">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Hubungi
                </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
