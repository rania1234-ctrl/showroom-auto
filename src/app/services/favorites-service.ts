import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private storageKey = 'maison-rania-favorites';

  private idsSubject = new BehaviorSubject<number[]>(this.load());
  count$ = this.idsSubject.pipe(map(ids => ids.length));

  private get ids(): number[] {
    return this.idsSubject.value;
  }

  get count(): number {
    return this.ids.length;
  }

  isFavorite(id: number): boolean {
    return this.ids.includes(id);
  }

  toggle(id: number) {
    if (this.isFavorite(id)) {
      this.idsSubject.next(this.ids.filter(favoriteId => favoriteId !== id));
    } else {
      this.idsSubject.next([...this.ids, id]);
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