import { AbstractEntity } from "./abstractEntity";
import { FunctionalDomain } from "./functionalDomain";

export class Role  extends AbstractEntity {
    
    description : string ; 
    abilities : [] ; 
    functionalDomain : FunctionalDomain ; 
    
}