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

export class MedicalCentersServiceApi {

  allMedicalCenters: any;
  medicalCentersById: any;
  allDoctors: any;
  doctorById: any;
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

  getMedicalCenters = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'medical_centers',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allMedicalCenters = JSON.parse(response.data),
        error => console.log('Error al recibir Clínicas - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getMedicalCenterById = (medical_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'medical_centers/' + medical_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.medicalCentersById = JSON.parse(response.data),
        error => console.log('Error al recibir Clínica por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addMedicalCenter = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'medical_centers',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.medicalCentersById = JSON.parse(response.data),
        error => console.log('Error al añadir una Clínica Nueva - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editMedicalCenter = (medical_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'medical_centers/' +  medical_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.medicalCentersById = JSON.parse(response.data),
        error => console.log('Error al editar Usuario con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteMedicalCenter = (medical_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'medical_centers/' + medical_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.medicalCentersById = JSON.parse(response.data),
        error => console.log('Error al borrar Usuario con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getDoctorsByCenter = (medical_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'medical_centers/' + medical_id + '/doctors',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allDoctors = JSON.parse(response.data),
        error => console.log('Error al recibir Doctores - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getDoctorById = (medical_id, doctor_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.doctorById = JSON.parse(response.data),
        error => console.log('Error al recibir Doctor por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addDoctor = (medical_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'medical_centers/' + medical_id + '/doctors',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.doctorById = JSON.parse(response.data),
        error => console.log('Error al añadir un Doctor Nuevo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editDoctor = (medical_id, doctor_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.doctorById = JSON.parse(response.data),
        error => console.log('Error al editar Doctor con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteDoctor = (medical_id, doctor_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'medical_centers/' + medical_id + '/doctors/' + doctor_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.doctorById = JSON.parse(response.data),
        error => console.log('Error al borrar Doctor con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
