import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  app: any;

  constructor() {

    // let nav = this.app.getComponent('nav');
    // nav.setRoot(page.component);

  }
}
