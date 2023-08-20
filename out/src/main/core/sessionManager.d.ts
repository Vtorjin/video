declare class SessionManager {
    private sessionData;
    static instance: SessionManager | null;
    static getInstance(): SessionManager;
    constructor();
    overrideWebRequest(): void;
}
export default SessionManager;
