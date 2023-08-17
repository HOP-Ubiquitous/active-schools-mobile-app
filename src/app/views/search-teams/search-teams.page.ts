import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { TeamsService } from '../../services/teams/teams.service';
import { UserService } from '../../services/users/users.service';

import el from '../../../assets/i18n/el.json';
import en from '../../../assets/i18n/en.json';
import es from '../../../assets/i18n/es.json';

@Component({
  selector: 'app-search-teams',
  templateUrl: './search-teams.page.html',
  styleUrls: ['./search-teams.page.scss'],
})
export class SearchTeamsPage implements OnInit {

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
  language: any;

  constructor(
    private languageService: LanguageService,
    private teamsService: TeamsService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.language = this.languageService.language;
    this.loggedUser = this.userService.loggedUser;
    this.users = this.userService.users;
    this.selectedTab = 'search'; //TODO Integrar traducciones en estas variables
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

  addUserToTeam = (idUser, idTeam) => {
    this.teamsService.addUserToTeam(idUser, idTeam);
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