import { Component, Input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Auto } from '../../interfaces/auto';
import { Appointment } from '../../interfaces/appointment';
import { CarService } from '../../services/car-service';
import { AppointmentService } from '../../services/appointment-service';

// Validateur personnalisé : la date doit être dans le futur, et pas un dimanche.
function appointmentDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const chosen = new Date(control.value + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (chosen < today) {
    return { pastDate: true };
  }
  if (chosen.getDay() === 0) {
    return { sunday: true };
  }
  return null;
}

@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule, RouterLink, DecimalPipe, DatePipe],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  cars: Auto[] = [];
  timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  today = new Date().toISOString().split('T')[0];
  form: FormGroup;
  lastAppointment: Appointment | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    public appointments: AppointmentService
  ) {
    this.cars = this.carService.getCars();
    this.form = this.fb.group({
      type: ['test-drive', Validators.required],
      carId: [null, Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[2-9][0-9]{7}$/)]],
      date: ['', [Validators.required, appointmentDateValidator]],
      time: ['', Validators.required],
      message: [''],
      terms: [false, Validators.requiredTrue],
    });
  }

  @Input()
  set car(value: string | undefined) {
    if (value) {
      this.form.patchValue({ carId: Number(value) });
    }
  }

  get selectedCar(): Auto | undefined {
    const id = this.form.get('carId')?.value;
    return id ? this.carService.getCarById(Number(id)) : undefined;
  }

  get isReservation(): boolean {
    return this.form.get('type')?.value === 'reservation';
  }

  get soldOut(): boolean {
    return this.isReservation && this.selectedCar !== undefined && this.selectedCar.availability === 0;
  }

  isInvalid(name: string): boolean {
    const control = this.form.get(name);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  submit() {
    const car = this.selectedCar;
    if (this.form.invalid || this.soldOut || !car) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    this.lastAppointment = this.appointments.add({
      carId: car.id,
      carName: `${car.brand} ${car.model}`,
      type: value.type,
      fullName: value.fullName.trim(),
      email: value.email.trim(),
      phone: value.phone,
      date: value.date,
      time: value.time,
      message: value.message ?? '',
    });

    this.form.reset({
      type: value.type,
      carId: value.carId,
      fullName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      message: '',
      terms: false,
    });
  }

  cancel(id: number) {
    this.appointments.cancel(id);
    if (this.lastAppointment?.id === id) {
      this.lastAppointment = null;
    }
  }
}
