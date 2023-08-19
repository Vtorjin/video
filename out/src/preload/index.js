"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const default_json_1 = tslib_1.__importDefault(require("../../config/default.json"));
let errorStack = [];
electron_1.ipcRenderer.on('mainError', function (e, msg) {
    console.log(...arguments);
});
electron_1.contextBridge.exposeInMainWorld(default_json_1.default.ipcRenderName, {
    platform: process.platform,
    extensionUrl: "",
    errStack: errorStack,
    pubEventEmitter(eventName, data) {
        electron_1.ipcRenderer.invoke('eventEmitter', JSON.stringify({ name: eventName, data }));
    },
    addEventListener(tag, cb) {
        electron_1.ipcRenderer.on(tag, (e, msg) => {
            cb(msg);
        });
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
    createChildWindow() {
        electron_1.ipcRenderer.invoke("createChildWindow", ...arguments);
    },
});
global.sendMessageToHost = function () {
    console.log(...arguments, 'global');
};
process.on('uncaughtException', function (m) {
    m && console.log(...arguments);
});
