import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterielComposantsComponent } from './materiel-composants/materiel-composants.component';
import { MaterielEquipementComponent } from './materiel-equipement/materiel-equipement.component';
import { MaterielMaintenanceComponent } from './materiel-maintenance/materiel-maintenance.component';
import { MaterielPiecesRechangesComponent } from './materiel-pieces-rechanges/materiel-pieces-rechanges.component';

const routes: Routes = [
  {
    path: 'equipements',
    component: MaterielEquipementComponent

  },
  {
    path: 'pieces-rechanges',
    component: MaterielPiecesRechangesComponent

  },
  {
    path: 'maintenance',
    component: MaterielMaintenanceComponent

  },
  {
    path: 'composants',
    component: MaterielComposantsComponent

  },
]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterielRoutingModule { }
