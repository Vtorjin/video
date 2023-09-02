import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent {
  video: VideoInfo
  relatedVideos: any[]
  showVideoInfo: boolean

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {
    this.showVideoInfo = true
    this.relatedVideos = [];
    this.video = {
      ar: '',
      dt: 0,
      fr: '',
      id: '',
      local: '',
      nm: '20小时核弹！丰满性感台湾御姐疯狂喷水 丰满性感台湾御姐疯狂喷水丰满性感台湾御姐疯狂喷水 丰满性感台湾御姐疯狂喷水 丰满性感台湾御姐疯狂喷水！~2',
      ok: false,
      qs: 0,
      img: '',
      lo: '',
      ls: "",
      lp: '',
      tg: '',
      ud: false
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      let { id } = res;
      id = id || localStorage.getItem('playId')
      id && this.getVideoInfo(id);

    })
  }

  private getVideoInfo(id: string) {
    localStorage.setItem('playId', id)
    this.http.get('video/basicInfo/?id=' + id).pipe(catchError(this.handleError<RestfulResponse>('addSite'))).subscribe(res => {
      console.log('获取的基础信息', res)
      const { data }: { data: VideoInfo } = res;
      this.video = data;
      this.createPlayer(data)
    })

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('错误消息', error.message, error)
      return of(result as T);
    }
  }

  createPlayer(data: VideoInfo) {
    new window.DPlayer({
      container: document.querySelector('#v-player'),
      theme: '#4C8FE8',
      volume: 1.0,
      preload: 'auto',
      // logo: logo,
      autoplay: true,
      video: {
        url: `http://localhost:3880/video/m3u8/${data.id}.m3u8`,
        // pic: pics,
        type: 'auto'
      }
    })
  }

  getBackgroundImage() {
    return window.videoApp.isProd ? " url('assets/img/load.jpg')" : "url('/assets/img/load.jpg')"
  }
}
