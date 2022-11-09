import { Injectable, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Health } from '@awesome-cordova-plugins/health';
//import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions';

import {
  HEALTH_REAL_TIME,
  HEALTH_DAILY,
  HEALTH_WEEKLY,
  HEALTH_MONTHLY,
  HEALTH_YEARLY,
} from './health-constants';

@Injectable({
  providedIn: 'root',
})
export class HealthService {

  nativePermission: any;

  realTimeValue: any;
  loadedRealTimeValue: boolean;

  dailyValue: any;
  loadedDailyValue: boolean;

  weeklyValue: any;
  loadedWeeklyValue: boolean;

  monthlyValue: any;
  loadedMonthlyValue: boolean;

  yearlyValue: any;
  loadedYearlyValue: boolean;

  constructor(private platform: Platform) {
    this.realTimeValue = HEALTH_REAL_TIME;
    this.loadedRealTimeValue = false;

    this.dailyValue = HEALTH_DAILY;
    this.loadedDailyValue = false;

    this.weeklyValue = HEALTH_WEEKLY;
    this.loadedWeeklyValue = false;

    this.monthlyValue = HEALTH_MONTHLY;
    this.loadedMonthlyValue = false;

    this.yearlyValue = HEALTH_YEARLY;
    this.loadedYearlyValue = false;
  }

  // checkNativeAuthorization = () => {
  //   if(this.platform.is('ios') === true) {
  //     //GET PERMISSIONS FROM IOS
  //   } else {
  //     AndroidPermissions.hasPermission(AndroidPermissions.PERMISSION.ACTIVITY_RECOGNITION)
  //     .then(result => {
  //       if (result.hasPermission) {
  //         this.nativePermission = result.hasPermission;
  //         this.getAuthorization();
  //       } else {
  //         AndroidPermissions.requestPermission(AndroidPermissions.PERMISSION.ACTIVITY_RECOGNITION)
  //         .then((result) => {
  //           if (result.hasPermission) {
  //             this.getAuthorization();
  //           }
  //         })
  //         .catch((err) => console.log('Error to request permissions'));
  //       }
  //     });
      
  //   }

  // }

  getAuthorization = () => {

    Health.isAvailable()
      .then((available: boolean) => {
        Health.requestAuthorization([
          {
            read: [
              'steps',
              'distance',
              'appleExcerciseTime', //Only iOS
              'calories',
              'activity',
              'height',
              'weight',
              'heart_rate',
              'heart_rate.resting',
              'heart_rate.variability',
              'resp_rate',
              'vo2max',
              'temperature',
              'fat_percentage',
              'waist_circunference',
              'blood_glucose',
              'insulin', //Only iOS
              'blood_pressure',
              'blood_pressure_systolic',
              'blood_pressure_diastolic',
              'gender', //Only iOS
              'date_of_birth', //Only iOS
              'mindfulness', //Only iOS
              'nutrition', //Only iOS
              'nutrition.X',
              'sleep', //Only iOS
            ]
          }
        ])
          .then((res) =>
            console.log('Authorized to modified this resources! - ' + res)
          )
          .catch((e) => console.log('FIRST AUTH - Health is not authorized!'));
      })
      .catch((e) => console.log('FIRST AUTH - Health is not authorized!'));
  };

  getRealTimeValues = (parameter) => {
    Health.isAuthorized([parameter])
      .then((auth) => {

        let startDate = new Date(new Date().setHours(new Date().getMinutes() - 10)).toISOString().replace(/T/, ' ').replace(/\..+/, ''); // Current Monent - 5 minutes
        let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        Health.query({
          startDate: new Date(startDate),
          endDate: new Date(now), // now
          dataType: parameter,
          limit: 1,
        })
          .then((res) => {
            //@ts-ignore
            this.realTimeValue[parameter] = res;
            //this.realTimeValue[parameter] = res[0].value;
            this.loadedRealTimeValue = true;
          })
          .catch((e) => {
            console.log('Error to retrieve daily ' + parameter);
            this.realTimeValue[parameter] = e;
            this.loadedRealTimeValue = true;
          })

        }
      )
      .catch((e) => console.log('REAL TIME - Health is not authorized!'));
  };

  getDailyValues = (parameter) => {
    Health.isAuthorized([parameter])
      .then((auth) =>{

        let startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString().replace(/T/, ' ').replace(/\..+/, ''); // Today 00:00
        let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
      
        Health.queryAggregated({
          startDate: new Date(startDate),
          endDate: new Date(now), // now
          dataType: parameter,
          bucket: 'day',
        })
          .then((res) => {
            let value;

            res.forEach(function (singleData) {
              value += singleData.value;
            });

            if (parameter !== 'distance') {
              value = value / res.length;
            }

            this.dailyValue[parameter] = value;
            this.loadedDailyValue = true;
          })
          .catch((e) => {
            console.log('Error to retrieve daily ' + parameter);
            this.dailyValue[parameter] = e;
            this.loadedDailyValue = true;
          })

        }
      )
      .catch((e) => console.log('DAILY - Health is not authorized!'));
  };

  getWeeklyValues = (parameter) => {
    let curr = new Date();
    let week = [];

    for (let i = 1; i <= 7; i++) {
      let first = curr.getDate() - curr.getDay() + i;
      let day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push(day);
    }

    Health.isAuthorized([parameter])
      .then((auth) => {

        let startDate = new Date(new Date(week[0]).setHours(0, 0, 0, 0)).toISOString().replace(/T/, ' ').replace(/\..+/, ''); // Monday of current week
        let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        Health.queryAggregated({
          startDate: new Date(startDate), // Monday of current week
          endDate: new Date(now), // now
          dataType: parameter,
          bucket: 'week',
        })
          .then((res) => {
            let value;

            res.forEach(function (singleData) {
              value += singleData.value;
            });

            if (parameter !== 'distance') {
              value = value / res.length;
            }

            this.dailyValue[parameter] = value;
            this.loadedWeeklyValue = true;
          })
          .catch((e) => {
            console.log('Error to retrieve weekly ' + parameter);
            this.weeklyValue[parameter] = e;
            this.loadedWeeklyValue = true;
          })

        }

      )
      .catch((e) => console.log('WEEKLY - Health is not authorized!'));
  };

  getMonthlyValues = (parameter) => {
    let curr = new Date();
    let year = curr.getFullYear();
    let month = curr.getMonth();
    var startDate = new Date(year, month, 1, 0, 0, 0, 0).toISOString().replace(/T/, ' ').replace(/\..+/, '');

    Health.isAuthorized([parameter])
      .then((auth) => {; // Monday of current week
        
        let now = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        Health.queryAggregated({
          startDate: new Date(startDate), // 1st Day of current Month
          endDate: new Date(now), // now
          dataType: parameter,
          bucket: 'month',
        })
          .then((res) => {
            let value;

            res.forEach(function (singleData) {
              value += singleData.value;
            });

            if (parameter !== 'distance') {
              value = value / res.length;
            }

            this.dailyValue[parameter] = value;
            this.loadedMonthlyValue = true;
          })
          .catch((e) => {
            console.log('Error to retrieve monthly ' + parameter);
            this.monthlyValue[parameter] = e;
            this.loadedMonthlyValue = true;
          })

        }

      )
      .catch((e) => console.log('MONTLY - Health is not authorized!'));
  };

  getYearlyValues = (parameter) => {
    var startDate = new Date(new Date().getFullYear(), 0, 1);

    Health.isAuthorized([parameter])
      .then((auth) =>
        Health.queryAggregated({
          startDate: startDate, // 1st Day of current Year
          endDate: new Date(), // now
          dataType: parameter,
          bucket: 'year',
        })
          .then((res) => {
            let value;

            res.forEach(function (singleData) {
              value += singleData.value;
            });

            if (parameter !== 'distance') {
              value = value / res.length;
            }

            this.dailyValue[parameter] = value;
            this.loadedYearlyValue = true;
          })
          .catch((e) => {
            console.log('Error to retrieve yearly ' + parameter);
            this.yearlyValue[parameter] = e;
            this.loadedYearlyValue = true;
          })
      )
      .catch((e) => console.log('YEARLY - Health is not authorized!'));
  };
}
