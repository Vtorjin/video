import { app } from "electron";
import fs from "fs";
import path, { join } from "path";
import { isProduction } from "../index";
import { networkInterfaces, NetworkInterfaceInfo } from 'os';
import * as crypto from 'crypto';


export const normalize = (_path: string) => {
  return path.normalize(_path)
}

export const isExist = (_path: string): boolean => {
  return fs.existsSync(_path)
};

export const removeFile = (p: string) => {
  return fs.rmSync(p)
}

export const isFileExist = (file: string) => {
  return fs.existsSync(file);
}

export const isFolderExist = (folderName: string) => {
  return fs.statSync(folderName).isDirectory() && fs.existsSync(folderName)
}

export const createFolderRecursive = (folderPath: string) => {
  let lists = folderPath.split(path.sep).slice(1);
  let currentPath = folderPath.slice(0, folderPath.indexOf(path.sep));
  lists.forEach(p => {
    currentPath = join(currentPath, p);
    !fs.existsSync(currentPath) && fs.mkdirSync(currentPath);
  })
}

export const writeStream = (file: string) => {
  return fs.createWriteStream(file, { autoClose: true });
}

export const getDirName = (p: string) => {
  return path.dirname(p);
}

export const getBaseName = (file: string) => {
  return path.basename(file);
}

export const getFileSize = (file): number => {
  return isExist(file) ? Number(fs.statSync(file).size) : 0;
}

export const removeFileSync = (file: string) => {
  isExist(file) && fs.rmSync(file);
}

export const removeSpaceCharacter = (str: string): string => {
  return str ? str.replace(/(\s*)|(\r)|(\n)/g, '') : ""
}


export const joinFilePath = (...args: string[]) => {
  return join(...args);
}

export const readFile = (url: string, suc: Function, err: Function) => {
  fs.readFile(url, (_err, data) => {
    if (_err) {
      err(_err);
    } else {
      suc(data);
    }
  })
};

export const readFileSync = (url: string, contentType?: BufferEncoding) => {
  return fs.readFileSync(url, contentType || "utf-8")
}

export const writeFile = (file: string, content: string, contentType?: BufferEncoding) => {
  fs.writeFileSync(file, content, contentType || "utf-8")
}

export const writeEncodeFile = (file: string, content) => {
  fs.writeFileSync(file, content);
}



class FileManager {
  static instance: null | FileManager = null;
  static getInstance() {
    if (this.instance == null) {
      this.instance = new FileManager()
    }
    return this.instance;
  }

  private macAddress: string = "";
  private recordFilePath: string = "";

  constructor() {
    // this.initMacAddress();
  }

  // 初始化获取mac地址
  initMacAddress() {
    const macAddresses: string[] = [];
    const interfaces = networkInterfaces();
    const sha1sum = crypto.createHash('sha1');
    for (const interfaceName in interfaces) {
      const iface: NetworkInterfaceInfo[] = interfaces[interfaceName] || [];
      for (const address of iface) {
        // 只获取物理网卡的 MAC 地址
        if (address.mac && address.mac !== '00:00:00:00:00:00' && !address.internal) {
          macAddresses.push(address.mac);
        }
      }
    }
    if (macAddresses[0]) {
      sha1sum.update(macAddresses[0], 'utf8');
      const uuid = sha1sum.digest('hex');
      this.recordFilePath = joinFilePath(app.getPath('userData'), 'WebStorage', uuid);
      this.writeRecordData({ ahahah: "测试的内容", t: '采购和d' });
      console.log(this.recordFilePath, '根据mac生成的记录地址是', this.getRecordData())
    } else {
      sha1sum.update('macAddresses[0]', 'utf8')
      const uuid = sha1sum.digest('hex');
      this.recordFilePath = joinFilePath(app.getPath('userData'), 'WebStorage', uuid);
      console.log(this.recordFilePath, '自定义的记录地址是');
      this.writeRecordData();
    }
  }

  // 初始化应用配置
  initApplicationConfig() {
    const folder = this.getTransCacheFolder();
    const confNamesAddress = joinFilePath(folder, 'config.txt');
    console.log(confNamesAddress, '??????')
    createFolderRecursive(folder);

  }

  // 获取应用运行时,可以自由操作的默认本地路径
  getProjectPath(): string {
    return app.isPackaged ? join(app.getAppPath(), '../') : app.getAppPath();
  }

  //获取托盘路径
  getTrayLogoPath(): string {
    return app.isPackaged ? join(app.getAppPath(), "../", "logo.png") : join(app.getAppPath(), "public/logo.ico");
  }

  // logo地址
  getLogoIconPath() {
    return `D:\\vue3.0\\translator\\resources\\logox64.ico`
    // return isProduction ? "logo.png" : joinFilePath(__dirname, '..', 'renderer', 'logo.png')
  }


  getDevHtml(): string {
    return `http://localhost:4200/`
  }


  getDistHtml(): string {
    return join(app.getAppPath(), "out", 'src', "renderer", "index.html");
  }

  getDistHtml2(): string {
    return `D:\\Program Files\\VideoHunter YouTube Downloader\\resources\\app\\html\\downloader.html`
  }

  getTestHtml() {
    return `https://www.bing.com/search?q=mysql&mkt=zh-CN`
  }


  getClientHtml(): string {
    return join(app.getAppPath(), "client.html");
  }

  getPreloadJsPath() {
    return join(this.getChromeModulePath(), 'dist', 'browser', 'index.js')
  }

  getPreloadWebviewJsPath() {
    return join(app.getAppPath())
  }



  getMainLogPath() {
    return app.isPackaged ? joinFilePath(this.getUserDataPath('userData'), 'log', 'error.log') : join(app.getAppPath(), 'logs/error.log')
  }

  getUserDataPath(name: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps') {
    return app.getPath(name)
  }

  getExtensionsRoot() {
    return joinFilePath(app.getAppPath(), "resources", 'extensions');
  }

  // line插件地址
  getExtensionPath() {
    // return `D:\\vtor\\translator\\resources\\extensions\\3.0.3_0`
    return joinFilePath(this.getExtensionsRoot(), '3.0.3_0')
  }

  getChromeModulePath() {
    return joinFilePath(this.getExtensionsRoot(), 'chrome')
  }

  // 获取翻译缓存目录
  getTransCacheFolder() {
    return joinFilePath(this.getUserDataPath('userData'), 'Trans')
  }

  // 写入记录文件
  writeRecordData(data?: object) {
    writeEncodeFile(this.recordFilePath, Buffer.from(JSON.stringify(data || null), 'utf8').toString('base64'))
  }

  // 获取记录文件
  getRecordData() {
    const jsonString = Buffer.from(fs.readFileSync(this.recordFilePath, 'utf8'), 'base64').toString('utf8');
    return JSON.parse(jsonString)
  }

}

export default FileManager;
