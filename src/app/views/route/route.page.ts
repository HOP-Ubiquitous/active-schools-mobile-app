import { Component } from '@angular/core';
import { ModalController, AnimationController, Platform } from '@ionic/angular';
import { AwesomeCordovaNativePlugin } from '@awesome-cordova-plugins/core'
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@awesome-cordova-plugins/device-orientation';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-rotatedmarker';
import 'src/theme/variables.scss';
import { SuccessModalPage } from '../success-modal/success-modal.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//import { Geofence } from '@ionic-native/geofence';
//import { Push, PushObject, PushOptions } from '@awesome-cordova-plugins/push/ngx';
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
  selectedRouteData: any;
  selectedStatsChallenge: any;
  userFixedPosition: boolean;

  constructor(private modalCtrl: ModalController, public animationCtrl: AnimationController, private platform: Platform, private geolocation: Geolocation,
    private routesService: RoutesService, private challengeService: ChallengesService) {
    // @ts-ignore
    this.marker = []
    //this.challenges = routes.CHALLENGES;
    //this.routes = routes.ROUTES;
    this.userFixedPosition = false;
    this.openChallengeWindow = false;
    this.openRewardWindow = false;
    this.userLocationOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    }
  }

  ngOnInit() {

    this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });

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

    // Geofence.initialize().then(

    //   () => console.log('Geofence loaded'),
    //   (error) => console.log(error)

    // )

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

  drawRoute() {

    const vm = this;
    let challengeList = this.challenges;
    let markersIcon = [];

    const aerobic = new L.DivIcon({
      className: 'aerobic',
      html: `<div id="$var-challenge-id" class="marker-container" style="width: ` + this.mymap.getZoom() * 3 + `px; height: ` + this.mymap.getZoom() * 3 + `px; postion: relative; display: flex; justify-content: center; align-items: center">
              <div style="position: absolute; display: block; width: ` + this.mymap.getZoom() + `px; height: ` + this.mymap.getZoom() + `px; text-align: center; z-index: 1">
                <img style="height: 100%; width: auto" src="./assets/icon/challenges/$var-image.svg">
              </div>
              <img style="position: absolute; width: 100%; height: 100%" src="./assets/icon/challenges/challenge-marker-unactive.svg">

              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; top: 0; right: 0; background: #ff6f00; text-align: center; box-sizing: border-box; border: 1px solid #fff">
                <span style="color: #fff; line-height: 15px; font-size: 7px; display: block; position: relative; top: -1px">$var-completed</span>
              </div>
              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; bottom: 0; right: 0">
                <img src="./assets/icon/challenges/challenge-success-icon.svg">
              </div>

            </div>`,
      //iconUrl: './assets/icon/challenges/challenge-sprint-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 3 / 2, this.mymap.getZoom() * 3 / 2]
    });

    const balance = new L.DivIcon({
      className: 'balance',
      html: `<div id="$var-challenge-id" class="marker-container" style="width: ` + this.mymap.getZoom() * 3 + `px; height: ` + this.mymap.getZoom() * 3 + `px; postion: relative; display: flex; justify-content: center; align-items: center">
              <div style="position: absolute; display: block; width: ` + this.mymap.getZoom() + `px; height: ` + this.mymap.getZoom() + `px; text-align: center; z-index: 1">
                <img style="height: 100%; width: auto" src="./assets/icon/challenges/$var-image.svg">
              </div>
              <img style="position: absolute; width: 100%; height: 100%" src="./assets/icon/challenges/challenge-marker-unactive.svg">

              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; top: 0; right: 0; background: #ff6f00; text-align: center; box-sizing: border-box; border: 1px solid #fff">
                <span style="color: #fff; line-height: 15px; font-size: 7px; display: block; position: relative; top: -1px">$var-completed</span>
              </div>
              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; bottom: 0; right: 0">
                <img src="./assets/icon/challenges/challenge-success-icon.svg">
              </div>

            </div>`,
      //iconUrl: './assets/icon/challenges/challenge-heart-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const mental = new L.DivIcon({
      className: 'mental',
      html: `<div id="$var-challenge-id" class="marker-container" style="width: ` + this.mymap.getZoom() * 3 + `px; height: ` + this.mymap.getZoom() * 3 + `px; postion: relative; display: flex; justify-content: center; align-items: center">
              <div style="position: absolute; display: block; width: ` + this.mymap.getZoom() + `px; height: ` + this.mymap.getZoom() + `px; text-align: center; z-index: 1">
                <img style="height: 100%; width: auto" src="./assets/icon/challenges/$var-image.svg">
              </div>
              <img style="position: absolute; width: 100%; height: 100%" src="./assets/icon/challenges/challenge-marker-unactive.svg">

              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; top: 0; right: 0; background: #ff6f00; text-align: center; box-sizing: border-box; border: 1px solid #fff">
                <span style="color: #fff; line-height: 15px; font-size: 7px; display: block; position: relative; top: -1px">$var-completed</span>
              </div>
              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; bottom: 0; right: 0">
                <img src="./assets/icon/challenges/challenge-success-icon.svg">
              </div>

            </div>`,
      //iconUrl: './assets/icon/challenges/challenge-weight-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const strength = new L.DivIcon({
      className: 'strength',
      html: `<div id="$var-challenge-id" class="marker-container" style="width: ` + this.mymap.getZoom() * 3 + `px; height: ` + this.mymap.getZoom() * 3 + `px; postion: relative; display: flex; justify-content: center; align-items: center">
              <div style="position: absolute; display: block; width: ` + this.mymap.getZoom() + `px; height: ` + this.mymap.getZoom() + `px; text-align: center; z-index: 1">
                <img style="height: 100%; width: auto" src="./assets/icon/challenges/$var-image.svg">
              </div>
              <img style="position: absolute; width: 100%; height: 100%" src="./assets/icon/challenges/challenge-marker-unactive.svg">

              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; top: 0; right: 0; background: #ff6f00; text-align: center; box-sizing: border-box; border: 1px solid #fff">
                <span style="color: #fff; line-height: 15px; font-size: 7px; display: block; position: relative; top: -1px">$var-completed</span>
              </div>
              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; bottom: 0; right: 0">
                <img src="./assets/icon/challenges/challenge-success-icon.svg">
              </div>

            </div>`,
      //iconUrl: './assets/icon/challenges/challenge-agility-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const stretch = new L.DivIcon({
      className: 'stretch',
      html: `<div id="$var-challenge-id" class="marker-container" style="width: ` + this.mymap.getZoom() * 3 + `px; height: ` + this.mymap.getZoom() * 3 + `px; postion: relative; display: flex; justify-content: center; align-items: center">
              <div style="position: absolute; display: block; width: ` + this.mymap.getZoom() + `px; height: ` + this.mymap.getZoom() + `px; text-align: center; z-index: 1">
                <img style="height: 100%; width: auto" src="./assets/icon/challenges/$var-image.svg">
              </div>
              <img style="position: absolute; width: 100%; height: 100%" src="./assets/icon/challenges/challenge-marker-unactive.svg">

              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; top: 0; right: 0; background: #ff6f00; text-align: center; box-sizing: border-box; border: 1px solid #fff">
                <span style="color: #fff; line-height: 15px; font-size: 7px; display: block; position: relative; top: -1px">$var-completed</span>
              </div>
              <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; bottom: 0; right: 0">
                <img src="./assets/icon/challenges/challenge-success-icon.svg">
              </div>

            </div>`,
      //iconUrl: './assets/icon/challenges/challenge-steps-marker.svg',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    markersIcon.push(aerobic);
    markersIcon.push(balance);
    markersIcon.push(mental);
    markersIcon.push(strength);
    markersIcon.push(stretch);

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

          if (route.challenges[i] !== undefined && route.challenges[i].completed24h !== undefined) {

            //@ts-ignore
            let layerHtml = marker.options.icon.options.html;

            layerHtml = layerHtml.replace('$var-completed', route.challenges[i].completed24h);
            layerHtml = layerHtml.replace('$var-challenge-id', route.challenges[i].id);

            let x = 0;

            while (x < challengeList.length) {

              if (challengeList[x].id === route.challenges[i].id) {

                layerHtml = layerHtml.replace('$var-image', 'challenge-' + challengeList[x].category + '-icon');
                break;

              } else {

                x++;
              }
            }

            //@ts-ignore
            marker.options.icon.options.html = layerHtml;

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
    const routeList = this.routes;

    console.log(this.marker);

    if (this.mymap != undefined) {
      this.mymap.eachLayer(function (layer) {

        layer.on('click', function (e) {

          let tmpDiv = document.createElement('div');

          //@ts-ignore
          tmpDiv.innerHTML = layer.options.icon.options.html;

          let challengeId = tmpDiv.querySelector('.marker-container').getAttribute('id');
          console.log(challengeId);

          if (routeList !== undefined || routeList.length > 0) {

            routeList.forEach(function (route) {

              let i = 0;
              let x = 0;

              if (route.challenges !== undefined || route.challenges.length > 0) {

                while (i < route.challenges.length) {
                  if (Number(challengeId) === route.challenges[i].id) {

                    while (x < challengeList.length) {
                      if (challengeList[x].id === Number(challengeId)) {

                        vm.selectedRouteData = route;
                        vm.selectedStatsChallenge = route.challenges[i];

                        vm.selectedChallenge = challengeList[x];
                        vm.openChallengeWindow = true;
                        break;

                      } else {

                        x++;

                      }
                    }

                    break;

                  } else {
                    i++;
                  }
                }

              }

            })

          }

        });

      });

    }

    window.setInterval(() => vm.getCurrentCoordinates(), 500);

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

    this.geolocation.getCurrentPosition({ timeout: 500, enableHighAccuracy: true }).then((resp) => {
      this.userLatitude = resp.coords.latitude;
      this.userLongitude = resp.coords.longitude;

      if (this.mymap !== undefined) {

        this.mymap.eachLayer(function (layer) {

          allLayers.push(layer);

        });

        //@ts-ignore
        if (this.findInArray(allLayers, 'userMarker') === true) {

          //console.log('Update User Marker!');
          vm.updateMarker();

        } else {

          //console.log('Create User Marker!');
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
            //console.log('User Marker Encontrado');
            return true;
          } else {
            //console.log('User Marker No Encontrado');
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
      iconSize: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5 * 1.0148],
      //iconAnchor: [this.mymap.getZoom() / 2, this.mymap.getZoom() / 6],
    });

    //@ts-ignore
    this.userMarker = L.marker([this.userLatitude, this.userLongitude], { icon: this.userMarker, rotationAngle: this.deviceDegrees, rotationOrigin: 'bottom center' });

    /* this.userMarker = L.marker([this.userLatitude, this.userLongitude], {
      icon: this.userMarker,
      //@ts-ignore
      rotationAngle: this.getRandom(0, 360),
      rotationOrigin: 'bottom center'
    }) */

    this.marker.push(this.userMarker);

    this.marker.forEach(function (singleMarker) {
      singleMarker.addTo(vm.mymap);
    });


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

            if (vm.userFixedPosition === true) {
              vm.mymap.panTo(L.latLng(vm.userLatitude, vm.userLongitude));
            }
            //vm.userMarker.setRotationAngle(vm.getRandom(0, 360));

            //console.log('Posición: ' + vm.userLatitude + ', ' + vm.userLongitude);

          }

        }

      });

    }

    this.updateGeoFence();

  }

  panToRoute(event) {
    this.mymap.panTo(L.latLng(this.routes[event.detail.value].waypoints[0][0], this.routes[event.detail.value].waypoints[0][1]));
  }

  updateGeoFence() {

    const vm = this;
    const distanceLimit = 20;

    if (this.mymap != undefined) {
      this.mymap.eachLayer(function (layer) {

        //@ts-ignore
        if (layer.options.icon !== undefined) {

          //@ts-ignore
          if (layer.options.icon.options.className !== "userMarker") {

            //@ts-ignore
            let distanceToUser = L.latLng([layer._latlng.lat, layer._latlng.lng]).distanceTo([vm.userLatitude, vm.userLongitude]);
            //@ts-ignore
            let layerHtml = layer.options.icon.options.html;
            //@ts-ignore
            let layerInnerHtml = layer._icon.innerHTML;

            if (distanceToUser <= distanceLimit) {

              let activeIncludes = layerHtml.includes('-unactive');
              let activeInnerIncludes = layerInnerHtml.includes('-unactive');

              if (activeIncludes === true && activeInnerIncludes === true) {
                layerHtml = layerHtml.replace('unactive', 'active');
                layerInnerHtml = layerInnerHtml.replace('unactive', 'active');

                //@ts-ignore
                layer.options.icon.options.html = layerHtml;
                //@ts-ignore
                layer._icon.innerHTML = layerInnerHtml;
              }

            } else {

              let activeIncludes = layerHtml.includes('-active');
              let activeInnerIncludes = layerInnerHtml.includes('-active');

              if (activeIncludes === true && activeInnerIncludes === true) {
                layerHtml = layerHtml.replace('active', 'unactive');
                layerInnerHtml = layerInnerHtml.replace('active', 'unactive');

                //@ts-ignore
                layer.options.icon.options.html = layerHtml;
                //@ts-ignore
                layer._icon.innerHTML = layerInnerHtml;
              }

            }

          }

        }

      });

    }

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
