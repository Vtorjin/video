"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const default_json_1 = tslib_1.__importDefault(require("../../config/default.json"));
let errorStack = [];
var word = {
    platform: process.platform,
    webviewPreloadUrl: "",
    errStack: errorStack,
    pubEventEmitter(eventName, data) {
        electron_1.ipcRenderer.invoke('eventEmitter', JSON.stringify({ name: eventName, data }));
    },
    addEventListener(tag, cb) {
        electron_1.ipcRenderer.on(tag, (e, msg) => {
            cb(msg);
        });
    },
    invokeEvent(tag, data) {
        electron_1.ipcRenderer.invoke(tag, JSON.stringify({ data }));
    },
    getPreloadJs() {
        return new Promise((r, j) => {
            electron_1.ipcRenderer.on('getPreloadJs', (e, path) => {
                r(path);
            });
            electron_1.ipcRenderer.invoke('getPreloadJs');
        });
    },
    loadWebView(appId) {
        console.log('应用id', appId);
        electron_1.ipcRenderer.invoke('loadWebView', appId);
    },
    showConTextMenu() {
        electron_1.ipcRenderer.invoke('showConTextMenu');
    },
    moveWindowPos(x, y) {
        electron_1.ipcRenderer.send('drag-window', x, y);
    },
    createChildWindow() {
        electron_1.ipcRenderer.invoke("createChildWindow", ...arguments);
    },
    min() {
        electron_1.ipcRenderer.invoke('minimize-window');
    },
    max() {
        electron_1.ipcRenderer.invoke("maxWindowScreen", ...arguments);
    },
    hide() {
        electron_1.ipcRenderer.invoke("hide-window", ...arguments);
    },
    show() {
        electron_1.ipcRenderer.invoke('show-window');
    },
    quit() {
        electron_1.ipcRenderer.invoke('quit');
    }
};
electron_1.ipcRenderer.on('mainError', function (e, msg) {
    console.log(...arguments);
});
electron_1.ipcRenderer.on('updateInfo', (e, msg) => {
    console.log(typeof msg, msg);
    word.webviewPreloadUrl = "aapapap";
});
electron_1.contextBridge.exposeInMainWorld(default_json_1.default.ipcRenderName, word);
global.sendMessageToHost = function () {
    console.log(...arguments, 'global');
};
process.on('uncaughtException', function (m) {
    m && console.log(...arguments);
});
