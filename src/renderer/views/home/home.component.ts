import { Component } from '@angular/core';

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
  src = "https://www.yinhuadm.cc/p/10310-1-1.html";
  ngOnInit() {
    document.querySelector('#webview')?.append(this.createWebView())
  }

  createWebView() {
    const webview = document.createElement('webview') as CustomWebView;
    webview.src = this.src;
    webview.style.height = "100%"
    webview.addEventListener('dom-ready', function () {
      // fetch(`http://localhost:3880/video/setting`)
      //   .then(r => r.json())
      //   .then(r => {
      //     // console.log(r);
      //     webview.executeJavaScript(r.data);
      //   })
    })
    return webview;
  }


}
