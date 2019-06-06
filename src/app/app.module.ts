import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {ActivityService} from "../services/activity-service";
import {LearnService} from "../services/learn.service";

import {MyApp} from "./app.component";

import { LandingPage } from "../pages/landing/landing";
import {SettingsPage} from "../pages/settings/settings";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {LearnFeedPage} from "../pages/learn-feed/learn-feed";
import { QuestionsPage } from "../pages/questions/questions";
import { ResultPage } from "../pages/result/result";
import { PracticePage } from "../pages/practice/practice";
import { TriviaPage } from "../pages/trivia/trivia";
import { AlumniRegisterPage } from "../pages/alumniregister/alumniregister";


@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    LandingPage,
    LearnFeedPage,
    QuestionsPage,
    PracticePage,
    TriviaPage,
    LoginPage,
    ResultPage,
    NotificationsPage,
    RegisterPage,
    AlumniRegisterPage,
    SearchLocationPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false
    }),
    IonicStorageModule.forRoot({
      name: '__ionic3_start_theme',
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    LandingPage,
    QuestionsPage,
    PracticePage,
    TriviaPage,
    LoginPage,
    ResultPage,
    LearnFeedPage,
    NotificationsPage,
    RegisterPage,
    AlumniRegisterPage,
    SearchLocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    ActivityService,
    LearnService
  ]
})

export class AppModule {
}
