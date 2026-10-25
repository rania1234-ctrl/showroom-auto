import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { HeadBar } from '../../components/head-bar/head-bar';
import { Auto } from '../../interfaces/auto';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe, HeadBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  featured: Auto[] = [];
  brands: string[] = [];

  constructor(private carService: CarService) {
    this.featured = this.carService.getCars().filter(car => [14, 3, 10].includes(car.id));
    this.brands = this.carService.getBrands();
  }
}