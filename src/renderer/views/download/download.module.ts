import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DownloadComponent } from './download.component';
import { DownloadRoutingModule } from './download.routing-module';
import { FileSizePipe, FormatPipe } from '../../pipe/format.pipe';
import { DownloadLocalComponent } from '../../components/download-local/download-local.component';
import { DownloadInprogressComponent } from '../../components/download-inprogress/download-inprogress.component';


@NgModule({
  declarations: [
    DownloadComponent,
    FormatPipe,
    FileSizePipe,
    DownloadLocalComponent,
    DownloadInprogressComponent,
  ],
  imports: [
    BrowserModule,
    DownloadRoutingModule
  ],
})
export class DownloadModule { }
