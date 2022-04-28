import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleNewPage } from './single-new.page';

const routes: Routes = [
  {
    path: '',
    component: SingleNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleNewPageRoutingModule {}
