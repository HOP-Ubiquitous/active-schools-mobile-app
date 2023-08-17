import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { LanguageService } from '../../services/language/language.service';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.page.html',
  styleUrls: ['./success-modal.page.scss'],
})
export class SuccessModalPage implements OnInit {

  language: any;
  
  constructor(
    private modalCtrl: ModalController,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.language = this.languageService.language;
  }

  dismiss = () =>{
    this.modalCtrl.dismiss();
  }
}
