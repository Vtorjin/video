import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoTime'
})
export class FormatPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {
    const hours = Math.floor(+value / 3600);
    const minutes = Math.floor((+value % 3600) / 60);
    const seconds = +value % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;

  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`
  }
}



@Pipe({
  name: "videoSize"
})
export class FileSizePipe implements PipeTransform {
  transform(fileSize: string | number, ...args: any[]) {
    if (fileSize == undefined) return "0 MB";
    fileSize = +fileSize;
    const GB = Math.pow(1024, 3);
    const MB = Math.pow(1024, 2);
    const KB = 1024;
    // console.log(KB, MB, GB, fileSize);
    if (fileSize < KB) {
      return "0KB";
    } else if (KB < fileSize && fileSize < MB) {
      return Math.ceil(fileSize / KB) + " KB";
    } else if (MB < fileSize && fileSize < GB) {
      return (fileSize / MB).toFixed(2) + " MB";
    } else {
      return (fileSize / GB).toFixed(2) + " GB";
    }
  }
}