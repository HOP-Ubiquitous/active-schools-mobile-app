import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { UserService } from '../../services/users/users.service';
import { TeamsService } from '../../services/teams/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})

export class TeamsPage implements OnInit {
  
  loggedUser: any;
  selectedTab: any;
  language: any;

  constructor(
    private languageService: LanguageService,
    private userService: UserService,
    private teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.language = this.languageService.language;
    this.loggedUser = this.userService.loggedUser;
    this.selectedTab = this.teamsService.selectedTab;
  }

  showTabContain = (tab) => {
    this.selectedTab = tab;
  }

  checkTeamId = (id) => {
    if(id !== undefined && id !== '') {
      return true;
    } else {
      return false;
    }
  }

}
