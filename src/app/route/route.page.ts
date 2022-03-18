import { Component } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'src/theme/variables.scss';
import {SuccessModalPage} from "../success-modal/success-modal.page";
import * as routes from './route-constants';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss' ],
})
export class RoutePage {
  mymap: L.Map;
  marker: [L.Marker];
  routes: any;
  selectedRoute: any;
  challenges: any;
  selectedChallenge: any;
  openChallengeWindow: boolean;
  openRewardWindow: boolean;

  constructor(private modalCtrl:ModalController, public animationCtrl: AnimationController)  {
    // @ts-ignore
    this.marker = []
    this.challenges = routes.CHALLENGES;
    this.routes = routes.ROUTES;
    this.openChallengeWindow = false;
    this.openRewardWindow = false;
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    var mymap = L.map('mapid', {
      center: [38.078611, -1.272742],
      zoom: 15,
      zoomControl: false,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20

    }).addTo(mymap);

    setTimeout(() => {
      mymap.invalidateSize();
    }, 0);

    var self = this;
    mymap.on('zoomend', function(this) {
     console.log(mymap.getZoom())
      var currentZoom = mymap.getZoom();
      self.deleteMarker();
      self.createMarker();
    });

    this.mymap = mymap;
    this.drawRoute()
    this.createMarker();
  }

  createMarker() {

    const vm = this;

    const MyPoint = new L.Icon({
      iconUrl: './assets/icon/my_point.svg',
      iconSize: [this.mymap.getZoom(), this.mymap.getZoom()],
      iconAnchor: [this.mymap.getZoom(), this.mymap.getZoom()]});

    this.marker.push(L.marker([38.078611, -1.272742], {icon: MyPoint}));

    this.marker.forEach(function(singleMarker) {
      singleMarker.addTo(vm.mymap);
    });

  }

  deleteMarker() {
    for(var i = 0; i <= this.marker.length; i++) {
      if(this.mymap != undefined && this.marker[i] != undefined) {
        this.mymap.removeLayer(this.marker[i])
      }
    }
    // @ts-ignore
    this.marker = []
  }

  drawRoute() {
    
    //Ceuti Route

    const vm = this;
    let markersIcon = [];

    const sprintIcon = new L.Icon({
      className: 'sprintIcon',
      iconUrl: './assets/icon/challenges/challenge-sprint-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]});

    const heartIcon = new L.Icon({
      className: 'heartIcon',
      iconUrl: './assets/icon/challenges/challenge-heart-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]});

    const weightIcon = new L.Icon({
      className: 'weightIcon',
      iconUrl: './assets/icon/challenges/challenge-weight-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]});

    const agilityIcon = new L.Icon({
      className: 'agilityIcon',
      iconUrl: './assets/icon/challenges/challenge-agility-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom()  * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]});

    const stepsIcon = new L.Icon({
      className: 'stepsIcon',
      iconUrl: './assets/icon/challenges/challenge-steps-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom()  * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]});  

    markersIcon.push(sprintIcon);
    markersIcon.push(heartIcon);
    markersIcon.push(weightIcon);
    markersIcon.push(agilityIcon);
    markersIcon.push(stepsIcon);

    this.routes.forEach(function(route) {

      let waypoints = [];
      route.waypoints.forEach(function(waypoint) {

        waypoints.push(L.latLng(waypoint[0],waypoint[1]));

      });

      L.Routing.control({
        waypoints: waypoints,
        addWaypoints: false,
        createMarker: function(i, wp, nWps) {
          
          let marker;
  
          if (i === 0) {
  
            const randomChallenge = Math.floor(Math.random() * markersIcon.length);

            let popup = L.popup({
              autoClose: false,
              closeOnClick: false
            }).setContent('Start: ' + route.start).openPopup();

            marker = L.marker(wp.latLng, {
              icon: markersIcon[randomChallenge]
            }).bindPopup(popup);
  
          } else if ( i === nWps - 1) {
  
            const randomChallenge = Math.floor(Math.random() * markersIcon.length);
            marker = L.marker(wp.latLng, {
              icon: markersIcon[randomChallenge]
            });
  
          } else {
  
            const randomChallenge = Math.floor(Math.random() * markersIcon.length);
            marker = L.marker(wp.latLng, {
              icon: markersIcon[randomChallenge]
            });
  
          }
  
          return marker;
        
        },
        // @ts-ignore
        lineOptions: {
          styles: [{color: '#00a195', opacity: 1, weight: 3}]
        }
      }).addTo(vm.mymap);

    });

    this.paintMarker();
  }

  paintMarker() {

    const vm = this;
    const challengeList = this.challenges;

    console.log(this.marker);

    if (this.mymap != undefined) {
      this.mymap.eachLayer(function(layer) {

        //@ts-ignore
        if (layer.options.icon !== undefined) {

          //@ts-ignore
          if (layer.options.icon.options.className === "sprintIcon") {
          
            layer.on('click', function(e) {
  
              let challengeIndex = 0;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;
  
            });
  
            //@ts-ignore
          } else if (layer.options.icon.options.className === "heartIcon") {
  
            layer.on('click', function(e) {
  
              let challengeIndex = 1;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;
  
            });
  
            //@ts-ignore
          } else if (layer.options.icon.options.className === "weightIcon") {
  
            layer.on('click', function(e) {
  
              let challengeIndex = 2;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;
  
            });
  
            //@ts-ignore
          } else if (layer.options.icon.options.className === "agilityIcon") {
  
            layer.on('click', function(e) {
  
              let challengeIndex = 3;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;
  
            });
  
            //@ts-ignore
          } else if (layer.options.icon.options.className === "stepsIcon") {
  
            layer.on('click', function(e) {
  
              let challengeIndex = 4;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;
  
            });
  
          }

        }

      });
    }

  }

  panToRoute(event) {
    this.mymap.panTo(L.latLng(this.routes[event.detail.value].waypoints[0][0],this.routes[event.detail.value].waypoints[0][1]));
  }

  shareChallenge() {

    const vm = this;
    this.openRewardWindow = true;

    setTimeout(function() {
      vm.openRewardWindow = false;
    }, 5000);

  }

  async openTransparentModal(){
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      cssClass: 'transparent-modal'
    });
    await modal.present()
  }

}



