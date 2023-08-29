import { ipcRenderer, contextBridge } from "electron";
import _conf from "../../config/default.json";

let errorStack: string[] = [];

var word: CustomWindowAttr = {
  platform: process.platform,
  webviewPreloadUrl: "",
  errStack: errorStack,
  // 通信内容格式
  pubCrawlerEvent(eventName: CustomEventName, data?: any) {
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
}


ipcRenderer.on('mainError', function (e: Event, msg: string) {
  console.log(...arguments);
})

ipcRenderer.on('updateInfo', (e: Event, msg: any) => {
  console.log(typeof msg, msg)
  word.webviewPreloadUrl = "aapapap"
})



contextBridge.exposeInMainWorld(_conf.ipcRenderName, word);

global.sendMessageToHost = function () {
  console.log(...arguments, 'global');
}

process.on('uncaughtException', function (m) {
  m && console.log(...arguments);
})
