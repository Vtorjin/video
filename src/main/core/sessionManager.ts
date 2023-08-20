import { session, Session } from "electron";

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
}

export default SessionManager