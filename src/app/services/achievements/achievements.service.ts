import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DAILY_ACHIEVEMENTS, ACHIEVEMENTS } from './achievements-constants';

@Injectable({
  providedIn: 'root'
})

export class AchievementsService {

  restAPI: string = '';
  dailyAchievementsData: any;
  achievementsData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDailyAchievements();
    this.getAchievements();
  }

  getDailyAchievements() {
    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.get(URL).toPromise().then((res: any) => {
    //     this.achievementsData = res.data;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    this.dailyAchievementsData = DAILY_ACHIEVEMENTS;

    //return promise;
  }

  getAchievements() {
    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.get(URL).toPromise().then((res: any) => {
    //     this.achievementsData = res.data;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    this.achievementsData = ACHIEVEMENTS;

    //return promise;
  }

}