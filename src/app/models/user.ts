import { AbstractEntity } from "./abstractEntity";

export class User extends AbstractEntity {
    status : string ;
    loginName : string;
    pseudo: string ;
    email : string;
    picture : string;
    firstName : string;
    lastName : string;
    realName : string;
    createdDate : string;
    updatedDate : string;
    lastVisitDate : string;
    failedLoginCount : string;
    passeword : string;
    lastModifyPassword :string;
    abilities :  [] ;
    userGroups : [];
    preferences :[];

      
}