import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ACHIEVEMENTS } from './achievements-constants';

@Injectable({
  providedIn: 'root'
})

export class AchievementsService {

  restAPI: string = '';
  achievementsData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAchievements();
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