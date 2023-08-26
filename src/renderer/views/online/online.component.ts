import { Component, isStandalone } from '@angular/core';
import { HttpService } from '../../service/http.service';

interface NavCoverItem {
  ar: string
  dt: number
  fr: string
  id: string
  local: string
  nm: string
  ok: boolean
  qs: number
  img: string
}

interface NavList {
  key: string,
  val: NavCoverItem[]
}

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.less'],

})
export class OnlineComponent {

  navList: NavList[] = []

  constructor(private http: HttpService) {

  }

  ngOnInit() {
    this.getHomeList()
  }

  getHomeList() {
    this.http.get("angular/home").subscribe(res => {
      const { data } = res as { data: NavList[] };
      console.log(data);
      let last, prev;
      let _res = [];
      this.navList = data;
      console.log(this.navList);
      // Object.keys()
      // data.forEach()
      // while (true) {
      //   if (data.length === 0) break;
      //   last = data.pop();
      //   prev = data.shift();
      //   (Object.values(last) as NavCoverItem[]).map(a => {
      //     a.img = "http://localhots:3880/video/img/" + a.id + '.png'
      //     return a;
      //   });
      // }
    })
  }
}
