export class User {
    id:number ; 
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
    constructor(user) {
        {
          this.id = user.id;
          this.status = user.status ;
          this.loginName = user.avatar  ;
          this.pseudo = user.fName  ;
          this.picture = user.lName  ;
          this.email = user.email ;
          this.firstName = user.firstName ;
        
         
        }
      }
}