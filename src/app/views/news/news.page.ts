import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { NewDetailsPage } from "../new-details/new-details.page";
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})

export class NewsPage implements OnInit {
  data: any;

  constructor(private modalCtrl:ModalController, private newsService: NewsService) {
  }

  ngOnInit() {
    this.newsService.getNews();
    this.data = this.newsService.newsData;
  }

  async openTransparentModal(){
    const modal = await this.modalCtrl.create({
      component: NewDetailsPage,
      cssClass: 'transparent-modal',
    });
    await modal.present()
  }

}
