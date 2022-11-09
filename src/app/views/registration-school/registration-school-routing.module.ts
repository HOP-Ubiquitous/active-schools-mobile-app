import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationSchoolPage } from './registration-school.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationSchoolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationSchoolPageRoutingModule {}
