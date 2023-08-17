import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceApi } from '../../services/users/users.service_api';
import { LanguageService } from '../../services/language/language.service';

import * as items from '../../services/avatar/avatar-constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  userInfo: any;
  selectedTab: any;

  items: any;
  heads: any;
  bodies: any;
  selectedBody: any;
  selectedHead: any;
  language: any;

  constructor(
    private router: Router,
    private userServiceApi: UserServiceApi,
    private languageService: LanguageService
  ) { }

  ngOnInit() {

    this.language = this.languageService.language;
    this.userInfo = this.userServiceApi.loggedUser;
    this.selectedTab = 'stats';

    this.items = items.EVOLUTION_ITEMS;
    this.heads = items.AVATAR_HEADS;
    this.bodies = items.AVATAR_BODIES;
    this.getAvatar();

  }

  //-- Load Avatar Info --//

  getAvatar = () => {

    const vm = this;
    
    let headId:any;
    let bodyId:any;

    // if (this.userInfo.avatar === undefined) {
    //   headId = 0;
    //   bodyId = 0;
    // } else {
    //   headId = this.userInfo.avatar.avatar_head_id;
    //   bodyId = this.userInfo.avatar.avatar_body_id;
    // }

    headId = 1;
    bodyId = 1;

    let i = 0;
    let x = 0;

    while (i < this.heads.length) {
      if (headId === vm.heads[i].id) {
        vm.selectedHead = vm.heads[i].icon;
        break;
      }
      i++;
    };

    while (x < this.bodies.length) {
      if (bodyId === vm.bodies[x].id) {
        vm.selectedBody = vm.bodies[x].icon;
        break;
      }
      x++;
    };

  }

  // -- -- //

  showTabContain = (tab) => {
    this.selectedTab = tab;
  }

  goToEvolution = () => {
    this.router.navigate(['/tabs/evolution']);
  }

}
