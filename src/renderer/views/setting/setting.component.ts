import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { SiteService } from '../../service/site.service';
// import HttpC
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
})

export class SettingComponent {
  siteForm: FormGroup
  constructor(private site: SiteService) {
    this.siteForm = new FormGroup({
      name: new FormControl(''),
      href: new FormControl(''),
      icon: new FormControl(''),
      js: new FormControl(`
      const app = new App();
      `),
    });
  }

  saveSite() {
    console.log(this.siteForm.value)
    // fetch(``)
    this.site.add(this.siteForm.value);
  }
}
