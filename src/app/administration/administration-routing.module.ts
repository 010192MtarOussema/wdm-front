import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './gestions-utilisateurs/edit-user/edit-user.component';
import { GestionsUtilisateursComponent } from './gestions-utilisateurs/gestions-utilisateurs.component';
import { NewUserComponent } from './gestions-utilisateurs/new-user/new-user.component';
import { AddNewGroupeComponent } from './groupes-utilisateurs/add-new-groupe/add-new-groupe.component';
import { EditGroupeComponent } from './groupes-utilisateurs/edit-groupe/edit-groupe.component';
import { GroupesUtilisateursComponent } from './groupes-utilisateurs/groupes-utilisateurs.component';

const routes: Routes = [

  {
    path: 'list-utilisateurs',
    component: GestionsUtilisateursComponent
  },
  {
    path: 'groupes-utilisateurs',
    component: GroupesUtilisateursComponent
  },
  {
    path: 'add-new-user',
    component: NewUserComponent
  },
  {
    path: 'edit-user',
    component: EditUserComponent
  },
  {
    path: 'add-groupe',
    component: AddNewGroupeComponent
  },
  {
    path: 'edit-groupe',
    component: EditGroupeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
