import { Injectable, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";

import moment from 'moment';

import { Health } from "@awesome-cordova-plugins/health";
import { IPedometerData, Pedometer } from "@ionic-native/pedometer";
import { Router } from '@angular/router';

import {
  HEALTH_REAL_TIME,
  HEALTH_DAILY,
  HEALTH_WEEKLY,
  HEALTH_MONTHLY,
  HEALTH_YEARLY,
} from "./health-constants";

@Injectable({
  providedIn: "root",
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

  dataTypes: any[];
  pedometer: any;

  constructor(private platform: Platform, private router: Router) {

    this.pedometer = Pedometer;

    this.loadedRealTimeValue = false;
    this.loadedDailyValue = false;
    this.loadedWeeklyValue = false;
    this.loadedMonthlyValue = false;
    this.loadedYearlyValue = false;
    
    this.dataTypes = [{
      read: ["steps", "distance"]
    }];

  }

  getAuthorization = () => {

    Health.isAvailable().then((available: boolean) => {

      Health.requestAuthorization(this.dataTypes).then((res) => {
        console.log("Authorized to modified this resources! - " + res);
      }).catch((e) => {
        console.log(e);
        console.log("FIRST AUTH - Health is not authorized!");
      });

    }).catch((e) => {

      // Health.requestAuthorization(this.dataTypes).then((res) => {
      //   console.log("Authorized to modified this resources! - " + res);
      // }).catch((e) => {
      //   this.getAuthorization()
      // });
        
      console.log(e);
      console.log("FIRST AUTH - Health is not available!");
      
    });

  };

  getRealTimeValues = (parameter, minutes) => {

    Health.isAvailable().then((available: boolean) => {
        
      Health.requestAuthorization(this.dataTypes).then((result) => {

        parameter.forEach((singleParameter, index) => {

          Health.query({
            startDate: moment().utc().subtract(1, 'hour').toDate(),
            endDate: moment().utc().toDate(),
            dataType: singleParameter,
            limit: 1,
          }).then((res) => {

            if (res.length === 0) {
              
              this.getPedometerRealTimeValues();

            } else {
          
              this.realTimeValue = res[0].value;
              this.stopPedomenter();
              this.loadedRealTimeValue = true;

            }
                
          }).catch((e) => {
            
            //TODO Comprobar si es necesario llamar al podómetro en todas estas situaciones

            this.getPedometerRealTimeValues();
            this.realTimeValue = e;
            this.loadedRealTimeValue = true;
            console.log("Error to retrieve daily " + singleParameter);
                
          });

        });
          
      }).catch((e) => {

        this.getPedometerRealTimeValues();
        console.log("REAL TIME - Health is not authorized! - " + e);

      });
    
    }).catch((e) => {
      
      this.getPedometerRealTimeValues();
      console.log("REAL TIME - Health is not authorized! - " + e)
    
    });

  };

  getPedometerRealTimeValues = () => {

    Pedometer.isStepCountingAvailable().then((resource) => {
      Pedometer.startPedometerUpdates().subscribe((data) => {
        console.log(data);
        this.realTimeValue = data.numberOfSteps;
        this.getRealTimeValues('steps', 60);
      });
    }).catch((error) => {
      console.log('Error al cargar Pedometer - ' + error)
    });
    
  }

  getDailyValues = (parameter) => {
  
    Health.isAvailable().then((available: boolean) => {
      
      Health.requestAuthorization(this.dataTypes).then((res) => {

        parameter.forEach((singleParameter) => {

          Health.queryAggregated({
            startDate: moment().utc().set({'hour': 0, 'minute': 0, 'second': 0}).toDate(),
            endDate: moment().utc().toDate(),
            dataType: singleParameter,
            bucket: "day",
          }).then((res) => {

            if (res.length === 0) {

              if (this.platform.is('ios')) {
                this.getPedometerWeeklyValues();
              } else {
                this.getPedometerRealTimeValues();
              }

            } else {

              let value:any = 0;

              res.forEach(function (singleData) {
                value = value + singleData.value;
              });

              if (singleParameter !== "distance") {
                value = value / res.length;
              }

              this.dailyValue = value;
              this.stopPedomenter();
              this.loadedDailyValue = true;

            }

          }).catch((e) => {

            if (this.platform.is('ios')) {
              this.getPedometerDailyValues();
            } else {
              this.getPedometerRealTimeValues();
            }

            this.dailyValue = e;
            this.loadedDailyValue = true;
            console.log("Error to retrieve daily " + singleParameter);

          });

        });

      }).catch((e) => {

        if (this.platform.is('ios')) {
          this.getPedometerDailyValues();
        } else {
          this.getPedometerRealTimeValues();
        }

        console.log("DAILY - Health is not authorized! - " + e);

      });

    }).catch((e) => {

      if (this.platform.is('ios')) {
        this.getPedometerDailyValues();
      } else {
        this.getPedometerRealTimeValues();
      }

      console.log("DAILY - Health is not authorized! - " + e);

    });

  };

  getPedometerDailyValues = () => {

    let options = {
      startDate: moment().set({'hour': 0, 'minute': 0, 'second': 0}).utc().toDate(),
      endDate: moment().utc().toDate()
    };

    Pedometer.isStepCountingAvailable().then((resource) => {
      Pedometer.queryData(options).then((data: IPedometerData) => {

        //TODO Testear como se reciben los datos e igualar a la variable de forma similar a Fitness API
        console.log(data);
        this.dailyValue = data;
        this.getDailyValues('steps');

      }).catch((error) => {console.log('Error al recibir valores diarios - ' + error)});
    }).catch((error) => {console.log('Error al cargar Pedometer - ' + error)});

  }

  getWeeklyValues = (parameter) => {

    Health.isAvailable().then((available: boolean) => {

      Health.requestAuthorization(this.dataTypes).then((result) => {

        parameter.forEach((singleParameter) => {

          Health.queryAggregated({
            startDate: moment().isoWeekday(1).set({'hour': 0, 'minute': 0, 'second': 0}).utc().toDate(),
            endDate: moment().utc().toDate(),
            dataType: singleParameter,
            bucket: "week",
          }).then((res) => {

            if (res.length === 0) {
              
              if (this.platform.is('ios')) {
                this.getPedometerWeeklyValues();
              } else {
                this.getPedometerRealTimeValues();
              }

            } else {

              let value:any = 0;

              res.forEach(function (singleData) {
                value = value + singleData.value;
              });

              if (singleParameter !== "distance") {
                value = value / res.length;
              }

              this.weeklyValue = value;
              this.stopPedomenter();
              this.loadedWeeklyValue = true;

            }

          }).catch((e) => {

            if (this.platform.is('ios')) {
              this.getPedometerWeeklyValues();
            } else {
              this.getPedometerRealTimeValues();
            }

            this.weeklyValue = e;
            this.loadedWeeklyValue = true;
            console.log("Error to retrieve weekly " + singleParameter);

          });

        });

      }).catch((e) => {

        if (this.platform.is('ios')) {
          this.getPedometerWeeklyValues();
        } else {
          this.getPedometerRealTimeValues();
        }

        console.log("WEEKLY - Health is not authorized! - " + e);

      });

    }).catch((e) => {
      
      if (this.platform.is('ios')) {
        this.getPedometerWeeklyValues();
      } else {
        this.getPedometerRealTimeValues();
      }

      console.log("WEEKLY - Health is not authorized! - " + e);

    });

  };

  getPedometerWeeklyValues = () => {

    let options = {
      startDate: moment().isoWeekday(1).set({'hour': 0, 'minute': 0, 'second': 0}).utc().toDate(),
      endDate: moment().utc().toDate()
    };

    Pedometer.isStepCountingAvailable().then((resource) => {
      Pedometer.queryData(options).then((data: IPedometerData) => {
        
        //TODO Testear como se reciben los datos e igualar a la variable de forma similar a Fitness API
        console.log(data);
        this.weeklyValue = data;
        this.getWeeklyValues('steps');

      }).catch((error) => {console.log('Error al recibir valores semanales' + error)});
    }).catch((error) => {console.log('Error al cargar Pedometer - ' + error)});

  }

  getMonthlyValues = (parameter) => {

    Health.isAvailable().then((available: boolean) => {

      Health.requestAuthorization(this.dataTypes).then((result) => {

        parameter.forEach((singleParameter) => {

          Health.queryAggregated({
            startDate: moment().startOf('month').set({'hour': 0, 'minute': 0, 'second': 0}).utc().toDate(),
            endDate: moment().utc().toDate(),
            dataType: singleParameter,
            bucket: "month",
          }).then((res) => {

            if (res.length === 0) {

              if (this.platform.is('ios')) {
                this.getPedometerMonthlyValues();
              } else {
                this.getPedometerRealTimeValues();
              }

            } else {

              let value:any = 0;

              res.forEach(function (singleData) {
                value = value + singleData.value;
              });

              if (singleParameter !== "distance") {
                value = value / res.length;
              }

              this.monthlyValue = value;
              this.stopPedomenter();
              this.loadedMonthlyValue = true;

            }

          }).catch((e) => {

            if (this.platform.is('ios')) {
              this.getPedometerMonthlyValues();
            } else {
              this.getPedometerRealTimeValues();
            }

            this.monthlyValue = e;
            this.loadedMonthlyValue = true;
            console.log("Error to retrieve monthly " + singleParameter);

          });

        });

      }).catch((e) => {

        if (this.platform.is('ios')) {
          this.getPedometerMonthlyValues();
        } else {
          this.getPedometerRealTimeValues();
        }

        console.log("MONTHLY - Health is not authorized! - " + e);

      });

    }).catch((e) => {

      if (this.platform.is('ios')) {
        this.getPedometerMonthlyValues();
      } else {
        this.getPedometerRealTimeValues();
      }

      console.log("MONTHLY - Health is not authorized! - " + e);

    });

  };

  getPedometerMonthlyValues = () => {

    let options = {
      startDate: moment().startOf('month').set({'hour': 0, 'minute': 0, 'second': 0}).utc().toDate(),
      endDate: moment().utc().toDate()
    };

    Pedometer.isStepCountingAvailable().then((resource) => {
      Pedometer.queryData(options).then((data: IPedometerData) => {
        
        //TODO Testear como se reciben los datos e igualar a la variable de forma similar a Fitness API
        console.log(data);
        this.monthlyValue = data;
        this.getMonthlyValues('steps');

      }).catch((error) => {console.log('Error al recibir valores mensuales ' + error)});
    }).catch((error) => {console.log('Error al cargar Pedometer - ' + error)});

  }

  getYearlyValues = (parameter) => {

    Health.isAvailable().then((available: boolean) => {

      Health.requestAuthorization(this.dataTypes).then((result) => {

        parameter.forEach((singleParameter) => {

          Health.queryAggregated({
            startDate: moment().startOf('year').set({'hour': 0, 'minute': 0, 'second': 0}).utc().toDate(),
            endDate: moment().utc().toDate(),
            dataType: singleParameter,
            bucket: "year",
          }).then((res) => {

            if (res.length === 0) {

              if (this.platform.is('ios')) {
                this.getPedometerYearlyValues();
              } else {
                this.getPedometerRealTimeValues();
              }

            } else {

              let value:any = 0;
  
              res.forEach(function (singleData) {
                value = value + singleData.value;
              });
    
              if (singleParameter !== "distance") {
                value = value / res.length;
              }
    
              this.yearlyValue = value;
              this.stopPedomenter();
              this.loadedYearlyValue = true;

            }
  
          }).catch((e) => {
  
            if (this.platform.is('ios')) {
              this.getPedometerYearlyValues();
            } else {
              this.getPedometerRealTimeValues();
            }

            this.yearlyValue = e;
            this.loadedYearlyValue = true;
            console.log("Error to retrieve yearly " + singleParameter);
  
          });

        });

      }).catch((e) => {

        if (this.platform.is('ios')) {
          this.getPedometerYearlyValues();
        } else {
          this.getPedometerRealTimeValues();
        }

        console.log("YEARLY - Health is not authorized! - " + e);

      });

    }).catch((e) => {

      if (this.platform.is('ios')) {
        this.getPedometerYearlyValues();
      } else {
        this.getPedometerRealTimeValues();
      }

      console.log("YEARLY - Health is not authorized! - " + e);

    });
  
  }

  getPedometerYearlyValues = () => {

    let options = {
      startDate: moment().startOf('year').set({'hour': 0, 'minute': 0, 'second': 0}).utc().toDate(),
      endDate: moment().utc().toDate()
    };

    Pedometer.isStepCountingAvailable().then((resource) => {
      Pedometer.queryData(options).then((data: IPedometerData) => {
        
        //TODO Testear como se reciben los datos e igualar a la variable de forma similar a Fitness API
        console.log(data);
        this.yearlyValue = data;
        this.getYearlyValues('steps');

      }).catch((error) => {console.log('Error al recibir valore anuales ' + error)});
    }).catch((error) => {console.log('Error al cargar Pedometer - ' + error)});
    
  }

  stopPedomenter = () => {

    Pedometer.isStepCountingAvailable().then((resource) => {
      Pedometer.stopPedometerUpdates()
    });

  }

}
