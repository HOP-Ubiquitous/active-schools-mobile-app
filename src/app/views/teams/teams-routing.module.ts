import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamsPage } from './teams.page';
import { SearchTeamsPage } from '../search-teams/search-teams.page';
import { RankingTeamsPage } from '../ranking-teams/ranking-teams.page';
import { CreateTeamPage } from '../create-team/create-team.page';
import { MyTeamPage } from '../my-team/my-team.page';

const routes: Routes = [
  {
    path: '',
    component: TeamsPage,
    children: [
      {
        path: 'search-teams',
        children: [
          {
            path: '',
            component: SearchTeamsPage,
            outlet: 'teams',
            loadChildren: () => import('../search-teams/search-teams.module').then(m => m.SearchTeamsPageModule)
          }
        ]
      },
      {
        path: 'ranking-teams',
        children: [
          {
            path: '',
            component: RankingTeamsPage,
            outlet: 'teams',
            loadChildren: () => import('../ranking-teams/ranking-teams.module').then(m => m.RankingTeamsPageModule)
          }
        ]
      },
      {
        path: 'create-team',
        children: [
          {
            path: '',
            component: CreateTeamPage,
            outlet: 'teams',
            loadChildren: () => import('../create-team/create-team.module').then(m => m.CreateTeamPageModule)
          }
        ]
      },
      {
        path: 'my-team',
        children: [
          {
            path: '',
            component: MyTeamPage,
            outlet: 'teams',
            loadChildren: () => import('../my-team/my-team.module').then(m => m.MyTeamPageModule)
          }
        ]
      },
    ]
  }, {
    path: '',
    redirectTo: '../login/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsPageRoutingModule {}
