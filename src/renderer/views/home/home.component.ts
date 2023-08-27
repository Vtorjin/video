import { Component } from '@angular/core';
import { SettingService } from '../../service/setting.service';

interface CustomWebView extends HTMLElement {
  // 第三放网页打开控制台
  openDevTools: () => {}
  // 第三方执行代码
  executeJavaScript: (str: string) => Promise<any>,
  // 第三方网页输入元素focus状态可以写入的文本
  insertText: (str: string) => Promise<any>,
  setAttribute: (key: string, val: string) => void
  // 第三方网页地址
  src: string
  // 预加载的js文本 和主进程的预加载一样
  preload: string
  // 重新加载第三方网页
  reload: () => {}
  partition: string
  webpreferences: string
  allowtransparency: string
  // 是否集成nodejs
  nodeintegration: string
  webContents: { executeJavaScript: (str: string) => {} }
  allowpopups: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})


export class HomeComponent {
  // url = "https://www.yinhuadm.cc/p/10310-1-1.html";
  url = "https://www.baidu.com";
  script = 2;
  areas: OptionsList[] = []
  types: OptionsList[] = []
  ages: OptionsList[] = []
  actors: OptionsList[] = []
  pos = [
    { viewValue: "左边", value: "left" },
    { viewValue: "上边", value: "top" },
    { viewValue: "右边", value: "right" },
    { viewValue: "底部", value: "bottom" },
  ]

  constructor(private setting: SettingService) {

  }

  ngOnInit() {
    // console.log('hhhh ')
    document.querySelector('#webview')?.append(this.createWebView())
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log('aa', this.setting);
      this.actors = this.setting.getActor();
      this.ages = this.setting.getAge();
      this.areas = this.setting.getArea();
      this.types = this.setting.getType();
    });
  }

  createWebView() {
    const webview = document.createElement('webview') as CustomWebView;
    const me = this;
    webview.src = this.url;
    webview.style.height = "100%"
    webview.addEventListener('dom-ready', function () {
      fetch(`http://localhost:3880/angular/js/${me.script}.js`)
        .then(r => r.text())
        .then(r => {
          console.log(typeof r);
          webview.executeJavaScript(`(()=>{${r}})()`);
        })
    })
    return webview;
  }


}
