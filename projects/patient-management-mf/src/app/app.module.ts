import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighAlertComponent } from './high-alert/high-alert.component';
import { AlertComponent } from './alert/alert.component';
import { GoodComponent } from './good/good.component';
import { AdheranceComponent } from './adherance/adherance.component';
import { MaterialModule } from 'projects/host-app/src/app/material/material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
