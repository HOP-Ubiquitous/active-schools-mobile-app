import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvolutionPageRoutingModule } from './evolution-routing.module';

import { EvolutionPage } from './evolution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvolutionPageRoutingModule
  ],
  declarations: [EvolutionPage]
})

export class EvolutionPageModule {}
