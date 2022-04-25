import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login/login.service';
import { RegisterService } from './services/register/register.service';
import { ChallengesService } from './services/challenges/challenges.service';
import { RoutesService } from './services/routes/routes.service';
import { NewsService } from './services/news/news.service';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    LoginService,
    RegisterService,
    ChallengesService,
    RoutesService,
    NewsService
  ],
  providers: [
    Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
