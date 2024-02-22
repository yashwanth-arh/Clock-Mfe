import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgOtpInputModule } from 'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from '../layouts/header/header.component';

import { MatTabsModule } from '@angular/material/tabs';
import { HighAlertComponent } from 'projects/patient-management-mf/src/app/high-alert/high-alert.component';
import { AlertComponent } from 'projects/patient-management-mf/src/app/alert/alert.component';
import { GoodComponent } from 'projects/patient-management-mf/src/app/good/good.component';
import { AdheranceComponent } from 'projects/patient-management-mf/src/app/adherance/adherance.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AuthServiceService } from 'projects/auth-mf/src/app/core/services/auth.service.service';

@NgModule({
  declarations: [
    HeaderComponent,
    HighAlertComponent,
    AlertComponent,
    GoodComponent,
    AdheranceComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgOtpInputModule,
    HttpClientModule,
    MatDialogModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgOtpInputModule,
    HttpClientModule,
    MatDialogModule,
    HeaderComponent,
    MatTabsModule,
    HighAlertComponent,
    AlertComponent,
    GoodComponent,
    AdheranceComponent,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [AuthServiceService],
})
export class MaterialModule {}
