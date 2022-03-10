import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumeMissionsPageRoutingModule } from './resume-missions-routing.module';

import { ResumeMissionsPage } from './resume-missions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumeMissionsPageRoutingModule
  ],
  declarations: [ResumeMissionsPage]
})
export class ResumeMissionsPageModule {}
