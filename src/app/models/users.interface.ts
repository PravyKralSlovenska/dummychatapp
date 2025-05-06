import { User } from "./user.interface";

export interface Users {
    users: User[];
    total: number;
    skip: number;
    limit: 30;
}