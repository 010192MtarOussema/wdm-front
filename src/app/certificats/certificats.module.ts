import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatsRoutingModule } from './certificats-routing.module';
import { CertificatsComponent } from './certificats.component';


@NgModule({
  declarations: [
    CertificatsComponent
  ],
  imports: [
    CommonModule,
    CertificatsRoutingModule
  ]
})
export class CertificatsModule { }
