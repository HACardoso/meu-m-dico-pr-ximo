export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  rating: number;
  reviewCount: number;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  insurances: string[];
  privatePrice: number;
  bio: string;
  education: string[];
  experience: string;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentType: 'private' | 'insurance';
  insuranceName?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  photo?: string;
}

export type PaymentType = 'private' | 'insurance';

export interface SearchFilters {
  specialty: string;
  location: string;
  radius: number;
  paymentType: PaymentType;
  insurance?: string;
}
