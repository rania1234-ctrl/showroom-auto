import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auto } from '../../interfaces/auto';
import { CarService } from '../../services/car-service';
import { CompareService } from '../../services/compare-service';

@Component({
  selector: 'app-compare-bar',
  imports: [RouterLink],
  templateUrl: './compare-bar.html',
  styleUrl: './compare-bar.css',
})
export class CompareBar {
  constructor(
    private carService: CarService,
    private router: Router,
    public compare: CompareService
  ) {}

  get cars(): Auto[] {
    return this.carService.getCars().filter(car => this.compare.isSelected(car.id));
  }

  get onComparePage(): boolean {
    return this.router.url.startsWith('/compare');
  }
}