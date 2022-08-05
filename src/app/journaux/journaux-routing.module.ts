import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournauxComponent } from './journaux.component';

const routes: Routes = [{
  path : 'journaux' , 
  component : JournauxComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JournauxRoutingModule { }
