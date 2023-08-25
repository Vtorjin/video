import { BrowserWindow } from "electron";
declare class SystemManager {
    static instance: SystemManager | null;
    static getInstance(): SystemManager;
    devUrl: string | undefined;
    topWin: BrowserWindow | null;
    webviewWin: BrowserWindow | null;
    childWin: BrowserWindow | null;
    private usedTime;
    private initFinished;
    constructor();
    startRecordTime(): void;
    endRecordTime(): void;
    createMainWindow(): void;
    getWindowWidthAndHeight(): {
        width: number;
        height: number;
    };
    createChildWindow(url: string): void;
    createCustomSystemMenu(win: BrowserWindow): void;
    createApplicationTray(): void;
    loadMainWINView(win: BrowserWindow): void;
    loadChildWinFile(t: string): void;
    updatePosition(offsetX: any, offsetY: any): void;
    popupMessage(text: string): void;
    showApp(): void;
    hideApp(): void;
    maximizeApp(): void;
    minimizeApp(): void;
    quitApp(): void;
    sendMessageToRender(name: CustomEventName, data: string | object | undefined): void;
    handleError(errInfo: Error): void;
}
export default SystemManager;
