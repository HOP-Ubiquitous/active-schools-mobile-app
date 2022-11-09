import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-registration-personal-data',
  templateUrl: './registration-personal-data.page.html',
  styleUrls: ['./registration-personal-data.page.scss'],
})
export class RegistrationPersonalDataPage implements OnInit {
  registerData: {};

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.registerData = {
      name: '',
      surname: '',
      sex: '',
      weight: '',
      height: '',
      address: '',
      city: '',
      province: '',
      country: ''
    }
  }

  savePersonalData = () => {

    this.registerService.personalData = this.registerData;
    this.router.navigate(['/registration-school']);

  }

  goToBack = () => {
    this.router.navigate(['/login']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}
