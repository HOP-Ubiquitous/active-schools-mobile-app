import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoutePage } from './route.page';

import { RoutePageRoutingModule } from './route-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutePageRoutingModule
  ],
  declarations: [RoutePage]
})
export class RoutePageModule {}
