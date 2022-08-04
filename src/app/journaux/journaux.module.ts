import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournauxRoutingModule } from './journaux-routing.module';
import { JournauxComponent } from './journaux.component';


@NgModule({
  declarations: [
    JournauxComponent
  ],
  imports: [
    CommonModule,
    JournauxRoutingModule
  ]
})
export class JournauxModule { }
