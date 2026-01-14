
import React, { useState, useEffect } from 'react';
import { Page, UmrahPackage, BookingForm, PaymentRecord } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PackageList from './components/PackageList';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import PaymentDashboard from './components/PaymentDashboard';
import ReportsDashboard from './components/ReportsDashboard';
import Footer from './components/Footer';
import PackageModal from './components/PackageModal';
import { INITIAL_JAMAAH_DATA, INITIAL_PAYMENTS, UMRAH_PACKAGES as STATIC_PACKAGES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dynamic Global State
  const [packages, setPackages] = useState<UmrahPackage[]>(STATIC_PACKAGES);
  const [jamaahList, setJamaahList] = useState<BookingForm[]>(INITIAL_JAMAAH_DATA);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleBookNow = (pkg: UmrahPackage) => {
    setSelectedPackage(pkg);
    setCurrentPage('registration');
  };

  const handlePreview = (pkg: UmrahPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleAddJamaah = (newJamaah: BookingForm) => {
    setJamaahList(prev => [...prev, { ...newJamaah, id: `jam-${Date.now()}` }]);
  };

  const handleUpdateJamaah = (updated: BookingForm) => {
    setJamaahList(prev => prev.map(j => j.id === updated.id ? updated : j));
  };

  const handleDeleteJamaah = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data jamaah ini?')) {
      setJamaahList(prev => prev.filter(j => j.id !== id));
      setPayments(prev => prev.filter(p => p.jamaahId !== id));
    }
  };

  const handleAddPayment = (payment: PaymentRecord) => {
    setPayments(prev => [...prev, { ...payment, id: `pay-${Date.now()}` }]);
  };

  const handleUpdatePayment = (updated: PaymentRecord) => {
    setPayments(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Package Management Handlers
  const handleAddPackage = (pkg: UmrahPackage) => {
    setPackages(prev => [...prev, { ...pkg, id: `pkg-${Date.now()}` }]);
  };

  const handleUpdatePackage = (updated: UmrahPackage) => {
    setPackages(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Hapus paket ini? Ini akan berdampak pada tampilan pendaftaran.')) {
      setPackages(prev => prev.filter(p => p.id !== id));
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => setCurrentPage('packages')} />
            <div id="featured-packages" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-serif text-emerald-900 mb-4">Paket Umrah Unggulan</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Pilih paket perjalanan ibadah yang sesuai dengan kebutuhan Anda. Kami menjamin kenyamanan dan kekhusyukan ibadah Anda.</p>
                </div>
                <PackageList 
                  packages={packages}
                  onBookNow={handleBookNow} 
                  onPreview={handlePreview}
                />
              </div>
            </div>
          </>
        );
      case 'packages':
        return (
          <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
              <div className="mb-12">
                <h1 className="text-4xl font-serif text-emerald-900 mb-2">Semua Paket Umrah</h1>
                <p className="text-gray-600">Temukan jadwal keberangkatan terbaik untuk ibadah Anda.</p>
              </div>
              <PackageList 
                packages={packages}
                onBookNow={handleBookNow} 
                onPreview={handlePreview}
              />
            </div>
          </div>
        );
      case 'registration':
        return (
          <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <RegistrationForm 
              packages={packages}
              initialPackage={selectedPackage}
              onSuccess={(data) => {
                handleAddJamaah(data);
                setCurrentPage('home');
              }}
            />
          </div>
        );
      case 'admin':
        return (
          <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <AdminDashboard 
              jamaahList={jamaahList} 
              packages={packages}
              onUpdateJamaah={handleUpdateJamaah}
              onDeleteJamaah={handleDeleteJamaah}
              onAddPackage={handleAddPackage}
              onUpdatePackage={handleUpdatePackage}
              onDeletePackage={handleDeletePackage}
            />
          </div>
        );
      case 'payments':
        return (
          <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <PaymentDashboard 
              jamaahList={jamaahList}
              payments={payments}
              packages={packages}
              onAddPayment={handleAddPayment}
              onUpdatePayment={handleUpdatePayment}
            />
          </div>
        );
      case 'reports':
        return (
          <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <ReportsDashboard 
              jamaahList={jamaahList}
              payments={payments}
              packages={packages}
            />
          </div>
        );
      default:
        return <div>Halaman tidak ditemukan.</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={setCurrentPage} activePage={currentPage} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onNavigate={setCurrentPage} />

      {isModalOpen && selectedPackage && (
        <PackageModal 
          pkg={selectedPackage} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onBook={() => {
            setIsModalOpen(false);
            handleBookNow(selectedPackage);
          }}
        />
      )}
    </div>
  );
};

export default App;
