import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormatPipe } from '../../pipe/format.pipe';
import { HttpService } from '../../service/http.service';

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

  constructor(
    private http: HttpService,
    private route: Router

  ) {

  }

  ngOnInit() {
    this.getHomeList()
  }

  getHomeList() {
    this.http.get("angular/home").subscribe(res => {
      const { data } = res as { data: NavList[] };
      console.log(data);
      this.navList = data;
    })
  }

  getImageUrl(id: string) {
    return `http://localhost:3880/video/img/${id}.png`
  }

  goToPlayer(video: NavCoverItem) {
    console.log(video)
    this.route.navigate(['player'], { queryParams: { id: video.id, from: "home" } })
  }
}
