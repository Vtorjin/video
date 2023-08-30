interface errorMsg {
    message: string
    origin?: any
    stack: string
    name: string
    time: Date | string,
    type: "jsError" | "rejectionError"
}


type CustomEventName = "openOfficialWebsite" | "initApp" | 'updateSetting' | 'getPreloadJs' | 'updateInfo';

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






