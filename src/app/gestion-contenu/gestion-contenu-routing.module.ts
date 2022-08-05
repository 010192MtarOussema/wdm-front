import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionContenuComponent } from './gestion-contenu.component';

const routes: Routes = [{
  path : 'gestion-contenu',
  component : GestionContenuComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionContenuRoutingModule { }
