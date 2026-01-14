
import React from 'react';
import { UMRAH_PACKAGES } from '../constants';
import { UmrahPackage } from '../types';
import PackageCard from './PackageCard';

interface PackageListProps {
  onBookNow: (pkg: UmrahPackage) => void;
  onPreview: (pkg: UmrahPackage) => void;
}

const PackageList: React.FC<PackageListProps> = ({ onBookNow, onPreview }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {UMRAH_PACKAGES.map((pkg) => (
        <PackageCard 
          key={pkg.id} 
          pkg={pkg} 
          onBookNow={() => onBookNow(pkg)}
          onPreview={() => onPreview(pkg)}
        />
      ))}
    </div>
  );
};

export default PackageList;
