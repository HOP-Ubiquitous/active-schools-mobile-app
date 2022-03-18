import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.page.html',
  styleUrls: ['./new-details.page.scss'],
})
export class NewDetailsPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }
  data: any;
  selectedPost: any;

  ngOnInit() {
    fetch('./assets/json/news.json').then(res => res.json())
      .then(json => {
        this.data = json;
        this.selectedPost = this.data[0];
        console.log(this.selectedPost);
      });
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

}
