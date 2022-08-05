import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterielRoutingModule } from './materiel-routing.module';
import { MaterielMaintenanceComponent } from './materiel-maintenance/materiel-maintenance.component';
import { MaterielComposantsComponent } from './materiel-composants/materiel-composants.component';
import { MaterielPiecesRechangesComponent } from './materiel-pieces-rechanges/materiel-pieces-rechanges.component';
import { MaterielEquipementComponent } from './materiel-equipement/materiel-equipement.component';


@NgModule({
  declarations: [
    MaterielMaintenanceComponent,
    MaterielComposantsComponent,
    MaterielPiecesRechangesComponent,
    MaterielEquipementComponent
  ],
  imports: [
    CommonModule,
    MaterielRoutingModule
  ]
})
export class MaterielModule { }
