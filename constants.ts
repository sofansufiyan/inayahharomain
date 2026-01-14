
import { UmrahPackage, BookingForm, PaymentRecord } from './types';

export const UMRAH_PACKAGES: UmrahPackage[] = [
  {
    id: 'pkg-001',
    name: 'Umrah Reguler Ekonomi',
    price: 28500000,
    duration: 9,
    airline: 'Saudi Arabian Airlines',
    hotelMadinah: 'Dyar Al Taqwa (⭐⭐⭐⭐)',
    hotelMakkah: 'Rayyana Ajyad (⭐⭐⭐⭐)',
    departureDate: '15 Oktober 2024',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Tiket Pesawat PP', 'Visa Umrah', 'Makan 3x Sehari', 'Handling & Perlengkapan', 'Ziarah Makkah & Madinah'],
    exclusions: ['Paspor', 'Vaksin Meningitis', 'Kebutuhan Pribadi', 'Kelebihan Bagasi'],
    isPopular: false
  },
  {
    id: 'pkg-002',
    name: 'Umrah Exclusive VIP',
    price: 35000000,
    duration: 12,
    airline: 'Garuda Indonesia',
    hotelMadinah: 'Al Haram Hotel (⭐⭐⭐⭐⭐)',
    hotelMakkah: 'Pullman Zamzam (⭐⭐⭐⭐⭐)',
    departureDate: '20 November 2024',
    image: 'https://images.unsplash.com/photo-1542834759-409df871638f?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Tiket Pesawat PP Executive', 'Visa Umrah Fast Track', 'Full Board Hotel 5*', 'Handling VIP', 'Kereta Cepat Madinah-Makkah'],
    exclusions: ['Paspor', 'Kebutuhan Pribadi', 'Loundry'],
    isPopular: true
  },
  {
    id: 'pkg-003',
    name: 'Umrah Plus Turki',
    price: 42000000,
    duration: 14,
    airline: 'Turkish Airlines',
    hotelMadinah: 'Frontel Al Harithia (⭐⭐⭐⭐⭐)',
    hotelMakkah: 'Hilton Convention (⭐⭐⭐⭐⭐)',
    departureDate: '05 Desember 2024',
    image: 'https://images.unsplash.com/photo-1565552645632-d7c5f76a16be?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Tiket Pesawat PP', 'Visa Umrah & Turki', 'City Tour Istanbul', 'Makan 3x Sehari', 'Bimbingan Manasik'],
    exclusions: ['Paspor', 'Tips Tour Guide Turki', 'Pengeluaran Pribadi'],
    isPopular: false
  },
  {
    id: 'pkg-004',
    name: 'Umrah Ramadhan Awal',
    price: 32000000,
    duration: 10,
    airline: 'Etihad Airways',
    hotelMadinah: 'Nawazi Madinah (⭐⭐⭐⭐)',
    hotelMakkah: 'Anjum Hotel (⭐⭐⭐⭐⭐)',
    departureDate: '12 Maret 2025',
    image: 'https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=800&q=80',
    inclusions: ['Tiket Pesawat PP', 'Visa Umrah', 'Saur & Buka Puasa', 'Mutawif Berpengalaman'],
    exclusions: ['Paspor', 'Vaksin', 'Laundry'],
    isPopular: false
  }
];

export const INITIAL_JAMAAH_DATA: BookingForm[] = [
  {
    id: 'jam-001',
    fullName: 'Ahmad Faisal',
    phone: '081234567890',
    email: 'ahmad@example.com',
    packageId: 'pkg-002',
    numberOfPersons: 2,
    notes: 'Mohon kursi roda',
    relationship: 'Kepala Keluarga',
    placeOfBirth: 'Jakarta',
    dateOfBirth: '1985-05-12',
    age: 39,
    address: 'Jl. Melati No. 45, Jakarta',
    passportStatus: 'Punya',
    passportNumber: 'A1234567',
    registrationNumber: 'REG-882910',
    // Added missing registrationDate
    registrationDate: '2024-08-15T10:00:00.000Z',
    registrationStatus: 'Confirmed',
    paymentStatus: 'Lunas'
  },
  {
    id: 'jam-002',
    fullName: 'Siti Aminah',
    phone: '081987654321',
    email: 'siti@example.com',
    packageId: 'pkg-001',
    numberOfPersons: 1,
    notes: '',
    relationship: 'Istri',
    placeOfBirth: 'Bandung',
    dateOfBirth: '1988-08-22',
    age: 36,
    address: 'Jl. Dago No. 12, Bandung',
    passportStatus: 'Belum',
    registrationNumber: 'REG-129034',
    // Added missing registrationDate
    registrationDate: '2024-09-01T14:30:00.000Z',
    registrationStatus: 'Pending',
    paymentStatus: 'DP'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-001',
    jamaahId: 'jam-001',
    amount: 70000000, // VIP for 2 persons
    method: 'Transfer Bank',
    date: '2024-09-01',
    status: 'Diterima',
    notes: 'Pelunasan Umrah VIP'
  },
  {
    id: 'pay-002',
    jamaahId: 'jam-002',
    amount: 10000000,
    method: 'DP',
    date: '2024-09-05',
    status: 'Diterima',
    notes: 'DP Pendaftaran'
  },
  {
    id: 'pay-003',
    jamaahId: 'jam-002',
    amount: 5000000,
    method: 'Cicilan',
    date: '2024-09-15',
    status: 'Menunggu Verifikasi',
    notes: 'Cicilan ke-1'
  }
];

export const CONTACT_INFO = {
  whatsapp: '6281234567890',
  email: 'info@arrayantravel.com',
  address: 'Jl. Kebangkitan No. 123, Jakarta Selatan, Indonesia',
  social: {
    instagram: '@arrayantravel',
    facebook: 'Ar-Rayan Travel Umrah'
  }
};
