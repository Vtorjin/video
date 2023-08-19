"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainLogger = void 0;
const tslib_1 = require("tslib");
const electron_log_1 = tslib_1.__importDefault(require("electron-log"));
const fileManager_1 = tslib_1.__importDefault(require("../../core/fileManager"));
electron_log_1.default.transports.file.fileName = "日志错误报告.log";
electron_log_1.default.transports.file.format = `[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}`;
electron_log_1.default.transports.file.maxSize = 1002430;
electron_log_1.default.transports.file.resolvePath = () => fileManager_1.default.getInstance().getMainLogPath();
console.log(fileManager_1.default.getInstance().getMainLogPath(), '异常日志报告');
class MainLogger {
    static info(...argus) {
        electron_log_1.default.info(...argus);
    }
    static error(...argus) {
        electron_log_1.default.error(...argus);
    }
    static warn(...argus) {
        electron_log_1.default.warn(...argus);
    }
}
exports.MainLogger = MainLogger;
