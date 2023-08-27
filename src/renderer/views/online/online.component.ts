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
     
  }
 
}
