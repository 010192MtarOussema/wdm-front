export class UserGroup {
    idUserGroup : number ; 
    name:string ; 
    description : string ; 
    status : string ;

    constructor(userGroupe){
        this.idUserGroup = userGroupe.idUserGroup ; 
        this.name = userGroupe.name ; 
        this.description = userGroupe.description ; 
        this.status = userGroupe.status;

    }
}