import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionContenuRoutingModule } from './gestion-contenu-routing.module';
import { GestionContenuComponent } from './gestion-contenu.component';


@NgModule({
  declarations: [
    GestionContenuComponent
  ],
  imports: [
    CommonModule,
    GestionContenuRoutingModule
  ]
})
export class GestionContenuModule { }
