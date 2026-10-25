import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faMoon, faSun, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FavoritesService } from '../../services/favorites-service';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  faBars = faBars;
  faXmark = faXmark;
  faMoon = faMoon;
  faSun = faSun;

  scrolled = false;
  menuOpen = false;

  constructor(public favorites: FavoritesService, public theme: ThemeService) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}