import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoTime'
})
export class FormatPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {
    value = Math.ceil(Number(value));
    const hours = Math.floor(+value / 3600);
    const minutes = Math.floor((+value % 3600) / 60);
    const seconds = +value % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;

  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`
  }
}


