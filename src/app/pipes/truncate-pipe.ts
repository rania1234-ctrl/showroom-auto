import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) {
      return '';
    }
    if (value.length <= limit) {
      return value;
    }
    const cut = value.slice(0, limit);
    return cut.slice(0, cut.lastIndexOf(' ')) + '…';
  }
}