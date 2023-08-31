import { ipcRenderer, contextBridge } from "electron";
import _conf from "../../config/default.json";
let errorStack: string[] = [];


setInterval(() => {
  document.querySelectorAll('a').forEach(a => { a.target = "_self"; })
}, 50);

ipcRenderer.on('mainError', function (e: Event, msg: string) {
  console.log(...arguments);
})


contextBridge.exposeInMainWorld('videoApp', {
  platform: process.platform,
  webviewPreloadUrl: "",
  errStack: errorStack,

  // 通信内容格式
  pubCrawlerEvent(eventName: CustomEventName, data?: any) {
    ipcRenderer.invoke('eventEmitter', JSON.stringify({ name: eventName, data }));
  },

  addEventListener(tag: CustomEventName | CrawlerEventName, cb: Function) {
    ipcRenderer.on(tag, (e: Event, msg: string) => {
      cb(msg);
    })
  },

  invokeEvent(tag: string, data: any) {
    ipcRenderer.invoke(tag, JSON.stringify({ data }));
  },

  insertLibrary() {
    ipcRenderer.on('insertLibrary', function (e, data) {
      console.log(data);
      const { hls, js, css } = JSON.parse(data);
      const d1 = document.createElement('script')
      const d2 = document.createElement('script')
      const d3 = document.createElement('style')
      d1.innerHTML = hls;
      d2.innerHTML = js;
      d3.innerHTML = css
      document.head.append(d3);
      document.head.append(d1)
      document.head.append(d2);
      console.log(hls, js, css);
    })
    ipcRenderer.invoke('insertLibrary');
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
  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
  },
  createHeader(doms: HTMLMetaElement[] | HTMLLinkElement[] | HTMLScriptElement[]) {
    if (Object.prototype.toString.call(doms).slice(8, -1) !== 'Array') {
      throw new Error('参数必须是数组!')
    }
    doms.map(dom => document.head.appendChild(dom));
  },
  getVideoElement() {
    let video = document.querySelector('video');
    !video && Array.from(document.querySelectorAll('iframe')).forEach(iframe => {
      if (!!iframe.contentWindow.document.querySelector('video')) { video = iframe.contentWindow.document.querySelector('video') }
    })
    return video;
  },
  createVideoCover() {
    let video = this.getVideo && this.getVideo();
    if (!video) {
      console.log('视频无法获取')
      return;
    }
    let canvas; let ctx;
    if (document.querySelector('canvas')) {
      canvas = document.querySelector('canvas')
    } else {
      canvas = document.createElement('canvas'); document.body.append('canvas');
    }
    canvas.style.opacity = "0";
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // 当视频加载完成时
    video && (() => {
      const width = video.videoWidth;
      const height = video.videoHeight;
      const targetWidth = width > height ? 160 : 90; // 目标宽度
      const targetHeight = width > height ? 90 : 160; // 目标高度
      // 计算缩放比例
      const scaleX = targetWidth / width;
      const scaleY = targetHeight / height;
      const scale = Math.min(scaleX, scaleY);
      // 计算裁剪后的视频帧大小和位置
      const cropWidth = targetWidth / scale;
      const cropHeight = targetHeight / scale;
      const cropX = (width - cropWidth) / 2;
      const cropY = (height - cropHeight) / 2;
      // 设置Canvas的尺寸为目标大小
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 绘制缩放后的视频帧到Canvas上
      ctx.drawImage(video, cropX, cropY, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);
      // 将Canvas生成的图片数据URL设置为视频的封面
      const dataURL = canvas.toDataURL('image/png', 1.0);
      video.setAttribute('poster', dataURL);
    })();
  },

  createVideoIntoPage(containerSelector, url) {
    console.log(containerSelector, url)
    var scr = document.createElement('script');
    scr.innerHTML = `document.querySelector("${containerSelector}") && new DPlayer({
      container: document.querySelector("${containerSelector}"),
      theme: '#4C8FE8',
      volume: 1.0,
      preload: 'auto',
      // logo: logo,
      autoplay: true,
      video: {
        url:"${url}",
        type: 'auto'
      }
    })`
    document.head.append(scr);
  },
})

contextBridge.exposeInMainWorld('videoLibrary', {
  css: ``,
  hls: ``,
  DPlayer: ``
})

global.sendMessageToHost = function () {
  console.log(...arguments, 'global');
}

const a: CrawlerEventName = "captureM3u8Url";

ipcRenderer.on(a, function () {
  console.log(...arguments, 'webview')
})



process.on('uncaughtException', function (m) {
  console.log(m.message)
  // m && console.log(...arguments);
  m.message.includes('Blocked a frame with origin ')
})


function insertLibrary() {
  ipcRenderer.on('insertLibrary', function (e, data) {
    console.log(data);
    const { hls, js, css } = JSON.parse(data);
    const d1 = document.createElement('script')
    const d2 = document.createElement('script')
    const d3 = document.createElement('style')

    // DPlayer = eval(js);


    d1.innerHTML = hls;
    d2.innerHTML = js;
    d3.innerHTML = css
    document.head.append(d3);
    document.head.append(d1)
    document.head.append(d2);
    console.log(hls, js, css);
  })
  ipcRenderer.invoke('insertLibrary');
}

insertLibrary();