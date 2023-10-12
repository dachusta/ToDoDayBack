export declare class FirebaseService {
    read(userId: string, path: string): Promise<any>;
    write(userId: string, path: string, data: any): Promise<void>;
    getUsers(): Promise<any>;
    setUser(userId: string): Promise<void | "Already exists">;
}
