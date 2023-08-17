import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';
import { UserService } from '../../services/users/users.service';
import { SchoolsService } from '../../services/schools/schools.service';
import { MedicalCentersService } from '../../services/medical-centers/medical-centers.service';
import { COUNTRIES } from '../../services/common/countries-constants';

@Component({
  selector: 'app-registration-personal-data',
  templateUrl: './registration-personal-data.page.html',
  styleUrls: ['./registration-personal-data.page.scss'],
})

export class RegistrationPersonalDataPage implements OnInit {
  registerData: any;
  countries: any[];
  selectedContry: any;
  language: any;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private userService: UserService,
    private schoolService: SchoolsService,
    private medicalCenterService: MedicalCentersService
  ) {
    this.registerData = {};
    this.countries = COUNTRIES;
    this.userService = userService;
  }

  ngOnInit() {
    this.language = this.languageService.language;
    // this.medicalCenterService.getMedicalCenters();
  }

  selectedCountry = (event) => {
    this.selectedCountry = this.countries[event.detail.value].code;
  }

  savePersonalData = () => {

    if((this.registerData.username !== undefined && this.registerData.username !== '') &&
       (this.registerData.surname !== undefined && this.registerData.surname !== '') &&
       (this.registerData.sex !== undefined && this.registerData.sex !== '') &&
       (this.registerData.height !== undefined && this.registerData.height !== '') &&
       (this.registerData.weight !== undefined && this.registerData.weight !== '') &&
       (this.registerData.address !== undefined && this.registerData.address !== '') &&
       (this.registerData.city !== undefined && this.registerData.city !== '') &&
       (this.registerData.province !== undefined && this.registerData.province !== '') &&
       (this.selectedCountry !== undefined)) {
      
      let user = {
        rol: 'user',
        google_user: this.userService.credentialRegistered.google_user === true ? true : false,
        username: this.userService.credentialRegistered.username,
        password: this.userService.credentialRegistered.password,
        personal_data: {
          name: this.registerData.username.replace(/\s+$/, ''),
          surname: this.registerData.surname.replace(/\s+$/, ''),
          sex: this.registerData.sex.replace(/\s+$/, ''),
          weight: this.registerData.weight,
          height: this.registerData.height,
          address: this.registerData.address.replace(/\s+$/, ''),
          city: this.registerData.city.replace(/\s+$/, ''),
          province: this.registerData.province.replace(/\s+$/, ''),
          country: this.selectedCountry
        }
      }
      this.userService.addUser(user);
    } else {

    }

  }

  goToBack = () => {
    this.router.navigate(['/login']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}
