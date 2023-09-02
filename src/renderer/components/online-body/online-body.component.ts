import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormatPipe } from '../../pipe/format.pipe';
import { HttpService } from '../../service/http.service';

interface NavList {
  key: string,
  val: NavCoverItem[]
}

type Mode = "tagMode" | "allMode";
@Component({
  selector: 'app-online-body',
  templateUrl: './online-body.component.html',
  styleUrls: ['./online-body.component.less'],
  // imports:[FormatPipe]
})


export class OnlineBodyComponent {

  navList: NavList[] = []
  allVideos: NavCoverItem[] = [];
  mode: Mode = (localStorage.getItem('mode') as Mode) || "tagMode";
  key: string = localStorage.getItem('videoKey') || ''

  currentPage: number = Number(localStorage.getItem('page')) || 1;
  totalPages: number = 0;

  constructor(
    private http: HttpService,
    private route: Router
  ) {

  }

  ngOnInit() {
    localStorage.getItem('videoKey') && this.mode === 'allMode' ? this.getTypeList(this.currentPage) : this.getHomeList();
  }

  getHomeList() {
    this.mode ="tagMode";
    this.http.get("angular/home").subscribe(res => {
      const { data } = res as { data: NavList[] };
      console.log(data);
      this.navList = data;
    })
  }

  getTypeList(page = 1) {
    var size = 20;
    this.http.post('angular/types', {
      key: localStorage.getItem('videoKey'),
      page: page,
      size
    }).subscribe(res => {
      const { data } = res
      const [list, count]: [NavCoverItem[], number] = data;
      // console.log(list, count);
      this.allVideos = list;
      this.totalPages = Math.ceil(count / size);
    })
  }

  getImageUrl(id: string) {
    return `http://localhost:3880/video/img/${id}.png`
  }

  getVideoState(video:NavCoverItem){
    // return video.
    if(video.ok) return 'ok'
    if(video.ud) return 'err'
    return 'normal'
  }

  goToPlayer(video: NavCoverItem) {
    console.log(video)
    this.route.navigate(['player'], { queryParams: { id: video.id, from: "home" } })
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    // 在此处更新数据或执行其他操作
  }

  goToPage(pageNumber: number) {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      // this.pageChange.emit(pageNumber);
      this.currentPage = pageNumber;
      localStorage.setItem('page', pageNumber + '')
      this.getTypeList(pageNumber)
    }
  }

  setMode(mode: Mode, key?: string) {
    this.mode = mode;
    var size = 20;
    localStorage.setItem('mode', mode)
    if (key) {
    
      this.totalPages = 0;
      localStorage.setItem('videoKey', key)
      this.key = key;
      this.http.post('angular/types', {
        key,
        page: 1,
        size
      }).subscribe(res => {
        const { data } = res
        const [list, count]: [NavCoverItem[], number] = data;
        console.log(list, count);
        this.allVideos = list;
        this.totalPages = Math.ceil(count/size); 
      })
    }else{
      this.getHomeList();
    }
  }
}
