import { app, BrowserWindow, ipcMain, protocol, Session, shell } from "electron";
import FileManager from "./core/fileManager";
import SystemManager from "./core/systemManager"
import { ChildProcess } from "child_process";
import _conf from "../../config/default.json";
export const isProduction = !!app.isPackaged;

class AppManager {

  public appTitle: string;
  public serverProcess: null | ChildProcess = null
  constructor(appTitle: string) {
    this.appTitle = appTitle;
    // 开启日志处理
    this.setupLogMiddleware();
    // 创建系统
    this.init();

    // 注册通信事件
    this.registerIpcEvent();
    this.registerAppEvent();

    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  }

  init() {
    var me = this;
    app.disableHardwareAcceleration(); //禁用硬件加速

    Promise.all([
      SystemManager.getInstance().startRecordTime(),
      FileManager.getInstance().initApplicationConfig(),
    ])
    app.whenReady().then(() => {
      // Cross-Origin Opener Policy (COOP) 是一个安全机制，用于限制不同源页面之间的交互。通过禁用该功能，可以允许不同源的页面在 Electron 应用程序中更自由地进行交互。
      app.commandLine.appendSwitch("disable-features", "CrossOriginOpenerPolicy")
      SystemManager.getInstance().createMainWindow();
    })
  }

  registerIpcEvent() {
    // ipc通信
    ipcMain.handle('eventEmitter', (event: Electron.IpcMainInvokeEvent, eventInfo: string) => {
      // const { name, data } = JSON.parse(eventInfo) as IpcEventFormat;

    })
    ipcMain.handle('getPreloadJs', (event: Electron.IpcMainInvokeEvent) => {
      SystemManager.getInstance().sendMessageToRender('getPreloadJs', FileManager.getInstance().getPreloadJsPath())
    })

    ipcMain.on('drag-window', (event, offsetX, offsetY) => {
      SystemManager.getInstance().updatePosition(offsetX, offsetY);
    });

    ipcMain.handle('hide-window', () => { SystemManager.getInstance().hideApp(); })
    ipcMain.handle('show-window', () => { SystemManager.getInstance().showApp(); })
    ipcMain.handle('quit', () => { SystemManager.getInstance().quitApp(); })
    ipcMain.handle('minimize-window', () => { SystemManager.getInstance().minimizeApp(); })
    ipcMain.handle('maxWindowScreen', () => { SystemManager.getInstance().maximizeApp() })
    ipcMain.handle('updateInfo', () => { SystemManager.getInstance().sendMessageToRender('updateInfo', FileManager.getInstance().getPreloadWebviewJsPath()) })
  }

  registerAppEvent() {
    app.on('activate', () => {
      const allWindows = BrowserWindow.getAllWindows()
      if (allWindows.length) {
        allWindows[0].focus()
      } else {
        SystemManager.getInstance().createMainWindow();
      }
    })

    app.on('window-all-closed', () => {
      SystemManager.getInstance().quitApp();
    })

    app.on('before-quit', () => {
    })
  }

  // 注册日志服务
  setupLogMiddleware() {
    process.on("uncaughtException", function (errInfo: Error, origin: NodeJS.UncaughtExceptionOrigin) {
      let sendMsg: errorMsg = {
        type: "jsError",
        message: String(errInfo),
        origin,
        stack: errInfo?.stack?.split("\n").at(1)?.split(FileManager.getInstance().getProjectPath()).pop() || "",
        name: errInfo.name,
        time: new Date().toLocaleString(),
      }
      // MainLogger.error(JSON.stringify(sendMsg));
      console.log('同步错误', sendMsg)
    })

    process.on("unhandledRejection", function (reason: Error, origin: any) {
      let sendMsg: errorMsg = {
        type: "rejectionError",
        message: String(reason),
        origin,
        stack: reason?.stack?.split("\n").at(1)?.split(FileManager.getInstance().getProjectPath()).pop() || "",
        name: reason.name,
        time: new Date().toLocaleString()
      }
      // MainLogger.error(JSON.stringify(sendMsg));
      console.log('异步错误', ...arguments);
    })

    // 异常监控测试
    // setTimeout(() => { console.log('结果报错!'); Promise.reject('ceshiyongd '); throw new Error('瓜皮外卖员') }, 5000);
  }

  handleError(msg: errorMsg) {
    var win = SystemManager.getInstance().topWin
    win !== null && win.webContents.send("errorHandler", msg);
  }
}




new AppManager(_conf.title);

