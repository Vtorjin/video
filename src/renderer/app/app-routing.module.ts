import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { DownloadComponent } from "../views/download/download.component"
import { OnlineComponent } from "../views/online/online.component"
import { SettingComponent } from "../views/setting/setting.component"
import { DownloadInprogressComponent } from '../components/download-inprogress/download-inprogress.component';
import { DownloadLocalComponent } from '../components/download-local/download-local.component';
import { PlayerComponent } from '../views/player/player.component';
import { SettingUserComponent } from '../components/setting-user/setting-user.component';
import { SettingVideoComponent } from '../components/setting-video/setting-video.component';
import { SettingExecutejsComponent } from '../components/setting-executejs/setting-executejs.component';
import { SettingSystemComponent } from '../components/setting-system/setting-system.component';
import { SettingOtherComponent } from '../components/setting-other/setting-other.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent, title: "首页" },
  {
    path: "download", component: DownloadComponent, title: "下载", children: [
      { path: "", component: DownloadInprogressComponent },
      {
        path: "inprogress", component: DownloadInprogressComponent,
        title: "下载中", data: { icon: "down" }
      },
      {
        path: "local", component: DownloadLocalComponent,
        title: "已完成", data: { icon: "ok" }
      }
    ]
  },
  // {path:"",loadChildren:}
  { path: "online", component: OnlineComponent, title: "爬虫" },
  {
    path: "setting", component: SettingComponent, title: "JS设置",
    children: [
      { path: "", component: SettingUserComponent },
      { title: "JS管理", path: "manager", component: SettingUserComponent },
      { title: "JS设置", path: "js", component: SettingExecutejsComponent },
      { title: "视频类型设置", path: "video", component: SettingVideoComponent },
      { title: "系统设置", path: "system", component: SettingSystemComponent },

      { title: "其他设置", path: "other", component: SettingOtherComponent },
    ]
  },
  { path: "player", component: PlayerComponent, title: "播放器" },
  { path: "**", component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // electron 里面不能提前预加载
    // preloadingStrategy: PreloadAllModules,
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
