import { app, dialog, Menu, Tray, BrowserWindow, } from "electron";
import FileManager, { joinFilePath } from "./fileManager";
import { isProduction } from "../index";
import conf from "../../../config/default.json"
class SystemManager {
  static instance: SystemManager | null = null;
  static getInstance() {
    if (this.instance == null) {
      this.instance = new SystemManager();
    }
    return this.instance;
  }

  public devUrl: string | undefined = process.env.VITE_DEV_SERVER_URL;
  public topWin: BrowserWindow | null = null;
  public webviewWin: BrowserWindow | null = null;
  public childWin: BrowserWindow | null = null;


  private usedTime: number
  private initFinished: boolean

  constructor() {
    this.usedTime = 0;
    this.initFinished = false;
  }

  // 开始计时
  startRecordTime() {
    this.usedTime = Date.now();
  }

  endRecordTime() {
    this.usedTime = Date.now() - this.usedTime

    if (!this.initFinished) {
      console.log('start used', this.usedTime)
    }
    this.initFinished = true;
  }

  // 创建主系统
  createMainWindow(): void {
    const me = this;
    const win = new BrowserWindow({
      title: "翻译助手",
      width: 1280,
      height: 840,
      icon: FileManager.getInstance().getLogoIconPath(),
      autoHideMenuBar: conf.hideMenu,
      webPreferences: {
        sandbox: false,
        webSecurity: false, // 允许加载本地和远程的资源
        allowRunningInsecureContent: true, // 允许加载不安全的内容
        enableBlinkFeatures: "OverlayScrollbars", //tranBox的源码配置
        nodeIntegration: true,
        nodeIntegrationInWorker: false,
        webviewTag: true, //允许使用webview
        javascript: true,
        plugins: true,
        preload: joinFilePath(__dirname, "../../preload/index.js"),
      },
    });

    //自定义请求头,是为了解决直接请求whatApp时服务器拿不到userAgent，出现版本号低的情况
    // SessionManager.getInstance().overrideWebRequest();
    // 加载line
    // SessionManager.getInstance().loadChromeLineExtension();
    // 绑定主进程的window对象
    me.topWin = win;
    // 自定义file协议操作
    Promise.all([me.loadMainWINView(win), me.createCustomSystemMenu(win)]);
  }

  getWindowWidthAndHeight(): { width: number, height: number } {
    var win = this.topWin?.getBounds();
    return {
      width: win?.width || 1280,
      height: win?.height || 800
    }
  }

  // 创建子系统
  createChildWindow(url: string) {
    var me = this;
    var childWin = new BrowserWindow({
      width: 1000,
      height: 700,
      y: 140,
      webPreferences: {
        sandbox: true,
        preload: joinFilePath(__dirname, "../preload/index.js"),
      }
    });
    me.childWin = childWin;
    console.log('子路由', url)
    childWin.loadURL(url)
  }

  // 创建应用主要菜单
  createCustomSystemMenu(win: BrowserWindow) {
    const mainMenu = Menu.buildFromTemplate([
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
          // win.webContents.toggleDevTools();
          win.webContents.executeJavaScript(`document.querySelector('.el-tab-pane[aria-hidden="false"] webview[finish="true"]').openDevTools()`)
        }
      }, {
        label: "打开子窗口控制台",
        accelerator: "F7",
        click: () => win.webContents.openDevTools({ mode: "detach" })
      }]
    );

    Menu.setApplicationMenu(mainMenu);
  }


  // 创建托盘
  createApplicationTray() {
    var appIcon = new Tray(FileManager.getInstance().getTrayLogoPath());
    const menu = Menu.buildFromTemplate([
      {
        label: '设置',
        click: function () { } //打开相应页面
      },
      {
        label: '退出',
        click: function () { app.quit() }
      }
    ])
    appIcon.setToolTip('翻译小助手');
    appIcon.setContextMenu(menu);
  }

  // 主窗口加载html资源的同时,需要开启http服务
  loadMainWINView(win: BrowserWindow) {


    if (isProduction) {
      win.loadFile(FileManager.getInstance().getDistHtml())
    }
    else {
      win.loadURL(FileManager.getInstance().getDevHtml())
      win.show();
    }
    win.webContents.addListener('did-finish-load', () => {
      this.endRecordTime();
    })
  }

  loadChildWinFile(t: string) {
    this.childWin?.webContents?.openDevTools();
  }


  //主进程弹出消息
  popupMessage(text: string) {
    dialog.showMessageBox({ message: text })
  }

  hideApp() {

  }

  quitApp() {
    this.childWin = null;
    this.topWin = null;
    if (process.platform !== 'darwin') app.quit()
  }

  sendMessageToRender(name: CustomEventName, data: string | object | undefined) {
    this.topWin?.webContents.send(name, typeof data === 'string' ? data : JSON.stringify(data))
  }

  // 处理异常
  handleError(errInfo: Error) {
    this.topWin?.webContents.send("errorHandler", errInfo);
  }
}




export default SystemManager;