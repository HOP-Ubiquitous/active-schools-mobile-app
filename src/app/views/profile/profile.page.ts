import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

import * as items from '../../services/items/items-constants';

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

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {

    this.userInfo = this.loginService.loggedUser;
    this.selectedTab = 'stats';

    this.userInfo = this.loginService.loggedUser;

    this.items = items.EVOLUTION_ITEMS;
    this.heads = items.AVATAR_HEADS;
    this.bodies = items.AVATAR_BODIES;
    this.getAvatar();

  }

  //-- Load Avatar Info --//

  getAvatar = () => {

    const vm = this;
    let headId = this.userInfo.avatar.avatar_head_id;
    let bodyId = this.userInfo.avatar.avatar_body_id;
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
