import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-setting-js',
  templateUrl: './setting-user.component.html',
  styleUrls: ['./setting-user.component.less']
})
export class SettingUserComponent {
  list: any[] = [];

  constructor(
    private http: HttpService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.http.get('angular/js/list').subscribe(res => {
      console.log(res);
      this.list = res.data;
    })
  }

  loadDefault(e: any) {
    // console.log(e)
    e.target.src = '/assets/img/true.png'
  }

  gotoJs(p?: { id: string, suffix: string }) {
    this.router.navigate(['/setting/js'], { queryParams: p || null })
  }
}
