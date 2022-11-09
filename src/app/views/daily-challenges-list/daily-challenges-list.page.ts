import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { DailyChallengesService } from '../../services/daily-challenges/daily-challenges.service';

@Component({
  selector: 'app-daily-challenges-list',
  templateUrl: './daily-challenges-list.page.html',
  styleUrls: ['./daily-challenges-list.page.scss'],
})
export class DailyChallengesListPage implements OnInit {
  successReward: boolean;
  openRewardWindow: boolean;
  showDailyChallenges: boolean;
  showAchievements: boolean
  userInfo: any;
  dailyChallenges: any;
  selectedDailyChallenges: any;
  achievements: any;
  selectedTab: any;

  constructor(
    private loginService: LoginService,
    private dailyChallengesService: DailyChallengesService
  ) {
    this.successReward = false;
    this.openRewardWindow = false;
  }

  ngOnInit() {
    this.showDailyChallenges = true;
    this.showAchievements = false;
    this.userInfo = this.loginService.loggedUser;
    
    this.selectedDailyChallenges = this.dailyChallengesService.selectedDailyChallenges;
    console.log(this.selectedDailyChallenges);
    this.selectedTab = 'daily';

    this.checkChallengesProgress();

  }

  showTabContain = (tab) => {
    this.selectedTab = tab;
  }

  checkChallengesProgress = () => {
    const vm = this;

    this.selectedDailyChallenges.forEach(function(challenge, index) {
      if (index === 0) {
        challenge.progress = 5500;
      } else {
        challenge.progress = vm.getRandomNumber(0, challenge.target);
      }
    });
  }

  getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getOpacity = (i) => {
    return this.selectedDailyChallenges[i].progress / this.selectedDailyChallenges[i].target;
  }

  getReward = () => {

    const vm = this;
    this.successReward = true;
    this.openRewardWindow = true;

    setTimeout(function () {
      vm.openRewardWindow = false;
    }, 5000);

  }

}
