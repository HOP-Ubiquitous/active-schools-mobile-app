import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  language: any;

  constructor(
    private router: Router,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.language = this.languageService.language;
  }

  goToRoutes = () => {
    this.router.navigate(['/tabs/route']);
  }

  goToProfile = () => {
    this.router.navigate(['/tabs/profile/stats']);
  }

  // goToAchievements = () => {
  //   this.router.navigate(['/tabs/achievements/daily-challenges-list']);
  // }

  // goToTeams = () => {
  //   this.router.navigate(['/tabs/teams/search-teams']);
  // }

  goToNews = () => {
    this.router.navigate(['/tabs/news']);
  }

}
