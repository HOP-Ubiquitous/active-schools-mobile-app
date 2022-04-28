import { Component, OnInit } from '@angular/core';
import * as items from './evolution-constants';

@Component({
  selector: 'app-evolution',
  templateUrl: './evolution.page.html',
  styleUrls: ['./evolution.page.scss'],
})

export class EvolutionPage implements OnInit {
  items: any;
  lastItemAchieved: any;

  constructor() { }

  ngOnInit() {
    //TODO Filtrar los items conseguidos por los distintos tipos (top, mid, bottom), creando un array para cada uno, colocando flechas a ambos lados
    //del personaje a diferentes altura, pudiendo el usuario customizar la apariencia del personaje con los items desbloqueados de los diferentes tipos.
    //Pulsando en las flechas y según la posición de esta, pasará al siguiente o anterior item del tipo superior, medio o inferior.

    this.items = items.EVOLUTION_ITEMS;

    this.checkAchievedItems();
  }

  checkAchievedItems() {
    let vm = this;
    let lastItemAchieved = '';
    this.items.forEach(function (item, index) {
      if (item.achieved === true) {
        lastItemAchieved = index;
      }
    });

    this.lastItemAchieved = lastItemAchieved;

  }

}
