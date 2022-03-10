import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollegeTabsPage } from './college-tabs.page';

const routes: Routes = [
  {
    path: '',
    component: CollegeTabsPage,
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
        path: 'news',
        children: [
          {
            path: '',
            loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'resume-missions',
        children: [
          {
            path: '',
            loadChildren: () => import('../resume-missions/resume-missions.module').then(m => m.ResumeMissionsPageModule)
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
export class CollegeTabsPageRoutingModule {}
