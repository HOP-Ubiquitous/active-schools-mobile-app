import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData: any;

  constructor(public navCtrl: NavController, private loginService: LoginService) { }

  ngOnInit() {
    this.userData = {
      username: 'test',
      password: 'test'
    }

  }

  login() {

    console.log(this.userData);
    this.loginService.postUserLogin(this.userData);

  }


}
