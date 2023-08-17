//@ts-nocheck
import { Injectable } from '@angular/core';

import el from '../../../assets/i18n/el.json';
import en from '../../../assets/i18n/en.json';
import es from '../../../assets/i18n/es.json';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {

  language: any;
  selectedLanguage: any;
  english: boolean;
  greece: boolean;
  spanish: boolean;

  constructor() {
    this.selectedLanguage = navigator.language;
  }

  getLanguageData = () => {
    if (this.selectedLanguage === 'el') {
      this.language = el;

      this.english = false;
      this.greece = true;
      this.spanish = false;
    } else if (this.selectedLanguage === 'en') {
      this.language = en;

      this.english = true;
      this.greece = false;
      this.spanish = false;
    } else if (this.selectedLanguage === 'es') {
      this.language = es;

      this.english = false;
      this.greece = false;
      this.spanish = true;
    } else {
      this.language = en;

      this.english = true;
      this.greece = false;
      this.spanish = false;
    }
  }

  selectLanguage = (language) => {
    this.selectedLanguage = language;
    this.getLanguageData();
  }

}
