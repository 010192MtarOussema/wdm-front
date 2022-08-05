import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlerteEquipementComponent } from './alerte-equipement/alerte-equipement.component';
import { AlerteSystemeComponent } from './alerte-systeme/alerte-systeme.component';
import { ComposantAvecAlertesComponent } from './composant-avec-alertes/composant-avec-alertes.component';
import { DeclencheurAlerteComponent } from './declencheur-alerte/declencheur-alerte.component';
import { EquipementAvecAlertesComponent } from './equipement-avec-alertes/equipement-avec-alertes.component';

const routes: Routes = [
  
  {
    path: 'declencheurs-alerts',
    component: DeclencheurAlerteComponent
  },
  {
    path: 'alerts-equipement',
    component: AlerteEquipementComponent
  },
  {
    path: 'alerte-systeme',
    component: AlerteSystemeComponent
  },
  {
    path: 'equipement-avec-alertes',
    component: EquipementAvecAlertesComponent
  },
  {
    path: 'composant-avec-alertes',
    component: ComposantAvecAlertesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveillanceFonctionnelleRoutingModule { }
