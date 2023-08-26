import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OnlineBodyComponent } from '../../components/online-body/online-body.component';
import { OnlineHeaderComponent } from '../../components/online-header/online-header.component';
// import { FileSizePipe, FormatPipe } from '../../pipe/format.pipe';
import { SharedPipesModule } from '../../pipe/share.module';
import { OnlineComponent } from './online.component';


@NgModule({
  declarations: [
    OnlineComponent,
    OnlineHeaderComponent,
    OnlineBodyComponent,
    // FormatPipe,
    // FileSizePipe
  ],
  imports: [
    BrowserModule,
    // CommonModule
    SharedPipesModule
  ],
  // exports: [FormatPipe, FileSizePipe]
})
export class OnlineModule { }
