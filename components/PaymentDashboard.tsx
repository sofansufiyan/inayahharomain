
import React, { useState } from 'react';
import { BookingForm, PaymentRecord, UmrahPackage } from '../types';
import { UMRAH_PACKAGES } from '../constants';

interface PaymentDashboardProps {
  jamaahList: BookingForm[];
  payments: PaymentRecord[];
  onAddPayment: (p: PaymentRecord) => void;
  onUpdatePayment: (p: PaymentRecord) => void;
}

const PaymentDashboard: React.FC<PaymentDashboardProps> = ({ jamaahList, payments, onAddPayment, onUpdatePayment }) => {
  const [selectedJamaahId, setSelectedJamaahId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState<Partial<PaymentRecord>>({
    method: 'Transfer Bank',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const selectedJamaah = jamaahList.find(j => j.id === selectedJamaahId);
  const selectedPackage = selectedJamaah ? UMRAH_PACKAGES.find(p => p.id === selectedJamaah.packageId) : null;
  
  const totalBill = selectedPackage ? selectedPackage.price * selectedJamaah!.numberOfPersons : 0;
  const jamaahPayments = payments.filter(p => p.jamaahId === selectedJamaahId && p.status === 'Diterima');
  const totalPaid = jamaahPayments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = totalBill - totalPaid;

  const formatCurrency = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJamaahId && paymentForm.amount) {
      onAddPayment({
        ...paymentForm,
        jamaahId: selectedJamaahId,
        status: 'Menunggu Verifikasi'
      } as PaymentRecord);
      setIsModalOpen(false);
      setPaymentForm({ method: 'Transfer Bank', amount: 0, date: new Date().toISOString().split('T')[0], notes: '' });
    }
  };

  const handleVerify = (p: PaymentRecord, status: 'Diterima' | 'Ditolak') => {
    onUpdatePayment({ ...p, status });
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold text-emerald-950 mb-2">Kasir & Pembayaran</h1>
        <p className="text-slate-500 font-medium">Verifikasi dokumen keuangan dan monitor cicilan jama'ah.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Billing Column */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 border border-slate-100 sticky top-28">
            <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-10">Informasi Tagihan</h3>
            
            <div className="mb-10">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Pilih Data Jamaah</label>
              <select 
                value={selectedJamaahId} 
                onChange={(e) => setSelectedJamaahId(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none appearance-none font-bold text-emerald-950 pr-12 bg-no-repeat bg-[right_1.5rem_center]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23064e3b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundSize: '1.2em' }}
              >
                <option value="">-- Cari Jamaah --</option>
                {jamaahList.map(j => (
                  <option key={j.id} value={j.id}>{j.fullName} ({j.registrationNumber})</option>
                ))}
              </select>
            </div>

            {selectedJamaah ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 bg-emerald-950 text-white rounded-3xl shadow-xl shadow-emerald-900/20">
                  <p className="text-[10px] text-emerald-300 font-bold uppercase tracking-[0.2em] mb-2">Estimasi Tagihan Total</p>
                  <p className="text-3xl font-bold font-serif">{formatCurrency(totalBill)}</p>
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-emerald-100/60 font-medium">
                    {selectedPackage?.name} x {selectedJamaah.numberOfPersons} Orang
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Masuk</span>
                      <span className="text-sm font-bold text-emerald-600">{formatCurrency(totalPaid)}</span>
                   </div>
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Status</span>
                      <span className={`text-xs font-bold ${selectedJamaah.paymentStatus === 'Lunas' ? 'text-blue-600' : 'text-amber-600'}`}>
                        {selectedJamaah.paymentStatus}
                      </span>
                   </div>
                </div>

                <div className="p-6 bg-amber-500/10 rounded-3xl border border-amber-500/20 flex justify-between items-center">
                  <span className="text-amber-800 font-bold uppercase text-[10px] tracking-widest">Sisa Piutang:</span>
                  <span className="text-xl font-bold text-amber-600">{formatCurrency(remaining)}</span>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-5 bg-emerald-950 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                  Catat Bayar
                </button>
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">📭</div>
                <p className="text-slate-400 font-serif italic text-lg">Silahkan pilih data jamaah untuk mengelola tagihan.</p>
              </div>
            )}
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-8 space-y-10">
          {/* Pending Verification */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fadeIn">
            <div className="bg-amber-500 px-10 py-5 flex justify-between items-center">
              <h3 className="font-bold text-emerald-950 flex items-center text-lg">
                <span className="mr-3">⌛</span>
                Konfirmasi Transfer Jamaah
              </h3>
              <span className="bg-white/30 text-emerald-950 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                {payments.filter(p => p.status === 'Menunggu Verifikasi').length} Menunggu
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {payments.filter(p => p.status === 'Menunggu Verifikasi').length > 0 ? (
                payments.filter(p => p.status === 'Menunggu Verifikasi').map(p => {
                  const j = jamaahList.find(jam => jam.id === p.jamaahId);
                  return (
                    <div key={p.id} className="p-8 flex flex-col md:flex-row justify-between items-center gap-8 hover:bg-slate-50/50 transition-all">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl">📄</div>
                         <div>
                            <div className="text-lg font-bold text-emerald-950">{j?.fullName}</div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{p.date} • {p.method}</div>
                            <div className="mt-2 text-2xl font-bold text-emerald-700">{formatCurrency(p.amount)}</div>
                         </div>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleVerify(p, 'Ditolak')}
                          className="px-6 py-4 border border-rose-200 text-rose-600 font-bold text-xs rounded-2xl hover:bg-rose-50 transition-all uppercase tracking-widest"
                        >
                          Tolak
                        </button>
                        <button 
                          onClick={() => handleVerify(p, 'Diterima')}
                          className="px-8 py-4 bg-emerald-950 text-white font-bold text-xs rounded-2xl hover:bg-black transition-all shadow-xl shadow-emerald-900/20 uppercase tracking-widest"
                        >
                          Verifikasi
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center text-slate-300 italic font-serif text-lg">Tidak ada antrian verifikasi pembayaran.</div>
              )}
            </div>
          </div>

          {/* All History Table */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-serif font-bold text-2xl text-emerald-950">Jurnal Keuangan</h3>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Semua Transaksi</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                    <th className="px-10 py-5">Jamaah</th>
                    <th className="px-10 py-5">Nominal</th>
                    <th className="px-10 py-5">Metode</th>
                    <th className="px-10 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.filter(p => p.status !== 'Menunggu Verifikasi').map(p => {
                    const j = jamaahList.find(jam => jam.id === p.jamaahId);
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-10 py-5 font-bold text-emerald-950">{j?.fullName}</td>
                        <td className="px-10 py-5 font-bold text-emerald-700">{formatCurrency(p.amount)}</td>
                        <td className="px-10 py-5 text-slate-500 font-medium">{p.method}</td>
                        <td className="px-10 py-5">
                          <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block ${p.status === 'Diterima' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {payments.filter(p => p.status !== 'Menunggu Verifikasi').length === 0 && (
                <div className="py-20 text-center text-slate-300 italic font-serif">Belum ada riwayat transaksi.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <form onSubmit={handleSubmit} className="relative bg-white rounded-[3rem] w-full max-w-lg shadow-[0_50px_100px_rgba(0,0,0,0.1)] p-12 animate-scaleIn border border-slate-100">
            <h3 className="text-3xl font-serif font-bold text-emerald-950 mb-8">Pencatatan Bayar</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Nominal Pembayaran (IDR)</label>
                <input 
                  type="number" 
                  required 
                  value={paymentForm.amount} 
                  onChange={(e) => setPaymentForm({...paymentForm, amount: parseInt(e.target.value)})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none text-xl font-bold text-emerald-700" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Metode</label>
                  <select 
                    value={paymentForm.method}
                    onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value as any})}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 appearance-none font-bold"
                  >
                    <option>Transfer Bank</option>
                    <option>DP</option>
                    <option>Cicilan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal</label>
                  <input 
                    type="date" 
                    value={paymentForm.date}
                    onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 font-bold" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Catatan Tambahan</label>
                <input 
                  type="text" 
                  value={paymentForm.notes} 
                  onChange={(e) => setPaymentForm({...paymentForm, notes: e.target.value})}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 outline-none" 
                  placeholder="Misal: Cicilan ke-2"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Bukti Transfer (JPG/PNG)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center text-slate-400 text-sm hover:bg-slate-50 transition-all cursor-pointer">
                  Klik untuk pilih file...
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-12">
              <button type="submit" className="flex-grow py-5 bg-emerald-950 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-emerald-900/20">Simpan Jurnal</button>
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-10 py-5 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all">Batal</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentDashboard;
