import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { GroupesUtilisateursComponent } from './groupes-utilisateurs/groupes-utilisateurs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatMenuModule } from '@angular/material/menu';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { DeleteDialogComponent } from './groupes-utilisateurs/delete/delete.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GestionsUtilisateursComponent } from './gestions-utilisateurs/gestions-utilisateurs.component';
import { BlockUserComponent } from './gestions-utilisateurs/block-user/block-user.component';
import { NewUserComponent } from './gestions-utilisateurs/new-user/new-user.component';
import { EditUserComponent } from './gestions-utilisateurs/edit-user/edit-user.component';
import { AddNewGroupeComponent } from './groupes-utilisateurs/add-new-groupe/add-new-groupe.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserDetailComponent } from './gestions-utilisateurs/user-detail/user-detail.component';
import { GroupDetailsComponent } from './groupes-utilisateurs/group-details/group-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { AddUserToGroupComponent } from './groupes-utilisateurs/add-user-to-group/add-user-to-group.component';
import { EditGroupeComponent } from './groupes-utilisateurs/edit-groupe/edit-groupe.component';
import { DeleteUserToGroupComponent } from './groupes-utilisateurs/delete-user-to-group/delete-user-to-group.component';

@NgModule({
  declarations: [
    GroupesUtilisateursComponent,
    NewUserComponent,
    EditUserComponent,
    DeleteDialogComponent,
    GestionsUtilisateursComponent,
    BlockUserComponent,
    EditGroupeComponent,
    AddNewGroupeComponent,
    UserDetailComponent,
    GroupDetailsComponent,
    AddUserToGroupComponent,
    DeleteUserToGroupComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatTableExporterModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatStepperModule,
    ScrollingModule,
    PerfectScrollbarModule,
    MatSidenavModule,
    CommonModule,

    MatExpansionModule,
    MatTabsModule,

    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
