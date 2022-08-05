import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcComponent } from './parc/parc.component';

const routes: Routes = [{
  path : 'parc', 
  component : ParcComponent
},
{
  path : 'equipement-systeme', 
  component : ParcComponent
},
{
  path : 'journaux-systeme', 
  component : ParcComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveillanceSystemeRoutingModule { }
