interface errorMsg {
    message: string
    origin?: any
    stack: string
    name: string
    time: Date | string,
    type: "jsError" | "rejectionError"
}


type CustomEventName = "openOfficialWebsite" | "initApp" | 'translateWord' | "translateInput" |
    'translateBeforeSend' | 'beforeSendInApp' | "sendTransResponse" | 'updateSetting'
    | 'clearTransAppCache' | 'changeTransAppCache' | 'openBusinessLine' | 'getPreloadJs';




interface CustomWindowAttr {
    platform: string
    extensionUrl: string
    errStack: string[]
    pubEventEmitter: Function
    addEventListener: Function
    getPreloadJs: Function
    loadWebView: Function
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











