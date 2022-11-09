import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import * as items from '../../services/items/items-constants';

@Component({
  selector: 'app-registration-avatar',
  templateUrl: './registration-avatar.page.html',
  styleUrls: ['./registration-avatar.page.scss'],
})
export class RegistrationAvatarPage implements OnInit {
  items: any;
  heads: any;
  bodies: any;
  lastItemAchieved: any;
  bodyStep: number;
  hidePrevBodyButton: boolean;
  hideNextBodyButton: boolean;
  headStep: number;
  hidePrevHeadButton: boolean;
  hideNextHeadButton: boolean;
  selectedBody: any;
  selectedHead: any;
  user: any;
  avatarInfo: any;

  constructor(
    private router: Router, 
    private registerService: RegisterService
  ) {
    this.bodyStep = 0;
    this.headStep = 0;
    this.hidePrevBodyButton = true;
    this.hideNextBodyButton = false;
    this.hidePrevHeadButton = true;
    this.hideNextHeadButton = false;
    this.avatarInfo = {}
  }

  ngOnInit() {
    //TODO Filtrar los items conseguidos por los distintos tipos (top, mid, bottom), creando un array para cada uno, colocando flechas a ambos lados
    //del personaje a diferentes altura, pudiendo el usuario customizar la apariencia del personaje con los items desbloqueados de los diferentes tipos.
    //Pulsando en las flechas y según la posición de esta, pasará al siguiente o anterior item del tipo superior, medio o inferior.

    this.items = items.EVOLUTION_ITEMS;
    this.heads = items.AVATAR_HEADS;
    this.bodies = items.AVATAR_BODIES;

    this.selectedHead = this.heads[0].icon;
    this.selectedBody = this.bodies[0].icon;

    this.avatarInfo = {
      head: '',
      body: ''
    }

  }

  changeBody = (step) => {

    if (this.bodyStep === undefined) {
      this.bodyStep = 0;
    }

    if (this.bodyStep === 0 && step === -1) {
      this.bodyStep = 0;
      this.hidePrevBodyButton = true;
      this.hideNextBodyButton = false;
    } else if (this.bodyStep === 9 && step === 1) {
      this.bodyStep = 9;
      this.hidePrevBodyButton = false;
      this.hideNextBodyButton = true;
    } else {
      this.bodyStep += step;

      if (this.bodyStep === 0) {
        this.hidePrevBodyButton = true;
        this.hideNextBodyButton = false;
      } else if (this.bodyStep === 9) {
        this.hidePrevBodyButton = false;
        this.hideNextBodyButton = true;
      } else {
        this.hidePrevBodyButton = false;
        this.hideNextBodyButton = false;
      }

    }

    this.selectedBody = this.bodies[this.bodyStep].icon;
    this.avatarInfo.body = this.bodies[this.bodyStep].id;

  }

  changeHead = (step) => {

    if (this.headStep === undefined) {
      this.headStep = 0;
    }

    if (this.headStep === 0 && step === -1) {
      this.headStep = 0
      this.hidePrevHeadButton = true;
      this.hideNextHeadButton = false;
    } else if (this.headStep === 9 && step === 1) {
      this.headStep = 9;
      this.hidePrevHeadButton = false;
      this.hideNextHeadButton = true;
    } else {
      this.headStep += step;
      
      if (this.headStep === 0) {
        this.hidePrevHeadButton = true;
        this.hideNextHeadButton = false;
      } else if (this.headStep === 9) {
        this.hidePrevHeadButton = false;
        this.hideNextHeadButton = true;
      } else {
        this.hidePrevHeadButton = false;
        this.hideNextHeadButton = false;
      }

    }

    this.selectedHead = this.heads[this.headStep].icon;
    this.avatarInfo.head = this.heads[this.headStep].id;

  }

  saveAvatarInfo = () => {
    this.registerService.avatarInfo = this.avatarInfo;
    this.registerService.postUserRegister();
  }

  goToBack = () => {
    this.router.navigate(['/registration-healthy']);
  }

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

}