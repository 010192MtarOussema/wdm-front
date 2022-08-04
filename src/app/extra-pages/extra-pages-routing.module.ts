import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },

  {
    path: 'invoice',
    component: InvoiceComponent
  },
  {
    path: 'faqs',
    component: FaqsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule {}
