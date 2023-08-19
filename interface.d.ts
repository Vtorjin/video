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












