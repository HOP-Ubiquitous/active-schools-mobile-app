import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PostsServiceApi } from './posts.service_api';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  restAPI: string = '';
  newsData: any;
  selectedNew: any;

  constructor(
    private router: Router,
    private postServiceApi: PostsServiceApi
  ) {
    this.selectedNew = {};
  }

  ngOnInit() {}

  getPosts() {
    this.postServiceApi.getPosts();
  }

  getPostById(id) {
    this.postServiceApi.getPostById(id);
  }

}
