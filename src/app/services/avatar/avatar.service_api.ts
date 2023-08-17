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

export class TeamsServiceApi {

  allAvatarLevels: any;
  avatarLevelById: any;
  allAvatarAccessories: any;
  avatarAccessoryById: any;
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

  getAvatarLevels = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'avatar_levels',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allAvatarLevels = JSON.parse(response.data),
        error => console.log('Error al recibir Niveles de Avatar - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getAvatarLevelById = (avatar_level_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'avatar_levels/' + avatar_level_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarLevelById = JSON.parse(response.data),
        error => console.log('Error al recibir Nivel de Avatar por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addAvatarLevel = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'avatar_levels',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarLevelById = JSON.parse(response.data),
        error => console.log('Error al añadir un Nivel de Avatar - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editAvatarLevel = (avatar_level_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'avatar_levels/' + avatar_level_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarLevelById = JSON.parse(response.data),
        error => console.log('Error al editar Nivel de Avatar con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteAvatarLevel = (avatar_level_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'avatar_levels/' + avatar_level_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarLevelById = JSON.parse(response.data),
        error => console.log('Error al borrar Nivel de Avatar con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getAvatarAccessories = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'avatar_accessories',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allAvatarAccessories = JSON.parse(response.data),
        error => console.log('Error al recibir Accesorios de Avatar - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getAvatarAccessoryById = (avatar_accessory_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'avatar_accessories/' + avatar_accessory_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarAccessoryById = JSON.parse(response.data),
        error => console.log('Error al recibir Accesorio de Avatar por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addAvatarAccessory = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'avatar_accessories',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarAccessoryById = JSON.parse(response.results),
        error => console.log('Error al añadir un Accesorio de Avatar - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editAvatarAccessory = (avatar_accessory_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'avatar_accessories/' + avatar_accessory_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarAccessoryById = JSON.parse(response.data),
        error => console.log('Error al editar Accesorio de Avatar con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteAvatarAccessory = (avatar_accessory_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'avatar_accessories/' + avatar_accessory_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.avatarAccessoryById = JSON.parse(response.data),
        error => console.log('Error al borrar Nivel de Avatar con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
