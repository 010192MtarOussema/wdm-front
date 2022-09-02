import { AbstractEntity } from "./abstractEntity";

export class UserGroup extends AbstractEntity {
    name:string ; 
    description : string ; 
    status : string ;
    users: [] ; 
    userGroupPreferenceValues : [] ;

    constructor(){
        super();
    }
 
}