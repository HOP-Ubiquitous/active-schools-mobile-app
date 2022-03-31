import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CollegeTabsPage } from './college-tabs/college-tabs.page';


//TODO Las rutas no están bien configuradas, revisar e incluir la configuración para rutas anidadas y tabs.
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  /* {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  }, */
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'searching-smart-band',
    loadChildren: () => import('./searching-smart-band/searching-smart-band.module').then(m => m.SearchingSmartBandPageModule)
  },

  // {
  //   path: '',
  //   component: CollegeTabsPage,
  //   children: [
  //     {
  //       path: 'route',
  //       loadChildren: () => import('./route/route.module').then(m => m.RoutePageModule)
  //     },
  //     {
  //       path: 'news',
  //       loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
  //     },
  //     {
  //       path: 'news/:new_id',
  //       loadChildren: () => import('./new-details/new-details.module').then(m => m.NewDetailsPageModule)
  //     },
  //     {
  //       path: 'success-modal',
  //       loadChildren: () => import('./success-modal/success-modal.module').then(m => m.SuccessModalPageModule)
  //     },
  //     {
  //       path: 'profile',
  //       loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  //     },
  //     {
  //       path: 'resume-missions',
  //       loadChildren: () => import('./resume-missions/resume-missions.module').then(m => m.ResumeMissionsPageModule)
  //     }
  //   ]
  // },


  {
    path: 'college-tabs',
    loadChildren: () => import('./college-tabs/college-tabs.module').then(m => m.CollegeTabsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./route/route.module').then(m => m.RoutePageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)
  },
  {
    path: 'new-details',
    loadChildren: () => import('./new-details/new-details.module').then(m => m.NewDetailsPageModule)
  },
  {
    path: 'success-modal',
    loadChildren: () => import('./success-modal/success-modal.module').then(m => m.SuccessModalPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'evolution',
    loadChildren: () => import('./profile/evolution/evolution.module').then(m => m.EvolutionPageModule)
  },
  {
    path: 'resume-missions',
    loadChildren: () => import('./resume-missions/resume-missions.module').then(m => m.ResumeMissionsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
