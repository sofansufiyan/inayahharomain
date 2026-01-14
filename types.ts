
export interface UmrahPackage {
  id: string;
  name: string;
  price: number;
  duration: number;
  airline: string;
  hotelMadinah: string;
  hotelMakkah: string;
  departureDate: string;
  image: string;
  inclusions: string[];
  exclusions: string[];
  isPopular?: boolean;
}

export interface PaymentRecord {
  id: string;
  jamaahId: string;
  amount: number;
  method: 'Transfer Bank' | 'DP' | 'Cicilan';
  date: string;
  proofImage?: string;
  status: 'Menunggu Verifikasi' | 'Diterima' | 'Ditolak';
  notes?: string;
}

export interface BookingForm {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  packageId: string;
  numberOfPersons: number;
  notes: string;
  relationship: string;
  placeOfBirth: string;
  dateOfBirth: string;
  age: number;
  address: string;
  passportStatus: 'Punya' | 'Belum';
  passportNumber?: string;
  passportScan?: string;
  ktpScan?: string;
  kkScan?: string;
  aktaScan?: string;
  photoScan?: string;
  marriageScan?: string;
  registrationNumber?: string;
  registrationDate: string;
  // Admin statuses
  registrationStatus: 'Pending' | 'Confirmed' | 'Canceled';
  paymentStatus: 'Belum Lunas' | 'DP' | 'Lunas';
}

export type Page = 'home' | 'packages' | 'registration' | 'admin' | 'payments' | 'reports';
