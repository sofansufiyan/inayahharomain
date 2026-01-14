
import React, { useState } from 'react';
import { BookingForm, PaymentRecord, UmrahPackage } from '../types';
import { UMRAH_PACKAGES } from '../constants';

interface ReportsDashboardProps {
  jamaahList: BookingForm[];
  payments: PaymentRecord[];
}

const ReportsDashboard: React.FC<ReportsDashboardProps> = ({ jamaahList, payments }) => {
  const [reportType, setReportType] = useState<'jamaah' | 'payment' | 'finance'>('jamaah');

  const confirmedPayments = payments.filter(p => p.status === 'Diterima');
  const totalRevenue = confirmedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalReceivables = jamaahList.reduce((sum, j) => {
    const pkg = UMRAH_PACKAGES.find(p => p.id === j.packageId);
    const total = (pkg?.price || 0) * j.numberOfPersons;
    const paid = payments.filter(p => p.jamaahId === j.id && p.status === 'Diterima').reduce((s, p) => s + p.amount, 0);
    return sum + (total - paid);
  }, 0);

  const packageStats = UMRAH_PACKAGES.map(pkg => ({
    name: pkg.name,
    count: jamaahList.filter(j => j.packageId === pkg.id).length
  }));

  const formatCurrency = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-emerald-950 mb-2">Analisa Operasional</h1>
          <p className="text-slate-500 font-medium">Laporan terpusat untuk monitoring performa bisnis.</p>
        </div>
        <div className="flex bg-white rounded-[2rem] p-1.5 shadow-2xl shadow-slate-200/50 border border-slate-100">
          {(['jamaah', 'payment', 'finance'] as const).map((type) => (
            <button 
              key={type}
              onClick={() => setReportType(type)}
              className={`px-8 py-3.5 rounded-[1.5rem] text-xs font-bold transition-all uppercase tracking-widest ${reportType === type ? 'bg-emerald-950 text-white shadow-lg' : 'text-slate-400 hover:text-emerald-700 hover:bg-emerald-50'}`}
            >
              {type === 'jamaah' ? 'Peserta' : type === 'payment' ? 'Transaksi' : 'Keuangan'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
        {/* Main Stats Card */}
        <div className="md:col-span-4 bg-emerald-950 text-white p-12 rounded-[3rem] shadow-2xl shadow-emerald-900/30 flex flex-col justify-center">
          <p className="text-emerald-300 text-xs uppercase font-bold tracking-[0.3em] mb-4">Omzet Bruto (Verified)</p>
          <p className="text-5xl font-serif font-bold mb-8 leading-tight">{formatCurrency(totalRevenue)}</p>
          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
            <div>
              <p className="text-[10px] text-emerald-300/60 uppercase font-bold mb-1">Jama'ah Aktif</p>
              <p className="text-2xl font-bold">{jamaahList.length}</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-300/60 uppercase font-bold mb-1">Paket Laris</p>
              <p className="text-sm font-bold truncate">{packageStats.sort((a,b) => b.count - a.count)[0]?.name}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Charts (Mock) */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/30 border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10 border-b pb-4">Distribusi Paket</h4>
              <div className="space-y-6">
                {packageStats.map(stat => (
                  <div key={stat.name}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-700 truncate w-32">{stat.name}</span>
                      <span className="text-emerald-600">{stat.count} Jama'ah</span>
                    </div>
                    <div className="w-full bg-slate-50 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${(stat.count / Math.max(...packageStats.map(s => s.count), 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/30 border border-slate-100">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10 border-b pb-4">Piutang Dagang</h4>
              <div className="text-center py-4">
                 <p className="text-xs font-bold text-slate-400 mb-2 uppercase">Total Sisa Tagihan</p>
                 <p className="text-3xl font-serif font-bold text-amber-600">{formatCurrency(totalReceivables)}</p>
                 <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                       <span className="block text-2xl font-bold text-emerald-950">{jamaahList.filter(j => j.paymentStatus === 'Lunas').length}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Lunas</span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl">
                       <span className="block text-2xl font-bold text-amber-500">{jamaahList.filter(j => j.paymentStatus !== 'Lunas').length}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">Hutang</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fadeIn">
        <div className="px-12 py-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-2xl font-serif font-bold text-emerald-950">
            {reportType === 'jamaah' ? 'Daftar Manifest Jamaah' : reportType === 'payment' ? 'Riwayat Kas Keluar-Masuk' : 'Proyeksi Laba Rugi'}
          </h3>
          <button onClick={() => window.print()} className="px-8 py-3.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-2xl hover:bg-emerald-950 hover:text-white transition-all uppercase tracking-widest flex items-center shadow-sm">
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Unduh Laporan PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          {reportType === 'jamaah' && (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                  <th className="px-12 py-6">Jamaah & ID</th>
                  <th className="px-12 py-6">Paket Perjalanan</th>
                  <th className="px-12 py-6">Kelengkapan</th>
                  <th className="px-12 py-6">Status Reg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {jamaahList.map(j => (
                  <tr key={j.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-12 py-6">
                      <div className="font-bold text-emerald-950 text-base">{j.fullName}</div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-tighter mt-1">{j.registrationNumber}</div>
                    </td>
                    <td className="px-12 py-6">
                      <div className="text-sm font-bold text-slate-700">{UMRAH_PACKAGES.find(p => p.id === j.packageId)?.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{UMRAH_PACKAGES.find(p => p.id === j.packageId)?.departureDate}</div>
                    </td>
                    <td className="px-12 py-6">
                      <div className="flex space-x-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${j.passportStatus === 'Punya' ? 'bg-emerald-400' : 'bg-rose-400'}`} title="Paspor"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="KTP"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" title="KK"></div>
                      </div>
                    </td>
                    <td className="px-12 py-6">
                       <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{j.registrationStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'payment' && (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                  <th className="px-12 py-6">Pendaftar</th>
                  <th className="px-12 py-6">Nominal Jurnal</th>
                  <th className="px-12 py-6">Tanggal Posting</th>
                  <th className="px-12 py-6">Status Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {confirmedPayments.map(p => {
                  const j = jamaahList.find(jam => jam.id === p.jamaahId);
                  return (
                    <tr key={p.id}>
                      <td className="px-12 py-6 font-bold text-emerald-950 text-base">{j?.fullName}</td>
                      <td className="px-12 py-6 text-emerald-600 font-bold text-lg">{formatCurrency(p.amount)}</td>
                      <td className="px-12 py-6 text-slate-500 font-medium">{p.date}</td>
                      <td className="px-12 py-6">
                        <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest">TERVALIDASI</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {reportType === 'finance' && (
            <div className="p-24 text-center">
              <div className="w-32 h-32 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-5xl">📊</div>
              <h4 className="text-3xl font-serif font-bold text-emerald-950 mb-4">Laporan Keuangan Strategis</h4>
              <p className="text-slate-500 max-w-lg mx-auto leading-relaxed text-lg">Halaman ini memuat visualisasi real-time perbandingan Cash-in vs Cash-out, margin laba kotor per kloter, serta proyeksi pertumbuhan tahunan.</p>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="text-left p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mb-4">Piutang Belum Terbayar</p>
                  <p className="text-4xl font-serif font-bold text-amber-600 leading-tight">{formatCurrency(totalReceivables)}</p>
                </div>
                <div className="text-left p-10 bg-emerald-950 text-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/20">
                  <p className="text-[10px] text-emerald-300/60 uppercase font-bold tracking-[0.2em] mb-4">Kas Bersih Verified</p>
                  <p className="text-4xl font-serif font-bold leading-tight">{formatCurrency(totalRevenue)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;
