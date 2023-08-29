import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { HttpService } from '../../service/http.service';
import { SettingService } from '../../service/setting.service';
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
  constructor(
    private site: SiteService,
    private setting: SettingService,
    private http: HttpService
  ) {
    this.siteForm = new FormGroup({
      name: new FormControl(''),
      href: new FormControl(''),
      icon: new FormControl(''),
      belong: new FormControl(''),
      suffix: new FormControl(''),
      js: new FormControl(` const app = new App();`),
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
    });
    this.getJs();
  }

  getJs() {
    this.http.get('angular/info/yhdm.decode.js').subscribe(res => {
      console.log(res);
      res && Object.keys(res).forEach(key => {
        console.log(key);
        let a = {} as Record<string, string>;
        a[key] = res[key]
        this.siteForm.patchValue(a);
      })
    })
  }

  putJs() {
    const val = this.siteForm.get('suffix');
    console.log(val)
    this.http.post(`angular/js/yhdm.decode.js`, this.siteForm.value).subscribe(res => {
      console.log(res);
      alert(res.msg);
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.setting)
      this.hosts = this.setting.getHost() as LocationHosts[];
    })
  }

  saveSite() {

    // fetch(``)
    this.site.add(this.siteForm.value);
  }

}
