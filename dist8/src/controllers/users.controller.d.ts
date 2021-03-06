import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class UsersController {
    private userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<Array<User>>;
    getUserByKey(token: any): Promise<any>;
    getUserByID(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    updateUser(id: number, user: User): Promise<boolean>;
}
