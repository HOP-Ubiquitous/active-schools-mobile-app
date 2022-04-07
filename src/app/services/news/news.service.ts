import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEWS } from './news-constants';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  restAPI: string = '';
  newsData: any;

  constructor() { }

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.get(URL).toPromise().then((res: any) => {
    //     this.newsData = res.data;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    this.newsData = NEWS;

    //return promise;
  }

}
