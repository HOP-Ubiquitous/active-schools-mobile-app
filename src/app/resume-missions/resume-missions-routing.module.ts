import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumeMissionsPage } from './resume-missions.page';

const routes: Routes = [
  {
    path: '',
    component: ResumeMissionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeMissionsPageRoutingModule {}
