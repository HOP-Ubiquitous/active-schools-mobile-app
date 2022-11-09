import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyChallengesListPageRoutingModule } from './daily-challenges-list-routing.module';

import { DailyChallengesListPage } from './daily-challenges-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyChallengesListPageRoutingModule
  ],
  declarations: [DailyChallengesListPage]
})
export class DailyChallengesListPageModule {}
