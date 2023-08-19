"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeEncodeFile = exports.writeFile = exports.readFileSync = exports.readFile = exports.joinFilePath = exports.removeSpaceCharacter = exports.removeFileSync = exports.getFileSize = exports.getBaseName = exports.getDirName = exports.writeStream = exports.createFolderRecursive = exports.isFolderExist = exports.isFileExist = exports.removeFile = exports.isExist = exports.normalize = void 0;
const tslib_1 = require("tslib");
const electron_1 = require("electron");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importStar(require("path"));
const os_1 = require("os");
const crypto = tslib_1.__importStar(require("crypto"));
const normalize = (_path) => {
    return path_1.default.normalize(_path);
};
exports.normalize = normalize;
const isExist = (_path) => {
    return fs_1.default.existsSync(_path);
};
exports.isExist = isExist;
const removeFile = (p) => {
    return fs_1.default.rmSync(p);
};
exports.removeFile = removeFile;
const isFileExist = (file) => {
    return fs_1.default.existsSync(file);
};
exports.isFileExist = isFileExist;
const isFolderExist = (folderName) => {
    return fs_1.default.statSync(folderName).isDirectory() && fs_1.default.existsSync(folderName);
};
exports.isFolderExist = isFolderExist;
const createFolderRecursive = (folderPath) => {
    let lists = folderPath.split(path_1.default.sep).slice(1);
    let currentPath = folderPath.slice(0, folderPath.indexOf(path_1.default.sep));
    lists.forEach(p => {
        currentPath = (0, path_1.join)(currentPath, p);
        !fs_1.default.existsSync(currentPath) && fs_1.default.mkdirSync(currentPath);
    });
};
exports.createFolderRecursive = createFolderRecursive;
const writeStream = (file) => {
    return fs_1.default.createWriteStream(file, { autoClose: true });
};
exports.writeStream = writeStream;
const getDirName = (p) => {
    return path_1.default.dirname(p);
};
exports.getDirName = getDirName;
const getBaseName = (file) => {
    return path_1.default.basename(file);
};
exports.getBaseName = getBaseName;
const getFileSize = (file) => {
    return (0, exports.isExist)(file) ? Number(fs_1.default.statSync(file).size) : 0;
};
exports.getFileSize = getFileSize;
const removeFileSync = (file) => {
    (0, exports.isExist)(file) && fs_1.default.rmSync(file);
};
exports.removeFileSync = removeFileSync;
const removeSpaceCharacter = (str) => {
    return str ? str.replace(/(\s*)|(\r)|(\n)/g, '') : "";
};
exports.removeSpaceCharacter = removeSpaceCharacter;
const joinFilePath = (...args) => {
    return (0, path_1.join)(...args);
};
exports.joinFilePath = joinFilePath;
const readFile = (url, suc, err) => {
    fs_1.default.readFile(url, (_err, data) => {
        if (_err) {
            err(_err);
        }
        else {
            suc(data);
        }
    });
};
exports.readFile = readFile;
const readFileSync = (url, contentType) => {
    return fs_1.default.readFileSync(url, contentType || "utf-8");
};
exports.readFileSync = readFileSync;
const writeFile = (file, content, contentType) => {
    fs_1.default.writeFileSync(file, content, contentType || "utf-8");
};
exports.writeFile = writeFile;
const writeEncodeFile = (file, content) => {
    fs_1.default.writeFileSync(file, content);
};
exports.writeEncodeFile = writeEncodeFile;
class FileManager {
    static instance = null;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new FileManager();
        }
        return this.instance;
    }
    macAddress = "";
    recordFilePath = "";
    constructor() {
    }
    initMacAddress() {
        const macAddresses = [];
        const interfaces = (0, os_1.networkInterfaces)();
        const sha1sum = crypto.createHash('sha1');
        for (const interfaceName in interfaces) {
            const iface = interfaces[interfaceName] || [];
            for (const address of iface) {
                if (address.mac && address.mac !== '00:00:00:00:00:00' && !address.internal) {
                    macAddresses.push(address.mac);
                }
            }
        }
        if (macAddresses[0]) {
            sha1sum.update(macAddresses[0], 'utf8');
            const uuid = sha1sum.digest('hex');
            this.recordFilePath = (0, exports.joinFilePath)(electron_1.app.getPath('userData'), 'WebStorage', uuid);
            this.writeRecordData({ ahahah: "测试的内容", t: '采购和d' });
            console.log(this.recordFilePath, '根据mac生成的记录地址是', this.getRecordData());
        }
        else {
            sha1sum.update('macAddresses[0]', 'utf8');
            const uuid = sha1sum.digest('hex');
            this.recordFilePath = (0, exports.joinFilePath)(electron_1.app.getPath('userData'), 'WebStorage', uuid);
            console.log(this.recordFilePath, '自定义的记录地址是');
            this.writeRecordData();
        }
    }
    initApplicationConfig() {
        const folder = this.getTransCacheFolder();
        const confNamesAddress = (0, exports.joinFilePath)(folder, 'config.txt');
        console.log(confNamesAddress, '??????');
        (0, exports.createFolderRecursive)(folder);
    }
    getProjectPath() {
        return electron_1.app.isPackaged ? (0, path_1.join)(electron_1.app.getAppPath(), '../') : electron_1.app.getAppPath();
    }
    getTrayLogoPath() {
        return electron_1.app.isPackaged ? (0, path_1.join)(electron_1.app.getAppPath(), "../", "logo.png") : (0, path_1.join)(electron_1.app.getAppPath(), "public/logo.ico");
    }
    getLogoIconPath() {
        return `D:\\vue3.0\\translator\\resources\\logox64.ico`;
    }
    getDevHtml() {
        return `http://localhost:4200/`;
    }
    getDistHtml() {
        return (0, path_1.join)(electron_1.app.getAppPath(), "out", "renderer", "index.html");
    }
    getTestHtml() {
        return `https://www.bing.com/search?q=mysql&mkt=zh-CN`;
    }
    getClientHtml() {
        return (0, path_1.join)(electron_1.app.getAppPath(), "client.html");
    }
    getPreloadJsPath() {
        return (0, path_1.join)(this.getChromeModulePath(), 'dist', 'browser', 'index.js');
    }
    getMainLogPath() {
        return electron_1.app.isPackaged ? (0, exports.joinFilePath)(this.getUserDataPath('userData'), 'log', 'error.log') : (0, path_1.join)(electron_1.app.getAppPath(), 'logs/error.log');
    }
    getUserDataPath(name) {
        return electron_1.app.getPath(name);
    }
    getExtensionsRoot() {
        return (0, exports.joinFilePath)(electron_1.app.getAppPath(), "resources", 'extensions');
    }
    getExtensionPath() {
        return (0, exports.joinFilePath)(this.getExtensionsRoot(), '3.0.3_0');
    }
    getChromeModulePath() {
        return (0, exports.joinFilePath)(this.getExtensionsRoot(), 'chrome');
    }
    getTransCacheFolder() {
        return (0, exports.joinFilePath)(this.getUserDataPath('userData'), 'Trans');
    }
    writeRecordData(data) {
        (0, exports.writeEncodeFile)(this.recordFilePath, Buffer.from(JSON.stringify(data || null), 'utf8').toString('base64'));
    }
    getRecordData() {
        const jsonString = Buffer.from(fs_1.default.readFileSync(this.recordFilePath, 'utf8'), 'base64').toString('utf8');
        return JSON.parse(jsonString);
    }
}
exports.default = FileManager;
