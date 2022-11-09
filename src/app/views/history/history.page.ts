import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../services/health/health.service';

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

  constructor(
    private healthService: HealthService
  ) {
    this.dailyValue = {};
    this.weeklyValue = {};
    this.monthlyValue = {};
    this.yearlyValue = {};
  }

  ngOnInit() {
    // this.healthService.getDailyValues('heart_rate');
    // this.healthService.getDailyValues('steps');
    // this.healthService.getDailyValues('distance');
    // this.healthService.getDailyValues('blood_pressure_systolyc');
    // this.healthService.getDailyValues('blood_pressure_diastolyc');

    // this.healthService.getWeeklyValues('heart_rate');
    // this.healthService.getWeeklyValues('steps');
    // this.healthService.getWeeklyValues('distance');
    // this.healthService.getWeeklyValues('blood_pressure_systolyc');
    // this.healthService.getWeeklyValues('blood_pressure_diastolyc');

    // this.healthService.getMonthlyValues('heart_rate');
    // this.healthService.getMonthlyValues('steps');
    // this.healthService.getMonthlyValues('distance');
    // this.healthService.getMonthlyValues('blood_pressure_systolyc');
    // this.healthService.getMonthlyValues('blood_pressure_diastolyc');

    // this.healthService.getYearlyValues('heart_rate');
    // this.healthService.getYearlyValues('steps');
    // this.healthService.getYearlyValues('distance');
    // this.healthService.getYearlyValues('blood_pressure_systolyc');
    // this.healthService.getYearlyValues('blood_pressure_diastolyc');

    // this.dailyValue = this.healthService.dailyValue;
    // this.weeklyValue = this.healthService.weeklyValue;
    // this.monthlyValue = this.healthService.monthlyValue;
    // this.yearlyValue = this.healthService.yearlyValue;
  }

}
