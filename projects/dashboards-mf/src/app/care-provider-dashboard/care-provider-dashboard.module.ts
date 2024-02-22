import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareProviderDashboardRoutingModule } from './care-provider-dashboard-routing.module';
import { CareProviderDashboardComponent } from './care-provider-dashboard.component';
import { MaterialModule } from 'projects/host-app/src/app/material/material.module';
import { PatientListComponent } from './patient-list/patient-list.component';

@NgModule({
  declarations: [CareProviderDashboardComponent, PatientListComponent],
  imports: [CommonModule, MaterialModule, CareProviderDashboardRoutingModule],
})
export class CareProviderDashboardModule {}
