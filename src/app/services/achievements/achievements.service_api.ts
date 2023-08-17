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

export class AchievementsServiceApi {

  allAchievements: any;
  achievementsById: any;
  headers: any;

  constructor(private router: Router, private platform: Platform, private userServiceApi: UserServiceApi) {

    this.platform.ready().then(() => {
      this.userServiceApi = userServiceApi;
      cordova.plugin.http.setDataSerializer('json');
    }).catch((error) => {
      console.log('Error al iniciar Logros - ' + error);
    });

  }

  ngOnInit() {}

  getAchievements = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'achievements',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        (response: any) => { this.allAchievements = JSON.parse(response.data); },
        (error) => { console.log('Error al recibir Logros - ' + error); }
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getAchievementById = (achievement_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'achievements/' + achievement_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        (response: any) => { this.achievementsById = JSON.parse(response.data); },
        (error) => { console.log('Error al recibir Logro por Id - ' + error); }
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addAchievement = (postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'achievements',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        (response: any) => { this.achievementsById = JSON.parse(response.data); },
        (error) => { console.log('Error al añadir un Logro - ' + error); }
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editAchievement = (achievement_id, postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'achievements/' + achievement_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        (response: any) => { this.achievementsById = JSON.parse(response.data) },
        (error) => { console.log('Error al editar Logro con Id - ' + error) }
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteAchievement = (achievement_id) => { 
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'achievements/' + achievement_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        (response: any) => { this.achievementsById = JSON.parse(response.data); },
        (error) => { console.log('Error al borrar Logro con Id - ' + error) }
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
