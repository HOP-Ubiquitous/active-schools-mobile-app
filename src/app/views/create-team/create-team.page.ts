import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams/teams.service';
import { UserService } from '../../services/users/users.service';
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
})
export class CreateTeamPage implements OnInit {

  userInfo: any;
  teamName: any;
  language: any;

  constructor(
    private teamsService: TeamsService,
    private usersService: UserService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.language = this.languageService.language;
    this.userInfo = this.usersService.loggedUser;
  }

  createTeam = () => {

    let teamObject = {
      team_id: 11,
      name: this.teamName,
      members: [this.userInfo.id],
      max_members: 1,
      level: 1,
      totalExp: 0,
      totalRoutesComplete: 0,
      totalRoutesComplete7d: 0,
      totalRoutesComplete24h: 0,
      totalSteps: 0,
      totalSteps7d: 0,
      totalSteps24h: 0,
      totalDistance: 0,
      totalChallenges: 0,
      totalChallenges7d: 0,
      totalChallenges24h: 0
    };

    this.teamsService.createTeam(teamObject);

  }

}