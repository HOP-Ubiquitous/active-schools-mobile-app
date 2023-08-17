import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';
import { MedicalCentersService } from '../../services/medical-centers/medical-centers.service';
import { MedicalCentersServiceApi } from '../../services/medical-centers/medical-centers.service_api';
import { UserServiceData } from '../../services/users/users.service_data';
import { UserServiceApi } from '../../services/users/users.service_api';

@Component({
  selector: 'app-registration-healthy',
  templateUrl: './registration-healthy.page.html',
  styleUrls: ['./registration-healthy.page.scss'],
})
export class RegistrationHealthyPage implements OnInit {
  activeStepIndex: any;
  registerData: {};
  allMedicalCenters: any[];
  selectedMedicalCenterData: any;
  loggedUser: any;
  language: any;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private medicalCentersService: MedicalCentersService,
    private medicalCentersServiceApi: MedicalCentersServiceApi,
    private userServiceData: UserServiceData,
    private userServiceApi: UserServiceApi
  ) { }

  ngOnInit() {
    
    this.language = this.languageService.language;
    this.allMedicalCenters = this.medicalCentersServiceApi.allMedicalCenters;
    this.loggedUser = this.userServiceData.loggedUser;

    this.registerData = {
      medicalCenter: '',
      doctor: ''
    }

  }

  selectedMedicalCenter = (event) => {
    this.selectedMedicalCenterData = this.allMedicalCenters[event.detail.value];
  }

  saveHealthyInfo = () => {
    
    if (this.selectedMedicalCenterData !== undefined || this.selectedMedicalCenterData !== '') {
      
      let data = {
        health_data: {
          doc_id: '',
          med_center_id: this.selectedMedicalCenterData.med_center_id
        }
      }
  
      this.userServiceApi.editUser(this.loggedUser.id, data)
      this.router.navigate(['/registration-avatar']);
    }

  }

  goToBack = () => {
    this.router.navigate(['/registration-movility']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}