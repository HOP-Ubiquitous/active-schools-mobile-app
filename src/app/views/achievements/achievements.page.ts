import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { AchievementsService } from '../../services/achievements/achievements.service';

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
  dailyAchievements: any;
  achievements: any;

  constructor(private loginService: LoginService, private achievementsService: AchievementsService) {
    this.successReward = false;
    this.openRewardWindow = false;
  }

  ngOnInit() {
    this.showDailyChallenges = true;
    this.showAchievements = false;
    this.userInfo = this.loginService.loggedUser;

    this.achievementsService.getDailyAchievements();
    this.dailyAchievements = this.achievementsService.dailyAchievementsData;

    this.achievementsService.getAchievements();
    this.achievements = this.achievementsService.achievementsData;

  }

  calculateProgressBar(achievement) {

    const vm = this;
    let i = 0;
    let totalExp;

    while (i < vm.userInfo.avatar.expInfo.length) {
      if (vm.userInfo.avatar.expInfo[i].category === achievement.category) {
        totalExp = vm.userInfo.avatar.expInfo[i].totalExp;
        break;
      }
      i++;
    }

    if (totalExp < achievement.target) {
      return totalExp * 100 / achievement.target;
    } else {
      return 100;
    }

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
