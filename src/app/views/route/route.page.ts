import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController, AnimationController, Platform } from '@ionic/angular';
import * as L from 'leaflet';
//import 'leaflet-routing-machine';
import 'leaflet-rotatedmarker';
import 'src/theme/variables.scss';
import { SuccessModalPage } from '../success-modal/success-modal.page';
//import { Geofence } from '@ionic-native/geofence';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { RoutesService } from '../../services/routes/routes.service';
import { ChallengesService } from '../../services/challenges/challenges.service';
import { SettingsService } from '../../services/settings/settings.service';
import { LoginService } from '../../services/login/login.service';
//import { NotificationsService } from '../../services/notifications/notifications.service';
import { HealthService } from '../../services/health/health.service';

import { NativeAudio } from '@awesome-cordova-plugins/native-audio';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@awesome-cordova-plugins/device-orientation';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import * as items from '../../services/items/items-constants';

@Pipe({
  name: 'safeUrl'
})

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})

export class RoutePage implements PipeTransform, OnInit {
  routeMap: L.Map;
  marker: [L.Marker];
  polylinePoints: [];
  polylineGroup: any;
  startPoints: [];
  startPointsGroup: any;
  endPoints: [];
  endPointsGroup: any;
  challengePoints: [];
  challengeGroup: any;
  getFirstUserPosition: boolean;
  userPoint: [];
  userPointGroup: any;
  line: any;
  routes: any;
  selectedRoute: any;
  challenges: any;
  selectedChallenge: any;
  challengeActive: boolean;
  openChallengeWindow: boolean;
  selectedMarker: any;
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
  selectedChallengeSuccess: boolean;
  selectedRouteIndex: any;
  selectedChallengeIndex: any;
  userFixedPosition: boolean;
  settings: any;
  userInfo: any;
  items: any;
  heads: any;
  bodies: any;
  selectedBody: any;
  selectedHead: any;

  drawInterval: any;
  loopTime: number;
  audioLoaded: boolean;
  sonarInterval: any;

  dailySteps: any;

  showVideoDemostration: boolean;
  showCountdown: boolean;

  constructor(
    private modalCtrl: ModalController,
    public animationCtrl: AnimationController,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private geolocation: Geolocation,
    private routesService: RoutesService,
    private challengeService: ChallengesService,
    private settingsService: SettingsService,
    private loginService: LoginService,
    //private notificationService: NotificationsService,
    private healthService: HealthService) {

      // @ts-ignore
    this.marker = []
    this.polylinePoints = [];
    this.challengePoints = [];
    this.challengeActive = false;
    this.userFixedPosition = false;
    this.openChallengeWindow = false;
    this.openRewardWindow = false;
    this.userLocationOptions = {
      timeout: 10000,
      enableHighAccuracy: true
    }
    this.showVideoDemostration = false;
    this.getFirstUserPosition = true;

  }

  ngOnInit() {

    this.routesService.getRoutes();
    this.routes = this.routesService.routesData;

    this.challengeService.getChallenges();
    this.challenges = this.challengeService.challengesData;

    this.settings = this.settingsService.options;
    this.userInfo = this.loginService.loggedUser;

    this.items = items.EVOLUTION_ITEMS;
    this.heads = items.AVATAR_HEADS;
    this.bodies = items.AVATAR_BODIES;

    //TODO Revisar para IOS
    this.platform.backButton.subscribeWithPriority(0, () => {
      navigator['app'].exitApp();
    });

    this.loadBeep();
    this.getAvatar();
    this.drawMap();

  }

  //-- Preload Audio (Sonar) -- //

  loadBeep = () => {
    const vm = this;

    //@ts-ignore
    NativeAudio.preloadSimple('beep', '../assets/audio/beep-1.mp3').then(function(response) {
      console.log('Audio Loaded - ' + response);
      vm.audioLoaded = true;
    }, function(error) {
      console.log('Audio Error - ' + error);
      vm.audioLoaded = false;
    });
  }

  // -- -- //

  //-- Load Avatar Info --//

  getAvatar = () => {

    const vm = this;
    let headId = this.userInfo.avatar.avatar_head_id;
    let bodyId = this.userInfo.avatar.avatar_body_id;
    let i = 0;
    let x = 0;

    while (i < this.heads.length) {
      if (headId === vm.heads[i].id) {
        vm.selectedHead = vm.heads[i].icon;
        break;
      }
      i++;
    };

    while (x < this.bodies.length) {
      if (bodyId === vm.bodies[x].id) {
        vm.selectedBody = vm.bodies[x].icon;
        break;
      }
      x++;
    };

  }

  // -- -- //

  //-- Create map and diferent layers --//

  drawMap = () => {

    const routeMap = L.map('mapid', {
      center: [38.078611, -1.272742],
      zoom: this.settings.mapZoom,
      zoomControl: false,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: this.settings.maxMapZoom
    }).addTo(routeMap);

    this.polylineGroup = L.featureGroup();
    this.startPointsGroup = L.featureGroup();
    this.endPointsGroup = L.featureGroup();
    this.challengeGroup = L.featureGroup();
    this.userPointGroup = L.featureGroup();

    this.polylineGroup.addTo(routeMap);
    this.startPointsGroup.addTo(routeMap);
    this.endPointsGroup.addTo(routeMap);
    this.challengeGroup.addTo(routeMap);
    this.userPointGroup.addTo(routeMap);

    setTimeout(() => {
      routeMap.invalidateSize();
    }, 0);

    this.routeMap = routeMap;
    this.drawRoute()

  }

  // -- -- //

  //-- Create route line and call all function to create makers --//

  drawRoute = () => {

    const vm = this;

    this.routes.forEach(function (route, routeIndex) {

      let waypoints = [];

      if (route.waypoints[0][0] !== undefined && route.waypoints[0][1] !== undefined) {
        waypoints = route.waypoints;
      }

      vm.line = new L.Polyline(waypoints, {color: '#a483c9'}).addTo(vm.polylineGroup);

      if (route.challenges.info !== undefined) {
        vm.drawStartPoint(route.id, route.waypoints[0]);
        vm.drawEndPoint(route.id, route.waypoints[route.waypoints.length - 1]);
        vm.drawChallengePoints(route.id, route.challenges);
      }

    });

    this.getCurrentCoordinates();
    this.getCurrentOrientation();

  }

  // -- -- //

  //-- Create start maker and end marker  --//

  drawStartPoint = (id, point) => {

    const vm = this;

    let startPoint = L.divIcon({
      className: "start-point",
      iconSize: [this.routeMap.getZoom() * 2, this.routeMap.getZoom() * 2],
      iconAnchor: [this.routeMap.getZoom(), this.routeMap.getZoom()],
      html: '<span></span>'
    });

    //@ts-ignore
    let startMarker = L.marker(point, {icon: startPoint, routeId: id}).addTo(vm.startPointsGroup).on('click', vm.openRouteInfo)

  }

  drawEndPoint = (id, point) => {

    const vm = this;

    let endPoint = L.divIcon({
      className: "end-point",
      iconSize: [this.routeMap.getZoom() * 2, this.routeMap.getZoom() * 2],
      iconAnchor: [this.routeMap.getZoom(), this.routeMap.getZoom()],
      html: '<span></span>'
    });

    //@ts-ignore
    let endMarker = L.marker(point, {icon: endPoint, routeId: id}).addTo(vm.endPointsGroup).on('click', vm.openRouteInfo)

  }

  // -- -- //

  //-- Create challenge markers, randomize challenges selection and open info challenge function --//

  drawChallengePoints = (id, challenges) => {

    //TODO Comprobar la categoría del challenge y asígnar el icono/loco correspondiente al crear el marcador

    const vm = this;

    let challengePoint;
    let challengeMarker;

    challenges.info.forEach(function(challenge, index) {

      if (challenge.coords[0] !== undefined && challenge.coords[1] !== undefined) {

        let randomIndex = vm.randomizeSelectedChallengeID(challenges);
        let selectedCategory = vm.getSelectedChallengeCategory(challenges.selectedChallenges[randomIndex]);

        challengePoint = L.divIcon({
          className: challenge.success ? 'challenge-point challenge-point-success' : 'challenge-point',
          iconSize: [vm.routeMap.getZoom() * 2, vm.routeMap.getZoom() * 2],
          iconAnchor: [vm.routeMap.getZoom(), vm.routeMap.getZoom()],
          html: '<span><img src="../../assets/icon/challenges/challenge-' + selectedCategory + '-icon.svg"></span>'
        });

        challengeMarker = L.marker([challenge.coords[0], challenge.coords[1]],{
          icon: challengePoint,
          //@ts-ignore
          routeId: id,
          challengeId: challenges.selectedChallenges[randomIndex],
          challengeCategory: selectedCategory,
          challengeIndex: index,
          challengeSuccess: challenge.success,
          completed24h: challenge.completed24h,
          showChallenge: false
        }).addTo(vm.challengeGroup).on('click', vm.openChallengeInfo)
      }
    })

  }

  randomizeSelectedChallengeID = (challenges) => {
    let random = Math.floor(Math.random() * challenges.selectedChallenges.length)
    return random;
  }

  getSelectedChallengeCategory = (id) => {
    const vm = this;
    let i = 0;

    while (i < vm.challenges.length) {
      if(vm.challenges[i].id === id) {
        return vm.challenges[i].category;
      }
      i++;
    }

  }

  openChallengeInfo = (e) => {
    //TODO Mejorar esta funciona
    const vm = this;
    const challengeList = this.challenges;
    const routeList = this.routes;

    let routeId: any;
    let challengeId: any;
    let challengeIndex: any;

    this.selectedMarker = e;
    this.showVideoDemostration = false;
    this.showCountdown = true;

    if (e.target !== undefined) {
      routeId = e.target.options.routeId;
      challengeId = e.target.options.challengeId;
      challengeIndex = e.target.options.challengeIndex;
    } else {
      routeId = e.options.routeId;
      challengeId = e.options.challengeId;
      challengeIndex = e.options.challengeIndex;
    }

    routeList.forEach(function(route, index) {
      if (route.id === routeId) {

        let i = 0;

        while (i < route.challenges.selectedChallenges.length) {
          if (route.challenges.selectedChallenges[i] === challengeId) {

            let x = 0;

            vm.selectedRouteData = routeList[index];
            vm.selectedStatsChallenge = routeList[index].challenges.info[challengeIndex];
            vm.selectedChallengeSuccess = routeList[index].challenges.info[challengeIndex].success;

            vm.selectedRouteIndex = index;
            vm.selectedChallengeIndex = i;

            while (x < challengeList.length) {
              if (challengeList[x].id === challengeId) {

                vm.selectedChallenge = challengeList[x];
                vm.openChallengeWindow = true;
                clearInterval(vm.drawInterval);
                clearInterval(vm.sonarInterval);
                break;
              }
              x++;
            }
            break;
          }
          i++;
        }
      }
    });
  }

  // -- -- //

  //-- Close Challenge Info Window --//

  closeChallengeWindow = () => {
    this.openChallengeWindow = false;
    this.challengeGroup.eachLayer(function(marker) {
      marker.options.showChallenge = false;
    });
    this.drawInterval = window.setInterval(() => this.getCurrentCoordinates(), this.settings.userTimeReportPosition * 1000);
    this.sonarNoise();
  }

  // -- -- //

  //-- Show Video Demo --//

  openVideoDemo = () => {

    const vm = this;

    this.showCountdown = true;
    this.showVideoDemostration = !this.showVideoDemostration;

    setTimeout(function() {
      vm.showCountdown = false;
    }, 6000);

  }

  // -- -- //

  //-- Create info route function (WIP) --//

  openRouteInfo = (e) => {
    //TODO Crear una ventana específica que aparezca cuando le pulsas al marcador inicial o final de la ruta. Aparecrá información y estadísticas de la ruta.
    console.log(e);
  }

  //-- Create and update user angle and position --//

  getCurrentCoordinates = () => {

    const vm = this;
    const settings = this.settings;

    this.healthService.getDailyValues('steps');

    this.geolocation.getCurrentPosition({ timeout: settings.userTimeReportPosition * 1000, enableHighAccuracy: true }).then((resp) => {

      this.userLatitude = resp.coords.latitude;
      this.userLongitude = resp.coords.longitude;

      if(this.getFirstUserPosition === true) {
        //@ts-ignore
        this.routeMap.panTo(L.latLng([this.userLatitude, this.userLongitude]));
        this.getFirstUserPosition = false;
      }

      this.getCurrentOrientation();

      return [this.userLatitude, this.userLongitude];

    }).catch((error) => {

      // this.userLatitude = this.getRandom(-90, 90);
      // this.userLongitude = this.getRandom(-180, 180);

      // Point on challenge marker
      this.userLatitude = 38.08716520301331;
      this.userLongitude = -1.2792205810546877;

      // Point in middle of route
      // this.userLatitude = 38.08201841367748;
      // this.userLongitude = -1.2785133178814738;

      console.log('Location Error - Return random location (' + this.userLatitude + ', ' + this.userLongitude + ') - ', error);

      if(this.getFirstUserPosition === true) {
        //@ts-ignore
        this.routeMap.panTo(L.latLng([this.userLatitude, this.userLongitude]));
        this.getFirstUserPosition = false;
      }

      this.getCurrentOrientation();
      this.dailySteps = this.healthService.dailyValue.steps;

      return [this.userLatitude, this.userLongitude];

    });

  }

  getCurrentOrientation = () => {
    DeviceOrientation.getCurrentHeading().then((data: DeviceOrientationCompassHeading) => {

      console.log('Orientación: ' + data)
      this.deviceDegrees = data.magneticHeading;

      if (this.userMarker === undefined) {
        this.drawUserPoint();
      } else {
        this.updateUserPoint();
      }

      return this.deviceDegrees;

    }, (error: any) => {

      this.deviceDegrees = this.getRandom(0, 360);
      console.log('Orientation Error - Return random orientation (' + this.deviceDegrees + ') - ' + error);

      if (this.userMarker === undefined) {
        this.drawUserPoint();
      } else {
        this.updateUserPoint();
      }

      return this.deviceDegrees;

    });
    
  }

  drawUserPoint = () => {

    const vm = this;

    let userPoint = L.divIcon({
      className: "user-point",
      iconSize: [this.routeMap.getZoom() * 1.5, this.routeMap.getZoom() * 1.5],
      iconAnchor: [this.routeMap.getZoom() * 0.75, this.routeMap.getZoom() + 0.75],
      html: '<span></span>'
    });

    let coords = [this.userLatitude, this.userLongitude];
    let angle = this.deviceDegrees;

    //@ts-ignore
    this.userMarker = L.marker(coords, { icon: userPoint, rotationAngle: angle, rotationOrigin: 'bottom center' }).addTo(this.userPointGroup);

    this.getFirstUserPosition = true;
    this.drawInterval = window.setInterval(() => vm.getCurrentCoordinates(), vm.settings.userTimeReportPosition * 1000);

    if (this.loopTime === undefined) {
      this.loopTime = 1000;
    }

    this.sonarNoise();

  }

  updateUserPoint = () => {

    const vm = this;
    let coords = [this.userLatitude, this.userLongitude];
    let angle = this.deviceDegrees;

    if (this.userMarker !== undefined) {
      this.userMarker.setLatLng(coords);
      this.userMarker.setRotationAngle(angle);
      if (this.userFixedPosition === true) {
        //@ts-ignore
        this.routeMap.panTo(L.latLng(coords));
      }
    }

    this.updateGeoFence();

  }

  // -- -- //

  //-- Move center of map to marker with event selected --//

  panToRoute = (event) => {
    this.routeMap.panTo(L.latLng(this.routes[event.detail.value].waypoints[0][0], this.routes[event.detail.value].waypoints[0][1]));
  }

  // -- -- //

  //-- Geofencing - Active the challenge window and selected marker when the user is near of 5 meters --//

  updateGeoFence = () => {

    //TODO Actuar solo sobre el punto más cercano y no recorrer todo el array de los puntos.
    //TODO Desactivar solo el punto activado sin recorrer todo los puntos creados cada vez.

    const vm = this;
    const distanceLimit = this.settings.distanceToActive;
    let distanceArray = [];

    if (this.routeMap.hasLayer(this.challengeGroup)) {

      this.challengeGroup.eachLayer(function(layer, index) {

        let distanceToUser = L.latLng([layer._latlng.lat, layer._latlng.lng]).distanceTo([vm.userLatitude, vm.userLongitude]);
        let challengePoint;

        if (distanceToUser <= distanceLimit) {

          challengePoint = L.divIcon({
            className: layer.options.challengeSuccess ? 'challenge-point challenge-point-active challenge-point-success' : 'challenge-point challenge-point-active',
            iconSize: [vm.routeMap.getZoom() * 2, vm.routeMap.getZoom() * 2],
            iconAnchor: [vm.routeMap.getZoom(), vm.routeMap.getZoom()],
            html: '<span><img src="../../assets/icon/challenges/challenge-' + layer.options.challengeCategory + '-icon.svg"></span>'
          });

          // vm.challengeActive = true;

          //TODO challengeActive se mantiene activo cuando cierro la ventana, volviendo a abrir la ventana
          if (vm.challengeActive === true && layer.options.showChallenge === false) {
            layer.options.showChallenge = true;
            vm.openChallengeInfo(layer);
          }

        } else {

          challengePoint = L.divIcon({
            className: layer.options.challengeSuccess ? 'challenge-point challenge-point-success' : 'challenge-point',
            iconSize: [vm.routeMap.getZoom() * 2, vm.routeMap.getZoom() * 2],
            iconAnchor: [vm.routeMap.getZoom(), vm.routeMap.getZoom()],
            html: '<span><img src="../../assets/icon/challenges/challenge-' + layer.options.challengeCategory + '-icon.svg"</span>'
          });

          layer.options.showChallenge = false;

        }

        //if (distanceToUser <= (distanceLimit * 4) && vm.notificationService.activeChallengeNotification === true) {
        //  vm.notificationService.sendChallengeNotification();

        //  setTimeout(function () {
        //    if(this.notificationService.activeChallengeNotification === false) {
        //      this.notificationService.activeChallengeNotification = true;
        //      this.sonarNoise();
        //    }
        //  }, 1000 * 60 * 60 * 24);

        //}

        layer.setIcon(challengePoint);
        distanceArray.push(distanceToUser);

      })

      console.log(vm.challengeActive);

      if (vm.challengeActive === false && this.settings.sonarNoise === true) {

        vm.loopTime = 350 + (Math.min(...distanceArray) * 10);

      }

    }

  }

  // -- -- //

  //-- Beep that sounds faster according to the distance to a challenge --//

  sonarNoise = () => {

    const vm = this;

    if (this.loopTime === undefined) {
      this.loopTime = 5000;
    }

    if (this.loopTime <= 3000 && this.challengeActive === false) {
      if (this.audioLoaded === true) {
        NativeAudio.play('beep')
      } else {
        let audio = new Audio('../assets/audio/beep-1.mp3');
        audio.play();
      }
    }

    if(this.openChallengeWindow === false) {
      this.sonarInterval = setTimeout(function () {vm.sonarNoise()}, vm.loopTime);
    }

  }

  // -- -- //

  //-- Return a random number between min and max - ONLY FOR TESTS  --//

  getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  // -- -- //

  //-- Create and open and ionic window --//

  async openTransparentModal() {
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      cssClass: 'transparent-modal'
    });
    await modal.present()
  }

  // -- -- //

  //-- Return the challenge reward and active its animation --//

  getReward = (challenge) => {

    const vm = this;
    this.openRewardWindow = true;

    this.selectedChallengeSuccess = true;
    this.selectedMarker.target.options.challengeSuccess = true;

    setTimeout(function () {
      vm.openRewardWindow = false;
    }, 5000);

  }

  // -- -- //

  //-- Normalize an url to use in youtube or video target --//

  transform = (url) => {
    let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return safeUrl;
  }

  // -- -- //

  //TODO TESTEAR BIEN, Cuando cambio de vista el sonarInterval no deja de sonar

  ionViewWillLeave() {
    clearInterval(this.drawInterval);
    this.openChallengeWindow = true; //Solo para parar el bucle de sonarNoise()
  }

  ionViewDidEnter() {
    this.drawInterval = window.setInterval(() => this.getCurrentCoordinates(), this.settings.userTimeReportPosition * 1000);
    this.openChallengeWindow = false;
    this.sonarNoise();
  }

}
