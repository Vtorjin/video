import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ]
})
export class PlayerModule { }
