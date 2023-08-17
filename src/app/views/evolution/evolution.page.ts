import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users/users.service';
import { LanguageService } from '../../services/language/language.service';
import * as items from '../../services/avatar/avatar-constants';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.page.html',
  styleUrls: ['./evolution.page.scss'],
})

export class EvolutionPage implements OnInit {
  items: any;
  lastItemAchieved: any;
  bodyStep: number;
  hidePrevBodyButton: boolean;
  hideNextBodyButton: boolean;
  headStep: number;
  hidePrevHeadButton: boolean;
  hideNextHeadButton: boolean;

  headDecoratorArray: any;
  bodyDecoratorArray: any;

  headDecorator: any;
  bodyDecorator: any;
  user: any;
  heads: any;
  bodies: any;
  selectedHead: any;
  selectedBody: any;

  language: any;

  constructor(
    private userService: UserService,
    private languageService: LanguageService
  ) {

    this.language = this.languageService.language;

    this.user = userService.loggedUser;
    this.bodyStep = this.user.avatar.avatar_body_decorator_id;
    this.headStep = this.user.avatar.avatar_head_decorator_id;
    this.heads = items.AVATAR_HEADS;
    this.bodies = items.AVATAR_BODIES;
    
    if(this.bodyStep === 1) { //Siempre Impar (1-99)
      this.hidePrevBodyButton = true;
      this.hideNextBodyButton = false;
    } else {
      this.hidePrevBodyButton = false;
      this.hideNextBodyButton = false;
    }

    if (this.headStep === 0) { //Siempre par (0-98)
      this.hidePrevHeadButton = true;
      this.hideNextHeadButton = false;
    } else {
      this.hidePrevHeadButton = false;
      this.hideNextHeadButton = false;
    }

    this.headDecoratorArray = [];
    this.bodyDecoratorArray = [];

  }

  ngOnInit() {
    //TODO Filtrar los items conseguidos por los distintos tipos (top, mid, bottom), creando un array para cada uno, colocando flechas a ambos lados
    //del personaje a diferentes altura, pudiendo el usuario customizar la apariencia del personaje con los items desbloqueados de los diferentes tipos.
    //Pulsando en las flechas y según la posición de esta, pasará al siguiente o anterior item del tipo superior, medio o inferior.

    this.items = items.EVOLUTION_ITEMS;
    console.log(this.user);

    this.getAvatar();
    this.createDecoratorsArray();
    this.checkAchievedItems();
  }

  getAvatar = () => {
    const vm = this;
    let i = 0;
    let x = 0;

    while(i < vm.heads.length) {
      if (vm.heads[i].id === vm.user.avatar.avatar_head_id) {
        vm.selectedHead = vm.heads[i].icon;
        break;
      }
      i++;
    };

    while(x < vm.bodies.length) {
      if (vm.bodies[x].id === vm.user.avatar.avatar_body_id) {
        vm.selectedBody = vm.bodies[x].icon;
        break;
      }
      x++;
    };

  }

  createDecoratorsArray = () => {
    const vm = this;

    this.items.forEach(function(item) {
      vm.bodyDecoratorArray.push(false);
      vm.headDecoratorArray.push(false);
    });

    this.bodyDecoratorArray[this.bodyStep] = true;
    this.headDecoratorArray[this.headStep] = true;
  }

  changeBodyDecorator = (step) => {

    if (this.bodyStep === undefined) {
      this.bodyStep = 1;
    }

    if (this.bodyStep === 1 && step === -2) {
      this.bodyStep = 1;
      this.hidePrevBodyButton = true;
      this.hideNextBodyButton = false;
    } else if (this.bodyStep === 99 && step === 2) { //TODO Controlar cual es el número de decorators desbloqueados
      this.bodyStep = 99;
      this.hidePrevBodyButton = false;
      this.hideNextBodyButton = true;
    } else {
      this.bodyStep += step;

      if (this.bodyStep === 1) {
        this.hidePrevBodyButton = true;
        this.hideNextBodyButton = false;
      } else {
        this.hidePrevBodyButton = false;
        this.hideNextBodyButton = false;
      }

    }

    this.checkBodyDecoratorIndex(this.bodyStep);

  }

  changeHeadDecorator = (step) => {

    if (this.headStep === undefined) {
      this.headStep = 0;
    }

    if (this.headStep === 0 && step === -2) {
      this.headStep = 0;
      this.hidePrevHeadButton = true;
      this.hideNextHeadButton = false;
    } else if (this.headStep === 98 && step === 2) { //TODO Cuando llega al máxmimo, necesita dos clicks para volver a activar el botón "siguiente"
      this.bodyStep = 98;
      this.hidePrevHeadButton = false;
      this.hideNextHeadButton = true;
    } else {
      this.headStep += step;
      
      if (this.headStep === 0) {
        this.hidePrevHeadButton = true;
        this.hideNextHeadButton = false;
      } else {
        this.hidePrevHeadButton = false;
        this.hideNextHeadButton = false;
      }

    }

    this.checkHeadDecoratorIndex(this.headStep);

  }

  checkAchievedItems = () => {
    let vm = this;
    let lastItemAchieved = '';
    this.items.forEach(function (item, index) {
      if (item.achieved === true) {
        lastItemAchieved = index;
      }
    });

    this.lastItemAchieved = lastItemAchieved;

  }

  checkHeadDecoratorIndex = (index) => {

    const vm = this;

    vm.headDecoratorArray.forEach(function(decorator, decoratorIndex) {
      if (index === decoratorIndex && index % 2 === 0) {
        decorator = true;
      } else {
        decorator = false;
      }
    });

    return vm.headDecoratorArray;

  }

  checkBodyDecoratorIndex = (index) => {

    const vm = this;

    vm.bodyDecoratorArray.forEach(function(decorator, decoratorIndex) {
      if (index === decoratorIndex && index % 2!== 0) {
        decorator = true;
      } else {
        decorator = false;
      }
    });

    return vm.bodyDecoratorArray;

  }

  checkLastDiamondActive = (index, level, position) => {
    if (index < level - 3) {
      return false;
    }

    if (position === 'left') {
      if (index === level - 1) {
        if (index % 2 === 0) {
          return true;
        }
      }
    } else {
      if (index === level - 2) {
        if (index % 2 === 0) {
          return true;
        }
      }
    }

    return false;
  }

}
