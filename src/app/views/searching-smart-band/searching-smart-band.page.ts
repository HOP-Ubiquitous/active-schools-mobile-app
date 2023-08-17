import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-searching-smart-band',
  templateUrl: './searching-smart-band.page.html',
  styleUrls: ['./searching-smart-band.page.scss'],
})
export class SearchingSmartBandPage implements OnInit {
  myVar = false;
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
  
  goToMain = () => {
    this.router.navigate(['/tabs/route']);
  }

}
