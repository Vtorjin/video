import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../views/home/home.component';
import { DownloadComponent } from "../views/download/download.component"
import { OnlineComponent } from "../views/online/online.component"
import { SettingComponent } from "../views/setting/setting.component"

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent, title: "首页" },
  { path: "download", component: DownloadComponent, title: "下载" },
  { path: "online", component: OnlineComponent, title: "爬虫" },
  { path: "setting", component: OnlineComponent, title: "设置" },
  { path: "**", component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
