import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../common/api-constants';

@Injectable({
  providedIn: 'root'
})

export class SchoolsServiceData {

  allSchools = [];
  schoolById = {};
  coursesBySchool = [];
  courseById = {};
  studentsByCourse = [];
  studentById = {};

  constructor() {
    this.allSchools = [];
    this.schoolById = {};
    this.coursesBySchool = [];
    this.courseById = {};
    this.studentsByCourse = [];
    this.studentById = {};
  }

  ngOnInit() {}

}
