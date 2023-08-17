import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language/language.service';
import { PostsService } from '../../services/posts/posts.service';
import { PostsServiceApi } from '../../services/posts/posts.service_api';

@Component({
  selector: 'app-single-new',
  templateUrl: './single-new.page.html',
  styleUrls: ['./single-new.page.scss'],
})

export class SingleNewPage implements OnInit {
  language: any;
  selectedPost: any;

  constructor(
    private languageService: LanguageService,
    // private postsService: PostsService,
    private postsServiceApi: PostsServiceApi
  ) {
    this.selectedPost = this.postsServiceApi.postById;
  }

  ngOnInit() {
    this.language = this.languageService.language;

    this.postsServiceApi.postById.subscribe(variableUpdated => {
      if (variableUpdated !== this.selectedPost) {
        this.selectedPost = variableUpdated;
      }
    });

    // this.getSelectedNew();
  }

  // getSelectedNew = () => {
  //   this.selectedPost = this.postsServiceApi.postById;
  // }

}
