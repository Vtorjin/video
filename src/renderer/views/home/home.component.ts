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
  url = "https://www.yinhuadm.cc/p/10310-1-1.html";
  // url = "https://www.baidu.com";
  // url = "https://player.ikmz.cc/yinhua/?url=MCZY-811cvqPQS2zC5rbONU8d0dYQ9JdawLxQ5KPzXKZugieRBN67iyH7DWusroMgoAxen-rz52f8kxY53WEAD15DjBHdldZIP2n-BgjneCyRmECDi3su3MwQ&next=&title=%E6%96%B0%E7%81%B0%E5%A7%91%E5%A8%982%20HD%E4%B8%AD%E5%AD%97%E5%9C%A8%E7%BA%BF%E6%92%AD%E6%94%BE"
  script = 2;
  areas: OptionsList[] = []
  types: OptionsList[] = []
  ages: OptionsList[] = []
  actors: OptionsList[] = []

  isReady = false

  pos = [
    { viewValue: "左边", value: "left" },
    { viewValue: "上边", value: "top" },
    { viewValue: "右边", value: "right" },
    { viewValue: "底部", value: "bottom" },
  ]

  dir = "top"

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
    const webview = document.createElement('webview') as unknown as CustomWebView;
    const me = this;
    webview.src = this.url;
    webview.style.height = "100%"
    // webview.setAttribute('preload', 'http://localhost:3880/angular/js/3.js')
    // webview.setAttribute('preload', 'D:\\vue3.0\\translator\\resources\\extensions\\chrome\\dist\\browser\\index.js')
    webview.setAttribute('preload', 'D:\\angular\\video\\out\\src\\preload\\webview.js')
    webview.setAttribute('nodeIntegration', 'true')
    webview.setAttribute('webpreferences', "webSecurity=no,nativeWindowOpen=yes, spellcheck=no, contextIsolation=no")
    webview.setAttribute('allowtransparency', 'true');
    webview.setAttribute('disablewebsecurity', 'true');
    webview.setAttribute('plugin', 'true');

    webview.addEventListener('dom-ready', function () {
      me.isReady = true;
      webview.setAttribute('finish', 'true'); //初始化结束
      fetch('http://localhost:3880/angular/js/yhdm.decode.js?202201').then(t => t.text()).then(res => {
        webview.executeJavaScript(`
        ["https://player.ikmz.cc/asset/js/mui-player.min.js",
        'https://player.ikmz.cc/asset/js/mui-player-desktop-plugin.min.js',
        'https://player.ikmz.cc/asset/js/mui-player-mobile-plugin.min.js',
        'https://player.ikmz.cc/asset/js/jquery.xctips.js',
        "https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/crypto-js/4.0.0/crypto-js.min.js",
        'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/hls.js/0.8.8/hls.light.min.js',
        'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/flv.js/1.5.0/flv.min.js', 
      ].map(u => globalFunction.createDOMElement({tag:"script",props:{src:u}})).forEach(s => document.head.appendChild(s))
      
      ${res};
      `)
      })
    })
    return webview;
  }

  reload() {
    const webview = document.querySelector('webview') as CustomWebView;
    webview && webview.getAttribute('finish') && webview.executeJavaScript('location.reload()');
  }


  updatePos(e: any) {
    console.log(e.target.value);
    this.dir = e.target.value
  }
}
