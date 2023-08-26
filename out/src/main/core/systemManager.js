"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const fileManager_1 = tslib_1.__importStar(require("./fileManager"));
const index_1 = require("../index");
const default_json_1 = tslib_1.__importDefault(require("../../../config/default.json"));
const sessionManager_1 = tslib_1.__importDefault(require("./sessionManager"));
class SystemManager {
    static instance = null;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new SystemManager();
        }
        return this.instance;
    }
    devUrl = process.env.VITE_DEV_SERVER_URL;
    topWin = null;
    webviewWin = null;
    childWin = null;
    usedTime;
    initFinished;
    constructor() {
        this.usedTime = 0;
        this.initFinished = false;
    }
    startRecordTime() {
        this.usedTime = Date.now();
    }
    endRecordTime() {
        this.usedTime = Date.now() - this.usedTime;
        if (!this.initFinished) {
            console.log('start used', this.usedTime);
        }
        this.initFinished = true;
    }
    createMainWindow() {
        const me = this;
        const win = new electron_1.BrowserWindow({
            title: "翻译助手",
            width: 1280,
            height: 840,
            icon: fileManager_1.default.getInstance().getLogoIconPath(),
            autoHideMenuBar: default_json_1.default.hideMenu,
            frame: false,
            webPreferences: {
                sandbox: false,
                webSecurity: false,
                allowRunningInsecureContent: true,
                enableBlinkFeatures: "OverlayScrollbars",
                nodeIntegration: true,
                nodeIntegrationInWorker: false,
                webviewTag: true,
                javascript: true,
                plugins: true,
                preload: (0, fileManager_1.joinFilePath)(__dirname, "../../preload/index.js"),
            },
        });
        sessionManager_1.default.getInstance().overrideWebRequest();
        me.topWin = win;
        Promise.all([me.loadMainWINView(win), me.createCustomSystemMenu(win)]);
    }
    getWindowWidthAndHeight() {
        var win = this.topWin?.getBounds();
        return {
            width: win?.width || 1280,
            height: win?.height || 800
        };
    }
    createChildWindow(url) {
        var me = this;
        var childWin = new electron_1.BrowserWindow({
            width: 1000,
            height: 700,
            y: 140,
            webPreferences: {
                sandbox: true,
                preload: (0, fileManager_1.joinFilePath)(__dirname, "../preload/index.js"),
            }
        });
        me.childWin = childWin;
        console.log('子路由', url);
        childWin.loadURL(url);
    }
    createCustomSystemMenu(win) {
        const mainMenu = electron_1.Menu.buildFromTemplate([
            {
                label: "控制台",
                accelerator: "F12",
                click: () => win.webContents.toggleDevTools()
            },
            {
                label: "重新加载",
                click: () => {
                    win.reload();
                },
                "accelerator": "F5"
            }, {
                label: "打开App控制台",
                accelerator: "F6",
                click: () => {
                    win.webContents.executeJavaScript(`document.querySelector('webview')&&document.querySelector('webview').openDevTools()`);
                }
            }, {
                label: "打开子窗口控制台",
                accelerator: "F7",
                click: () => win.webContents.openDevTools({ mode: "detach" })
            }
        ]);
        electron_1.Menu.setApplicationMenu(mainMenu);
    }
    createApplicationTray() {
        var appIcon = new electron_1.Tray(fileManager_1.default.getInstance().getTrayLogoPath());
        const menu = electron_1.Menu.buildFromTemplate([
            {
                label: '设置',
                click: function () { }
            },
            {
                label: '退出',
                click: function () { electron_1.app.quit(); }
            }
        ]);
        appIcon.setToolTip('翻译小助手');
        appIcon.setContextMenu(menu);
    }
    loadMainWINView(win) {
        if (index_1.isProduction) {
            win.loadFile(fileManager_1.default.getInstance().getDistHtml());
        }
        else {
            win.loadURL(fileManager_1.default.getInstance().getDevHtml());
            win.show();
        }
        win.webContents.addListener('did-finish-load', () => {
            this.endRecordTime();
        });
    }
    loadChildWinFile(t) {
        this.childWin?.webContents?.openDevTools();
    }
    updatePosition(offsetX, offsetY) {
        if (this.topWin == null)
            return;
        const position = this.topWin.getPosition();
        this.topWin.setPosition(position[0] + offsetX, position[1] + offsetY);
    }
    popupMessage(text) {
        electron_1.dialog.showMessageBox({ message: text });
    }
    showApp() {
        this.topWin && this.topWin.show();
    }
    hideApp() {
        this.topWin && this.topWin.hide();
    }
    maximizeApp() {
        this.topWin && (this.topWin.setFullScreen(!this.topWin.isFullScreen()));
    }
    minimizeApp() {
        this.topWin && this.topWin.minimize();
    }
    quitApp() {
        this.childWin = null;
        this.topWin = null;
        if (process.platform !== 'darwin')
            electron_1.app.quit();
        process.exit();
    }
    sendMessageToRender(name, data) {
        this.topWin?.webContents.send(name, typeof data === 'string' ? data : JSON.stringify(data));
    }
    handleError(errInfo) {
        this.topWin?.webContents.send("errorHandler", errInfo);
    }
}
exports.default = SystemManager;
