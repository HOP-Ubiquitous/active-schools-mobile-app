import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http';
import { Router } from '@angular/router';
// import { API_URL } from '../common/api-constants';
import { UserServiceApi } from '../users/users.service_api';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';

declare const cordova;
var API_URL = 'https://activeschools.hopu.eu/api/v1/';

@Injectable({
  providedIn: 'root'
})

export class PostsServiceApi {

  allPosts: any;
  postById: any;
  headers: any;

  constructor(private router: Router, private platform: Platform, private userServiceApi: UserServiceApi) {

    this.allPosts = [];
    this.postById = {};

    this.platform.ready().then(() => {
      this.userServiceApi = userServiceApi;
      cordova.plugin.http.setDataSerializer('json');
    }).catch((error) => {
      console.log('Error al iniciar Posts - ' + error);
    });

  }

  ngOnInit() {}

  getPosts = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'posts',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => {
          debugger;
          this.allPosts = JSON.parse(response.data);
          return this.allPosts.asObservable();
        },
        error => console.log('Error al recibir Posts - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getPostById = (post_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'posts/' + post_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => {
          this.postById = JSON.parse(response.data);
          this.router.navigate(['/single-new']);
        },
        error => console.log('Error al recibir Post por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addPost = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'posts/',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.postById = JSON.parse(response.data),
        error => console.log('Error al añadir un Post - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editPost = (post_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'posts/' + post_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.postById = JSON.parse(response.data),
        error => console.log('Error al editar Post con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deletePost = (post_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'posts/' + post_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.postById = JSON.parse(response.data),
        error => console.log('Error al borrar Post con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
