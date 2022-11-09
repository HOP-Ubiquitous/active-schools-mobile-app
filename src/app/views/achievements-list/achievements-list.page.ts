import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { AchievementsService } from '../../services/achievements/achievements.service';

@Component({
  selector: 'app-achievements-list',
  templateUrl: './achievements-list.page.html',
  styleUrls: ['./achievements-list.page.scss'],
})
export class AchievementsListPage implements OnInit {
  successReward: boolean;
  openRewardWindow: boolean;
  showDailyChallenges: boolean;
  showAchievements: boolean
  userInfo: any;
  dailyChallenges: any;
  selectedDailyChallenges: any;
  achievements: any;
  selectedTab: any;
  currentReward: any;

  constructor(
    private loginService: LoginService,
    private achievementsService: AchievementsService
  ) {
    this.successReward = false;
    this.openRewardWindow = false;
  }

  ngOnInit() {
    this.showDailyChallenges = true;
    this.showAchievements = false;
    this.userInfo = this.loginService.loggedUser;

    this.achievementsService.getAchievements();
    this.achievements = this.achievementsService.achievementsData;

    this.selectedTab = 'daily';

    this.checkChallengesProgress();
  }

  showTabContain = (tab) => {
    this.selectedTab = tab;
  }

  checkChallengesProgress = () => {
    const vm = this;

    this.achievements.forEach(function(challenge) {
      challenge.progress = vm.getRandomNumber(0, challenge.target);
    });
  }

  getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getOpacity = (i) => {
    return this.achievements[i].progress / this.achievements[i].target;
  }

  getReward = (i) => {

    const vm = this;
    
    this.achievements[i].progress = this.achievements[i].target;
    this.currentReward = this.achievements[i].reward;

    this.openRewardWindow = true;

    setTimeout(function () {
      vm.openRewardWindow = false;
    }, 5000);

  }

}
