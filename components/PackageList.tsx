
import React from 'react';
import { UmrahPackage, SystemSettings } from '../types';
import PackageCard from './PackageCard';

interface PackageListProps {
  packages: UmrahPackage[];
  // Added settings prop to match App.tsx usage
  settings: SystemSettings;
  onBookNow: (pkg: UmrahPackage) => void;
  onPreview: (pkg: UmrahPackage) => void;
}

const PackageList: React.FC<PackageListProps> = ({ packages, settings, onBookNow, onPreview }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {packages.map((pkg) => (
        <PackageCard 
          key={pkg.id} 
          pkg={pkg} 
          // Passing settings down to PackageCard
          settings={settings}
          onBookNow={() => onBookNow(pkg)}
          onPreview={() => onPreview(pkg)}
        />
      ))}
      {packages.length === 0 && (
        <div className="col-span-full py-20 text-center text-gray-400 font-serif italic text-xl">
          Belum ada paket umrah yang tersedia saat ini.
        </div>
      )}
    </div>
  );
};

export default PackageList;
