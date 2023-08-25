import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

interface Body {
  name: string,
  href: string
  icon: string
  js: string
}

interface RestfulResponse {
  status: number
  msg: string
  data: any
}

interface PatchBody {

}


@Injectable({ providedIn: 'root' })

export class SiteService {
  constructor(private http: HttpClient) {

  }

  add(body: Body) {
    console.log(body, '请求')
    this.http.post<RestfulResponse>(`http://localhost:3880/video/setting`, {
      ...body
    }).pipe(catchError(this.handleError<RestfulResponse>('addSite'))).subscribe(res => {
      console.log(res)
    })
  }

  edit() {

  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('错误消息', error.message, error)
      return of(result as T);
    }
  }
}
