import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportsRoutingModule } from './rapports-routing.module';
import { RapportsEquipementComponent } from './rapports-equipement/rapports-equipement.component';
import { RapportsPiecesRechangeComponent } from './rapports-pieces-rechange/rapports-pieces-rechange.component';
import { RapportsEntreSortieComponent } from './rapports-entre-sortie/rapports-entre-sortie.component';


@NgModule({
  declarations: [
    RapportsEquipementComponent,
    RapportsPiecesRechangeComponent,
    RapportsEntreSortieComponent
  ],
  imports: [
    CommonModule,
    RapportsRoutingModule
  ]
})
export class RapportsModule { }
