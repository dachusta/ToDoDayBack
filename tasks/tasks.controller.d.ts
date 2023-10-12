import { TasksService } from './tasks.service';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    getList(req: any): Promise<any>;
    setList(req: any, tasks: any): Promise<void>;
}
