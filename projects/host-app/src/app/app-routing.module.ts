import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('projects/auth-mf/src/app/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import(
        'projects/auth-mf/src/app/forgot-password/forgot-password.module'
      ).then((m) => m.ForgotPasswordModule),
  },
  {
    path: 'careProviderDashboard',
    loadChildren: () =>
      import(
        'projects/dashboards-mf/src/app/care-provider-dashboard/care-provider-dashboard.module'
      ).then((m) => m.CareProviderDashboardModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import(
        'projects/patient-management-mf/src/app/patients/patients.module'
      ).then((m) => m.PatientsModule),
  },
  {
    path: '**',
    // canActivate: [AuthGuard],
    redirectTo: 'login',
    // data: {
    //   preload: false,
    //   breadcrumb: 'Page Not Found',
    //   title: 'Page Not Found',
    // },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
