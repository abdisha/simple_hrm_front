import { Role } from './Role';

export class Users {
    id:string;
    userName:string;
    fullName:string;
    email:string;
    password:string;
    isLoggedIn:boolean;
    isLocked:boolean;
    role:Role[];

    
}