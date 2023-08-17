import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './views/tabs/tabs.page';


//TODO Las rutas no están bien configuradas, revisar e incluir la configuración para rutas anidadas y tabs.
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration-credentials',
    loadChildren: () => import('./views/registration-credentials/registration-credentials.module').then( m => m.RegistrationCredentialsPageModule)
  },
  {
    path: 'registration-personal-data',
    loadChildren: () => import('./views/registration-personal-data/registration-personal-data.module').then(m => m.RegistrationPersonalDataPageModule)
  },
  {
    path: 'registration-school', //NO SE INCLUYE EN ESTA DEMO
    loadChildren: () => import('./views/registration-school/registration-school.module').then(m => m.RegistrationSchoolPageModule)
  },
  {
    path: 'registration-movility', //Deprecated
    loadChildren: () => import('./views/registration-movility/registration-movility.module').then(m => m.RegistrationMovilityPageModule)
  },
  {
    path: 'registration-healthy', //Deprecated
    loadChildren: () => import('./views/registration-healthy/registration-healthy.module').then(m => m.RegistrationHealthyPageModule)
  },
  {
    path: 'registration-avatar',
    loadChildren: () => import('./views/registration-avatar/registration-avatar.module').then(m => m.RegistrationAvatarPageModule)
  },
  {
    path: 'searching-smart-band', //Deprecated
    loadChildren: () => import('./views/searching-smart-band/searching-smart-band.module').then(m => m.SearchingSmartBandPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./views/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },


  {
    path: 'tabs',
    loadChildren: () => import('./views/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./views/route/route.module').then(m => m.RoutePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./views/news/news.module').then(m => m.NewsPageModule)
  },
  {
    path: 'single-new',
    loadChildren: () => import('./views/single-new/single-new.module').then(m => m.SingleNewPageModule)
  },
  // {
  //   path: 'success-modal',
  //   loadChildren: () => import('./views/success-modal/success-modal.module').then(m => m.SuccessModalPageModule)
  // },
  {
    path: 'profile',
    loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'evolution',
    loadChildren: () => import('./views/evolution/evolution.module').then(m => m.EvolutionPageModule)
  },
  {
    path: 'achievements',
    loadChildren: () => import('./views/achievements/achievements.module').then(m => m.AchievementsPageModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./views/teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'search-teams',
    loadChildren: () => import('./views/search-teams/search-teams.module').then( m => m.SearchTeamsPageModule)
  },
  {
    path: 'ranking-teams',
    loadChildren: () => import('./views/ranking-teams/ranking-teams.module').then( m => m.RankingTeamsPageModule)
  },
  {
    path: 'create-team',
    loadChildren: () => import('./views/create-team/create-team.module').then( m => m.CreateTeamPageModule)
  },
  {
    path: 'my-team',
    loadChildren: () => import('./views/my-team/my-team.module').then( m => m.MyTeamPageModule)
  },
  {
    path: 'daily-challenges-list',
    loadChildren: () => import('./views/daily-challenges-list/daily-challenges-list.module').then( m => m.DailyChallengesListPageModule)
  },
  {
    path: 'achievements-list',
    loadChildren: () => import('./views/achievements-list/achievements-list.module').then( m => m.AchievementsListPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./views/stats/stats.module').then( m => m.StatsPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./views/history/history.module').then( m => m.HistoryPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
