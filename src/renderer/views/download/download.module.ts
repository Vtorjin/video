import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DownloadComponent } from './download.component';
import { DownloadRoutingModule } from './download.routing-module';
import { FileSizePipe, FormatPipe } from '../../pipe/format.pipe';


@NgModule({
  declarations: [
    DownloadComponent,
    FormatPipe,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    DownloadRoutingModule
  ],
})
export class DownloadModule { }
