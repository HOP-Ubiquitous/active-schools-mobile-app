import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { TeamsService } from 'src/app/services/teams/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})

export class TeamsPage implements OnInit {
  
  loggedUser: any;
  selectedTab: any;

  constructor(
    private loginService: LoginService,
    private teamsService: TeamsService
  ) { }

  ngOnInit() {
    this.loggedUser = this.loginService.loggedUser;
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
