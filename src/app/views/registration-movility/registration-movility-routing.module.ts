import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationMovilityPage } from './registration-movility.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationMovilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationMovilityPageRoutingModule {}
