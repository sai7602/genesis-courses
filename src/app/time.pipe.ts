import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value - hours * 3600) / 60);
    const seconds: number = value - hours * 3600 - minutes * 60;
    return `${hours}:${minutes}:${seconds}`;
  }
}
