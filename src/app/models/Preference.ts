import { AbstractEntity } from "./abstractEntity";

export class Preference  extends AbstractEntity {
            
    name : string ; 
    description : string ; 
    valueType : string ; 
    defaultValue : string ; 
    possibleValue : string ; 
    userPreferenceValues : [] ; 
    userGroupPreferenceValues : [] ;




}