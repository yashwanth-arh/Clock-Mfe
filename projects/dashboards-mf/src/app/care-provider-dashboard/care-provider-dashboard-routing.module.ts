import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareProviderDashboardComponent } from './care-provider-dashboard.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  { path: '', component: CareProviderDashboardComponent },
  {
    path: 'patient-list',
    component: PatientListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareProviderDashboardRoutingModule {}
