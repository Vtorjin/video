"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetLogger = void 0;
const electron_1 = require("electron");
const fileManager_1 = require("../../core/fileManager");
class NetLogger {
    static instance = null;
    static getInstance() {
        return this.instance === null ? new NetLogger() : this.instance;
    }
    netLog;
    constructor() {
        this.netLog = electron_1.netLog;
    }
    start() {
        this.netLog.startLogging((0, fileManager_1.joinFilePath)(__dirname, "../../", 'logs'));
    }
    stop() {
        this.netLog.stopLogging();
    }
}
exports.NetLogger = NetLogger;
