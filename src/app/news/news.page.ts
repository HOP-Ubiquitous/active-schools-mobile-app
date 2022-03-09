import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {NewDetailsPage} from "../new-details/new-details.page";

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  data: any;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    fetch('./assets/json/news.json').then(res => res.json())
      .then(json => {
        this.data = json;
      });
  }

  async openTransparentModal(){
    const modal = await this.modalCtrl.create({
      component: NewDetailsPage,
      cssClass: 'transparent-modal'
    });
    await modal.present()
  }

}
