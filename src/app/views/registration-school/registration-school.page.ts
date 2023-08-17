import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';
import { SchoolsService } from '../../services/schools/schools.service';
import { SchoolsServiceApi } from '../../services/schools/schools.service_api';
import { UserService } from '../../services/users/users.service';
import { UserServiceData } from '../../services/users/users.service_data';
import { UserServiceApi } from '../../services/users/users.service_api';
import { COUNTRIES } from '../../services/common/countries-constants';

@Component({
  selector: 'app-registration-school',
  templateUrl: './registration-school.page.html',
  styleUrls: ['./registration-school.page.scss'],
})
export class RegistrationSchoolPage implements OnInit {
  countries: any[];
  availableCountries: any[];
  availableProvinces: any[];
  availableCities: any[];
  selectedAvailableCountry: any;
  selectedAvailableProvince: any;
  selectedAvailableCity: any;
  registerData: {};
  // allSchools: any[];
  filteredSchoolsByCountries: any[];
  filteredSchoolsByProvinces: any[];
  filteredSchoolsByCities: any[];
  filteredSchools: any[];
  coursesBySchool: any[];
  selectedSchoolData: any; 
  selectedCourseData: any;
  userInfo: any;
  language: any;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private schoolService: SchoolsService,
    private schoolServiceApi: SchoolsServiceApi,
    private userService: UserService,
    private userServiceData: UserServiceData,
    private userServiceApi: UserServiceApi) {
      this.countries = COUNTRIES;
      this.availableCountries = [];
      this.availableProvinces = [];
      this.availableCities = [];
    }

  ngOnInit() {

    //TODO Hacer funcionar el filtrado de colegios según pais, provincia y ciudad.

    this.schoolService.getSchools();
    this.language = this.languageService.language;
    this.userInfo = this.userServiceData.loggedUser;

    window.setInterval(() => this.filterCountries(), 2000); //TODO Llamar a esta función de forma asíncrona

  }

  get allSchools () {
    return this.schoolServiceApi.allSchools;
  }

  filterCountries = () => {

    console.log(this.allSchools);

    if (this.allSchools !== undefined && this.allSchools.length > 0) {
      this.allSchools.forEach((school) => {

        let countryExist = this.availableCountries.some((e) => { return (e.code === school.school_country) });
  
        if (!countryExist) {
          this.countries.forEach((country) => {
  
            if (school.school_country === country.code) {
              this.availableCountries.push(country);
            }
          })
        }
  
      });

      this.filteredSchools = this.allSchools;

    }

  }

  selectedCountry = (event) => {
    this.filteredSchoolsByCountries = [];
    this.filteredSchoolsByProvinces = [];
    this.availableProvinces = [];
    this.selectedAvailableProvince = undefined;
    this.filteredSchoolsByCities = [];
    this.availableCities = [];
    this.selectedAvailableCity = undefined;

    this.selectedAvailableCountry = this.availableCountries[event.detail.value];

    this.allSchools.forEach((school) => {
      if (school.school_country === this.selectedAvailableCountry.code) {
        this.filteredSchoolsByCountries.push(school);
      }
    })

    this.filteredSchools = this.filteredSchoolsByCountries;
    this.filterProvinces();
  }

  filterProvinces = () => {
    this.filteredSchoolsByCountries.forEach((school) => {

      let provinceExist = this.availableProvinces.some((e) => { return (e === school.school_province) })

      if (!provinceExist) {
        this.availableProvinces.push(school.school_province);
      }

    });

  }

  selectedProvince = (event) => {
    this.filteredSchoolsByProvinces = [];
    this.filteredSchoolsByCities = [];
    this.availableCities = [];
    this.selectedAvailableCity = undefined;

    this.selectedAvailableProvince = this.availableProvinces[event.detail.value];

    this.filteredSchoolsByCountries.forEach((school) => {
      if (school.school_province === this.selectedAvailableProvince) {
        this.filteredSchoolsByProvinces.push(school);
      }
    })

    this.filteredSchools = this.filteredSchoolsByProvinces;
    this.filterCities();
  }

  filterCities = () => {
    this.filteredSchoolsByProvinces.forEach((school) => {

      let cityExist = this.availableCities.some((e) => { return (e === school.school_city) });

      if (!cityExist) {
        this.availableCities.push(school.school_city);
      }
      
    });

  }

  selectedCity = (event) => {
    this.filteredSchoolsByCities = [];

    this.selectedAvailableCity = this.availableCities[event.detail.value];

    this.filteredSchoolsByProvinces.forEach((school) => {
      if (school.school_city === this.selectedAvailableCity) {
        this.filteredSchoolsByCities.push(school);
      }
    })

    this.filteredSchools = this.filteredSchoolsByCities;
    // this.filterCities();
  }

  selectedSchool = (event) => {
    
    this.selectedSchoolData = this.filteredSchools[event.detail.value];

    this.schoolService.getCourses(this.selectedSchoolData.school_id);
    this.coursesBySchool = this.schoolServiceApi.coursesBySchool;
    return this.coursesBySchool;
  }

  selectedCourse = (event) => {
    this.selectedCourseData = this.schoolServiceApi.coursesBySchool[event.detail.value];
  }

  saveSchoolInfo = () => {
    // this.registerService.schoolInfo = this.registerData;
    // this.userServiceApi.editUser(this.userInfo.id, this.registerData);
    this.schoolService.addStudent(this.selectedSchoolData.school_id, this.selectedCourseData.course_id, this.userInfo.id);
  }

  skipButton = () => {
    this.router.navigate(['/registration-avatar']);
  }

  goToBack = () => {
    this.router.navigate(['/registration-personal-data']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}