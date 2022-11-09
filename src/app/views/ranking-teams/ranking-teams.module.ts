import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingTeamsPageRoutingModule } from './ranking-teams-routing.module';

import { RankingTeamsPage } from './ranking-teams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RankingTeamsPageRoutingModule
  ],
  declarations: [RankingTeamsPage]
})
export class RankingTeamsPageModule {}
