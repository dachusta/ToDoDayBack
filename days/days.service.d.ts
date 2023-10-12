import { FirebaseService } from '../firebase/firebase.service';
import { BotService } from '../bot/bot.service';
export declare class DaysService {
    private readonly firebaseService;
    private readonly botService;
    constructor(firebaseService: FirebaseService, botService: BotService);
    getList(userId: any): Promise<any>;
    setList(userId: any, days: any): Promise<void>;
    setTaskTime(userId: any, dayId: any, taskUniqId: any, time: any): Promise<void>;
    setTaskDone(userId: any, dayId: any, taskUniqId: any, checked: any): Promise<void>;
    scheduler(userId: any): Promise<void>;
    onApplicationBootstrap(): Promise<void>;
}
