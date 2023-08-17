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

export class RoutesServiceApi {

  allRoutes: any[];
  routeById: {};
  headers: any;

  constructor(private router: Router, private platform: Platform, private userServiceApi: UserServiceApi) {

    this.platform.ready().then(() => {
      this.userServiceApi = userServiceApi;
      cordova.plugin.http.setDataSerializer('json');
    }).catch((error) => {
      console.log('Error al iniciar Routes - ' + error);
    });

  }

  ngOnInit() {}

  getRoutes = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'routes',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allRoutes = JSON.parse(response.data),
        error => console.log('Error al recibir Rutas - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getRouteById = (route_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'routes/' + route_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.routeById = JSON.parse(response.data),
        error => console.log('Error al recibir Ruta por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addRoute = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'routes',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.routeById = JSON.parse(response.data),
        error => console.log('Error al añadir un Ruta Nuevo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editRoute = (route_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'routes/' + route_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.routeById = JSON.parse(response.data),
        error => console.log('Error al editar Ruta con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteRoute = (route_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'routes/' + route_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.routeById = JSON.parse(response.data),
        error => console.log('Error al borrar Ruta con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
