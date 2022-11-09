import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPersonalDataPageRoutingModule } from './registration-personal-data-routing.module';

import { RegistrationPersonalDataPage } from './registration-personal-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPersonalDataPageRoutingModule
  ],
  declarations: [RegistrationPersonalDataPage]
})
export class RegistrationPersonalDataPageModule {}
