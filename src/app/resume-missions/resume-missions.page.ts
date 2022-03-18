import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume-missions',
  templateUrl: './resume-missions.page.html',
  styleUrls: ['./resume-missions.page.scss'],
})
export class ResumeMissionsPage implements OnInit {
  successReward: boolean;
  openRewardWindow: boolean;

  constructor() {
    this.successReward = false;
    this.openRewardWindow = false;
  }

  ngOnInit() {
  }

  getReward() {

    const vm = this;
    this.successReward = true;
    this.openRewardWindow = true;

    setTimeout(function() {
      vm.openRewardWindow = false;
    }, 5000);

  }

}
