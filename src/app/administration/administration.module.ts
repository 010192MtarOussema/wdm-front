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
import { DeleteDialogComponent } from './groupes-utilisateurs/dialogs/delete/delete.component';
import { FormDialogComponent as advanceTableForm } from './groupes-utilisateurs/dialogs/form-dialog/form-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GestionsUtilisateursComponent } from './gestions-utilisateurs/gestions-utilisateurs.component';
import { BlockUserComponent } from './gestions-utilisateurs/dialogs/block-user/block-user.component';
import { FormDialogUserComponent } from './gestions-utilisateurs/dialogs/form-dialog-user/form-dialog-user.component';
import {MatTreeModule} from '@angular/material/tree';
import { TreeChecklistExample } from './gestions-utilisateurs/dialogs/tree-checklist-example/tree-checklist-example';

@NgModule({
  declarations: [
    GroupesUtilisateursComponent,
    advanceTableForm ,
    DeleteDialogComponent,
    GestionsUtilisateursComponent,
    BlockUserComponent,
    FormDialogUserComponent,TreeChecklistExample
    
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
    MatTreeModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
