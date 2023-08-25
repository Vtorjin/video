import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadComponent } from './download.component';
import { DownloadRoutingModule } from './download.routing-module';
import { BrowserModule } from '@angular/platform-browser';
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
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DownloadModule { }
