import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/users.service';
import { USERS } from '../users/users-constants';
import { TEAMS } from '../teams/teams-constants';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  
  teamsFiltered = [];
  users = USERS;
  teams = TEAMS;
  selectedTab = 'search';
  userInfo: any;

  constructor(private router: Router, private usersService: UserService) { 
    this.userInfo = usersService.loggedUser;
  } 

  addUserToTeam(idUser, idTeam) {

    const vm = this;
    let i = 0;
    let x = 0;

    while (i < vm.users.length) {
      if (vm.users[i].id === idUser) {
        while(x < vm.teams.length) {
          if(vm.teams[x].team_id === idTeam) {
            vm.users[i].team_id = idTeam;
            if (!vm.teams[x].members.includes(idUser)) {
              vm.teams[x].members.push(idUser);
            }
            vm.selectedTab = 'team';
            //TODO - Llevar automáticamente a my team
            // vm.router.navigate(['/tabs/teams/my-team']);
            break;
          } else {
            x++;
          }
        }
        break;
      } else {
        i++;
      }
    }
  }

  filteredTeams(pattern) {

    const vm = this;
    this.teamsFiltered = [];

    this.teams.forEach(function(team, index) {
      if (team.name.toLowerCase().includes(pattern.toLowerCase())) {
        vm.teamsFiltered.push(team);
      }
    });

    return this.teamsFiltered;

  }

  createTeam(team) {
    this.teams.push(team);
    this.userInfo.team_id = team.team_id;
    this.router.navigate(['/tabs/teams/my-team']);
  }
}
