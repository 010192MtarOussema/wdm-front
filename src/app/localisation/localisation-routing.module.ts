import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalisationComponent } from './localisation.component';

const routes: Routes = [{
  path : 'localisation' , 
  component : LocalisationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalisationRoutingModule { }
