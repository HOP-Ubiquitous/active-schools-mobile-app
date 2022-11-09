import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams/teams.service';
import { LoginService } from '../../services/login/login.service';
import * as items from '../../services/items/items-constants';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.page.html',
  styleUrls: ['./my-team.page.scss'],
})
export class MyTeamPage implements OnInit {

  loggedUser: any;
  users : any;
  teams: any;
  selectedTab: any;
  tabIcon: any;
  tabTitle: any;
  search: '';
  filteredTeams: any;
  rankedTeams: any;
  filteredMembers: any;
  tabMembersActive: any;
  tabMembersIcon: any;
  tabMembersTitle: any;
  orderMembersByTab: any;
  subscribedTeam: any;
  heads: any;

  constructor(private teamsService: TeamsService, private loginService: LoginService) { }

  ngOnInit() {
    this.loggedUser = this.loginService.loggedUser;
    this.users = this.loginService.users;
    this.teams = this.teamsService.teams;
    this.heads = items.AVATAR_HEADS;
    this.selectedTab = 'search';
    this.tabIcon = 'search';
    this.tabTitle = 'Search Teams';
    this.filteredTeams = this.teamsService.teams;
    this.rankedTeams = this.teamsService.teams;
    this.tabMembersActive = 'steps';
    this.tabMembersTitle = 'Ranking by Steps';
    this.tabMembersIcon = 'footsteps';
    this.orderMembersByTab = 'totalSteps';

    this.loadTeamInfo();
    this.loadMembersInfo()
  }

  loadTeamInfo = () => {
    const vm = this;
    let i = 0;

    while (i < vm.teams.length) {
      if (vm.teams[i].team_id === vm.loggedUser.team_id) {
        vm.subscribedTeam = vm.teams[i];
        break;
      }
      i++;
    }
  }

  loadMembersInfo = () => {
    const vm = this;
    this.filteredMembers = [];

    this.subscribedTeam.members.forEach(function(member, memberIndex) {
      vm.users.forEach(function(user, userIndex) {
        if (member === user.id) {

          user.headIcon = vm.getAvatarImg(user.avatar.avatar_head_id);

          vm.filteredMembers.push(user);
        }
      });
    });

  }

  sortMembers = (type) => {
    this.tabMembersActive = type;

    if (type === 'steps') {
      this.tabMembersTitle = 'Ranking by Steps';
      this.tabMembersIcon = 'footsteps';
      this.orderMembersByTab = 'totalSteps';
    } else if (type === 'challenges') {
      this.tabMembersTitle = 'Ranking by Challenges';
      this.tabMembersIcon = 'ribbon';
      this.orderMembersByTab = 'totalChallenges';
    } else if (type === 'routes') {
      this.tabMembersTitle = 'Ranking by Routes';
      this.tabMembersIcon = 'map';
      this.orderMembersByTab = 'totalRoutesComplete';
    } else if (type === 'exp') {
      this.tabMembersTitle = 'Ranking by Experience';
      this.tabMembersIcon = 'trending-up';
      this.orderMembersByTab = 'totalExp';
    }

    this.sortMembersBy(this.orderMembersByTab);

  }

  sortTeamsBy = (pattern) => {
    let teams = this.rankedTeams;
    teams.sort((a, b) => a[pattern] - b[pattern]);
    teams.reverse();
    return teams;
  }

  sortMembersBy = (pattern) => {
    this.filteredMembers.sort((a, b) => a.avatar[pattern] - b.avatar[pattern]);
    this.filteredMembers.reverse();
  }

  getAvatarImg = (avatarId) => {
    const vm = this;
    let i = 0;
    
    while (i < vm.heads.length) {
      if (vm.heads[i].id === avatarId) {
        return vm.heads[i].icon;
        
      }
      i++;
    }

  }

}