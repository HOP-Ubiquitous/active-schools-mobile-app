import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchingSmartBandPage } from './searching-smart-band.page';

const routes: Routes = [
  {
    path: '',
    component: SearchingSmartBandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchingSmartBandPageRoutingModule {}
