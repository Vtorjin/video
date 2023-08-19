"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importStar(require("path"));
const https_1 = tslib_1.__importDefault(require("https"));
const worker_threads_1 = require("worker_threads");
const isExist = (_path) => {
    return fs_1.default.existsSync(_path);
};
const removeFile = (p) => {
    return fs_1.default.rmSync(p);
};
const isFolderExist = (folderName) => {
    return fs_1.default.statSync(folderName).isDirectory() && fs_1.default.existsSync(folderName);
};
const writeStream = (file) => {
    return fs_1.default.createWriteStream(file, { autoClose: true });
};
const getDirName = (p) => {
    return path_1.default.dirname(p);
};
const getBaseName = (file) => {
    return path_1.default.basename(file);
};
const getFileSize = (file) => {
    return isExist(file) ? Number(fs_1.default.statSync(file).size) : 0;
};
const removeFileSync = (file) => {
    isExist(file) && fs_1.default.rmSync(file);
};
const removeSpaceCharacter = (str) => {
    return str ? str.replace(/(\s*)|(\r)|(\n)/g, '') : "";
};
const joinFilePath = (...args) => {
    return (0, path_1.join)(...args);
};
let global = {
    folder: "",
    port: 0,
    net: 0,
    suc: [],
    cur: "",
    err: [],
    white: [],
    timer: null,
    times: 0,
    rc: {}
};
function initGlobal() {
    global = {
        folder: "",
        port: 0,
        net: 0,
        suc: [],
        err: [],
        white: [],
        timer: null,
        times: 0,
        cur: "",
        rc: {}
    };
}
function send(name, data) {
    worker_threads_1.parentPort?.postMessage({ name, data });
}
async function Download(url, origin) {
    const ts = joinFilePath(global.folder, origin.slice(0, origin.includes('?') ? origin.indexOf('?') : origin.length));
    global.cur = ts;
    if (isExist(ts)) {
        removeFile(ts);
    }
    ;
    global.rc[origin] = 0;
    (0, axios_1.default)({
        url,
        method: "GET",
        responseType: "stream",
        timeout: 5000,
        httpsAgent: new https_1.default.Agent({
            rejectUnauthorized: false,
        }),
    }).then((response) => {
        if (!["0", undefined, ''].includes(response?.data?.headers?.['content-length'])) {
            if (isFolderExist(global.folder)) {
                let writer = writeStream(ts);
                response.data.pipe(writer);
                writer.on('close', () => {
                    global.times = 0;
                    global.net = ((Number(getFileSize(ts) - global.rc[origin])) || 0);
                    delete global.rc[origin];
                    timer(() => { send('ts-ok', null); }, 50);
                });
            }
        }
    }).catch(e => {
        global.times++;
        if (e?.response?.status == 404) {
            global.times = 0;
            send('ts-404', url);
            return;
        }
        if (global.times >= 3) {
            timer(() => { send('ts-failed', url); }, 50);
        }
        else {
            global.times++;
            timer(() => { Download(url, origin); }, 50);
        }
    });
}
function timer(fn, time) {
    let _timer = setTimeout(() => {
        fn();
        _timer && clearTimeout(_timer);
        _timer = null;
    }, time);
}
global.folder = worker_threads_1.workerData.folder;
global.port = worker_threads_1.workerData.port;
worker_threads_1.workerData.task ? Download(worker_threads_1.workerData.task, worker_threads_1.workerData.task.split('/').pop()) : send('ts-finish', null);
function updateNetInfo() {
    global.timer = setInterval(() => {
        Object.keys(global.rc).forEach((key) => {
            let cache = Number(global.rc[key]) || 0;
            let newFileSize = getFileSize(joinFilePath(global.folder, key));
            global.net += Number((Number(newFileSize) - cache));
            global.rc[key] = Number(newFileSize);
        });
        var net = global.net;
        global.net = 0;
        send('net-info', { net });
    }, 1000);
}
updateNetInfo();
process.on('task-over', () => {
    initGlobal();
    send('ts-finish', null);
});
process.on('cancel', () => {
    removeFile(global.cur);
    send('ts-cancel', global.cur);
});
worker_threads_1.parentPort && worker_threads_1.parentPort.on('message', (msg) => {
    const { name, data } = msg;
    switch (name) {
        case "next": {
            const origin = data.url.split('/').pop();
            global.folder = data.vp;
            Download(data.url, origin.slice(0, origin.includes('?') ? origin.indexOf('?') : origin.length));
            !global.timer && updateNetInfo();
            return;
        }
        case "pause": {
            removeFile(global.cur);
            send('ts-cancel', global.cur);
            global.timer && clearInterval(global.timer);
            global.timer = null;
            return;
        }
    }
});
process.on('unhandledRejection', function (e) {
    console.log(e);
});
