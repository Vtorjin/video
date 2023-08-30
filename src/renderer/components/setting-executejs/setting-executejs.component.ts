import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
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
  suffix: string = ""
  hosts: LocationHosts[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  constructor(
    private site: SiteService,
    private setting: SettingService,
    private http: HttpService,
    private rt: ActivatedRoute
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
    this.rt.queryParams.subscribe((res: any) => {
      console.log(res)
      res.id && this.getJs(res.suffix);
      res.id && (this.suffix = res.id);
    })
  }

  getJs(suffix: string) {
    // this.suffix = suffix
    this.http.get(`angular/info/${suffix}`).subscribe(res => {
      // console.log(res);
      res && Object.keys(res).forEach(key => {
        // console.log(key);
        let a = {} as Record<string, string>;
        a[key] = res[key]
        this.siteForm.patchValue(a);
      })
    })
  }

  putJs() {
    const val = this.siteForm.get('suffix');
    console.log(val)
    this.suffix ? this.http.post(`angular/js/${this.suffix}`, this.siteForm.value).subscribe(res => {
      console.log(res);
      alert(res.msg);
    }) : alert('没有内容无法更新')
  }

  remove() {
    this.suffix ? this.http.get(`angular/d/${this.suffix}`).subscribe(res => {
      res.status === 200 && alert('删除成功!');
    }) : alert('没有id')
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
