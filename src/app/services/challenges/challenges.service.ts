import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CHALLENGES } from './challenges-constants';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  restAPI: string = '';
  challengesData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getChallenges();
  }

  getChallenges() {
    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.get(URL).toPromise().then((res: any) => {
    //     this.challengesData = res.data;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    this.challengesData = CHALLENGES;

    //return promise;
  }
}