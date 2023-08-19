declare class Subscriber {
    name: string;
    cb: Function;
    constructor(name: string, cb: Function);
    update(...args: any[]): void;
}
declare class MessageManager {
    static instance: null | MessageManager;
    static getInstance(): MessageManager;
    listeners: Record<string, Subscriber[]>;
    constructor();
    sub(tag: string, cb: Function, name: string): void;
    pub(message: any): void;
    off(tag: any, name: any): void;
}
export default MessageManager;
