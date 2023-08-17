import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-registration-movility',
  templateUrl: './registration-movility.page.html',
  styleUrls: ['./registration-movility.page.scss'],
})
export class RegistrationMovilityPage implements OnInit {
  walk: false;
  registerData: {};
  language: any;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    
    this.language = this.languageService.language;
    this.registerData = {
      transport: '',
      distance: ''
    }
    this.walk = undefined;

  }

  saveMovilityInfo = () => {

    console.log(this.registerData);
    this.registerService.movilityInfo = this.registerData;
    this.router.navigate(['/registration-healthy']);

  }

  updateTransport = (boolean) => {
    this.walk = boolean;

    if (boolean === true) {
      //@ts-ignore;
      this.registerData.transport = 'walk';
    } else {
      //@ts-ignore;
      this.registerData.transport = '';
    }

    console.log(this.registerData);
  }

  goToBack = () => {
    this.router.navigate(['/registration-school']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}