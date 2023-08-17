import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationCredentialsPage } from './registration-credentials.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationCredentialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationCredentialsPageRoutingModule {}
