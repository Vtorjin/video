/// <reference types="node" />
declare class protocolManager {
    private sessionData;
    static instance: protocolManager | null;
    static getInstance(): protocolManager;
    constructor();
    registerScheme(name: string, config?: any): void;
    registerBufferProtocol(name: string, handle: (req: Electron.ProtocolRequest, cb: (response: Electron.ProtocolResponse | Buffer) => void) => void): void;
}
export default protocolManager;
