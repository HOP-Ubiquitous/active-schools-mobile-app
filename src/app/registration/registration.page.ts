import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  activeStepIndex: any;

  constructor() {
    this.activeStepIndex = 1;
  }

  ngOnInit() {
  }
  clickButton() {
    console.log("jaskdns");
  }

}
