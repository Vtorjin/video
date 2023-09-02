import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  // url = "https://www.yinhuadm.cc/p/10310-1-1.html";
  url = "https://www.baidu.com";
  js = "";

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
    private router: ActivatedRoute,
    private http: HttpService
  ) {

  }

  ngOnInit() {
    const me = this;
    const root = document.querySelector('#webview');
    this.router.queryParams.subscribe((res: any) => {
      this.url = res.href || localStorage.getItem('url') || "https://www.baidu.com";
      this.js = res.js || localStorage.getItem('js') || '';
      localStorage.setItem('url', this.url);
      localStorage.setItem('js', this.js)
    })

    root && root.append(this.createWebView())
    window.videoApp.addEventListener('captureM3u8Url', function (url: string) {
      if (me.play_url == url) return;
      me.play_url = url;

      console.log(url)
    })

  }

  ngAfterViewInit() {
    this.initVideoOptions();
  }

  initVideoOptions() {
    setTimeout(() => {
      console.log('aa', this.setting);
      this.actors = this.setting.getActor();
      this.ages = this.setting.getAge();
      this.areas = this.setting.getArea();
      this.types = this.setting.getType();
    });
  }

  // create a webview dom
  createWebView() {
    const webview = document.createElement('webview') as unknown as CustomWebView;
    const me = this;
    webview.src = this.url;
    webview.style.height = "100%"
    // webview.setAttribute('preload', 'http://localhost:3880/angular/js/3.js')
    webview.setAttribute('preload', 'D:\\angular\\video\\out\\src\\preload\\webview.js')
    webview.setAttribute('nodeIntegration', 'true')
    webview.setAttribute('webpreferences', "webSecurity=no,nativeWindowOpen=yes, spellcheck=no, contextIsolation=no")
    webview.setAttribute('allowtransparency', 'true');
    webview.setAttribute('disablewebsecurity', 'true');
    webview.setAttribute('allowpopups', 'true');
    webview.setAttribute('plugin', 'true');
    // webview.addEventListener('did-finish-load', async function () {
    webview.addEventListener('dom-ready', async function () {

      me.isReady = true;
      // alert(2343)
      webview.setAttribute('finish', 'true'); //初始化结束
      await me.executeJs(webview, me)
    })
    return webview;
  }

  executeJs(webview: CustomWebView, context: this) {
    console.log(context.js)
    this.js = this.js || localStorage.getItem('js') || '';
    context.js && webview.executeJavaScript(context.js)
  }

  // reload webview
  reload() {
    const webview = document.querySelector('webview') as CustomWebView;
    webview && webview.getAttribute('finish') && webview.executeJavaScript('location.reload()');
  }
  // update direction
  updatePos(e: any) {
    console.log(e.target.value);
    this.dir = e.target.value
  }

  back() {
    let js = `history.back()`;
    let webview = document.querySelector('webview') as CustomWebView
    webview.executeJavaScript(js);
  }

  createCover() {
    let js = `globalFunction.createVideoCover()`;
    let webview = document.querySelector('webview') as CustomWebView
    webview.executeJavaScript(js);
  }

  // create a playing video dom
  play() {
    // alert(this.play_url);
    let js = `globalFunction && globalFunction.createVideoIntoPage('.player-box-main', '${this.play_url}')`;
    let webview = document.querySelector('webview') as CustomWebView
    webview.executeJavaScript(js);
    fetch(this.play_url).then(r => r.text()).then(res => {
      console.log('本地地址', res);
      res.includes('http') ? this.generateLocalM3U8Text(res) : this.generateNetworkRequests(res, this.play_url.slice(0, this.play_url.lastIndexOf('/') + 1))
    }).catch(e => {
      alert(e.message)
    })
  }

  //生成网络请求地址队列
  generateNetworkRequests(m3u8Text: string, prefix: string) {
    const lines = m3u8Text.split('\n');
    const networkRequests = [];
    for (const line of lines) {

      if (line.includes('.ts')) {
        const filename = line.trim();
        networkRequests.push(`${prefix}${filename}`);
      } else if (line.includes('.key')) {
        const uriMatch = line.match(/URI="([^"]+)"/);
        if (uriMatch) {
          const uri = uriMatch[1];
          const uriParts = uri.split('/');
          const filenameWithQuery = uriParts.pop();
          if (filenameWithQuery) {
            const filename = filenameWithQuery.split('?')[0];
            networkRequests.push(`${prefix}${filename}`);
          }
        }
      }
    }

    console.log(networkRequests);
  }

  generateLocalM3U8Text(m3u8Text: string): string {
    const lines = m3u8Text.split('\n');
    const rewrittenLines: string[] = [];
    for (const line of lines) {
      if (line.startsWith('#EXT-X-KEY')) {
        const uriMatch = line.match(/URI="([^"]+)"/);
        if (!uriMatch) { continue; }
        const uri = uriMatch[1];
        const uriParts = uri.split('/');
        const poppedPart = uriParts.pop();
        if (!poppedPart) { continue; }
        const filename = poppedPart.split('?')[0];
        const rewrittenLine = line.replace(uri, filename);
        rewrittenLines.push(rewrittenLine);
      } else if (line.includes('.ts')) {
        const filenameWithQuery = line.split('/').pop();
        if (!filenameWithQuery) { continue; }
        const filename = filenameWithQuery.split('?')[0];
        rewrittenLines.push(filename);
      } else {
        rewrittenLines.push(line);
      }
    }
    return rewrittenLines.join('\n');
  }

  setTime(str: "start" | 'end' | 'multiple') {
    const webview = document.querySelector('webview') as CustomWebView;
    webview && webview.executeJavaScript(`globalFunction.setTime('${str}')`)
  }

  createGlobal() {
    return `
    var my_setting = {
      start:0,
      end: 0,
      times:[] 
    }
    `
  }
}
