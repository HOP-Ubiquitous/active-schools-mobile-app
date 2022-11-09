import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationMovilityPageRoutingModule } from './registration-movility-routing.module';

import { RegistrationMovilityPage } from './registration-movility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationMovilityPageRoutingModule
  ],
  declarations: [RegistrationMovilityPage]
})
export class RegistrationMovilityPageModule {}
