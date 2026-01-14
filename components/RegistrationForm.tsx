
import React, { useState, useEffect, useRef } from 'react';
import { UmrahPackage, BookingForm } from '../types';
import { UMRAH_PACKAGES } from '../constants';

interface RegistrationFormProps {
  initialPackage: UmrahPackage | null;
  onSuccess: (data: BookingForm) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ initialPackage, onSuccess }) => {
  const [formData, setFormData] = useState<BookingForm>({
    id: '',
    fullName: '',
    phone: '',
    email: '',
    packageId: initialPackage?.id || UMRAH_PACKAGES[0].id,
    numberOfPersons: 1,
    notes: '',
    relationship: 'Kepala Keluarga',
    placeOfBirth: '',
    dateOfBirth: '',
    age: 0,
    address: '',
    passportStatus: 'Belum',
    passportNumber: '',
    registrationDate: new Date().toISOString(),
    registrationStatus: 'Pending',
    paymentStatus: 'Belum Lunas'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Auto-calculate age
  useEffect(() => {
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData(prev => ({ ...prev, age: age > 0 ? age : 0 }));
    }
  }, [formData.dateOfBirth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfPersons' || name === 'age' ? parseInt(value) : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const fileName = files[0].name;
      setFormData(prev => ({ ...prev, [name]: fileName }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and generation of registration number
    setTimeout(() => {
      const regNum = `REG-${Math.floor(100000 + Math.random() * 900000)}`;
      setFormData(prev => ({ ...prev, registrationNumber: regNum }));
      setIsSubmitting(false);
      setShowSummary(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (showSummary) {
    const selectedPkg = UMRAH_PACKAGES.find(p => p.id === formData.packageId);
    return (
      <div className="container mx-auto px-4 py-10">
        <div ref={printRef} className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-3xl shadow-2xl border border-gray-100 print:shadow-none print:border-none print:p-0 animate-scaleIn">
          {/* Header Surat */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b-2 border-emerald-900 pb-8">
            <div className="flex items-center">
               <div className="w-16 h-16 bg-emerald-900 rounded-2xl flex items-center justify-center mr-4">
                 <span className="text-3xl font-bold text-white">A</span>
               </div>
               <div>
                  <h2 className="text-3xl font-serif font-bold text-emerald-900 uppercase tracking-tighter">Ar-Rayan Travel</h2>
                  <p className="text-xs text-gray-500 uppercase font-bold">Izin Kemenag PPIU No. 123/2020</p>
               </div>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <div className="bg-emerald-900 px-4 py-2 rounded-lg text-white font-bold mb-1">
                NOMOR REGISTRASI: {formData.registrationNumber}
              </div>
              <p className="text-sm text-gray-500">Dicetak pada: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-center mb-10 text-emerald-950 uppercase underline decoration-emerald-500 decoration-4 underline-offset-8">Formulir Pendaftaran Jama'ah</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {/* Section 1: Data Paket */}
            <section className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-emerald-800 font-bold uppercase text-xs tracking-widest mb-6 border-b border-emerald-200 pb-2">I. Paket Perjalanan</h4>
              <div className="space-y-4 text-sm">
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">Nama Paket:</span> <span className="font-bold text-emerald-950">{selectedPkg?.name}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">Estimasi Berangkat:</span> <span className="font-bold text-emerald-950">{selectedPkg?.departureDate}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">Jumlah Jama'ah:</span> <span className="font-bold text-emerald-950">{formData.numberOfPersons} Orang</span></div>
              </div>
            </section>

            {/* Section 2: Data Identitas */}
            <section className="bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-emerald-800 font-bold uppercase text-xs tracking-widest mb-6 border-b border-emerald-200 pb-2">II. Identitas Diri</h4>
              <div className="space-y-4 text-sm">
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">Nama Lengkap:</span> <span className="font-bold text-emerald-950">{formData.fullName}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">TTL / Umur:</span> <span className="font-bold text-emerald-950">{formData.placeOfBirth}, {formData.dateOfBirth} / {formData.age} Thn</span></div>
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">Hubungan (Mahram):</span> <span className="font-bold text-emerald-950">{formData.relationship}</span></div>
              </div>
            </section>

            <section className="md:col-span-2 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
              <h4 className="text-emerald-800 font-bold uppercase text-xs tracking-widest mb-6 border-b border-emerald-200 pb-2">III. Kontak & Dokumen</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">Nomor WhatsApp:</span> <span className="font-bold text-emerald-950">{formData.phone}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">Email:</span> <span className="font-bold text-emerald-950">{formData.email}</span></div>
                <div className="flex flex-col"><span className="text-gray-400 text-[10px] uppercase font-bold">No. Paspor:</span> <span className="font-bold text-emerald-950">{formData.passportStatus === 'Punya' ? formData.passportNumber : 'Masih dalam proses'}</span></div>
                <div className="md:col-span-2 pt-2">
                  <span className="text-gray-400 text-[10px] uppercase font-bold block mb-1">Alamat Domisili:</span>
                  <p className="font-medium text-emerald-950">{formData.address}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-20 flex justify-between items-end gap-10">
            <div className="text-center w-full">
              <p className="text-[10px] text-gray-400 mb-24 uppercase font-bold tracking-widest">Petugas Pendaftaran</p>
              <div className="w-full border-b-2 border-emerald-950 mb-2"></div>
              <p className="font-bold text-xs uppercase">Ar-Rayan Travel Admin</p>
            </div>
            <div className="text-center w-full">
              <p className="text-[10px] text-gray-400 mb-24 uppercase font-bold tracking-widest">Jama'ah Ybs</p>
              <div className="w-full border-b-2 border-emerald-950 mb-2"></div>
              <p className="font-bold text-xs uppercase">{formData.fullName}</p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-dashed border-gray-300 flex flex-col md:flex-row gap-4 no-print">
            <button 
              onClick={handlePrint}
              className="flex-grow py-5 bg-emerald-900 text-white font-bold rounded-2xl hover:bg-emerald-950 transition-all flex items-center justify-center shadow-xl shadow-emerald-900/20"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
              Cetak & Simpan Formulir
            </button>
            <button 
              onClick={() => onSuccess(formData)}
              className="px-10 py-5 bg-amber-500 text-emerald-950 font-bold rounded-2xl hover:bg-amber-600 transition-all shadow-xl shadow-amber-500/20"
            >
              Selesai & Ke Beranda
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-5xl font-serif font-bold text-emerald-950 mb-4">Pendaftaran Berkah</h1>
          <p className="text-slate-500 text-lg">Langkah awal perjalanan spiritual Anda menuju Baitullah.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row animate-scaleIn">
          {/* Navigation Sidebar */}
          <div className="md:w-80 bg-emerald-950 p-10 text-white border-r border-white/5">
            <h3 className="text-xl font-bold mb-10 pb-4 border-b border-white/10">Alur Pendaftaran</h3>
            <div className="space-y-10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-lg">1</div>
                <span className="font-bold text-amber-500">Data Pribadi</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 text-emerald-200 flex items-center justify-center font-bold text-lg border border-white/20">2</div>
                <span className="font-medium text-emerald-100/60">Data Paspor</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/10 text-emerald-200 flex items-center justify-center font-bold text-lg border border-white/20">3</div>
                <span className="font-medium text-emerald-100/60">Dokumen</span>
              </div>
            </div>
            
            <div className="mt-24 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
              <p className="text-xs text-amber-500 uppercase font-bold tracking-widest mb-3">Paket Anda</p>
              <h4 className="font-serif text-lg font-bold mb-2">{UMRAH_PACKAGES.find(p => p.id === formData.packageId)?.name}</h4>
              <p className="text-sm text-emerald-100/60 leading-tight">Harga mulai {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(UMRAH_PACKAGES.find(p => p.id === formData.packageId)?.price || 0)}</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-grow p-10 md:p-14 space-y-16 overflow-y-auto max-h-[800px]">
            {/* Identitas Section */}
            <section>
              <div className="flex items-center mb-10">
                <span className="text-3xl mr-4">🕋</span>
                <h3 className="text-2xl font-serif font-bold text-emerald-950">Informasi Identitas Jama'ah</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Nama Lengkap Sesuai Paspor</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="Contoh: Muhammad Ali" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Hubungan / Status</label>
                  <select name="relationship" value={formData.relationship} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none appearance-none">
                    <option>Kepala Keluarga</option>
                    <option>Istri</option>
                    <option>Anak Kandung</option>
                    <option>Orang Tua</option>
                    <option>Saudara Kandung</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Tempat Lahir</label>
                  <input type="text" name="placeOfBirth" required value={formData.placeOfBirth} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="Kota Kelahiran" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Tanggal Lahir</label>
                  <input type="date" name="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Umur Terhitung (Otomatis)</label>
                  <div className="w-full px-6 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 font-bold">{formData.age} Tahun</div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-3">Alamat Domisili Lengkap</label>
                  <textarea name="address" rows={3} required value={formData.address} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all resize-none" placeholder="Isi alamat lengkap beserta RT/RW, Kota, Kode Pos..."></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Nomor WhatsApp Aktif</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="08123xxxx" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">Alamat Email</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="anda@email.com" />
                </div>
              </div>
            </section>

            {/* Passport Section */}
            <section className="bg-emerald-50/50 p-10 rounded-[2rem] border border-emerald-100">
              <div className="flex items-center mb-8">
                <span className="text-3xl mr-4">🛂</span>
                <h3 className="text-2xl font-serif font-bold text-emerald-950">Status Paspor</h3>
              </div>
              <div className="flex gap-10 mb-10">
                 <label className="flex items-center cursor-pointer group">
                    <input type="radio" name="passportStatus" value="Punya" checked={formData.passportStatus === 'Punya'} onChange={() => setFormData(p => ({...p, passportStatus: 'Punya'}))} className="w-6 h-6 text-emerald-600 border-slate-300 focus:ring-emerald-500" />
                    <span className="ml-4 font-bold text-slate-700 group-hover:text-emerald-700">Sudah Ada</span>
                 </label>
                 <label className="flex items-center cursor-pointer group">
                    <input type="radio" name="passportStatus" value="Belum" checked={formData.passportStatus === 'Belum'} onChange={() => setFormData(p => ({...p, passportStatus: 'Belum'}))} className="w-6 h-6 text-emerald-600 border-slate-300 focus:ring-emerald-500" />
                    <span className="ml-4 font-bold text-slate-700 group-hover:text-emerald-700">Belum Ada / Proses</span>
                 </label>
              </div>

              {formData.passportStatus === 'Punya' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Nomor Paspor</label>
                    <input type="text" name="passportNumber" required value={formData.passportNumber} onChange={handleChange} className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all" placeholder="Contoh: A 1234567" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Unggah Scan Paspor (Halaman Depan)</label>
                    <div className="relative h-40 border-2 border-dashed border-emerald-200 bg-white rounded-2xl flex flex-col items-center justify-center group hover:bg-emerald-50 transition-all cursor-pointer">
                      <input type="file" name="passportScan" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <svg className="w-10 h-10 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="text-sm font-bold text-emerald-700">{formData.passportScan || "Klik atau Seret File Disini"}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Documents Section */}
            <section>
              <div className="flex items-center mb-10">
                <span className="text-3xl mr-4">📂</span>
                <h3 className="text-2xl font-serif font-bold text-emerald-950">Kelengkapan Dokumen</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'KTP Asli / Scan', name: 'ktpScan', icon: '🆔' },
                  { label: 'Kartu Keluarga', name: 'kkScan', icon: '👨‍👩‍👧‍👦' },
                  { label: 'Akta Lahir', name: 'aktaScan', icon: '🍼' },
                  { label: 'Pas Foto 4x6 (Background Putih)', name: 'photoScan', icon: '📸' },
                  { label: 'Buku Nikah (Jika Suami Istri)', name: 'marriageScan', icon: '💍' },
                ].map((doc) => (
                  <div key={doc.name} className="p-6 bg-slate-50 border border-slate-200 rounded-3xl hover:border-emerald-500/30 transition-all group">
                    <div className="flex items-center mb-4">
                      <span className="text-xl mr-3">{doc.icon}</span>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">{doc.label}</label>
                    </div>
                    <div className="relative overflow-hidden flex items-center">
                      <input type="file" name={doc.name} onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className="w-full py-3 px-5 rounded-xl bg-white border border-slate-100 text-[10px] font-bold text-emerald-600 truncate group-hover:bg-emerald-50 transition-colors">
                        {formData[doc.name as keyof BookingForm] || "Pilih File JPG/PNG/PDF"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-10">
              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 bg-emerald-950 hover:bg-black text-white font-bold rounded-[2rem] transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center transform active:scale-[0.98] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <><svg className="animate-spin h-6 w-6 mr-3 text-amber-500" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sedang Mengirim Data...</>
                ) : (
                  <span className="flex items-center text-lg">
                    Simpan & Lihat Ringkasan
                    <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                )}
              </button>
              <p className="text-center text-xs text-slate-400 mt-6 italic">Data yang Anda kirimkan terproteksi oleh enkripsi SSL Ar-Rayan Travel.</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
