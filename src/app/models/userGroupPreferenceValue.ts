import { Preference } from "./Preference";
import { UserGroup } from "./userGroup";

export class UserGroupPreferenceValue  {
    id : number ; 
    userGroup : UserGroup ; 
    preference : Preference ; 
    value : string ;
  
}