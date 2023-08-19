declare class TaskManager {
    static instance: TaskManager | null;
    static getInstance(): TaskManager;
    constructor();
}
export default TaskManager;
