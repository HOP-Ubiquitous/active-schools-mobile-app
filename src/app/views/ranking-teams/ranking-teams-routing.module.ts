import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingTeamsPage } from './ranking-teams.page';

const routes: Routes = [
  {
    path: '',
    component: RankingTeamsPage,
    outlet: 'teams'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingTeamsPageRoutingModule {}
