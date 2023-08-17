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

export class SchoolsServiceApi {

  allSchools: any[];
  schoolById: any;
  coursesBySchool: any[];
  courseById: any;
  studentsByCourse: any[];
  studentById: any;
  headers: any;

  constructor(private router: Router, private platform: Platform, private userServiceApi: UserServiceApi) {

    this.platform.ready().then(() => {
      this.userServiceApi = userServiceApi;
      cordova.plugin.http.setDataSerializer('json');
    }).catch((error) => {
      console.log('Error al iniciar Schools - ' + error);
    });

  }

  ngOnInit() {}

  getSchools = () => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'schools',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.allSchools = JSON.parse(response.data),
        error => console.log('Error al recibir Colegios - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getSchoolById = (school_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'schools/' + school_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.schoolById = JSON.parse(response.data),
        error => console.log('Error al recibir Colegios por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addSchool = (postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'schools',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.schoolById = JSON.parse(response.data),
        error => console.log('Error al añadir un Colegio Nuevo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editSchool = (school_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'schools/' + school_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.schoolById = JSON.parse(response.data),
        error => console.log('Error al editar Colegio con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteSchool = (school_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'schools/' +  school_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.schoolById = JSON.parse(response.data),
        error => console.log('Error al borrar Colegio con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getCourses = (school_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'schools/' + school_id + '/courses',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.coursesBySchool = JSON.parse(response.data),
        error => console.log('Error al recibir Cursos - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getCourseById = (school_id, course_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'schools/' + school_id + '/courses/' + course_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.courseById = JSON.parse(response.data),
        error => console.log('Error al recibir Cursos por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addCourse = (school_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'schools/' + school_id + 'courses',
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.courseById = JSON.parse(response.data),
        error => console.log('Error al añadir un Curso Nuevo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editCourse = (school_id, course_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'schools/' + school_id + '/courses/' + course_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.courseById = JSON.parse(response.data),
        error => console.log('Error al editar Curso con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteCourse = (school_id, course_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'schools/' + school_id + '/courses/' + course_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.courseById = JSON.parse(response.data),
        error => console.log('Error al borrar Curso con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getStudents = (school_id, course_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'schools/' + school_id + '/courses/' + course_id + '/students',
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.studentsByCourse = JSON.parse(response.data),
        error => console.log('Error al recibir Estudiantes - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  getStudentsById = (school_id, course_id, student_id) => {
    this.platform.ready().then(() => {
      cordova.plugin.http.get(
        API_URL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.studentById = JSON.parse(response.data),
        error => console.log('Error al recibir Estudiante por Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  addStudent = (school_id, course_id, student_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.post(
        API_URL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => {
          this.studentById = JSON.parse(response.data); //TODO - Comprobar donde se guarda el resultado de esta operación
          this.router.navigate(['/registration-avatar']);
        },
        error => console.log('Error al añadir un Estudiante Nuevo - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  editStudent = (school_id, course_id, student_id, postData) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.put(
        API_URL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
        postData,
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.studentById = JSON.parse(response.data),
        error => console.log('Error al editar Estudiante con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

  //---- * -----//

  deleteStudent = (school_id, course_id, student_id) => { //TEST HEADERS
    this.platform.ready().then(() => {
      cordova.plugin.http.delete(
        API_URL + 'schools/' + school_id + '/courses/' + course_id + '/students/' + student_id,
        {},
        {'Authorization': 'Bearer ' + this.userServiceApi.accessToken},
        response => this.studentById = JSON.parse(response.data),
        error => console.log('Error al borrar Estudiante con Id - ' + error)
      )
    }).catch((error) => {
      console.log('Error al iniciar la plataforma - ' + error);
    });
  }

}
