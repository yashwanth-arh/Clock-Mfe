import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { MaterialModule } from 'projects/host-app/src/app/material/material.module';
import { AdheranceComponent } from '../adherance/adherance.component';
import { AlertComponent } from '../alert/alert.component';
import { GoodComponent } from '../good/good.component';
import { HighAlertComponent } from '../high-alert/high-alert.component';

@NgModule({
  declarations: [
    PatientsComponent,
    // HighAlertComponent,
    // AlertComponent,
    // GoodComponent,
    // AdheranceComponent,
  ],
  imports: [CommonModule, PatientsRoutingModule, MaterialModule],
})
export class PatientsModule {}
