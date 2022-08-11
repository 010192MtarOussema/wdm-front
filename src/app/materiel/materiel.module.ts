import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterielRoutingModule } from './materiel-routing.module';
import { MaterielMaintenanceComponent } from './materiel-maintenance/materiel-maintenance.component';
import { MaterielComposantsComponent } from './materiel-composants/materiel-composants.component';
import { MaterielPiecesRechangesComponent } from './materiel-pieces-rechanges/materiel-pieces-rechanges.component';
import { MaterielEquipementComponent } from './materiel-equipement/materiel-equipement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../shared/components/components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    MaterielMaintenanceComponent,
    MaterielComposantsComponent,
    MaterielPiecesRechangesComponent,
    MaterielEquipementComponent
  ],
  imports: [
    CommonModule,
    MaterielRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
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
  ]
})
export class MaterielModule { }
