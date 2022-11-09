import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AchievementsPage } from '../achievements/achievements.page';
import { ProfilePage } from '../profile/profile.page';
import { DailyChallengesListPage } from '../daily-challenges-list/daily-challenges-list.page';
import { AchievementsListPage } from '../achievements-list/achievements-list.page';
import { TeamsPage } from '../teams/teams.page';
import { SearchTeamsPage } from '../search-teams/search-teams.page';
import { RankingTeamsPage } from '../ranking-teams/ranking-teams.page';
import { CreateTeamPage } from '../create-team/create-team.page';
import { MyTeamPage } from '../my-team/my-team.page';
import { HistoryPage } from '../history/history.page';
import { StatsPage } from '../stats/stats.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'route',
        children: [
          {
            path: '',
            loadChildren: () => import('../route/route.module').then(m => m.RoutePageModule)
          }
        ]
      },
      {
        path: 'profile',
        component: ProfilePage,
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule),
            children: [
              {
                path: 'stats',
                children: [
                  {
                    path: '',
                    component: StatsPage,
                    outlet: 'profile',
                    loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)
                  }
                ]
              },
              {
                path: 'history',
                children: [
                  {
                    path: '',
                    component: HistoryPage,
                    outlet: 'profile',
                    loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'evolution',
        children: [
          {
            path: '',
            loadChildren: () => import('../evolution/evolution.module').then(m => m.EvolutionPageModule)
          }
        ]
      },
      {
        path: 'achievements',
        component: AchievementsPage,
        children: [
          {
            path: '',
            loadChildren: () => import('../achievements/achievements.module').then(m => m.AchievementsPageModule),
            children: [
              {
                path: 'daily-challenges-list',
                children: [
                  {
                    path: '',
                    component: DailyChallengesListPage,
                    outlet: 'achievements',
                    loadChildren: () => import('../daily-challenges-list/daily-challenges-list.module').then(m => m.DailyChallengesListPageModule)
                  }
                ]
              },
              {
                path: 'achievements-list',
                children: [
                  {
                    path: '',
                    component: AchievementsListPage,
                    outlet: 'achievements',
                    loadChildren: () => import('../achievements-list/achievements-list.module').then(m => m.AchievementsListPageModule)
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'teams',
        component: TeamsPage,
        children: [
          {
            path: '',
            loadChildren: () => import('../teams/teams.module').then(m => m.TeamsPageModule),
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
          }
        ]
      },
      {
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
          }
        ]
      }
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
export class TabsPageRoutingModule {}
