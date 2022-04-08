import { Component } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core'
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@awesome-cordova-plugins/device-orientation';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-rotatedmarker';
import 'src/theme/variables.scss';
import { SuccessModalPage } from '../success-modal/success-modal.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { RoutesService } from '../../services/routes/routes.service';
import { ChallengesService } from '../../services/challenges/challenges.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
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
  userLocationOptions: {};
  userLatitude: any = 0;
  userLongitude: any = 0;
  routesLayer: any;
  routesData: any[];
  userMarker: any;
  deviceDegrees: any;

  constructor(private modalCtrl: ModalController, public animationCtrl: AnimationController, private geolocation: Geolocation,
    private routesService: RoutesService, private challengeService: ChallengesService) {
    // @ts-ignore
    this.marker = []
    //this.challenges = routes.CHALLENGES;
    //this.routes = routes.ROUTES;
    this.openChallengeWindow = false;
    this.openRewardWindow = false;
    this.userLocationOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    }
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    //var mymap = L.map('mapid').setView([38.078611, -1.272742], 15);
    var mymap = L.map('mapid', {
      center: [38.078611, -1.272742],
      zoom: 15,
      zoomControl: false,
      renderer: L.canvas(),
    });

    this.routesService.getRoutes();
    this.routes = this.routesService.routesData;

    this.challengeService.getChallenges();
    this.challenges = this.challengeService.challengesData;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20

    }).addTo(mymap);

    setTimeout(() => {
      mymap.invalidateSize();
    }, 0);

    var self = this;
    mymap.on('zoomend', function (this) {
      var currentZoom = mymap.getZoom();
      //self.deleteMarker();
      // self.createMarker();
    });

    this.mymap = mymap;
    this.drawRoute()
    // this.createMarker();

  }

  //TODO Testear geolocalización en dispositivo
  //TODO Comprobar el correcto pintado del marcador en dispositivo
  //TODO Descubrir porqué en PC la geolocalización devuelve una localización incorrecta
  //TODO Descubrir porqué en PC no se pinta aun teniendo una localización incorrecta del usuario, el marcador no se pinta

  /* deleteMarker() {
    for (var i = 0; i <= this.marker.length; i++) {
      if (this.mymap != undefined && this.marker[i] != undefined) {
        this.mymap.removeLayer(this.marker[i])
      }
    }
    // @ts-ignore
    this.marker = []
  } */

  drawRoute() {

    //Ceuti Route

    const vm = this;
    let markersIcon = [];

    const sprintIcon = new L.Icon({
      className: 'sprintIcon',
      iconUrl: './assets/icon/challenges/challenge-sprint-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const heartIcon = new L.Icon({
      className: 'heartIcon',
      iconUrl: './assets/icon/challenges/challenge-heart-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const weightIcon = new L.Icon({
      className: 'weightIcon',
      iconUrl: './assets/icon/challenges/challenge-weight-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const agilityIcon = new L.Icon({
      className: 'agilityIcon',
      iconUrl: './assets/icon/challenges/challenge-agility-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const stepsIcon = new L.Icon({
      className: 'stepsIcon',
      iconUrl: './assets/icon/challenges/challenge-steps-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    markersIcon.push(sprintIcon);
    markersIcon.push(heartIcon);
    markersIcon.push(weightIcon);
    markersIcon.push(agilityIcon);
    markersIcon.push(stepsIcon);

    this.routes.forEach(function (route) {

      let waypoints = [];
      route.waypoints.forEach(function (waypoint) {

        waypoints.push(L.latLng(waypoint[0], waypoint[1]));

      });

      L.Routing.control({
        waypoints: waypoints,
        addWaypoints: false,
        fitSelectedRoutes: false,
        router: L.Routing.osrmv1({ // No se puede hacer más de una petición por segundo
          language: 'en',
          profile: 'foot'
        }),
        createMarker: function (i, wp, nWps) {

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

          } else if (i === nWps - 1) {

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
          styles: [{ color: '#00a195', opacity: 1, weight: 3 }]
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
      this.mymap.eachLayer(function (layer) {

        //@ts-ignore
        if (layer.options.icon !== undefined) {

          //@ts-ignore
          if (layer.options.icon.options.className === "sprintIcon") {

            layer.on('click', function (e) {

              let challengeIndex = 0;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;

            });

            //@ts-ignore
          } else if (layer.options.icon.options.className === "heartIcon") {

            layer.on('click', function (e) {

              let challengeIndex = 1;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;

            });

            //@ts-ignore
          } else if (layer.options.icon.options.className === "weightIcon") {

            layer.on('click', function (e) {

              let challengeIndex = 2;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;

            });

            //@ts-ignore
          } else if (layer.options.icon.options.className === "agilityIcon") {

            layer.on('click', function (e) {

              let challengeIndex = 3;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;

            });

            //@ts-ignore
          } else if (layer.options.icon.options.className === "stepsIcon") {

            layer.on('click', function (e) {

              let challengeIndex = 4;
              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;

            });

          }

        }

      });
    }

    window.setInterval(() => vm.getCurrentCoordinates(), 2000);

    //this.getCurrentCoordinates();

  }

  getCurrentCoordinates() {

    const vm = this;
    let allLayers = [];

    DeviceOrientation.getCurrentHeading().then((data: DeviceOrientationCompassHeading) => {

      this.deviceDegrees = data.magneticHeading;

      console.log('Orientación: ' + data)

    }, (error: any) => {
      console.log('Orientación: ' + error)
    }
    );

    this.geolocation.getCurrentPosition({ timeout: 3000, enableHighAccuracy: true }).then((resp) => {
      this.userLatitude = resp.coords.latitude;
      this.userLongitude = resp.coords.longitude;

      if (this.mymap !== undefined) {

        this.mymap.eachLayer(function (layer) {

          allLayers.push(layer);

        });

        //@ts-ignore
        if (this.findInArray(allLayers, 'userMarker') === true) {

          console.log('Update User Marker!');
          vm.updateMarker();

        } else {

          console.log('Create User Marker!');
          vm.createMarker();

        }

      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  findInArray(array, itemToSearch) {

    let i = 0;

    while (i < array.length) {

      if (array[i].options.icon !== undefined) {

        if (array[i].options.icon.options !== undefined) {

          if (array[i].options.icon.options.className === itemToSearch) {
            console.log('User Marker Encontrado');
            return true;
          } else {
            console.log('User Marker No Encontrado');
          }

        }

      }

      i++;

    };

    return false;

  }

  createMarker() {

    const vm = this;

    this.userMarker = new L.Icon({
      className: 'userMarker',
      iconUrl: './assets/icon/user-marker.svg',
      iconSize: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5],
      iconAnchor: [this.mymap.getZoom() / 2, this.mymap.getZoom() - 0.35],
    });

    //@ts-ignore
    this.userMarker = L.marker([this.userLatitude, this.userLongitude], { icon: this.userMarker, rotationAngle: this.deviceDegrees })

    this.marker.push(this.userMarker);

    this.marker.forEach(function (singleMarker) {
      singleMarker.addTo(vm.mymap);
    });

    //var point = document.getElementsByClassName('userMarker')[0] as HTMLElement;
    //point.style.transform += ' rotate(45deg) !important';

    //this.mymap.panTo(L.latLng(this.userLatitude, this.userLongitude));
    this.mymap.setView([this.userLatitude, this.userLongitude], 15);

  }

  updateMarker() {

    const vm = this;

    if (this.mymap != undefined) {
      this.mymap.eachLayer(function (layer) {

        //@ts-ignore
        if (layer.options.icon !== undefined) {

          //@ts-ignore
          if (layer.options.icon.options.className === "userMarker") {

            //@ts-ignore
            layer.setLatLng([vm.userLatitude, vm.userLongitude]);

            vm.userMarker.setRotationAngle(vm.deviceDegrees);

            console.log('Posición: ' + vm.userLatitude + ', ' + vm.userLongitude);

          }

        }

      });

    }

    //var point = document.getElementsByClassName('userMarker')[0] as HTMLElement;
    //point.style.transform += ' rotate(45deg) !important';

  }

  panToRoute(event) {
    this.mymap.panTo(L.latLng(this.routes[event.detail.value].waypoints[0][0], this.routes[event.detail.value].waypoints[0][1]));
  }

  shareChallenge() {

    const vm = this;
    this.openRewardWindow = true;

    setTimeout(function () {
      vm.openRewardWindow = false;
    }, 5000);

  }

  getRandom(min, max) {
    console.log('Angulo del Marcador: ' + Math.random() * (max - min) + min);
    return Math.random() * (max - min) + min;
  }

  async openTransparentModal() {
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      cssClass: 'transparent-modal'
    });
    await modal.present()
  }

}