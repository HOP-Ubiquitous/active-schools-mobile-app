import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationPersonalDataPage } from './registration-personal-data.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPersonalDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPersonalDataPageRoutingModule {}
