import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  readonly max = 3;
  private ids: number[] = [];

  get count(): number {
    return this.ids.length;
  }

  get isFull(): boolean {
    return this.ids.length >= this.max;
  }

  getIds(): number[] {
    return this.ids;
  }

  isSelected(id: number): boolean {
    return this.ids.includes(id);
  }

  toggle(id: number) {
    if (this.isSelected(id)) {
      this.ids = this.ids.filter(selectedId => selectedId !== id);
    } else if (!this.isFull) {
      this.ids = [...this.ids, id];
    }
  }

  clear() {
    this.ids = [];
  }
}