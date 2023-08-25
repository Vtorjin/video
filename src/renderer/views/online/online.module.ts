import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OnlineBodyComponent } from '../../components/online-body/online-body.component';
import { OnlineHeaderComponent } from '../../components/online-header/online-header.component';
import { OnlineComponent } from './online.component';


@NgModule({
  declarations: [
    OnlineComponent,
    OnlineHeaderComponent,
    OnlineBodyComponent,
  ],
  imports: [
    BrowserModule,
    // CommonModule
  ]
})
export class OnlineModule { }
