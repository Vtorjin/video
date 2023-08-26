import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-setting-other',
  templateUrl: './setting-other.component.html',
  styleUrls: ['../setting-executejs/setting-executejs.component.less']
})
export class SettingOtherComponent {

  // host = new FormControl('');
  // actor = new FormControl('');
  // type = new FormControl('');
  // area = new FormControl('');

  form = new FormGroup({
    host: new FormControl('vip'),
    actor: new FormControl(''),
    type: new FormControl(''),
    area: new FormControl(''),
    age: new FormControl('')
  })

  constructor(private http: HttpService) {

  }

  save() {
    this.http.post('angular/type', this.form.value).subscribe(res => {
      console.log(res);
      alert(res.msg)
    });
  }

  restore() {

  }

  addHost() {

  }

  addActor() {

  }



  handleError() {

  }

}
