import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
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
  // url = "http://hsck.cc";

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

  play_url = "";

  constructor(
    private setting: SettingService,
    private router: Router,
    private http: HttpService
  ) {

  }

  ngOnInit() {
    const me = this;
    document.querySelector('#webview')?.append(this.createWebView())
    window.videoApp.addEventListener('captureM3u8Url', function (url: string) {
      console.log(url)
      me.play_url = url;
    })

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
      me.executeJs(webview, me)
    })
    return webview;
  }

  executeJs(webview: CustomWebView, context: this) {
    context.http.get('angular/js/hsck.cc.js').subscribe(res => {
      console.log(res);
     webview.executeJavaScript(res.data)
    })

  }

  reload() {
    const webview = document.querySelector('webview') as CustomWebView;
    webview && webview.getAttribute('finish') && webview.executeJavaScript('location.reload()');
  }

  play() {
    // alert(this.play_url);
    (document.querySelector('webview') as CustomWebView).executeJavaScript(`
    console.log(videoApp)
    globalFunction && globalFunction.createVideoIntoPage('.player-box-main', '${this.play_url}')
    `)
  }


  updatePos(e: any) {
    console.log(e.target.value);
    this.dir = e.target.value
  }
}
