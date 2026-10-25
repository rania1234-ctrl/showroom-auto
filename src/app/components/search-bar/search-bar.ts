import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faMagnifyingGlass, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interfaces/auto';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { FavoritesService } from '../../services/favorites-service';
import { CompareService } from '../../services/compare-service';

@Component({
  imports: [FontAwesomeModule, DecimalPipe, TruncatePipe],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faHeart = faHeart;
  faScaleBalanced = faScaleBalanced;

  @Input() autos: Auto[] = [];
  @Input() initialBrand = '';
  @Output() onSelectCar = new EventEmitter<Auto>();

  selectedAutos: Auto[] = [];
  brands: string[] = [];

  searchText = '';
  activeBrand = '';
  sortBy = 'default';
  minPrice = 0;
  maxPrice = 0;
  budget = 0;

  constructor(public favorites: FavoritesService, public compare: CompareService) {}

  ngOnInit() {
    this.brands = [...new Set(this.autos.map(auto => auto.brand))];

    const prices = this.autos.map(auto => auto.price);
    this.minPrice = Math.min(...prices);
    this.maxPrice = Math.max(...prices);
    this.budget = this.maxPrice;

    const wanted = this.initialBrand.toLowerCase();
    this.activeBrand = this.brands.find(brand => brand.toLowerCase() === wanted) ?? '';

    this.applyFilters();
  }

  selectAutos(text: string) {
    this.searchText = text.trim().toLowerCase();
    this.applyFilters();
  }

  selectBrand(brand: string) {
    this.activeBrand = this.activeBrand === brand ? '' : brand;
    this.applyFilters();
  }

  setBudget(value: string) {
    this.budget = Number(value);
    this.applyFilters();
  }

  setSort(value: string) {
    this.sortBy = value;
    this.applyFilters();
  }

  resetFilters(searchInput: HTMLInputElement) {
    searchInput.value = '';
    this.searchText = '';
    this.activeBrand = '';
    this.sortBy = 'default';
    this.budget = this.maxPrice;
    this.applyFilters();
  }

  applyFilters() {
    let result = this.autos.filter(auto =>
      (this.activeBrand === '' || auto.brand === this.activeBrand) &&
      (this.searchText === '' ||
        auto.brand.toLowerCase().includes(this.searchText) ||
        auto.model.toLowerCase().includes(this.searchText)) &&
      auto.price <= this.budget
    );

    if (this.sortBy === 'price-asc') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      result = result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'power-desc') {
      result = result.sort((a, b) => b.power - a.power);
    }

    this.selectedAutos = result;
  }

  selectCar(auto: Auto) {
    this.onSelectCar.emit(auto);
  }
}