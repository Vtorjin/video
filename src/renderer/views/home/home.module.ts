import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { UiDropdownModule } from '../../components/ui-dropdown/ui-dropdown.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomDropdownComponent } from '../../components/ui-dropdown/ui-dropdown.component';



@NgModule({
  declarations: [
    HomeComponent,
    // CustomDropdownComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UiDropdownModule
  ]
})
export class HomeModule { }
