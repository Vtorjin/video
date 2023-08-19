import { protocol } from "electron";
class protocolManager {
  private sessionData: Map<string, string>
  static instance: protocolManager | null
  static getInstance() {
    if (this.instance == null) {
      this.instance = new protocolManager()
    }
    return this.instance;
  }
  constructor() {
    this.sessionData = new Map();
  }

  registerScheme(name: string, config?) {
    protocol.registerSchemesAsPrivileged([{
      scheme: name,
      privileges: {
        secure: false,
        standard: true,
        ...config
      }
    }])
  }

  registerBufferProtocol(name: string, handle: (req: Electron.ProtocolRequest, cb: (response: Electron.ProtocolResponse | Buffer) => void) => void) {
    protocol.registerBufferProtocol(name, handle)

  }
}

export default protocolManager
