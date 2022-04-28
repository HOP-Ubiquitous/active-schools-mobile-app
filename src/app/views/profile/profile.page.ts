import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  userInfo: any;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userInfo = this.loginService.loggedUser;
  }

}
