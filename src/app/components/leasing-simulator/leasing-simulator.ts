import { Component, Input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-leasing-simulator',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './leasing-simulator.html',
  styleUrl: './leasing-simulator.css',
})
export class LeasingSimulator {
  @Input() price = 0;
  @Input() carId = 0;

  durations = [24, 36, 48, 60];

  downPercent = 20;
  months = 48;
  rate = 10;
  residualPercent = 10;

  get downPayment(): number {
    return this.price * this.downPercent / 100;
  }

  get residual(): number {
    return this.price * this.residualPercent / 100;
  }

  get financed(): number {
    return this.price - this.downPayment;
  }

  get monthly(): number {
    const monthlyRate = this.rate / 100 / 12;
    const n = this.months;

    if (monthlyRate === 0) {
      return (this.financed - this.residual) / n;
    }

    const amountToRepay = this.financed - this.residual / Math.pow(1 + monthlyRate, n);
    return amountToRepay * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
  }

  get totalPayments(): number {
    return this.monthly * this.months;
  }

  get totalCost(): number {
    return this.downPayment + this.totalPayments + this.residual;
  }

  get financingCost(): number {
    return this.totalCost - this.price;
  }

  share(value: number): number {
    return value / this.totalCost * 100;
  }

  setDown(value: string) {
    this.downPercent = Number(value);
  }

  setMonths(value: number) {
    this.months = value;
  }

  setRate(value: string) {
    this.rate = Number(value);
  }

  setResidual(value: string) {
    this.residualPercent = Number(value);
  }
}
