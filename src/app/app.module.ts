
import { NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

import { PdfViewerService } from "./services/pdf-viewer.service";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { File } from "@ionic-native/file/ngx";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { environment } from '../app/environment'
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireFunctions, AngularFireFunctionsModule } from '@angular/fire/functions';
import {FcmService } from './fcm.service'
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  AngularFireModule.initializeApp(environment),
  AngularFireDatabaseModule,
  BrowserModule,
  AngularFireFunctionsModule,
  IonicModule.forRoot(),
  AppRoutingModule,
  
  AngularFireStorageModule

  ],

  providers: [
    InAppBrowser,
    AngularFireFunctions,

    AngularFireMessaging,
    Geolocation,
    File,
    FileOpener,
    FileTransfer,
    NativeGeocoder,
    StatusBar,
    FcmService,
    SplashScreen,

    PdfViewerService,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
