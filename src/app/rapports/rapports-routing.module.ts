import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapportsEntreSortieComponent } from './rapports-entre-sortie/rapports-entre-sortie.component';
import { RapportsEquipementComponent } from './rapports-equipement/rapports-equipement.component';
import { RapportsPiecesRechangeComponent } from './rapports-pieces-rechange/rapports-pieces-rechange.component';

const routes: Routes = [
  {
    path : 'rapports-equipement', 
    component : RapportsEquipementComponent
  },
  {
  path : 'rapports-entre-sortie', 
  component : RapportsEntreSortieComponent
},
{
  path : 'rapports-pieces-rechange', 
  component : RapportsPiecesRechangeComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RapportsRoutingModule { }
