import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  readonly max = 3;

  private idsSubject = new BehaviorSubject<number[]>([]);
  ids$ = this.idsSubject.asObservable();

  private get ids(): number[] {
    return this.idsSubject.value;
  }

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
      this.idsSubject.next(this.ids.filter(selectedId => selectedId !== id));
    } else if (!this.isFull) {
      this.idsSubject.next([...this.ids, id]);
    }
  }

  clear() {
    this.idsSubject.next([]);
  }
}