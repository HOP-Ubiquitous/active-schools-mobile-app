import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AchievementsListPage } from './achievements-list.page';

const routes: Routes = [
  {
    path: '',
    component: AchievementsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AchievementsListPageRoutingModule {}
