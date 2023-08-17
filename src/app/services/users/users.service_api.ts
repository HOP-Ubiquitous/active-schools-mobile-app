import { Injectable } from '@angular/core';
// import { HTTP } from '@ionic-native/http';
import { Router } from '@angular/router';
// import { API_URL } from '../common/api-constants';
import { Platform } from '@ionic/angular';
declare const cordova;
var API_URL = 'https://activeschools.hopu.eu/api/v1/';

@Injectable({
  providedIn: 'root'
})

export class UserServiceApi {

  allUsers = [];
  loggedUserId = '';
  loggedUser = {};
  userById = {};
  routeSuccessed = {};
  challengeSuccessed = {};
  accessToken = '';
  simpleHeaders: any;
  headers: any;

  constructor(private router: Router, private platform: Platform) {

    this.platform.ready().then(() => {
      cordova.plugin.http.setDataSerializer('json');
      this.router = router;
    }).catch((error) => {
      console.log('Error al iniciar Usuarios - ' + error);
    });

  }

  ngOnInit() {}

  getUsers = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'users',
        {},
        {'Authorization': 'Bearer ' + this.accessToken},
        (response: any) => { this.allUsers = JSON.parse(response.data); },
        (error) => { console.log('Error al recibir Usuarios - ' + error); }
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getUserById = (user_id, type) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'users/' + user_id,
        {},
        {'Authorization': 'Bearer ' + this.accessToken},
        response => {
          if (type === 'new') {
            console.log(response.data);
            this.loggedUser = JSON.parse(response.data);
            this.router.navigate(['/registration-avatar']);
          } else if (type === 'login' || type === 'google') {
            this.loggedUser = JSON.parse(response.data);
            this.router.navigate(['/tabs/route']);
          }
        },
        error => console.log('Error al recibir Usuario por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addUser = (postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'users',
        postData,
        {'Authorization': 'Bearer ' + this.accessToken},
        response => this.userAdded(JSON.parse(response.data), postData),
        error => console.log('Error al añadir un Usuario Nuevo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  userAdded = (response, postData) => {
    let user = {
      username: postData.username,
      password: postData.password
    }

    setTimeout(() => {
      this.login(user, 'new');
    }, 3000);

  }

  //---- * -----//

  editUser = (user_id, postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'users/' + user_id,
        postData,
        {'Authorization': 'Bearer ' + this.accessToken},
        response => { this.userById = JSON.parse(response.data) },
        error => console.log('Error al editar Usuario con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteUser = (user_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'users/' + user_id,
        {},
        {'Authorization': 'Bearer ' + this.accessToken},
        response => {
          this.loggedUser = {};
          this.router.navigate(['/login']);
        },
        error =>console.log('Error al borrar Usuario con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

   successRoute = (user_id, route_id, postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'users/' + user_id + '/routes/' + route_id,
        postData,
        {'Authorization': 'Bearer ' + this.accessToken},
        response => this.routeSuccessed = JSON.parse(response.data),
        error => console.log('Error al cambiar estado Ruta - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  successChallenge = (user_id, route_id, challenge_id, postData) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'users/' + user_id + '/routes/' + route_id + '/challenges/' + challenge_id,
        postData,
        {'Authorization': 'Bearer ' + this.accessToken},
        response => { this.challengeSuccessed = JSON.parse(response.data); },
        error => console.log('Error al cambiar estado Ruta - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  login = (postData, type) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'login',
        postData,
        {},
        response => {
          this.getLoginData(JSON.parse(response.data), type)
        },
        error => this.getLoginError(error, type)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  getLoginData = (response, type) => {
    console.log(response.data);
    this.accessToken = response.access_token;
    this.loggedUser = response;
  
    if (type === 'new') {
      this.router.navigate(['/registration-school']);
    } else {
      this.router.navigate(['/tabs/route']);
    }

  }

  getLoginError = (error, type) => {
    if (type === 'google') {
      this.router.navigate(['/registration-personal-data']);
    }

    console.log('Error al hacer login! - ' + error);
  }

  //---- * -----//

  logout = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'logout',
        {},
        {'Authorization': 'Bearer ' + this.accessToken},
        response => this.router.navigate(['/login']),
        error => console.log('Error al hacer logout! - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  refreshToken = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'refresh_token',
        {},
        {'Authorization': 'Bearer ' + this.accessToken},
        response => { this.accessToken = JSON.parse(response.data.access_token); },
        error => console.log('Error al refrescar el token! - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
