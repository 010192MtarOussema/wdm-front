import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatsComponent } from './certificats.component';

const routes: Routes = [{
  path : 'certificats', 
  component : CertificatsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatsRoutingModule { }
