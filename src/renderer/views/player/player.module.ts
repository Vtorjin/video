import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { BrowserModule } from '@angular/platform-browser';
import { CopyTextDirective } from '../../plugin/directive';
// import { copyTextDirective } from '../../plugin/directive/empty';


@NgModule({
  declarations: [
    PlayerComponent,
    CopyTextDirective
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class PlayerModule { }
