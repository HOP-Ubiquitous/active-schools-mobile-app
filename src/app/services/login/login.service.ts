import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { USERS } from './login-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  restAPI: string = '';
  userData = [];
  users = [];
  loggedUser = {};

  constructor(private http: HttpClient, private router: Router) {
    this.users = USERS;
    this.loggedUser = {};
  }

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

    if (data !== undefined) {
      let i = 0;

      while (i < this.users.length) {
        if (this.users[i].username === data.username && this.users[i].password === data.password) {
          this.loggedUser = this.users[i];
          this.router.navigate(['/tabs/route']);
          break;
        }
        i++
      }

    }

  }

}
