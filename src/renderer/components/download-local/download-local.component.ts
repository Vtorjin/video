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
  selector: 'app-download-local',
  templateUrl: './download-local.component.html',
  styleUrls: ['../../views/download/download.component.less'],
})
export class DownloadLocalComponent {
  videos: VideoItem[]
  total = 1220;
  size = 10
  current = 1
  options = [5, 10, 25, 100]

  constructor() {
    this.videos = [
      {
        name: "画江湖之不良人 第6季 第100话",
        img: "https://tse3-mm.cn.bing.net/th/id/OIP-C.f0kH3sNB7HuzeEztDtep4gHaEy?pid=ImgDet&rs=1",
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
        img: "https://www.yinhuadm.cc/upload/vod/20230813-5/5cbd4a3f61a2a3f5d98c422edb002690.jpg",
        time: 13501,
        size: 1555022500,
        mime: "mp4",
        finish: 10,
        total: 3600,
        speed: 12255,
        completed: 53,
        state: 1
      }, {
        name: "画江湖之不良人 第6季 第110话",
        img: "https://www.videofk.com/videofk/images/logo/timeline-video-down.png",
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
