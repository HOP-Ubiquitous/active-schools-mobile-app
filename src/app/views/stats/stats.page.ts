import { Component, OnInit, NgZone } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { HealthService } from '../../services/health/health.service';
import { UserServiceData } from '../../services/users/users.service_data';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  realTimeValue: any;
  dailyValue: any;
  
  heartRate: any;
  systolyc: any;
  diastolyc: any;
  steps: any;
  distance: any;
  userInfo: any;
  barColor: any;

  language: any;

  constructor(
    private languageService: LanguageService,
    private healthService: HealthService,
    private userServiceData: UserServiceData,
    private platform: Platform
  ) {
    this.realTimeValue = {};
    this.dailyValue = {};
  }

  ngOnInit() {

    this.language = this.languageService.language;
    
    this.platform.ready().then(() => {
      this.userInfo = this.userServiceData.loggedUser;
      this.healthService.getDailyValues(['steps']);
      if (this.healthService.dailyValue !== undefined &&
          this.healthService.dailyValue !== null &&
          this.healthService.dailyValue !== '') {
        this.dailyValue = this.healthService.dailyValue.toFixed(0);
      } else {
        this.dailyValue = 0;
      }
    })

  }

  checkActivity = (value) => {
    let result = value.charAt(0).toUpperCase() + value.slice(1);

    return result.replace('_', ' ');
  }

  checkHeartRate = (value) => {

    if (value <= 40) {
      value = 40;
    } else if (value >= 160) {
      value = 160;
    }

    let result = (value - 40) * 100 / 160;
    result = result >= 100 ? 100 : result;

    this.barColor = this.getHeartRateColor(result);
    return result;
  }

  getHeartRateColor = (value) => {
    let result;
    if (value >= 80) {
      result = '#dc3545'
    } else if (value >= 70 && value < 80) {
      result = '#d58cff'
    } else {
      result = '#00a195'
    }

    return result;
  }

  checkSteps = value => {
    let result = value / 100;
    result = result >= 100 ? 100 : result;
    return result;
  }

  checkDistance = (value) => {
    let result = value * 0.000716;
    return result.toFixed(2);
  }

  checkDistancePercent = (value) => {
    let result = value * 0.000716;
    result = result >= 100 ? 100 : result;
    return result;
  }

}
