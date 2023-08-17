import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/users/users.service';
import { RegisterService } from './services/register/register.service';
import { ChallengesService } from './services/challenges/challenges.service';
import { RoutesService } from './services/routes/routes.service';
import { PostsService } from './services/posts/posts.service';
import { SettingsService } from './services/settings/settings.service';
import { AchievementsService } from './services/achievements/achievements.service';
import { LanguageService } from './services/language/language.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [
    UserService,
    RegisterService,
    ChallengesService,
    RoutesService,
    PostsService,
    SettingsService,
    AchievementsService,
    LanguageService
  ],
  providers: [
    Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
