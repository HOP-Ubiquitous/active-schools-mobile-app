import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news/news.service';

@Component({
  selector: 'app-single-new',
  templateUrl: './single-new.page.html',
  styleUrls: ['./single-new.page.scss'],
})

export class SingleNewPage implements OnInit {
  selectedNew: any;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getSelectedNew();
  }

  getSelectedNew() {
    this.selectedNew = this.newsService.selectedNew;
  }

}
