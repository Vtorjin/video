import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Body {
  name: string,
  href: string
  icon: string
  js: string
}

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) {

  }

  add(body: Body) {
    console.log(body,'请求')
    this.http.post(`http://localhost:3880/video/setting`, {
      ...body
    }).subscribe(res => {
      console.log(res)
    })
  }
}
