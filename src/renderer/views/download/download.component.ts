import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

interface VideoItem {
  name: string,
  img: string,
  time: number,
  size: number,
  mime: string,
  finish: number,
  total: number,
  speed: number,
  completed: number,
  state: number
}

// export let videos: VideoItem[] = [
//   {
//     name: "",
//     img: "",
//     time: 1350,
//     size: 15550225,
//     mime: "mp4",
//     finish: 10,
//     total: 3600,
//     speed: 12255,
//     completed: 53,
//     state: 1
//   }
// ]


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.less'],

})


export class DownloadComponent {
  videos: VideoItem[]
  constructor() {
    this.videos = [
      {
        name: "画江湖之不良人 第6季 第10话",
        img: "https://community.image.video.qpic.cn/app_community_bda48d-0_72566597_1683772537451713?imageView2/2/w/2000",
        time: 1350,
        size: 1555022500,
        mime: "mp4",
        finish: 10,
        total: 3600,
        speed: 12255,
        completed: 53,
        state: 1
      }
    ]
  }

  trackByFn() {

  }
}
