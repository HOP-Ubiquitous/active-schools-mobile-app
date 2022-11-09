import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DAILY_CHALLENGES } from './daily-challenges-constants';

@Injectable({
  providedIn: 'root'
})

export class DailyChallengesService {

  restAPI: string = '';
  dailyChallengesData: any;
  selectedDailyChallenges: any;

  constructor(private http: HttpClient) {
    this.selectedDailyChallenges = [];
  }

  ngOnInit() {
    this.getDailyChallenges();
  }

  getDailyChallenges() {
    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.get(URL).toPromise().then((res: any) => {
    //     this.dailyChallengesData = res.data;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    const vm = this;

    this.dailyChallengesData = DAILY_CHALLENGES;

    let indexArray = [0];
    let length = 4;
    
    for (let i = 0; i < length; i++) {
      let index = getRandomNumber(1, this.dailyChallengesData.length - 1);
      indexArray.push(index);
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    indexArray.forEach(function(index) {
      vm.selectedDailyChallenges.push(vm.dailyChallengesData[index]);
    });

    //return promise;
  }

}