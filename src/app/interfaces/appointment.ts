export interface Appointment {
  id: number;
  carId: number;
  carName: string;
  type: 'test-drive' | 'reservation';
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
}
