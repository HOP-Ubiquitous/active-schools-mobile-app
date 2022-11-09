import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searching-smart-band',
  templateUrl: './searching-smart-band.page.html',
  styleUrls: ['./searching-smart-band.page.scss'],
})
export class SearchingSmartBandPage implements OnInit {
  myVar = false;

  constructor(
    private router:Router
  ) { }
  
  ngOnInit() {
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }
  
  goToMain = () => {
    this.router.navigate(['/tabs/route']);
  }

}
