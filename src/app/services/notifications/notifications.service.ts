import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

//import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  reminderNotification: boolean;
  activeChallengeNotification: boolean;

  constructor(
    private platform: Platform
  ) {
    this.reminderNotification = true;
  }

  /*
  sendReminderNotifications = () => {

    //TODO Test if subscribe working in APK

    this.platform.pause.subscribe(async () => {
      if (this.platform.is('ios') === true) {

        LocalNotifications.schedule({
          text: 'Enjoy with family and friends the routes and challenges created near you!',
          sound: 'file://beep.caf', // Check if this sound path is correct
          icon: 'file://assets/icon/icon.png',
          smallIcon: 'file://assets/icon/small-icon.png',
          vibrate: true
        });

        this.reminderNotification = false;

      } else {

        LocalNotifications.schedule({
          text: 'Enjoy with family and friends the routes and challenges created near you!',
          sound: 'file://sound.mp3', // Check if this sound path is correct
          icon: 'file://assets/icon/icon.png',
          smallIcon: 'file://assets/icon/small-icon.png',
          vibrate: true
        });

        this.reminderNotification = false;

      }

      setTimeout(function () {
        this.reminderNotification = true;
        this.sendReminderNotifications();
      }, 1000 * 60 * 60 * 24 * 7);

    });

  }

  sendChallengeNotification = () => {

    //TODO Test if subscribe working in APK

    this.platform.pause.subscribe(async () => {
      if (this.platform.is('ios') === true) {

        LocalNotifications.schedule({
          text: 'You are close to a challenge, enter the application, complete it and receive experience points!',
          sound: 'file://beep.caf', // Check if this sound path is correct
          icon: 'file://assets/icon/icon.png',
          smallIcon: 'file://assets/icon/small-icon.png',
          vibrate: true
        });

        this.activeChallengeNotification = false;

      } else {

        LocalNotifications.schedule({
          text: 'You are close to a challenge, enter the application, complete it and receive experience points!',
          sound: 'file://sound.mp3', // Check if this sound path is correct
          icon: 'file://assets/icon/icon.png',
          smallIcon: 'file://assets/icon/small-icon.png',
          vibrate: true
        });

        this.activeChallengeNotification = false;

      }

      setTimeout(function () {
        this.activeChallengeNotification = true;
        this.sonarNoise();
      }, 1000 * 60 * 60 * 24);

    });

  }
  */

}
