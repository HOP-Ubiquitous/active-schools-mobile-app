import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { UserServiceApi } from '../../services/users/users.service_api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  language: any;
  userInfo: any;

  constructor(
    private languageService: LanguageService,
    private userServiceApi: UserServiceApi
  ) {
    this.userInfo = this.userServiceApi.loggedUser;
  }

  ngOnInit() {
    this.language = this.languageService.language;
  }

  getLanguageData = () => {
    this.languageService.getLanguageData()
    this.language = this.languageService.language;
  }

  //TODO Si abro settings desde una página en concreto, cambio el idioma y cierro settings, la página inicial no modifica el idioma automáticamente, necesita ser recargadada.
  selectLanguage = (language) => {
    this.languageService.selectLanguage(language);
    this.getLanguageData();
  }

  deleteUser = () => {
    this.userServiceApi.deleteUser(this.userInfo.id)
  }

}
