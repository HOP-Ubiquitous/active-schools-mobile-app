import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchingSmartBandPageRoutingModule } from './searching-smart-band-routing.module';

import { SearchingSmartBandPage } from './searching-smart-band.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchingSmartBandPageRoutingModule
  ],
  declarations: [SearchingSmartBandPage]
})
export class SearchingSmartBandPageModule {}
