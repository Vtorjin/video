/// <reference types="node" />
/// <reference types="node" />
import fs from "fs";
export declare const normalize: (_path: string) => string;
export declare const isExist: (_path: string) => boolean;
export declare const removeFile: (p: string) => void;
export declare const isFileExist: (file: string) => boolean;
export declare const isFolderExist: (folderName: string) => boolean;
export declare const createFolderRecursive: (folderPath: string) => void;
export declare const writeStream: (file: string) => fs.WriteStream;
export declare const getDirName: (p: string) => string;
export declare const getBaseName: (file: string) => string;
export declare const getFileSize: (file: any) => number;
export declare const removeFileSync: (file: string) => void;
export declare const removeSpaceCharacter: (str: string) => string;
export declare const joinFilePath: (...args: string[]) => string;
export declare const readFile: (url: string, suc: Function, err: Function) => void;
export declare const readFileSync: (url: string, contentType?: BufferEncoding) => string;
export declare const writeFile: (file: string, content: string, contentType?: BufferEncoding) => void;
export declare const writeEncodeFile: (file: string, content: any) => void;
declare class FileManager {
    static instance: null | FileManager;
    static getInstance(): FileManager;
    private macAddress;
    private recordFilePath;
    constructor();
    initMacAddress(): void;
    initApplicationConfig(): void;
    getProjectPath(): string;
    getTrayLogoPath(): string;
    getLogoIconPath(): string;
    getDevHtml(): string;
    getDistHtml(): string;
    getTestHtml(): string;
    getClientHtml(): string;
    getPreloadJsPath(): string;
    getMainLogPath(): string;
    getUserDataPath(name: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps'): string;
    getExtensionsRoot(): string;
    getExtensionPath(): string;
    getChromeModulePath(): string;
    getTransCacheFolder(): string;
    writeRecordData(data?: object): void;
    getRecordData(): any;
}
export default FileManager;
