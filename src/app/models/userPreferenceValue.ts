import { AbstractEntity } from "./abstractEntity";
import { Preference } from "./Preference";
import { User } from "./user";

export  class UserPreferenceValue extends AbstractEntity{
   user : User ; 
   preference : Preference ; 
   value : string ;

}