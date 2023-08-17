import { Component, OnInit, DoCheck, KeyValueDiffers } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { PostsService } from '../../services/posts/posts.service';
import { PostsServiceApi } from '../../services/posts/posts.service_api';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})

export class NewsPage implements OnInit, DoCheck {
  differ: any;
  data: any;
  language: any;

  constructor(
    private postsService: PostsService,
    private postsServiceApi: PostsServiceApi,
    private languageService: LanguageService
  ) {
    this.data = [];
  }

  ngOnInit() {
    this.language = this.languageService.language;
    this.postsService.getPosts();
  }

  ngDoCheck() {
    this.data = this.postsServiceApi.allPosts;
  }

  goToSinglePost = (id) => {
    this.postsService.getPostById(id);
  }

}
