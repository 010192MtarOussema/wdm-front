import { AbstractEntity } from "./abstractEntity";

export class FunctionalDomain extends AbstractEntity {
    name : string ; 
    description : string ; 
    functionalDomain : FunctionalDomain ; 
    functionalDomains : [] ;
    roles : [] ;
}