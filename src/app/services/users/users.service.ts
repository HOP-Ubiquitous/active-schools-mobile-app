import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus';
import { Router } from '@angular/router';
import { USERS } from './users-constants';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication'
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth'
import { HealthService } from '../../services/health/health.service';
import { environment } from '../common/environment.config';

import { UserServiceApi } from './users.service_api';
import { UserServiceData } from './users.service_data';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  restAPI: string = '';
  userData = [];
  users = [];
  loggedUser = {};
  firebase: any;
  app: any;
  getAuth: any;
  getRedirectResult: any;
  signInWithCredential: any;
  signInWithPopup: any;
  environment: any;
  auth: any;
  googleUser: any;
  credentialRegistered: any;
  permissions: any[];
  nativePermission: any;
  avatarInfo = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private healthService: HealthService,
    private userServiceApi: UserServiceApi,
    private userServiceData: UserServiceData) {
    this.users = USERS;
    this.loggedUser = {};
    // this.userServiceApi = userServiceApi;
    // this.userServiceData = userServiceData;
    this.firebase = FirebaseAuthentication;
    this.environment = environment;
    this.app = initializeApp(this.environment);
    this.getAuth = getAuth(this.app);
    this.signInWithCredential = signInWithCredential;
    this.getRedirectResult = getRedirectResult;
    this.auth = new GoogleAuthProvider;

  }

  ngOnInit() {}

  getUsers = () => {
    this.userServiceApi.getUsers();
  }

  loadGoogleData = () => {

    GooglePlus.login({
      'scopes': 'email openid profile https://www.googleapis.com/auth/fitness.activity.write https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.write https://www.googleapis.com/auth/fitness.body.read https://www.googleapis.com/auth/fitness.blood_glucose.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.body_temperature.read https://www.googleapis.com/auth/fitness.location.read https://www.googleapis.com/auth/fitness.nutrition.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read https://www.googleapis.com/auth/fitness.sleep.read',
      'webClientId': '109969137738-mnra8mtlmo32hs27qd28pcmakj7gfmku.apps.googleusercontent.com'
    }).then((response) => {
      console.log(response);
      const auth = getAuth();
      let credential = GoogleAuthProvider.credential(response.idToken);
      
      this.signInWithCredential(auth, credential).then((result) => {

        this.googleUser = result.user;

        this.credentialRegistered = {
          rol: 'user',
          username: result.user.email,
          password: result.user.uid,
          google_user: true
        }

        let loginData = {
          username: result.user.email,
          password: result.user.uid
        }

        this.userServiceApi.login(loginData, 'google');
        this.healthService.getAuthorization();

      }).catch((error) => {
        const errorCode = error.code;
      });

    }).catch((error) => {
      console.log('Error to Login in Google - ' + error);
    });

  }

  checkGoogleUser = () => {
    
    let i = 0;
    while (i < this.userServiceData.allUsers.length) {
      if (this.userServiceData.allUsers[i].username === this.googleUser.email && this.userServiceData.allUsers[i].userId === this.googleUser.userId) {
        this.userServiceData.loggedUser = this.userServiceData.allUsers[i];
        break;
      }

      i++;
    }

    if (this.loggedUser === undefined) {
      this.router.navigate(['/registration-credentials']);
    }

  }

  login = (data, type) => {

    let i = 0;
    while (i < this.userServiceApi.allUsers.length) {
      if (this.userServiceApi.allUsers[i].username === data.username && this.userServiceApi.allUsers[i].password === data.password) {
        this.loggedUser = this.userServiceApi.allUsers[i];
        this.router.navigate(['/tabs/route']);
        break;
      }

      i++;
    }
    
    this.userServiceApi.login(data, type);

  }

  logout = () => {
    this.userServiceApi.logout();
  }

  addUser = (data) => {
    this.userServiceApi.addUser(data);
  }

}
