import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyChallengesListPage } from './daily-challenges-list.page';

const routes: Routes = [
  {
    path: '',
    component: DailyChallengesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyChallengesListPageRoutingModule {}
