import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { SiteService } from '../../service/site.service';

interface LocationHosts {
  value: string
  viewValue: string
}

@Component({
  selector: 'app-setting-executejs',
  templateUrl: './setting-executejs.component.html',
  styleUrls: ['./setting-executejs.component.less']
})
export class SettingExecutejsComponent {
  siteForm: FormGroup
  hosts: LocationHosts[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  constructor(private site: SiteService) {
    this.siteForm = new FormGroup({
      name: new FormControl(''),
      href: new FormControl(''),
      icon: new FormControl(''),
      belong: new FormControl(''),
      js: new FormControl(`
      const app = new App();
      `),
    });
  }

  ngOnInit() {
    const dom = document.querySelector('#js') as HTMLTextAreaElement;
    const lastChild = document.querySelector('.v-form-item.footer');
    if (dom == null || lastChild === null) return;
    dom.addEventListener('input', () => {
      const lines = dom.value.split('\n').length;
      if ((lastChild.getBoundingClientRect().bottom + 30) < document.body.clientHeight) {
        dom.rows = lines;
      }
      // console.log();
    });
  }

  saveSite() {

    // fetch(``)
    this.site.add(this.siteForm.value);
  }
 
}
