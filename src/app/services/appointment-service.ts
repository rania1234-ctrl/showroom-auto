import { Injectable } from '@angular/core';
import { Appointment } from '../interfaces/appointment';
import { CarService } from './car-service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private storageKey = 'maison-rania-appointments';
  private appointments: Appointment[] = [];

  constructor(private carService: CarService) {
    this.appointments = this.load();
    this.appointments
      .filter(appointment => appointment.type === 'reservation')
      .forEach(appointment => this.changeStock(appointment.carId, -1));
  }

  getAll(): Appointment[] {
    return this.appointments;
  }

  add(data: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
    const appointment: Appointment = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    if (appointment.type === 'reservation') {
      this.changeStock(appointment.carId, -1);
    }
    this.appointments = [appointment, ...this.appointments];
    this.save();
    return appointment;
  }

  cancel(id: number) {
    const appointment = this.appointments.find(item => item.id === id);
    if (!appointment) {
      return;
    }
    if (appointment.type === 'reservation') {
      this.changeStock(appointment.carId, 1);
    }
    this.appointments = this.appointments.filter(item => item.id !== id);
    this.save();
  }

  private changeStock(carId: number, delta: number) {
    const car = this.carService.getCarById(carId);
    if (car) {
      car.availability = Math.max(0, car.availability + delta);
    }
  }

  private load(): Appointment[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  private save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.appointments));
    } catch {
      // Si le navigateur bloque le stockage, les rendez-vous restent seulement en mémoire.
    }
  }
}
