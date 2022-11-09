import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AchievementsListPageRoutingModule } from './achievements-list-routing.module';

import { AchievementsListPage } from './achievements-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AchievementsListPageRoutingModule
  ],
  declarations: [AchievementsListPage]
})
export class AchievementsListPageModule {}
