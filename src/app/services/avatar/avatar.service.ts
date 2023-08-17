import { Injectable } from '@angular/core';
import { TEAMS } from '../teams/teams-constants';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  teams = TEAMS;

  constructor() { }
  
}
