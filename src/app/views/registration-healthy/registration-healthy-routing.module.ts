import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationHealthyPage } from './registration-healthy.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationHealthyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationHealthyPageRoutingModule {}
