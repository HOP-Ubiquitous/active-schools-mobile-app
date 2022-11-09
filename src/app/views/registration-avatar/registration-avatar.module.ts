import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationAvatarPageRoutingModule } from './registration-avatar-routing.module';

import { RegistrationAvatarPage } from './registration-avatar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationAvatarPageRoutingModule
  ],
  declarations: [RegistrationAvatarPage]
})
export class RegistrationAvatarPageModule {}
