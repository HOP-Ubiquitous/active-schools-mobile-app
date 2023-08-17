import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/users.service';
import { SchoolsService } from '../../services/schools/schools.service';
import { MedicalCentersService } from '../../services/medical-centers/medical-centers.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-registration-credentials',
  templateUrl: './registration-credentials.page.html',
  styleUrls: ['./registration-credentials.page.scss'],
})
export class RegistrationCredentialsPage implements OnInit {
  registerData: any;
  countries: any[];
  selectedContry: any;
  language: any;

  constructor(
    private router: Router,
    private userService: UserService,
    private schoolService: SchoolsService,
    private medicalCenterService: MedicalCentersService,
    private languageService: LanguageService
  ) {
    this.registerData = {};
  }

  ngOnInit() {
    
    this.language = this.languageService.language;
    this.schoolService.getSchools();
    this.medicalCenterService.getMedicalCenters();

  }

  saveCredentials = () => {

    if((this.registerData.email !== undefined && this.registerData.email !== '') &&
       (this.registerData.password !== undefined && this.registerData.password !== '') &&
       (this.registerData.checkPassword !== undefined && this.registerData.checkPassword !== '') &&
       (this.registerData.password === this.registerData.checkPassword)) {
      
        this.userService.credentialRegistered = {
        rol: 'user',
        username: this.registerData.email,
        password: this.registerData.password,
      }

      this.router.navigate(['/registration-personal-data']);

    }

  }

  goToBack = () => {
    this.router.navigate(['/login']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}
