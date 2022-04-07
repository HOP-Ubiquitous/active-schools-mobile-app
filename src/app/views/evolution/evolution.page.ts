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
