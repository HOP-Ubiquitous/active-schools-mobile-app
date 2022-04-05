import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  activeStepIndex: any;
  registerData: {};

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.activeStepIndex = 1;
    this.registerData = {
      name: '',
      surname: '',
      sex: '',
      weight: '',
      height: '',
      address: '',
      country: '',
      province: '',
      city: '',
      schoolName: '',
      course: '',
      teacher: '',
      transport: '',
      distance: '',
      medicalCenter: '',
      doctor: ''
    }
  }

  registerUser() {

    console.log(this.registerData);
    debugger;
    this.registerService.postUserRegister(this.registerData);

  }

}
