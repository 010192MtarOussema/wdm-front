import { AbstractEntity } from "./abstractEntity";
import { Preference } from "./Preference";
import { UserGroup } from "./userGroup";

export class UserGroupPreferenceValue extends AbstractEntity {

    userGroup : UserGroup ; 
    preference : Preference ; 
    value : string ;
  
}