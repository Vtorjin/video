import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SiteService } from '../../service/site.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



// import HttpC
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
  // standalone: true,
  // imports: [
  //   // ReactiveFormsModule,
  //   // MatButtonModule,
  //   // MatFormFieldModule,
  //   // MatSelectModule,
  // ],
})

export class SettingComponent {
  options = [
    { label: "JS设置", value: 0 },
    { label: "视频类型设置", value: 1 },
    { label: "角色设置", value: 2 },
    { label: "系统设置", value: 3 },
    { label: "JS设置", value: 4 },
    { label: "JS设置", value: 5 },
  ]

  activeIdx = 0;

  changeTab(idx: number) {
    this.activeIdx = idx
  }
}