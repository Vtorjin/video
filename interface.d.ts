interface errorMsg {
    message: string
    origin?: any
    stack: string
    name: string
    time: Date | string,
    type: "jsError" | "rejectionError"
}


type CustomEventName = "openOfficialWebsite" | "initApp" | 'updateSetting' | 'getPreloadJs' | 'updateInfo' | 'insertLibrary';

type CrawlerEventName = "captureM3u8Url" | 'downloadPause' | 'downloadStart' | 'downloadFinish' | 'downloadError';

interface CustomWindowAttr {
    // a:any
    isProd: boolean
    platform: string
    webviewPreloadUrl: string
    errStack: string[]
    pubCrawlerEvent: Function
    // addEventListener: Function
    addEventListener: (name: CrawlerEventName | CustomEventName, cb: Function) => void
    getPreloadJs: Function
    loadWebView: Function
    invokeEvent: Function
    showConTextMenu: Function
    moveWindowPos: Function
    createChildWindow: Function
    max: Function
    hide: Function
    show: Function
    quit: Function
    min: Function
    // zoomInWindow:Function
    // zoomInWindow:Function
    // zoomInWindow:Function
}

interface Window {
    videoApp: CustomWindowAttr
    DPlayer: any
    randomColor: () => string
    g: {
        vw: number,
        vh: number,
        cv:string,
        times: {
            s: number,
            e: number,
            r: number[]
        }
    }
    basic:{
        nm: string,
        fr: string,
        fn: string,
        lo: string,
        lp: string
        ls: string,
        tg: string[],
        insertEl: string
    }
}

interface OptionsList {
    value: string
    viewValue: string
}

interface ConfigItem {
    actor: string
    confId: string
    type: string
    host: string
    area: string
    age: string
}

interface NavCoverItem {
    ar: string
    dt: number
    fr: string
    id: string
    local: string
    nm: string
    ok: boolean
    qs: number
    img: string
    ud: boolean
}


interface VideoInfo extends NavCoverItem {
    lp: string
    ls: string
    lo: string
    tg: string
    vh: number
    vw: number
}


interface RestfulResponse {
    status: number
    msg: string
    data: any
}



