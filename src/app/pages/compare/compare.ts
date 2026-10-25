import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Auto } from '../../interfaces/auto';
import { CarService } from '../../services/car-service';
import { CompareService } from '../../services/compare-service';
import { TruncatePipe } from '../../pipes/truncate-pipe';

@Component({
  selector: 'app-compare',
  imports: [RouterLink, DecimalPipe, TruncatePipe],
  templateUrl: './compare.html',
  styleUrl: './compare.css',
})
export class Compare {
  constructor(private carService: CarService, public compare: CompareService) {}

  get cars(): Auto[] {
    return this.carService.getCars().filter(car => this.compare.isSelected(car.id));
  }

  get lowestPrice(): number {
    return Math.min(...this.cars.map(car => car.price));
  }

  get highestPower(): number {
    return Math.max(...this.cars.map(car => car.power));
  }

  get highestStock(): number {
    return Math.max(...this.cars.map(car => car.availability));
  }
}
