import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';

@Component({
  selector: 'app-registration-school',
  templateUrl: './registration-school.page.html',
  styleUrls: ['./registration-school.page.scss'],
})
export class RegistrationSchoolPage implements OnInit {
  registerData: {};

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    this.registerData = {
      schoolName: '',
      schoolCity: '',
      course: '',
      teacher: ''
    }
  }

  saveSchoolInfo = () => {
    this.registerService.schoolInfo = this.registerData;
    this.router.navigate(['/registration-movility']);
  }

  goToBack = () => {
    this.router.navigate(['/registration-personal-data']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}