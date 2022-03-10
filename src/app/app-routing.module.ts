import { NgModule } from '@angular/core';

import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'searching-smart-band',
    loadChildren: () => import('./searching-smart-band/searching-smart-band.module').then( m => m.SearchingSmartBandPageModule)
  },
  {
    path: 'college-tabs',
    loadChildren: () => import('./college-tabs/college-tabs.module').then( m => m.CollegeTabsPageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./route/route.module').then( m => m.RoutePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then( m => m.NewsPageModule)
  },
  {
    path: 'new-details',
    loadChildren: () => import('./new-details/new-details.module').then( m => m.NewDetailsPageModule)
  },
  {
    path: 'success-modal',
    loadChildren: () => import('./success-modal/success-modal.module').then( m => m.SuccessModalPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
