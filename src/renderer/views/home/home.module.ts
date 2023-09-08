import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { UiDropdownModule } from '../../components/ui-dropdown/ui-dropdown.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomDropdownComponent } from '../../components/ui-dropdown/ui-dropdown.component';



@NgModule({
  declarations: [
    HomeComponent,
    // CustomDropdownComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    UiDropdownModule,
    FormsModule
  ]
})
export class HomeModule { }
