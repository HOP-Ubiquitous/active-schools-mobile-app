//@ts-nocheck
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { USERS } from '../login/login-constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  restAPI: string = '';
  routesData = [];
  personalData = {};
  schoolInfo = {};
  movilityInfo = {};
  healthyInfo = {};
  avatarInfo = {};
  users = USERS;

  constructor(private http: HttpClient, private router: Router) { }

  postUserRegister() {

    let data = {
      ...this.personalData,
      ...this.schoolInfo,
      ...this.movilityInfo,
      ...this.healthyInfo
    }

    let personalData = {
      name: data.name,
      surname: data.surname,
      sex: data.sex,
      weight: data.weight,
      height: data.height,
      address: data.address,
      country: data.country,
      province: data.province,
      city: data.city,
      schoolName: data.schoolName,
      course: data.course,
      teacher: data.teacher,
      transport: data.transport,
      distance: data.distance,
      medicalCenter: data.medicalCenter,
      doctor: data.doctor,
    }

    let avatarInfo = this.avatarInfo;

    //TODO Crear api-request donde enviar esta info y crear el usuario nuevo

    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.post(URL, null, data).toPromise().then((res: any) => {
    //     this.routesData = res;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    // return promise;

    //--- USUARIO MOCKEADO ---//
    this.users[0].personalData = personalData;
    this.users[0].avatar.avatar_head_id = avatarInfo.head;
    this.users[0].avatar.avatar_body_id = avatarInfo.body;

    console.log(this.users);

    this.router.navigate(['/searching-smart-band']);

  }

}
