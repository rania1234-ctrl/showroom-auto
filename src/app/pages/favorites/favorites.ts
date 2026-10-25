import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
import { CarService } from '../../services/car-service';
import { FavoritesService } from '../../services/favorites-service';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink, DecimalPipe, FontAwesomeModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  faHeart = faHeart;

  constructor(private carService: CarService, public favorites: FavoritesService) {}

  get cars(): Auto[] {
    return this.carService.getCars().filter(car => this.favorites.isFavorite(car.id));
  }
}
