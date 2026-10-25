import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'maison-rania-favorites';
  private ids: number[] = [];

  constructor() {
    this.ids = this.load();
  }

  get count(): number {
    return this.ids.length;
  }

  isFavorite(id: number): boolean {
    return this.ids.includes(id);
  }

  toggle(id: number) {
    if (this.isFavorite(id)) {
      this.ids = this.ids.filter(favoriteId => favoriteId !== id);
    } else {
      this.ids = [...this.ids, id];
    }
    this.save();
  }

  private load(): number[] {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  private save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.ids));
    } catch {
      // Si le navigateur bloque le stockage, les favoris restent seulement en mémoire.
    }
  }
}
