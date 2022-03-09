import { Component } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'src/theme/variables.scss';
import {SuccessModalPage} from "../success-modal/success-modal.page";

@Component({
  selector: 'app-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss' ],
})
export class RoutePage {
  mymap: L.Map;
  marker: [L.Marker];

  constructor(private modalCtrl:ModalController, public animationCtrl: AnimationController)  {
    // @ts-ignore
    this.marker = []
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    var mymap = L.map('mapid', {
      center: [25.3791924, 55.4765436],
      zoom: 15,
      zoomControl: false,
      renderer: L.canvas(),
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: '© OpenStreetMap',
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiZXZhdmZlciIsImEiOiJja3RhdW9xOGIwZm5xMnZrNG4zYWJ4Y2ZpIn0._RYp5RY3A3bhaRWBfreVDw',

    }).addTo(mymap);

    setTimeout(() => {
      mymap.invalidateSize();
    }, 0);

    var self = this;
    mymap.on('zoomend', function(this) {
     console.log(mymap.getZoom())
      var currentZoom = mymap.getZoom();
      self.deleteMarker()
      self.createMarker()
      self.paintMarker()
    });

    this.mymap = mymap;;
    this.createMarker()
    this.paintMarker()
    this.drawRoute()
  }
  createMarker() {
    const flashIcon = new L.Icon({
      className: 'flashIcon',
      iconUrl: './assets/icon/Flash.svg',
      iconSize: [this.mymap.getZoom() * 4.5, this.mymap.getZoom() * 4.5],
      iconAnchor: [this.mymap.getZoom() * 2, this.mymap.getZoom() * 2]});

    const heartIcon = new L.Icon({
      iconUrl: './assets/icon/Heart.svg',
      iconSize: [this.mymap.getZoom() * 4.5, this.mymap.getZoom() * 4.5],
      iconAnchor: [this.mymap.getZoom() * 2, this.mymap.getZoom() * 2]});

    const WeightIcon = new L.Icon({
      iconUrl: './assets/icon/Weight_1.svg',
      iconSize: [this.mymap.getZoom() * 4.5, this.mymap.getZoom() * 4.5],
      iconAnchor: [this.mymap.getZoom() * 2, this.mymap.getZoom() * 2]});

    const WeightIcon2 = new L.Icon({
      iconUrl: './assets/icon/Weight_2.svg',
      iconSize: [this.mymap.getZoom() * 4.5, this.mymap.getZoom()  * 4.5],
      iconAnchor: [this.mymap.getZoom() * 2, this.mymap.getZoom() * 2]});

    const MyPoint = new L.Icon({
      iconUrl: './assets/icon/my_point.svg',
      iconSize: [this.mymap.getZoom() /2, this.mymap.getZoom() /2],
      iconAnchor: [this.mymap.getZoom() /2, this.mymap.getZoom() /2]});


    //Markers in Murcia
    this.marker.push(L.marker([37.996325, -1.134241], {icon: flashIcon}));
    this.marker.push(L.marker([38.004739, -1.127669], {icon: heartIcon}));
    this.marker.push(L.marker([38.002316, -1.130772], {icon: WeightIcon}));
    this.marker.push(L.marker([38.000052, -1.136747], {icon: WeightIcon2}));

    //Markers in Ceuti

    this.marker.push(L.marker([38.077854 , -1.271694], {icon: flashIcon}));
    this.marker.push(L.marker([38.078809 , -1.272323], {icon: WeightIcon2}));
    this.marker.push(L.marker([38.078611, -1.272742], {icon: MyPoint}));
    this.marker.push(L.marker([38.07838, -1.273626], {icon: WeightIcon}));
    this.marker.push(L.marker([38.078034, -1.275159], {icon: heartIcon}));
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

  paintMarker() {
    let popupVideo = document.getElementById('popupVideo');
    let popupImg = document.getElementById('popupImg');
    for (var i = 0; i <= this.marker.length; i++) {
      if (this.mymap != undefined && this.marker[i] != undefined) {
        if (this.marker[i].options.icon.options.className == "flashIcon" || this.marker[i].options.icon.options.className == "heartIcon" || this.marker[i].options.icon.options.className == "WeightIcon") {
          this.marker[i].addTo(this.mymap).bindPopup(popupVideo).on('click', function(e) {
            popupVideo.classList.remove("videoPopUp");
          });
        }
        else {
          this.marker[i].addTo(this.mymap).bindPopup(popupImg).on('click', function(e) {
            popupVideo.classList.remove("popupImg");
          });
        }
      }
    }
  }

  drawRoute() {
    //Ceuti Route
    L.Routing.control({
      waypoints: [L.latLng(38.077854 , -1.271694), L.latLng(38.078034, -1.275159)],
      addWaypoints: false,
      createMarker: function() { return null; },
      // @ts-ignore
      lineOptions: {
        styles: [{color: '#00a195', opacity: 1, weight: 3}]
      }
    }).addTo(this.mymap);
    //Murcia Route
    L.Routing.control({
      waypoints: [L.latLng(37.996325, -1.134241), L.latLng(38.004739, -1.127669)],
      addWaypoints: false,
      createMarker: function() { return null; },
      // @ts-ignore
      lineOptions: {
        styles: [{color: '#00a195', opacity: 1, weight: 3}]
      }
    }).addTo(this.mymap);


  }

  async openTransparentModal(){
    const modal = await this.modalCtrl.create({
      component: SuccessModalPage,
      cssClass: 'transparent-modal'
    });
    await modal.present()
  }

}



