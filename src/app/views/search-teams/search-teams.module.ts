import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchTeamsPageRoutingModule } from './search-teams-routing.module';

import { SearchTeamsPage } from './search-teams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchTeamsPageRoutingModule
  ],
  declarations: [SearchTeamsPage]
})
export class SearchTeamsPageModule {}
