import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SettingsService {
  options: {}

  constructor() {
    this.options = {
      pushNotification: false,
      distanceToActive: 20,
      userTimeReportPosition: 0.5,
      mapZoom: 15,
      maxMapZoom: 20,
      steepsTarget: 10000,
      sleepHoursTarget: 8
    }
  }

  ngOnInit() {

  }

}
