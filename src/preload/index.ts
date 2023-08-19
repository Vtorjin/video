import { ipcRenderer, contextBridge } from "electron";
import _conf from "../../config/default.json";
 
 let errorStack: string[] = [];

ipcRenderer.on('mainError', function (e: Event, msg: string) {
  console.log(...arguments);
})

contextBridge.exposeInMainWorld(_conf.ipcRenderName, {
  platform: process.platform,
  extensionUrl: "",
  errStack: errorStack,
  // 通信内容格式
  pubEventEmitter(eventName: CustomEventName, data?: any) {
    ipcRenderer.invoke('eventEmitter', JSON.stringify({ name: eventName, data }));
  },

  addEventListener(tag: CustomEventName, cb: Function) {
    ipcRenderer.on(tag, (e: Event, msg: string) => {
      cb(msg);
    })
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
  createChildWindow() {
    ipcRenderer.invoke("createChildWindow", ...arguments);
  },

})

global.sendMessageToHost = function () {
  console.log(...arguments, 'global');
}

process.on('uncaughtException', function (m) {
  m && console.log(...arguments);
})
