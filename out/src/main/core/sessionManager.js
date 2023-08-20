"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class SessionManager {
    sessionData;
    static instance;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new SessionManager();
        }
        return this.instance;
    }
    constructor() {
        this.sessionData = new Map();
    }
    overrideWebRequest() {
        electron_1.session.defaultSession.webRequest.onBeforeSendHeaders({
            urls: ['<all_urls>']
        }, (details, callback) => {
            callback({
                requestHeaders: {
                    ...details.requestHeaders,
                    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
                },
            });
        });
    }
}
exports.default = SessionManager;
