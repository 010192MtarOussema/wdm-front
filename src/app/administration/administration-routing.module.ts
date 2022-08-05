import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionsUtilisateursComponent } from './gestions-utilisateurs/gestions-utilisateurs.component';
import { GroupesUtilisateursComponent } from './groupes-utilisateurs/groupes-utilisateurs.component';

const routes: Routes = [

  {
    path: 'list-utilisateurs',
    component: GestionsUtilisateursComponent
  }, {
    path: 'groupes-utilisateurs',
    component: GroupesUtilisateursComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
