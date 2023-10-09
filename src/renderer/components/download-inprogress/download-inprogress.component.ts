import { Component } from '@angular/core';

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


@Component({
  selector: 'app-download-inprogress',
  templateUrl: './download-inprogress.component.html',
  styleUrls: ['../../views/download/download.component.less'],
})
export class DownloadInprogressComponent {
  videos: VideoItem[]
  total = 1220;
  size = 10
  options = [5, 10, 25, 100]

  constructor() {
    this.videos = [
      {
        name: "画江湖之不良人 第6季 第10话",
        // img: "http://localhost:3880/video/img/1685985670502.png",
        img: "https://community.image.video.qpic.cn/app_community_bda48d-0_72566597_1683772537451713?imageView2/2/w/2000",
        time: 1350,
        size: 1555022500,
        mime: "mp4",
        finish: 10,
        total: 3600,
        speed: 12255,
        completed: 53,
        state: 1
      },
      {
        name: "画江湖之不良人 第6季 第103话",
        img: "https://community.image.video.qpic.cn/app_community_bda48d-0_72566597_1683772537451713?imageView2/2/w/2000",
        time: 13501,
        size: 1555022500,
        mime: "mp4",
        finish: 10,
        total: 3600,
        speed: 12255,
        completed: 53,
        state: 1
      }, {
        name: "画江湖之不良人 第6季 第120话",
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
