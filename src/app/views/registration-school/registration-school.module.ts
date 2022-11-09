import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationSchoolPageRoutingModule } from './registration-school-routing.module';

import { RegistrationSchoolPage } from './registration-school.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationSchoolPageRoutingModule
  ],
  declarations: [RegistrationSchoolPage]
})
export class RegistrationSchoolPageModule {}
