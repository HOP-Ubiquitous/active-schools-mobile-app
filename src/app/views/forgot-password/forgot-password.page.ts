import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  language: any;

  constructor(
    private router:Router,
    private languageService: LanguageService
  ) { }

  ngOnInit() {

    this.language = this.languageService.language;

  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

  resetUserPassword = () => {

  }

}
