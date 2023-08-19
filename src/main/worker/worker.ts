import axios from "axios";
import fs from "fs";
import path, { join } from "path";
import https from "https";
import { parentPort, workerData } from "worker_threads";

const isExist = (_path: string): boolean => {
    return fs.existsSync(_path)
};

const removeFile = (p: string) => {
    return fs.rmSync(p)
}

const isFolderExist = (folderName: string) => {
    return fs.statSync(folderName).isDirectory() && fs.existsSync(folderName)
}

const writeStream = (file: string) => {
    return fs.createWriteStream(file, { autoClose: true });
}
const getDirName = (p: string) => {
    return path.dirname(p);
}

const getBaseName = (file: string) => {
    return path.basename(file);
}

const getFileSize = (file): number => {
    return isExist(file) ? Number(fs.statSync(file).size) : 0;
}

const removeFileSync = (file: string) => {
    isExist(file) && fs.rmSync(file);
}

const removeSpaceCharacter = (str: string): string => {
    return str ? str.replace(/(\s*)|(\r)|(\n)/g, '') : ""
}


const joinFilePath = (...args: string[]) => {
    return join(...args);
}


interface WorkerGlobal {
    folder: string;
    port: number
    net: number,
    cur: string
    suc: string[],
    err: string[],
    white: string[]
    timer: null | NodeJS.Timer
    times: number,
    rc: {
        [key: string]: number
    }
}
let global: WorkerGlobal = {
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
}

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
    }

}

function send(name: string, data: any) {
    parentPort?.postMessage({ name, data });
}

async function Download(url: string, origin: string) {
    const ts = joinFilePath(global.folder, origin.slice(0, origin.includes('?') ? origin.indexOf('?') : origin.length))

    global.cur = ts;

    if (isExist(ts)) {
        removeFile(ts)
    };

    global.rc[origin] = 0;

    axios({
        url,
        method: "GET",
        responseType: "stream",
        timeout: 5000,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    }).then((response) => {
        if (!["0", undefined, ''].includes(response?.data?.headers?.['content-length'])) {
            if (isFolderExist(global.folder)) {
                let writer = writeStream(ts); // 创建写入对象
                response.data.pipe(writer);
                writer.on('close', () => {
                    global.times = 0;
                    // global.suc.push(url);
                    global.net = ((Number(getFileSize(ts) - global.rc[origin])) || 0);
                    delete global.rc[origin];
                    timer(() => { send('ts-ok', null) }, 50)
                })
            }
        }
    }).catch(e => {
        global.times++;
        // console.log(url,e?.response?.status);

        if (e?.response?.status == 404) {
            global.times = 0;
            // global.suc.push(url)
            send('ts-404', url)
            return;
        }
        if (global.times >= 3) {
            // global.err.push(url);
            timer(() => { send('ts-failed', url) }, 50)
        } else {
            global.times++;
            timer(() => { Download(url, origin) }, 50)
        }
    })

}

function timer(fn: Function, time: number) {
    let _timer: NodeJS.Timer | null = setTimeout(() => {
        fn();
        _timer && clearTimeout(_timer);
        _timer = null
    }, time)
}

global.folder = workerData.folder;
global.port = workerData.port;

// console.log("worker线程", process.pid)
workerData.task ? Download(workerData.task, workerData.task.split('/').pop()) : send('ts-finish', null)


// 定时更新下载信息
function updateNetInfo() {
    global.timer = setInterval(() => {
        Object.keys(global.rc).forEach((key) => {
            let cache: number = Number(global.rc[key]) || 0;
            let newFileSize: number = getFileSize(joinFilePath(global.folder, key));
            global.net += Number((Number(newFileSize) - cache));
            global.rc[key] = Number(newFileSize);
        });
        var net = global.net;
        global.net = 0;
        // send('net-info', { net, suc: global.suc.splice(0).length, err: global.err.splice(0), white: global.white.splice(0) })
        send('net-info', { net })

    }, 1000)
}

updateNetInfo();

process.on('task-over', () => {
    initGlobal();
    send('ts-finish', null)
})

process.on('cancel', () => {
    // console.log('暂停了', global.cur);
    removeFile(global.cur);
    send('ts-cancel', global.cur)
})


parentPort && parentPort.on('message', (msg: { name: string, data: any }): void => {
    const { name, data } = msg;
    // console.log(name, data)
    switch (name) {
        case "next": {
            // console.log(data)
            const origin = data.url.split('/').pop();
            global.folder = data.vp;
            Download(data.url, origin.slice(0, origin.includes('?') ? origin.indexOf('?') : origin.length));
            !global.timer && updateNetInfo()
            // console.log(global.folder)
            return
        }
        case "pause": {
            removeFile(global.cur);
            send('ts-cancel', global.cur)
            global.timer && clearInterval(global.timer)
            global.timer = null;
            return;
        }
    }
})

process.on('unhandledRejection', function (e) {
    console.log(e)
})