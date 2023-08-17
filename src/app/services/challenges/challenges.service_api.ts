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

export class ChallengesServiceApi {

  allChallenges: any[];
  challengeById: {};
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

  getChallenges = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'challenges',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allChallenges = JSON.parse(response.data),
        error => console.log('Error al recibir Challenges - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getChallengeById = (challenge_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'challenges/' + challenge_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.challengeById = JSON.parse(response.data),
        error => console.log('Error al recibir Challenge por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addChallenge = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'challenges',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.challengeById = JSON.parse(response.data),
        error => console.log('Error al añadir un Challenge Nuevo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editChallenge = (challenge_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'challenges/' + challenge_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.challengeById = JSON.parse(response.data),
        error => console.log('Error al editar Challenge con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteChallenge = (challenge_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'challenges/' + challenge_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.challengeById = JSON.parse(response.data),
        error => console.log('Error al borrar Challenge con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
