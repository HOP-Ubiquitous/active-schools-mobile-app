import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-new-details',
  templateUrl: './new-details.page.html',
  styleUrls: ['./new-details.page.scss'],
})
export class NewDetailsPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private languageService: LanguageService
  ) { }

  data: any;
  selectedPost: any;
  language: any;

  ngOnInit() {
    
    this.language = this.languageService.language;

    fetch('./assets/json/news.json').then(res => res.json())
      .then(json => {
        this.data = json;
        this.selectedPost = this.data[0];
        console.log(this.selectedPost);
      });
  }

  dismiss = () => {
    this.modalCtrl.dismiss();
  }

}
