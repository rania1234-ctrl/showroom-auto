import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
import { CarService } from '../../services/car-service';
import { FavoritesService } from '../../services/favorites-service';
import { CompareService } from '../../services/compare-service';
import { LeasingSimulator } from '../../components/leasing-simulator/leasing-simulator';

@Component({
  selector: 'app-car-detail',
  imports: [RouterLink, DecimalPipe, FontAwesomeModule, LeasingSimulator],
  templateUrl: './car-detail.html',
  styleUrl: './car-detail.css',
})
export class CarDetail {
  faHeart = faHeart;
  faScaleBalanced = faScaleBalanced;

  car: Auto | undefined;
  similar: Auto[] = [];

  constructor(
    private carService: CarService,
    public favorites: FavoritesService,
    public compare: CompareService
  ) {}

  @Input()
  set id(value: string) {
    this.car = this.carService.getCarById(Number(value));
    this.similar = this.carService.getCars().filter(
      other => this.car !== undefined && other.brand === this.car.brand && other.id !== this.car.id
    );
  }
}
