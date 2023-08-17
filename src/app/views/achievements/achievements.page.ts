import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceData } from '../../services/users/users.service_data';
import { LanguageService } from '../../services/language/language.service';

import * as items from '../../services/avatar/avatar-constants';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.page.html',
  styleUrls: ['./achievements.page.scss'],
})
export class AchievementsPage implements OnInit {
  successReward: boolean;
  openRewardWindow: boolean;
  showDailyChallenges: boolean;
  showAchievements: boolean
  userInfo: any;
  dailyChallenges: any;
  selectedDailyChallenges: any;
  achievements: any;
  selectedTab: any;

  items: any;
  heads: any;
  bodies: any;
  selectedBody: any;
  selectedHead: any;

  language: any;

  constructor(
    private router: Router,
    private usersServiceData: UserServiceData,
    private languageService: LanguageService
  ) {
    this.successReward = false;
    this.openRewardWindow = false;
  }

  ngOnInit() {

    this.language = this.languageService.language;

    this.showDailyChallenges = true;
    this.showAchievements = false;
    this.userInfo = this.usersServiceData.loggedUser;

    this.selectedTab = 'daily';

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
