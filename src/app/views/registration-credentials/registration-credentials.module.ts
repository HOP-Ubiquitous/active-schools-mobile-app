import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationCredentialsPageRoutingModule } from './registration-credentials-routing.module';

import { RegistrationCredentialsPage } from './registration-credentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationCredentialsPageRoutingModule
  ],
  declarations: [RegistrationCredentialsPage]
})
export class RegistrationCredentialsPageModule {}
