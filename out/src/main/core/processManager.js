"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaskManager {
    static instance;
    static getInstance() {
        if (this.instance == null) {
            this.instance = new TaskManager();
        }
        return this.instance;
    }
    constructor() {
    }
}
exports.default = TaskManager;
