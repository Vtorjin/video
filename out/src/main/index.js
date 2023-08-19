"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProduction = void 0;
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const fileManager_1 = tslib_1.__importDefault(require("./core/fileManager"));
const systemManager_1 = tslib_1.__importDefault(require("./core/systemManager"));
const default_json_1 = tslib_1.__importDefault(require("../../config/default.json"));
exports.isProduction = !!electron_1.app.isPackaged;
class AppManager {
    appTitle;
    serverProcess = null;
    constructor(appTitle) {
        this.appTitle = appTitle;
        this.setupLogMiddleware();
        this.init();
        this.registerIpcEvent();
        this.registerAppEvent();
        process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    }
    init() {
        var me = this;
        electron_1.app.disableHardwareAcceleration();
        Promise.all([
            systemManager_1.default.getInstance().startRecordTime(),
            fileManager_1.default.getInstance().initApplicationConfig(),
        ]);
        electron_1.app.whenReady().then(() => {
            electron_1.app.commandLine.appendSwitch("disable-features", "CrossOriginOpenerPolicy");
            systemManager_1.default.getInstance().createMainWindow();
        });
    }
    registerIpcEvent() {
        electron_1.ipcMain.handle('eventEmitter', (event, eventInfo) => {
        });
        electron_1.ipcMain.handle('getPreloadJs', (event) => {
            systemManager_1.default.getInstance().sendMessageToRender('getPreloadJs', fileManager_1.default.getInstance().getPreloadJsPath());
        });
    }
    registerAppEvent() {
        electron_1.app.on('activate', () => {
            const allWindows = electron_1.BrowserWindow.getAllWindows();
            if (allWindows.length) {
                allWindows[0].focus();
            }
            else {
                systemManager_1.default.getInstance().createMainWindow();
            }
        });
        electron_1.app.on('window-all-closed', () => {
            systemManager_1.default.getInstance().quitApp();
        });
        electron_1.app.on('before-quit', () => {
        });
    }
    setupLogMiddleware() {
        process.on("uncaughtException", function (errInfo, origin) {
            let sendMsg = {
                type: "jsError",
                message: String(errInfo),
                origin,
                stack: errInfo?.stack?.split("\n").at(1)?.split(fileManager_1.default.getInstance().getProjectPath()).pop() || "",
                name: errInfo.name,
                time: new Date().toLocaleString(),
            };
            console.log('同步错误', sendMsg);
        });
        process.on("unhandledRejection", function (reason, origin) {
            let sendMsg = {
                type: "rejectionError",
                message: String(reason),
                origin,
                stack: reason?.stack?.split("\n").at(1)?.split(fileManager_1.default.getInstance().getProjectPath()).pop() || "",
                name: reason.name,
                time: new Date().toLocaleString()
            };
            console.log('异步错误', ...arguments);
        });
    }
    handleError(msg) {
        var win = systemManager_1.default.getInstance().topWin;
        win !== null && win.webContents.send("errorHandler", msg);
    }
}
new AppManager(default_json_1.default.title);
