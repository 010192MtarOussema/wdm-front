import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveillanceSystemeRoutingModule } from './surveillance-systeme-routing.module';
import { ParcComponent } from './parc/parc.component';
import { JournauxSystemeComponent } from './journaux-systeme/journaux-systeme.component';
import { EquipementSystemeComponent } from './equipement-systeme/equipement-systeme.component';


@NgModule({
  declarations: [
    ParcComponent,
    JournauxSystemeComponent,
    EquipementSystemeComponent
  ],
  imports: [
    CommonModule,
    SurveillanceSystemeRoutingModule
  ]
})
export class SurveillanceSystemeModule { }
