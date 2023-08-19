"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
class protocolManager {
    sessionData;
    static instance;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new protocolManager();
        }
        return this.instance;
    }
    constructor() {
        this.sessionData = new Map();
    }
    registerScheme(name, config) {
        electron_1.protocol.registerSchemesAsPrivileged([{
                scheme: name,
                privileges: {
                    secure: false,
                    standard: true,
                    ...config
                }
            }]);
    }
    registerBufferProtocol(name, handle) {
        electron_1.protocol.registerBufferProtocol(name, handle);
    }
}
exports.default = protocolManager;
