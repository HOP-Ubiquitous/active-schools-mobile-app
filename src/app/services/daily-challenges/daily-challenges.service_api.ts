import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http';
import { Router } from '@angular/router';
// import { API_URL } from '../common/api-constants';
import { UserServiceApi } from '../users/users.service_api';
import { Platform } from '@ionic/angular';
declare const cordova;
var API_URL = 'https://activeschools.hopu.eu/api/v1/';

@Injectable({
  providedIn: 'root'
})

export class DailyChallengesServiceApi {

  allDailyChallenges: any;
  dailyChallengeById: any;
  headers: any;

  constructor(private router: Router, private platform: Platform, private userServiceApi: UserServiceApi) {

    this.platform.ready().then(() => {
      this.userServiceApi = userServiceApi;
      cordova.plugin.http.setDataSerializer('json');
    }).catch((error) => {
      console.log('Error al iniciar Medical Centers - ' + error);
    });

  }

  ngOnInit() {}

  getDailyChallenges = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'daily_challenges',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allDailyChallenges = JSON.parse(response.data),
        error => console.log('Error al recibir Retos Diarios - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getDailyChallengeById = (challenge_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'daily_challenges/' + challenge_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.dailyChallengeById = JSON.parse(response.data),
        error => console.log('Error al recibir Reto Diario por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addDailyChallenge = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'daily_challenges',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.dailyChallengeById = JSON.parse(response.data),
        error => console.log('Error al añadir un Reto Diario - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editDailyChallenge = (challenge_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'daily_challenges/' + challenge_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.dailyChallengeById = JSON.parse(response.data),
        error => console.log('Error al editar Reto Diario con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteDailyChallenge = (challenge_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'daily_challenges/' + this.headers,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.dailyChallengeById = JSON.parse(response.data),
        error => console.log('Error al borrar Reto Diario con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
