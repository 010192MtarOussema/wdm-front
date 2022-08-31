import { AbstractEntity } from "./abstractEntity";

export class Terminology extends AbstractEntity {

    name :  string ; 
    description : string ; 
    terminology : Terminology ; 
    terminologies : [] ;

}