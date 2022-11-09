import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationAvatarPage } from './registration-avatar.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationAvatarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationAvatarPageRoutingModule {}
