import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  restAPI: string = '';
  userData = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  postUserLogin(data) {

    // const promise = new Promise((resolve, reject) => {
    //   const URL = this.restAPI;
    //   this.http.post(URL, null, data).toPromise().then((res: any) => {
    //     this.routesData = res;
    //   }, err => {
    //     reject(err);
    //   })

    // });

    // return promise;

    //TODO revisar cómo hacerlo con state.go o $location.path
    debugger;
    if (data !== undefined) {
      window.location.href = window.location.origin + '/college-tabs/route';
      console.log(window.location.href);
    }

  }

}
