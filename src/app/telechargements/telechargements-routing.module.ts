import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TelechargementsComponent } from './telechargements.component';

const routes: Routes = [{
  path : 'telechargements' , 
  component : TelechargementsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelechargementsRoutingModule { }
