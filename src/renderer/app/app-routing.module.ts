import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { DownloadComponent } from "../views/download/download.component"
import { OnlineComponent } from "../views/online/online.component"
import { SettingComponent } from "../views/setting/setting.component"
import { DownloadInprogressComponent } from '../components/download-inprogress/download-inprogress.component';
import { DownloadLocalComponent } from '../components/download-local/download-local.component';
import { PlayerComponent } from '../views/player/player.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent, title: "首页" },
  {
    path: "download", component: DownloadComponent, title: "下载", children: [
      { path: "", component: DownloadInprogressComponent },
      {
        path: "inprogress", component: DownloadInprogressComponent,
        title: "下载中", data: { icon: "iconfont icon-yunxiazai" }
      },
      {
        path: "local", component: DownloadLocalComponent,
        title: "已完成", data: { icon: "iconfont icon-wancheng_line" }
      }
    ]
  },
  // {path:"",loadChildren:}
  { path: "online", component: OnlineComponent, title: "爬虫" },
  { path: "setting", component: SettingComponent, title: "JS设置" },
  { path: "player", component: PlayerComponent, title: "播放器" },
  { path: "**", component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
