import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private storageKey = 'maison-rania-theme';
  dark = false;

  constructor() {
    this.dark = this.read() === 'dark';
    this.apply();
  }

  toggle() {
    this.dark = !this.dark;
    this.apply();
    this.write();
  }

  private apply() {
    document.body.classList.toggle('dark', this.dark);
  }

  private read(): string | null {
    try {
      return localStorage.getItem(this.storageKey);
    } catch {
      return null;
    }
  }

  private write() {
    try {
      localStorage.setItem(this.storageKey, this.dark ? 'dark' : 'light');
    } catch {
      // Si le navigateur bloque le stockage, le thème n'est simplement pas mémorisé.
    }
  }
}
