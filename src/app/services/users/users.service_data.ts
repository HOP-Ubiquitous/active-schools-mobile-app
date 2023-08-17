import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../common/api-constants';

@Injectable({
  providedIn: 'root'
})

export class UserServiceData {

  allUsers = [];
  userById = {};
  routeSuccessed = {};
  challengeSuccessed = {};
  loggedUser = {};

  constructor() {
    this.allUsers = [];
    this.userById = {};
    this.routeSuccessed = {};
    this. challengeSuccessed = {};
    this.loggedUser = {};
  }

  ngOnInit() {}

}
