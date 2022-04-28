import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleNewPageRoutingModule } from './single-new-routing.module';

import { SingleNewPage } from './single-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleNewPageRoutingModule
  ],
  declarations: [SingleNewPage]
})
export class SingleNewPageModule {}
