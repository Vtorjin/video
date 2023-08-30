import { session, Session } from "electron";
import SystemManager from "./systemManager";

class SessionManager {
    private sessionData: Map<string, string>
    static instance: SessionManager | null
    static getInstance() {
        if (this.instance == null) {
            this.instance = new SessionManager()
        }
        return this.instance;
    }
    constructor() {
        this.sessionData = new Map();
    }

    overrideWebRequest() {
        session.defaultSession.webRequest.onBeforeSendHeaders({
            urls: ['<all_urls>']
        }, (details, callback) => {
            callback({
                requestHeaders: {
                    ...details.requestHeaders,
                    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                },
            })
        })
    }

    overrideWebResponse() {
        session.defaultSession.webRequest.onHeadersReceived({
            urls: ['<all_urls>']
        }, (details, callback) => {
            details.url.includes('.m3u8') && console.log(details.url, '响应的地址')
            details.url.includes('.m3u8') && SystemManager.getInstance().sendMessageToRender('captureM3u8Url', details.url)
            callback({
                responseHeaders: {
                    ...details.responseHeaders
                }
            })
        })
    }
}

export default SessionManager