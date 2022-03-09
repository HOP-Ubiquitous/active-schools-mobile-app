import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollegeTabsPageRoutingModule } from './college-tabs-routing.module';

import { CollegeTabsPage } from './college-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollegeTabsPageRoutingModule
  ],
  declarations: [CollegeTabsPage]
})
export class CollegeTabsPageModule {}
