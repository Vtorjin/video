import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SettingUserComponent } from '../../components/setting-user/setting-user.component';
import { SettingVideoComponent } from '../../components/setting-video/setting-video.component';
import { SettingExecutejsComponent } from '../../components/setting-executejs/setting-executejs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SettingSystemComponent } from '../../components/setting-system/setting-system.component';
import { SettingOtherComponent } from '../../components/setting-other/setting-other.component';


@NgModule({
  declarations: [
    SettingComponent,
    SettingUserComponent,
    SettingVideoComponent,
    SettingExecutejsComponent,
    SettingSystemComponent,
    SettingOtherComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ]
})
export class SettingModule { }
