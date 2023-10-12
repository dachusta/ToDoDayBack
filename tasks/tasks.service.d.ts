import { FirebaseService } from '../firebase/firebase.service';
export declare class TasksService {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    getList(userId: any): Promise<any>;
    setList(userId: any, tasks: any): Promise<void>;
}
