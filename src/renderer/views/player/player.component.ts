import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { HttpService } from '../../service/http.service';
import { SettingService } from '../../service/setting.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent {
  video: VideoInfo
  relatedVideos: any[]
  showVideoInfo: boolean

  actors: OptionsList[] = []

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private setting: SettingService
  ) {
    this.showVideoInfo = true
    this.relatedVideos = [];
    this.video = {
      ar: '',
      dt: 0,
      fr: '',
      id: '',
      local: '',
      nm: '',
      ok: false,
      qs: 0,
      img: '',
      lo: '',
      ls: "",
      lp: '',
      tg: '',
      ud: false,
      vh: 0,
      vw: 0
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      let { id } = res;
      id = id || localStorage.getItem('playId')
      id && this.getVideoInfo(id);

    })
  }

  ngAfterViewInit() {
    this.actors = this.setting.getActor();
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

  updateVideo(tag: 'time' | 'title' | 'mix') {
    switch (tag) {
      case "time": {
        const el = document.querySelector('video');
        if (el && el.duration) {
          this.video.dt = Math.ceil(el.duration);
        }
        return;
      }
      case "title": {
        // alert(0);
        navigator.clipboard.readText().then(res => {
          // console.log(res)
          this.video.nm = res;
        })
        return;
      }
      case "mix":{
        return;
      } 
    }
  }
}
