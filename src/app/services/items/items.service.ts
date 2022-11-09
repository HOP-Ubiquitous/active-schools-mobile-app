import { Injectable } from '@angular/core';
import { TEAMS } from '../teams/teams-constants';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  teams = TEAMS;

  constructor() { }
  
}
