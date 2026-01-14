
import { UmrahPackage, BookingForm, PaymentRecord, SystemSettings } from './types';

export const INITIAL_SETTINGS: SystemSettings = {
  agencyName: 'Ar-Rayan Travel',
  kemenagLicense: 'No. 123/2020',
  supportEmail: 'info@arrayantravel.com',
  hotlineWhatsapp: '6281234567890',
  address: 'Jl. Kebangkitan No. 123, Jakarta Selatan, Indonesia'
};

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
    registrationDate: '2024-08-15T10:00:00.000Z',
    registrationStatus: 'Confirmed',
    paymentStatus: 'Lunas'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-001',
    jamaahId: 'jam-001',
    amount: 70000000,
    method: 'Transfer Bank',
    date: '2024-09-01',
    status: 'Diterima',
    notes: 'Pelunasan Umrah VIP'
  }
];
