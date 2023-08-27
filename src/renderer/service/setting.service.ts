import { Injectable } from '@angular/core';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})


export class SettingService {

  config: ConfigItem[] = [];

  constructor(private http: HttpService) {
    this.init();
  }

  init() {
    this.http.get('angular/config').subscribe(res => {
      console.log(res)
      this.config = res.data || [];
    })
  }

  getArea() {
    return this.config.filter(t => t.area !== '').map(a => {
      return {
        value: a.confId,
        viewValue: a.area
      }
    })
  }

  getActor() {
    return this.config.filter(t => t.actor !== '').map(a => {
      return {
        value: a.confId,
        viewValue: a.actor
      }
    })
  }

  getAge() {
    return this.config.filter(t => t.age !== '').map(a => {
      return {
        value: a.confId,
        viewValue: a.age
      }
    })
  }

  getHost() {
    return this.config.filter(t => t.host !== '').map(a => {
      return {
        value: a.confId,
        viewValue: a.host
      }
    })
  }

  getType() {
    return this.config.filter(t => t.type !== '').map(a => {
      return {
        value: a.confId,
        viewValue: a.type
      }
    })
  }
}
