import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'administration',
        loadChildren: () =>
          import('./administration/administration.module').then(
            (m) => m.AdministrationModule
          )
      },
      {
        path: 'localisation',
        loadChildren: () =>
          import('./localisation/localisation.module').then(
            (m) => m.LocalisationModule
          )
      },
      {
        path: 'materiel',
        loadChildren: () =>
          import('./materiel/materiel.module').then(
            (m) => m.MaterielModule
          )
      },
      {
        path: 'surveillance-fonctionnelle',
        loadChildren: () =>
          import('./surveillance-fonctionnelle/surveillance-fonctionnelle.module').then(
            (m) => m.SurveillanceFonctionnelleModule
          )
      },
      {
        path: 'surveillance-systeme',
        loadChildren: () =>
          import('./surveillance-systeme/surveillance-systeme.module').then(
            (m) => m.SurveillanceSystemeModule
          )
      },
      {
        path: 'rapports',
        loadChildren: () =>
          import('./rapports/rapports.module').then(
            (m) => m.RapportsModule
          )
      },
      {
        path: 'journaux',
        loadChildren: () =>
          import('./journaux/journaux.module').then(
            (m) => m.JournauxModule
          )
      },
      {
        path: 'gestion-contenu',
        loadChildren: () =>
          import('./gestion-contenu/gestion-contenu.module').then(
            (m) => m.GestionContenuModule
          )
      },
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'list-utilisateurs',
        loadChildren: () =>
          import('./advance-table/advance-table.module').then(
            (m) => m.AdvanceTableModule
          )
      },

      {
        path: 'task',
        loadChildren: () =>
          import('./task/task.module').then((m) => m.TaskModule)
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./contacts/contacts.module').then((m) => m.ContactsModule)
      },
      {
        path: 'email',
        loadChildren: () =>
          import('./email/email.module').then((m) => m.EmailModule)
      },
      {
        path: 'apps',
        loadChildren: () =>
          import('./apps/apps.module').then((m) => m.AppsModule)
      },
      {
        path: 'widget',
        loadChildren: () =>
          import('./widget/widget.module').then((m) => m.WidgetModule)
      },
     
      {
        path: 'forms',
        loadChildren: () =>
          import('./forms/forms.module').then((m) => m.FormModule)
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./tables/tables.module').then((m) => m.TablesModule)
      },
  
      {
        path: 'charts',
        loadChildren: () =>
          import('./charts/charts.module').then((m) => m.ChartsModule)
      },
 
      {
        path: 'icons',
        loadChildren: () =>
          import('./icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          )
      },

      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.module').then(
            (m) => m.MultilevelModule
          )
      }
    ]
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      )
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
