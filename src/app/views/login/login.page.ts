import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';
import { DailyChallengesService } from '../../services/daily-challenges/daily-challenges.service';
import { HealthService } from '../../services/health/health.service';
//import { NotificationsService } from '../../services/notifications/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  userData: any;
  reminderNotification: boolean;

  constructor(
    public navCtrl: NavController,
    private loginService: LoginService,
    private dailyChallengesService: DailyChallengesService,
    private healthService: HealthService,
    //private notificationService: NotificationsService,
    private platform: Platform
    ) {
      const vm = this;

      this.reminderNotification = true;

      // setTimeout(function(){
      //   vm.healthService.getAuthorization();
      // }, 1000)

    }

  ngOnInit() {

    this.userData = {
      username: 'test',
      password: 'test'
    }

    this.dailyChallengesService.getDailyChallenges();
    //this.healthService.checkNativeAuthorization()
    //this.notificationService.sendReminderNotifications();
  }

  login = () => {

    console.log(this.userData);
    this.loginService.postUserLogin(this.userData);

  }

}
