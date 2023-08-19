import { Worker } from 'worker_threads';
import { existsSync, mkdirSync } from "fs";
import { join, sep } from "path"
import FileManager, { isExist, joinFilePath, removeFileSync, writeFile } from './fileManager';


// 任务管理类
class TaskManager {
  static instance: TaskManager | null
  static getInstance() {
    if (this.instance == null) {
      this.instance = new TaskManager()
    }
    return this.instance;
  }

  constructor() {

  }
}


export default TaskManager
