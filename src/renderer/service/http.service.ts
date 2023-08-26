// http.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private baseUrl: string = 'http://localhost:3880';

    constructor(private http: HttpClient) { }

    // GET 请求
    get(endpoint: string): Observable<any> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.get(url);
    }

    // POST 请求
    post(endpoint: string, data: any): Observable<any> {
        const url = `${this.baseUrl}/${endpoint}`;
        return this.http.post(url, data);
    }


    // 文件上传
    uploadFile(endpoint: string, file: File): Observable<HttpEvent<any>> {
        const url = `${this.baseUrl}/${endpoint}`;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);

        const request = new HttpRequest('POST', url, formData, {
            reportProgress: true,
        });

        return this.http.request(request);
    }
}
