import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROUTES } from './routes-constants';

@Injectable({
  providedIn: 'root'
})

export class RoutesService {
  restAPI: string = '';
  routesData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.get(URL).toPromise().then((res: any) => {
    //     this.routesData = res.data;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    this.routesData = ROUTES;

    //return promise;
  }

}
