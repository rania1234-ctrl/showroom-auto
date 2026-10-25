import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Observable, combineLatest, filter, map, startWith } from 'rxjs';
import { Auto } from '../../interfaces/auto';
import { CarService } from '../../services/car-service';
import { CompareService } from '../../services/compare-service';

interface CompareBarState {
  cars: Auto[];
  visible: boolean;
}

@Component({
  selector: 'app-compare-bar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './compare-bar.html',
  styleUrl: './compare-bar.css',
})
export class CompareBar {
  state$: Observable<CompareBarState>;

  constructor(
    private carService: CarService,
    private router: Router,
    public compare: CompareService
  ) {
    const url$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    );

    this.state$ = combineLatest([this.compare.ids$, url$]).pipe(
      map(([ids, url]) => {
        const cars = this.carService.getCars().filter(car => ids.includes(car.id));
        return {
          cars,
          visible: cars.length > 0 && !url.startsWith('/compare'),
        };
      })
    );
  }
}