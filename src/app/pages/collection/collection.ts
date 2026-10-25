import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Auto } from '../../interfaces/auto';
import { CarService } from '../../services/car-service';

@Component({
  selector: 'app-collection',
  imports: [SearchBar],
  templateUrl: './collection.html',
  styleUrl: './collection.css',
})
export class Collection {
  @Input() brand: string | undefined;
  autoList: Auto[] = [];

  constructor(private carService: CarService, private router: Router) {
    this.autoList = this.carService.getCars();
  }

  openCar(auto: Auto) {
    this.router.navigate(['/car', auto.id]);
  }
}
