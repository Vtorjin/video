import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, Route } from '@angular/router';
import { routes } from '../../app/app-routing.module';
interface VideoItem {
  name: string,
  img: string,
  time: number,
  size: number,
  mime: string,
  finish: number,
  total: number,
  speed: number,
  completed: number,
  state: number
}

interface RouterWithIcon extends Route {
  data?: any
}

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.less'],

})


export class DownloadComponent {
  downloadRouter: RouterWithIcon[] = (routes.find(r => r.path === 'download')?.children || []).filter(r => !!r.title);
  constructor() {

  }
}
