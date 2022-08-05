import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveillanceFonctionnelleRoutingModule } from './surveillance-fonctionnelle-routing.module';
import { DeclencheurAlerteComponent } from './declencheur-alerte/declencheur-alerte.component';
import { AlerteEquipementComponent } from './alerte-equipement/alerte-equipement.component';
import { AlerteSystemeComponent } from './alerte-systeme/alerte-systeme.component';
import { EquipementAvecAlertesComponent } from './equipement-avec-alertes/equipement-avec-alertes.component';
import { ComposantAvecAlertesComponent } from './composant-avec-alertes/composant-avec-alertes.component';


@NgModule({
  declarations: [
    DeclencheurAlerteComponent,
    AlerteEquipementComponent,
    AlerteSystemeComponent,
    EquipementAvecAlertesComponent,
    ComposantAvecAlertesComponent
  ],
  imports: [
    CommonModule,
    SurveillanceFonctionnelleRoutingModule
  ]
})
export class SurveillanceFonctionnelleModule { }
