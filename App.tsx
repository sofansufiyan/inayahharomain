
import React, { useState, useEffect } from 'react';
import { Page, UmrahPackage, BookingForm, PaymentRecord, SystemSettings } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PackageList from './components/PackageList';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import PaymentDashboard from './components/PaymentDashboard';
import ReportsDashboard from './components/ReportsDashboard';
import Footer from './components/Footer';
import PackageModal from './components/PackageModal';
import AIConsultant from './components/AIConsultant';
import { INITIAL_JAMAAH_DATA, INITIAL_PAYMENTS, UMRAH_PACKAGES as STATIC_PACKAGES, INITIAL_SETTINGS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedPackage, setSelectedPackage] = useState<UmrahPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Dynamic Global State
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [packages, setPackages] = useState<UmrahPackage[]>(STATIC_PACKAGES);
  const [jamaahList, setJamaahList] = useState<BookingForm[]>(INITIAL_JAMAAH_DATA);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleBookNow = (pkg: UmrahPackage) => {
    setSelectedPackage(pkg);
    setCurrentPage('registration');
  };

  const handlePreview = (pkg: UmrahPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleUpdateSettings = (newSettings: SystemSettings) => {
    setSettings(newSettings);
  };

  const handleAddJamaah = (newJamaah: BookingForm) => {
    setJamaahList(prev => [...prev, { ...newJamaah, id: `jam-${Date.now()}` }]);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero settings={settings} onExplore={() => setCurrentPage('packages')} />
            <div id="featured-packages" className="py-24">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-fadeInUp">
                  <span className="text-emerald-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Pilihan Jamaah</span>
                  <h2 className="text-4xl md:text-6xl font-serif text-emerald-950 mb-6">Paket Umrah Unggulan</h2>
                  <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mb-8"></div>
                </div>
                <PackageList 
                  packages={packages}
                  settings={settings}
                  onBookNow={handleBookNow} 
                  onPreview={handlePreview}
                />
              </div>
            </div>
          </>
        );
      case 'packages':
        return (
          <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-4">
              <div className="mb-16 text-center md:text-left">
                <h1 className="text-5xl font-serif text-emerald-950 mb-4">Katalog Perjalanan</h1>
                <p className="text-slate-600 text-lg">Wujudkan impian ibadah Anda dengan pilihan paket terbaik kami.</p>
              </div>
              <PackageList 
                packages={packages}
                settings={settings}
                onBookNow={handleBookNow} 
                onPreview={handlePreview}
              />
            </div>
          </div>
        );
      case 'registration':
        return (
          <div className="pt-32 pb-24 min-h-screen">
            <RegistrationForm 
              packages={packages}
              settings={settings}
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
          <div className="pt-32 pb-24 min-h-screen">
            <AdminDashboard 
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              jamaahList={jamaahList} 
              packages={packages}
              onUpdateJamaah={(u) => setJamaahList(prev => prev.map(j => j.id === u.id ? u : j))}
              onDeleteJamaah={(id) => setJamaahList(prev => prev.filter(j => j.id !== id))}
              onAddPackage={(p) => setPackages(prev => [...prev, p])}
              onUpdatePackage={(u) => setPackages(prev => prev.map(p => p.id === u.id ? u : p))}
              onDeletePackage={(id) => setPackages(prev => prev.filter(p => p.id !== id))}
            />
          </div>
        );
      case 'payments':
        return (
          <div className="pt-32 pb-24 min-h-screen">
            <PaymentDashboard 
              jamaahList={jamaahList}
              payments={payments}
              packages={packages}
              onAddPayment={(p) => setPayments(prev => [...prev, p])}
              onUpdatePayment={(u) => setPayments(prev => prev.map(p => p.id === u.id ? u : p))}
            />
          </div>
        );
      case 'reports':
        return (
          <div className="pt-32 pb-24 min-h-screen">
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
    <div className="flex flex-col min-h-screen selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar settings={settings} onNavigate={setCurrentPage} activePage={currentPage} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <AIConsultant settings={settings} packages={packages} />
      
      <Footer settings={settings} onNavigate={setCurrentPage} />

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
