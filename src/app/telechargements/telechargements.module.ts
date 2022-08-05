import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TelechargementsRoutingModule } from './telechargements-routing.module';
import { TelechargementsComponent } from './telechargements.component';


@NgModule({
  declarations: [
    TelechargementsComponent
  ],
  imports: [
    CommonModule,
    TelechargementsRoutingModule
  ]
})
export class TelechargementsModule { }
