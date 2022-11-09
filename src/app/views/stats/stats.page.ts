import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../services/health/health.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  realTimeValue: any;
  
  heartRate: any;
  systolyc: any;
  diastolyc: any;
  steps: any;
  distance: any;

  constructor(
    private healthService: HealthService
  ) {
    this.realTimeValue = {};
  }

  ngOnInit() {

    const vm = this;

    // this.healthService.getRealTimeValues('heart_rate');
    // this.healthService.getRealTimeValues('steps');
    // this.healthService.getRealTimeValues('distance');
    // this.healthService.getRealTimeValues('blood_pressure_systolyc');
    // this.healthService.getRealTimeValues('blood_pressure_diastolyc');

    // this.realTimeValue = this.healthService.realTimeValue;

    // this.heartRate = this.getRandom(50, 90);
    // this.systolyc = this.getRandom(10, 13);
    // this.diastolyc = this.getRandom(7, 9);

  }

  //TODO Arreglar para el mockup
  // getRandom = (min, max) => {

  //   setInterval(() => {

  //     let difference = max - min;
  //     let rand = Math.random();

  //     rand = Math.floor(rand * difference);
  //     rand = rand + min;

  //     this.heartRate = rand;

  //   }, 3000);

  // } 

}
