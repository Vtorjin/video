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
  url = "https://www.yinhuadm.cc/p/10310-1-1.html";
  // url = "https://www.baidu.com";
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

  dir = "bottom"

  play_url = "";

  tags: string[] = []   //视频类型

  size = 0

  ai: string = ""; //actor id
  ar: string = "" //area id
  ud: boolean = false
  selectedOption = 'false'

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
      root && root.append(this.createWebView())
    })

    window.videoApp.addEventListener('captureM3u8Url', function (url: string) {
      if (me.play_url == url) return;
      me.play_url = url;
      me.autoJs(`window.basic && globalFunction.createVideoIntoPage(basic.insertEl,"${url}")`)
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
    // webview.setAttribute('allowpopups', 'true');
    webview.setAttribute('plugin', 'true');
    // webview.addEventListener('did-finish-load', async function () {
    webview.addEventListener('dom-ready', async function () {
      console.log('dom准备欧克')
      const basic = await fetch(`http://localhost:3880/angular/file/basic.js`).then(r => r.text())
      me.isReady = true;
      webview.setAttribute('finish', 'true'); //初始化结束
      await me.autoJs(basic)
      await me.executeJs(webview, me)
    })
    return webview;
  }

  executeJs(webview: CustomWebView, context: this) {
    context.js = context.js || localStorage.getItem('js') || '';
    console.log(context.js)
    context.js && webview.executeJavaScript(context.js)
  }

  // reload webview
  reload() {
    const webview = document.querySelector('webview') as CustomWebView;
    webview && webview.getAttribute('finish') && webview.executeJavaScript('location.reload()');
  }

  resetTime() {
    this.autoJs(`globalFunction.resetTime()`)
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

  execute() {

  }

  // create a playing video dom
  play() {
    // alert(this.play_url);
    let js = `globalFunction && globalFunction.createVideoIntoPage('.player-box-main', '${this.play_url}')`;
    let webview = document.querySelector('webview') as CustomWebView
    webview.executeJavaScript(js);
    return new Promise((r) => {
      fetch(this.play_url).then(r => r.text()).then(res => {
        const isMixed = res.includes('http');
        const prefix = this.play_url.slice(0, this.play_url.lastIndexOf('/') + 1)
        // console.log('本地地址', res, res.indexOf('http'),prefix);
        r(isMixed ? this.generateLocalM3U8Text(res) : this.generateNetworkRequests(res, prefix))
      }).catch(e => {
        alert(e.message)
        r('')
      })
    })
  }

  autoJs(js: string) {
    let webview = document.querySelector('webview') as CustomWebView
    return webview.executeJavaScript(js);
  }

  //生成网络请求地址队列
  generateNetworkRequests(m3u8Text: string, prefix: string) {
    const lines = m3u8Text.split('\n');
    const networkRequests = [];
    let i = 0;
    for (const line of lines) {

      if (line.includes('.ts')) {
        const filename = line.trim();
        networkRequests.push(`${prefix}${filename}`);
        ++i;
      } else if (line.includes('.key')) {
        const uriMatch = line.match(/URI="([^"]+)"/);
        if (uriMatch) {
          const uri = uriMatch[1];
          const uriParts = uri.split('/');
          const filenameWithQuery = uriParts.pop();
          ++i;
          if (filenameWithQuery) {
            const filename = filenameWithQuery.split('?')[0];
            networkRequests.push(`${prefix}${filename}`);
          }
        }
      } else {
        networkRequests.push(line)
      }
    }
    // console.log(networkRequests);
    this.size = i
    // console.log('前缀', networkRequests)
    return networkRequests.join('\n');
  }

  generateLocalM3U8Text(m3u8Text: string): string {
    const lines = m3u8Text.split('\n');
    const rewrittenLines: string[] = [];
    let i = 0;
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
        ++i;
      } else if (line.includes('.ts')) {
        const filenameWithQuery = line.split('/').pop();
        if (!filenameWithQuery) { continue; }
        const filename = filenameWithQuery.split('?')[0];
        rewrittenLines.push(filename);
        i++;
      } else {
        rewrittenLines.push(line);
      }
    }
    console.log('原始', rewrittenLines)
    return rewrittenLines.join('\n');
  }

  setTime(str: "start" | 'end' | 'multiple') {
    const webview = document.querySelector('webview') as CustomWebView;
    webview && webview.executeJavaScript(`globalFunction.setTime('${str}','${str === 'multiple' ? 'a' : ''}')`)
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

  changeOption(e: any, type: "ar" | 'ai' | 'tg' | 'age' | 'ud') {
    const val = e.target.value
    switch (type) {
      case "ai": {
        if (val == '') return;

        this.ai = val;
        return;
      }
      case "ar": {
        if (val == '') return;

        this.ar = val;
        return;
      }
      case "tg": {
        if (val == '') return;

        const desc = this.types.find(t => t.value === val)?.viewValue || ''
        if (desc) {
          this.tags.push(desc);
        }
        return
      }
      case "age": {
        if (val == '') return;

        const desc = this.ages.find(t => t.value === val)?.viewValue || ''
        if (desc) {
          this.tags.push(desc);
        }
        return

      }
      case "ud": {
        // console.log(e.target.getAttribute('value'))
        // this.
        return
      }

    }
  }

  async saveVideo() {
    const config = await this.autoJs('videoApp.getWebViewGlobal()');
    const info = await this.autoJs('basic');
    const m3u8 = await this.play();
    const id = Date.now() + '';
    const name = info.nm;
    const code = info.nm.match(/[\w]+[_-][\w]+/gi)?.shift() || info.nm.match(/[\w]{4,}/g)?.shift();
    const body = {
      ...config,
      ...info,
      fn: info.fr + info.nm.replace(code + code, code),
      text: m3u8,
      ci: id + '.png', //cover id
      cd: code || `unknown-${id}`, //code
      dt: 0,
      dl: true,
      ou: this.play_url,
      sz: 0,
      tm: JSON.stringify(config.times),
      tg: this.tags.join(","),
      qs: this.size,
      qs_ok: 0,
      ai: this.ai, //actor id
      ar: this.ar,  //area
      // ud: false,
      local: "",
      ok: false,
      m3u8Mid: id + '.m3u8',
      srcCid: id + 'png',
    }

    const query = name.match(/[\w]+[_-][\w]+/gi)?.shift() || name.match(/[\w]{4,}/g)?.shift()?.length >= 5 ? name.match(/[\w]{4,}/g)?.shift() : name;
    if (query === '') {
      alert('搜索的内容是空的!')
      return;
    }
    fetch(`http://localhost:3880/video/query?name=${query}`)
      .then(res => res.json())
      .then(res => {
        if (res.data.length !== 0) {
          alert('已存在查看')
          return;
        }

        fetch(`http://localhost:3880/video/save`, {
          method: "post",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then(res => res.json())
          .then((res: RestfulResponse) => {
            alert(JSON.stringify(res))
            console.log(res.status, res)
          })
        console.log(res);
      })

    console.log(body)
    // this.autoJs('videoApp.getWebViewGlobal()').then(res => {
    //   console.log(res);
    // })
  }
}
