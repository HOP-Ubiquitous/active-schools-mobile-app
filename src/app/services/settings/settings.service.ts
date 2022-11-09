import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  options: {}

  constructor() {
    this.options = {
      pushNotification: true,
      distanceToActive: 5,
      userTimeReportPosition: 2,
      mapZoom: 15,
      maxMapZoom: 20,
      steepsTarget: 10000,
      sleepHoursTarget: 8,
      sonarNoise: true,
    }
  }

  ngOnInit() {

  }

}
