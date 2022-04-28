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
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { RoutesService } from '../../services/routes/routes.service';
import { ChallengesService } from '../../services/challenges/challenges.service';
import { SettingsService } from '../../services/settings/settings.service';
import { LoginService } from '../../services/login/login.service';

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
  challengeActive: boolean;
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
  settings: any;
  userInfo: any;

  constructor(private modalCtrl: ModalController, public animationCtrl: AnimationController, private platform: Platform, private geolocation: Geolocation,
    private routesService: RoutesService, private challengeService: ChallengesService, private settingsService: SettingsService, private loginService: LoginService) {
    // @ts-ignore
    this.marker = []
    this.challengeActive = false;
    this.userFixedPosition = false;
    this.openChallengeWindow = false;
    this.openRewardWindow = false;
    this.userLocationOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    }
  }

  ngOnInit() {

    this.routesService.getRoutes();
    this.routes = this.routesService.routesData;

    this.challengeService.getChallenges();
    this.challenges = this.challengeService.challengesData;

    this.settings = this.settingsService.options;
    this.userInfo = this.loginService.loggedUser;

    this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });

    /* this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log('Notificaciones Permitidas');
      } else {
        console.log('Notificaciones No Permitidas');
      }
    });

    this.push.createChannel({
      id: 'Challenges',
      description: 'Challenge Channel',
      importance: 4
    }).then(() => console.log('Canal de notificaciones Creado!')); */

    var mymap = L.map('mapid', {
      center: [38.078611, -1.272742],
      zoom: this.settings.mapZoom,
      zoomControl: false,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: this.settings.maxMapZoom

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
      html: '',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 3 / 2, this.mymap.getZoom() * 3 / 2]
    });

    const balance = new L.DivIcon({
      className: 'balance',
      html: '',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const mental = new L.DivIcon({
      className: 'mental',
      html: '',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const strength = new L.DivIcon({
      className: 'strength',
      html: '',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    const stretch = new L.DivIcon({
      className: 'stretch',
      html: '',
      iconSize: [this.mymap.getZoom() * 3, this.mymap.getZoom() * 3],
      iconAnchor: [this.mymap.getZoom() * 1.5, this.mymap.getZoom() * 1.5]
    });

    markersIcon.push(aerobic);
    markersIcon.push(balance);
    markersIcon.push(mental);
    markersIcon.push(strength);
    markersIcon.push(stretch);

    this.routes.forEach(function (route, routeIndex) {

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

            let x = 0;

            while (x < challengeList.length) {

              if (challengeList[x].id === route.challenges[i].id) {

                vm.buildPoint(marker, route, routeIndex, route.challenges[i], challengeList[x], x);

                break;

              } else {

                x++;
              }
            }

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

  buildPoint(marker, route, routeIndex, routeChallengeInfo, challenge, challengeIndex) {

    let defaultHtml = `<div route-id="` + route.id + `" challenge-id="` + challenge.id + `" route-index="` + routeIndex + `" challenge-index="` + challengeIndex + `" class="marker-container" style="width: ` + this.mymap.getZoom() * 3 + `px; height: ` + this.mymap.getZoom() * 3 + `px; postion: relative; display: flex; justify-content: center; align-items: center">
    <div style="position: absolute; display: block; width: ` + this.mymap.getZoom() + `px; height: ` + this.mymap.getZoom() + `px; text-align: center; z-index: 1">
      <img style="height: 100%; width: auto" src="./assets/icon/challenges/challenge-`+ challenge.category + `-icon.svg">
    </div>
    <img style="position: absolute; width: 100%; height: 100%" src="./assets/icon/challenges/challenge-marker-unactive.svg">

    <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; top: 0; right: 0; background: #ff6f00; text-align: center; box-sizing: border-box; border: 1px solid #fff">
      <span style="color: #fff; line-height: 15px; font-size: 7px; display: block; position: relative; top: -1px">`+ routeChallengeInfo.completed24h + `</span>
    </div>
    <div style="position: absolute; width: 15px; height: 15px; border-radius: 50%; bottom: 0; right: 0">
      <img src="./assets/icon/challenges/challenge-success-icon.svg">
    </div>

    </div>`;

    marker.options.icon.options.html = defaultHtml;

  }

  paintMarker() {

    const vm = this;
    const challengeList = this.challenges;
    const routeList = this.routes;
    const settings = this.settings;

    console.log(this.marker);

    if (this.mymap != undefined) {
      this.mymap.eachLayer(function (layer) {

        layer.on('click', function (e) {

          let tmpDiv = document.createElement('div');

          //@ts-ignore
          tmpDiv.innerHTML = layer._icon.innerHTML;

          //let routeId = tmpDiv.querySelector('.marker-container').getAttribute('route-id');
          let challengeId = Number(tmpDiv.querySelector('.marker-container').getAttribute('challenge-id'));
          let routeIndex = Number(tmpDiv.querySelector('.marker-container').getAttribute('route-index'));
          let challengeIndex = Number(tmpDiv.querySelector('.marker-container').getAttribute('challenge-index'));

          let i = 0;

          while (i < routeList[routeIndex].challenges.length) {
            if (routeList[routeIndex].challenges[i].id === challengeId) {
              vm.selectedRouteData = routeList[routeIndex];
              vm.selectedStatsChallenge = routeList[routeIndex].challenges[i];

              vm.selectedChallenge = challengeList[challengeIndex];
              vm.openChallengeWindow = true;

              break;
            }

            i++
          }

        });

      });

    }

    window.setInterval(() => vm.getCurrentCoordinates(), settings.userTimeReportPosition * 1000);

  }

  getCurrentCoordinates() {

    const vm = this;
    const settings = this.settings;
    let allLayers = [];

    DeviceOrientation.getCurrentHeading().then((data: DeviceOrientationCompassHeading) => {

      this.deviceDegrees = data.magneticHeading;

      console.log('Orientación: ' + data)

    }, (error: any) => {
      console.log('Orientación: ' + error)
    }
    );

    this.geolocation.getCurrentPosition({ timeout: settings.userTimeReportPosition * 1000, enableHighAccuracy: true }).then((resp) => {
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

    //TODO Actuar solo sobre el punto más cercano y no recorrer todo el array de los puntos.
    //TODO Desactivar solo el punto activado sin recorrer todo los puntos creados cada vez.

    const vm = this;
    const distanceLimit = this.settings.distanceToActive;

    if (this.mymap != undefined) {
      this.mymap.eachLayer(function (layer) {

        //@ts-ignore
        if (layer.options.icon !== undefined) {

          //@ts-ignore
          if (layer.options.icon.options.className !== "userMarker") {

            //@ts-ignore
            let distanceToUser = L.latLng([layer._latlng.lat, layer._latlng.lng]).distanceTo([vm.userLatitude, vm.userLongitude]);

            //@ts-ignore
            let layerInnerHtml = layer._icon.innerHTML;

            if (distanceToUser <= distanceLimit) {

              let activeInnerIncludes = layerInnerHtml.includes('-unactive');

              if (activeInnerIncludes === true) {
                layerInnerHtml = layerInnerHtml.replace('unactive', 'active');

                //@ts-ignore
                layer._icon.innerHTML = layerInnerHtml;

                if (vm.challengeActive === false) {
                  vm.openChallengeInfo(layer);
                }

                /* if (vm.settings.pushNotifications === true) {
                  vm.sendChallengePushNotification(layer);
                } */

              }

            } else {

              let activeInnerIncludes = layerInnerHtml.includes('-active');

              if (activeInnerIncludes === true) {
                vm.challengeActive = false;

                layerInnerHtml = layerInnerHtml.replace('active', 'unactive');

                //@ts-ignore
                layer._icon.innerHTML = layerInnerHtml;
              }

            }

          }

        }

      });

    }

  }

  openChallengeInfo(layer) {

    const vm = this;
    const challengeList = this.challenges;
    const routeList = this.routes;

    let tmpDiv = document.createElement('div');

    //@ts-ignore
    tmpDiv.innerHTML = layer._icon.innerHTML;

    let challengeId = Number(tmpDiv.querySelector('.marker-container').getAttribute('challenge-id'));
    let routeIndex = Number(tmpDiv.querySelector('.marker-container').getAttribute('route-index'));
    let challengeIndex = Number(tmpDiv.querySelector('.marker-container').getAttribute('challenge-index'));

    let i = 0;

    while (i < routeList[routeIndex].challenges.length) {
      if (routeList[routeIndex].challenges[i].id === challengeId) {
        vm.selectedRouteData = routeList[routeIndex];
        vm.selectedStatsChallenge = routeList[routeIndex].challenges[i];

        vm.selectedChallenge = challengeList[challengeIndex];
        vm.openChallengeWindow = true;

        break;
      }

      i++
    }

  }

  /*
  sendChallengePushNotification(layer) {

    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
   
    const pushObject: PushObject = this.push.init(options);
   
    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

  }
  */

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
