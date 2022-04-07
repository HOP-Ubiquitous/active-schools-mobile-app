import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.successReward = false;
    this.openRewardWindow = false;
  }

  ngOnInit() {
    this.showDailyChallenges = true;
    this.showAchievements = false;
  }

  getReward() {

    const vm = this;
    this.successReward = true;
    this.openRewardWindow = true;

    setTimeout(function () {
      vm.openRewardWindow = false;
    }, 5000);

  }

}
