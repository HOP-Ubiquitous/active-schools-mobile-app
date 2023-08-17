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

  allTeams: any;
  teamsById: any;
  allMembers: any;
  memberById: any;
  headers: any;

  constructor(private router: Router, private platform: Platform, private userServiceApi: UserServiceApi) {

    this.platform.ready().then(() => {
      this.userServiceApi = userServiceApi;
      cordova.plugin.http.setDataSerializer('json');
    }).catch((error) => {
      console.log('Error al iniciar Reams - ' + error);
    });

  }

  ngOnInit() {}

  getTeams = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'teams',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allTeams = JSON.parse(response.data),
        error => console.log('Error al recibir Equipos - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getTeamById = (team_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'teams/' + team_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => {this.allTeams = JSON.parse(response.data)},
        error => console.log('Error al recibir Equipo por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addTeam = (postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'teams',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => { this.teamsById = JSON.parse(response.data) },
        error => console.log('Error al añadir un Equipo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editTeam = (team_id, postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'teams/' + team_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => { this.teamsById = JSON.parse(response.data) },
        error => console.log('Error al editar Equipo con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteTeam = (team_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'teams/' + team_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.teamsById = JSON.parse(response.data),
        error => console.log('Error al borrar Equipo con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getTeamMembers = (team_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'teams/' + team_id + '/members',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allMembers = JSON.parse(response.data),
        error => console.log('Error al recibir Miembro - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getTeamMemberById = (team_id, user_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'teams/' + team_id + '/members/' + user_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.memberById = JSON.parse(response.data),
        error => console.log('Error al recibir Miembor por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addTeamMember = (team_id, postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'teams/' + team_id + '/members',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.memberById = JSON.parse(response.data),
        error => console.log('Error al añadir un Miembro - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editTeamMember = (team_id, user_id, postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'teams/' + team_id + '/members/' + user_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.memberById = JSON.parse(response.data),
        error => console.log('Error al editar Equipo con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteTeamMember = (team_id, user_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'teams/' + team_id + '/members/' + user_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.memberById = JSON.parse(response.data),
        error => console.log('Error al borrar Equipo con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
