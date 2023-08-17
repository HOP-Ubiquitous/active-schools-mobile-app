import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChallengesServiceApi } from './challenges.service_api';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  restAPI: string = '';
  challengesData: any;

  constructor(private challengeServiceApi: ChallengesServiceApi) { }

  ngOnInit() {}

  getChallenges() {
    this.challengeServiceApi.getChallenges();

  }
}