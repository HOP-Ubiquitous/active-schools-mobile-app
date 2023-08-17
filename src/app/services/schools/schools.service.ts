import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { SchoolsServiceApi } from './schools.service_api';
import { SchoolsServiceData } from './schools.service_data';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  constructor(
    private router: Router,
    private schoolsServiceApi: SchoolsServiceApi,
    private schoolsServiceData: SchoolsServiceData) { }

    ngOnInit() {}

    getSchools = () => {
      this.schoolsServiceApi.getSchools();
    }

    addSchool = (data) => {
      this.schoolsServiceApi.addSchool(data);
    }

    getCourses = (school_id) => {
      this.schoolsServiceApi.getCourses(school_id);
    }

    addCourse = (school_id, data) => {
      this.schoolsServiceApi.addCourse(school_id, data);
    }

    addStudent = (school_id, course_id, student_id) => {
      this.schoolsServiceApi.addStudent(school_id, course_id, student_id);
    }

}
