import { Component, OnInit, Optional } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { UserService } from '../../services/users/users.service';
import { HealthService } from '../../services/health/health.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  userData: any;
  reminderNotification: boolean;
  schoolId: string;
  permissions: any;
  nativePermission: any;
  language: any;
  selectedLanguage: string;

  constructor(
    private platform: Platform,
    public navCtrl: NavController,
    private userService: UserService,
    private healthService: HealthService,
    private languageService: LanguageService
    ) {
      const vm = this;
      this.reminderNotification = true;
    }

  ngOnInit() {

    this.userData = {
      username: '',
      password: ''
    }

    this.getLanguageData();

    this.platform.ready().then(() => {
      BackgroundMode.enable();
      this.healthService.getAuthorization();
    })
    
    this.userService.logout();
    this.userService.getUsers();

  }

  getLanguageData = () => {
    this.languageService.getLanguageData();
    this.language = this.languageService.language;
  }

  selectLanguage = (language) => {
    this.languageService.selectLanguage(language);
    this.getLanguageData();
  }
  
  login = () => {
    this.userService.login(this.userData, 'login');
  }

  loginWithGoogle = () => {
    this.userService.loadGoogleData();
  }

}
