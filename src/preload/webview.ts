import { ipcRenderer, contextBridge } from "electron";
import _conf from "../../config/default.json";


let errorStack: string[] = [];

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

let m3u8 = ""





console.log('执行成功!')


var t: any = null;



t = setInterval(() => {
  document.querySelectorAll('a').forEach(a => { a.target = "_self"; })
  let win = window.top as any;
  let play = (window as any).MacPlayer;
  if (m3u8) return;
  if (win?.player_aaaa && win.player_aaaa.url) {
    m3u8 = win.player_aaaa.url;
  }
  if (document.body && /http\S*.m3u8/g.test(document.body.innerHTML)) {
    m3u8 = (document.body as any).innerHTML.match(/http\S*.m3u8/g).pop().replace(/\\/g, '');
    m3u8 = m3u8.slice(0, m3u8.indexOf('.m3u8') + 5)
    m3u8 = 'http' + m3u8.split('http').pop()
  }
  if (play && play?.PlayUrl) {
    m3u8 = play.PlayUrl;
  }

  m3u8 && console.log('存在url', m3u8);
  if (m3u8) return

  document.querySelectorAll('iframe').length !== 0 ? document.querySelectorAll('iframe').forEach(iframe => {
    console.log('有注入呢')
    var iframeWindow = iframe.contentWindow as any;
    var xhr = iframeWindow.XMLHttpRequest;
    // console.log(iframeWindow, origin);
    // 重写 XMLHttpRequest.open 方法，拦截发送的请求
    var open = xhr.prototype.open;
    xhr.prototype.open = function (method, url) {
      this.onload = function (e) {
        if (e.target.responseURL.indexOf('.m3u8') !== -1) {
          console.log('存在么m3u8', e.target.responseURL, document.title);
          // if (window.top) {
          //   window.top.document.body.style.backgroundColor = getRandomColor();
          // } else {
          //   document.body.style.backgroundColor = getRandomColor();
          // }
        }
        // if (e.target.responseURL.indexOf('.ts') !== -1) {
        // console.log('存在么m3u8', e.target.responseURL, document.title)
        // }
      }
      // 调用原生的 XMLHttpRequest.open 方法
      open.apply(this, arguments);
    };
  }) : (() => {
    var xhr = window.XMLHttpRequest;
    var open = xhr.prototype.open;
    xhr.prototype.open = function (method, url) {
      this.onload = function (e) {
        if (e.target.responseURL.indexOf('.m3u8') !== -1) {
          console.log('存在么m3u8', e.target.responseURL, document.title)
          document.body.style.backgroundColor = getRandomColor();
          // if (window.top) {
          //   window.top.document.body.style.backgroundColor = getRandomColor();
          // } else {
          //   document.body.style.backgroundColor = getRandomColor();
          // }
        }

      }
      // 调用原生的 XMLHttpRequest.open 方法
      open.apply(this, arguments);
    };
  })();
}, 50);

ipcRenderer.on('mainError', function (e: Event, msg: string) {
  console.log(...arguments);
})




contextBridge.exposeInMainWorld('videoApp', {
  platform: process.platform,
  webviewPreloadUrl: "",
  errStack: errorStack,
  getRandomColor,
  // 通信内容格式
  pubEventEmitter(eventName: CustomEventName, data?: any) {
    ipcRenderer.invoke('eventEmitter', JSON.stringify({ name: eventName, data }));
  },

  addEventListener(tag: CustomEventName, cb: Function) {
    ipcRenderer.on(tag, (e: Event, msg: string) => {
      cb(msg);
    })
  },

  invokeEvent(tag: string, data: any) {
    ipcRenderer.invoke(tag, JSON.stringify({ data }));
  },

  getPreloadJs() {
    return new Promise((r, j) => {
      ipcRenderer.on('getPreloadJs', (e, path: string) => {
        r(path)
      })
      ipcRenderer.invoke('getPreloadJs');
    })
  },

  loadWebView(appId: string) {
    console.log('应用id', appId,)
    ipcRenderer.invoke('loadWebView', appId)
  },

  showConTextMenu() {
    ipcRenderer.invoke('showConTextMenu')
  },

  moveWindowPos(x: number, y: number) {
    ipcRenderer.send('drag-window', x, y);
  },

  createChildWindow() {
    ipcRenderer.invoke("createChildWindow", ...arguments);
  },

  min() {
    ipcRenderer.invoke('minimize-window')
  },

  max() {
    ipcRenderer.invoke("maxWindowScreen", ...arguments);
  },

  hide() {
    ipcRenderer.invoke("hide-window", ...arguments);
  },

  show() {
    ipcRenderer.invoke('show-window')
  },

  quit() {
    ipcRenderer.invoke('quit');
  }
});


contextBridge.exposeInMainWorld('globalFunction', {
  createDOMElement({ tag, id, classList, text, props }) {
    const element = document.createElement(tag);
    id && (element.id = id);
    classList && Array.isArray(classList) && element.classList.add(...classList);
    text && (element.textContent = text);
    props && typeof props === 'object' && Object.keys(props).forEach(prop => element.setAttribute(prop, props[prop]));
    return element;
  },
  getMu8Url(url: string) {
    return url.match(/\bhttps?:\/\/[^\s/$.?#].[^\s]*\.m3u8\b/g) ? url.match(/\bhttps?:\/\/[^\s/$.?#].[^\s]*\.m3u8\b/g)[0] : ""
  },
  
  createHeader(doms: HTMLMetaElement[] | HTMLLinkElement[] | HTMLScriptElement[]) {
    if (Object.prototype.toString.call(doms).slice(8, -1) !== 'Array') {
      throw new Error('参数必须是数组!')
    }
    doms.map(dom => document.head.appendChild(dom));
  }
})

global.sendMessageToHost = function () {
  console.log(...arguments, 'global');
}

process.on('uncaughtException', function (m) {
  console.log(m.message)
  // m && console.log(...arguments);
  m.message.includes('Blocked a frame with origin ') && t && clearInterval(t);
})
