import type { NetLog } from "electron";
export declare class NetLogger {
    static instance: null | NetLogger;
    static getInstance(): NetLogger;
    netLog: NetLog;
    constructor();
    start(): void;
    stop(): void;
}
