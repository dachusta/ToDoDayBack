import { DaysService } from './days.service';
export declare class DaysController {
    private readonly daysService;
    constructor(daysService: DaysService);
    getList(req: any): Promise<any>;
    setList(req: any, days: any): Promise<void>;
    setTaskTime(req: any, { dayId, taskUniqId, time }: {
        dayId: any;
        taskUniqId: any;
        time: any;
    }): Promise<void>;
    setTaskDone(req: any, { dayId, taskUniqId, checked }: {
        dayId: any;
        taskUniqId: any;
        checked: any;
    }): Promise<void>;
}
