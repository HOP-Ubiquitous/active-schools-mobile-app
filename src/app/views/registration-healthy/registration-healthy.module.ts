import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationHealthyPageRoutingModule } from './registration-healthy-routing.module';

import { RegistrationHealthyPage } from './registration-healthy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationHealthyPageRoutingModule
  ],
  declarations: [RegistrationHealthyPage]
})
export class RegistrationHealthyPageModule {}
