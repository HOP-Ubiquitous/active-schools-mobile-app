import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEWS } from './news-constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  restAPI: string = '';
  newsData: any;
  selectedNew: any;

  constructor(private router: Router) {
    this.selectedNew = {};
  }

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

  getSingleNew(id) {

    let i = 0;

    while (i < this.newsData.length) {
      if (this.newsData[i].id === id) {
        this.selectedNew = this.newsData[i];
        break;
      }
      i++;
    }

    this.router.navigate(['/single-new']);
  }

}
