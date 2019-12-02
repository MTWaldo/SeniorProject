
import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { environment } from './environment'
import { AuthService } from './services/user/auth.service';
firebase.initializeApp(environment);
import { FcmService } from './fcm.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
	
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {





  public sideMenu = [
    {
    title : "Home",
    url : "/home",
    icon : "home"
    },
    
    {
    title : "Leader's Guide",
    url : "/leaders-guide",
    icon : "paper"    
    },
    
    {
    title : "Library",
    url : "/library",
    icon : "book"
    },
    
    {
    title : "Map",
    url : "/map",
    icon : "map"
    },
    
    {
    title : "Merit Badges",
    url : "/merit-badges",
    icon : "calendar"
    },
    
    {
    title : "Trainings",
    url : "trainings",
    icon : "school"
    },
    
    {
    title : "Weather",
    url : "/weather",
    icon : "flash"
    }
    
    ];

    public adminMenu = [
        {
          title : "Home",
          url : "/admin-home",
          icon : "home"
        },
  
        {
          title : "Camp Wide Messaging",
          url : "/messaging",
          icon : "paper"
        },
  
        {
          title : "Edit Schedules",
          url : "/admin-scheduling",
          icon : "calendar"
        }
      ];
navigate : any;
adminNavigate : any;
  constructor(
	private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private authService: AuthService,
    private statusBar: StatusBar,
    public fcm: FcmService
    )
    {
      this.initializeApp();
    }
      
      

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getPermission().subscribe();
    });
  }
  

    }


