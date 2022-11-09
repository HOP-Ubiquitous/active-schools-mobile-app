import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams/teams.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-ranking-teams',
  templateUrl: './ranking-teams.page.html',
  styleUrls: ['./ranking-teams.page.scss'],
})
export class RankingTeamsPage implements OnInit {

  loggedUser: any;
  users : any;
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

  constructor(
    private teamsService: TeamsService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loggedUser = this.loginService.loggedUser;
    this.users = this.loginService.users;
    this.selectedTab = 'search';
    this.tabIcon = 'search';
    this.tabTitle = 'Search Teams';
    this.filteredTeams = this.teamsService.teams;
    this.rankedTeams = this.teamsService.teams;
    this.tabMembersActive = 'steps';
    this.tabMembersTitle = 'Ranking by Steps';
    this.tabMembersIcon = 'footsteps';
    this.orderMembersByTab = 'totalSteps'
  }

  showTabContain = (tab) => {
    this.selectedTab = tab;

    if (tab === 'search') {
      this.tabIcon = 'search';
      this.tabTitle = 'Search Teams';
    } else if (tab === 'ranking') {
      this.tabIcon = 'podium';
      this.tabTitle = 'Ranking of Teams';
    } else if (tab === 'create') {
      this.tabIcon = 'create';
      this.tabTitle = 'Create Team';
    } else if (tab === 'teams') {
      this.tabIcon = 'people';
      this.tabTitle = 'My Team';
    }
  }

  searchTeam = () => {
    
    if (this.search === '') {
      this.filteredTeams = this.teamsService.teams;
    } else {
      this.filteredTeams = this.teamsService.filteredTeams(this.search);
    }
    
  }

  checkTeamId = (id) => {

    if(id !== undefined && id !== '') {

      this.users.forEach

      return true;
    } else {
      return false;
    }
  }

  addUserToTeam = (id, index) => {

    const vm = this;
    this.filteredMembers = [];

    this.filteredTeams[index].members.push(id);
    this.loggedUser.team_id = this.filteredTeams[index].team_id;

    this.filteredTeams[index].members.forEach(function(member, memberIndex) {

      let i = 0;

      while (i < vm.users.length) {
        if (member === vm.users[i].id) {
          vm.filteredMembers.push(vm.users[i]);

          break;
        }

        i++;
      }

    });

    this.subscribedTeam = this.filteredTeams[index];
    this.sortMembersBy('totlaSteps');
    this.showTabContain('team');
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

}