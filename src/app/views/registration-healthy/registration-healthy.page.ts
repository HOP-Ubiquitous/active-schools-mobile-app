import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-registration-healthy',
  templateUrl: './registration-healthy.page.html',
  styleUrls: ['./registration-healthy.page.scss'],
})
export class RegistrationHealthyPage implements OnInit {
  activeStepIndex: any;
  registerData: {};

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.registerData = {
      medicalCenter: '',
      doctor: ''
    }
  }

  saveHealthyInfo = () => {

    this.registerService.healthyInfo = this.registerData;
    this.router.navigate(['/registration-avatar']);

  }

  goToBack = () => {
    this.router.navigate(['/registration-movility']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}