import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchTeamsPage } from './search-teams.page';

const routes: Routes = [
  {
    path: '',
    component: SearchTeamsPage,
    outlet: 'teams'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchTeamsPageRoutingModule {}
