import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})

export class NewsPage implements OnInit {
  data: any;

  constructor(
    private modalCtrl: ModalController,
    private newsService: NewsService,
    private router: Router
  ) {
    
  }

  ngOnInit() {
    this.newsService.getNews();
    this.data = this.newsService.newsData;
  }

  goToSingleNew = (id) => {
    this.newsService.getSingleNew(id);
  }

}
