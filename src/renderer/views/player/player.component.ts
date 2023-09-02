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
  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) {
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
      tg:''
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      console.log(res);
      const { id } = res;
      if (id) {
        this.http.get('video/basicInfo/?id=' + id).pipe(catchError(this.handleError<RestfulResponse>('addSite'))).subscribe(res => {
          console.log('获取的基础信息', res)
          const { data }: { data: VideoInfo } = res;
          this.video = data;
          this.createPlayer(data)
        })
      }
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
}
