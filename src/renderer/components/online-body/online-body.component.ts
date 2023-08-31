import { Component } from '@angular/core';
import { FormatPipe } from '../../pipe/format.pipe';
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
  selector: 'app-online-body',
  templateUrl: './online-body.component.html',
  styleUrls: ['./online-body.component.less'],
  // imports:[FormatPipe]
})
export class OnlineBodyComponent {
  navList: NavList[] = []

  constructor(private http: HttpService) {

  }

  ngOnInit() {
    // this.getHomeList()
  }

  getHomeList() {
    this.http.get("angular/home").subscribe(res => {
      const { data } = res as { data: NavList[] };
      console.log(data);
      this.navList = data; 
    })
  }

  getImageUrl(id:string){
    return `http://localhost:3880/video/img/${id}.png`
  }
}
