import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DownloadComponent } from './download.component';
import { DownloadRoutingModule } from './download.routing-module';
import { DownloadLocalComponent } from '../../components/download-local/download-local.component';
import { DownloadInprogressComponent } from '../../components/download-inprogress/download-inprogress.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedPipesModule } from '../../pipe/share.module';
 

@NgModule({
  declarations: [
    DownloadComponent,
    DownloadLocalComponent,
    DownloadInprogressComponent,
  ],
  imports: [
    BrowserModule,
    DownloadRoutingModule,
    MatPaginatorModule,
    SharedPipesModule,
 
  ],
})
export class DownloadModule { }
