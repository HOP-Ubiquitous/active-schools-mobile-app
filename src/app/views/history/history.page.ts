import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../services/health/health.service';
import { LanguageService } from '../../services/language/language.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  dailyValue: any;
  weeklyValue: any;
  monthlyValue: any;
  yearlyValue: any;
  realTimeValue: any;
  language: any;

  constructor(
    private healthService: HealthService,
    private platform: Platform,
    private languageService: LanguageService
  ) {
    this.dailyValue = {};
    this.weeklyValue = {};
    this.monthlyValue = {};
    this.yearlyValue = {};
    this.realTimeValue = {};
  }

  ngOnInit() {

    this.language = this.languageService.language;
    
    this.platform.ready().then(() => {
      this.healthService.getRealTimeValues(['steps'], [10]);
      this.healthService.getDailyValues(['steps']);
      this.healthService.getWeeklyValues(['steps']);
      this.healthService.getMonthlyValues(['steps']);
      this.healthService.getYearlyValues(['steps']);
      
      if (this.healthService.realTimeValue !== undefined &&
          this.healthService.realTimeValue !== null &&
          this.healthService.realTimeValue !== '') {
        this.realTimeValue = this.healthService.realTimeValue.toFixed(0);
      } else {
        this.realTimeValue = 0;
      }

      if (this.healthService.dailyValue !== undefined &&
          this.healthService.dailyValue !== null &&
          this.healthService.dailyValue !== '') {
        this.dailyValue = this.healthService.dailyValue.toFixed(0);
      } else {
        this.dailyValue = 0;
      }

      if (this.healthService.weeklyValue !== undefined &&
          this.healthService.weeklyValue !== null &&
          this.healthService.weeklyValue !== '') {
        this.weeklyValue = this.healthService.weeklyValue.toFixed(0);
      } else {
        this.weeklyValue = 0;
      }

      if (this.healthService.monthlyValue !== undefined &&
          this.healthService.monthlyValue !== null &&
          this.healthService.monthlyValue !== '') {
        this.monthlyValue = this.healthService.monthlyValue.toFixed(0);
      } else {
        this.monthlyValue = 0;
      }

      if (this.healthService.yearlyValue !== undefined &&
          this.healthService.yearlyValue !== null &&
          this.healthService.yearlyValue !== '') {
        this.yearlyValue = this.healthService.yearlyValue.toFixed(0);
      } else {
        this.yearlyValue = 0;
      }

      // this.dailyValue = this.healthService.dailyValue;
      // this.weeklyValue = this.healthService.weeklyValue;
      // this.monthlyValue = this.healthService.monthlyValue;
      // this.yearlyValue = this.healthService.yearlyValue;
    });
    
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
