import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SiteService } from '../../service/site.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingService } from '../../service/setting.service';
import { routes } from '../../app/app-routing.module';



// import HttpC
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
})

export class SettingComponent {
  options = routes.find(r => r.path === 'setting')?.children || []
  // [
    // { label: "JS设置", value: 0 },
    // { label: "视频类型设置", value: 4 },
    // { label: "系统设置", value: 3 },
    // { label: "JS管理", value: 2 },
    // { label: "其他设置", value: 1 },
    // { label: "JS设置", value: 5 },
  // ]

  activeIdx = 0;

  constructor(private service: SettingService) { 
 
  }

  ngOnInit(){
    // this.service.init();
  }

  changeTab(idx: number) {
    this.activeIdx = idx
  }
}