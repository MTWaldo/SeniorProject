import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import {Router, ActivatedRoute} from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-merit-badges',
  templateUrl: './merit-badges.page.html',
  styleUrls: ['./merit-badges.page.scss'],
  encapsulation: ViewEncapsulation.None
})


export class MeritBadgesPage implements OnInit {

  public OB: AngularFireList<any[]>;
  public CB: AngularFireList<any[]>;
  public OVB: AngularFireList<any[]>;
  public OA: AngularFireList<any[]>;

  constructor(public router: Router, private db: AngularFireDatabase) { 
    this.OB = db.list('/OMB');
    this.CB = db.list('/CMB');
    this.OVB = db.list('/OVB');
    this.OA = db.list('/OA');
  }

  public filterOsageBadges(): void {
    firebase.database().ref('/OMB').orderByChild('Area').on('value', function(snapshot) {
    console.log(snapshot.val());
    if(snapshot.exists()){
      var con = document.createElement('ul');
      var list  = document.getElementById('mbList');
      var i = 0;
      snapshot.forEach(function(data)
      {
        var val = data.val();
        var temp = 'rad-'+ i;
        con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + val.Name + '</label> <div class="content"> <p> Merit Badge Area: ' + val.Area + '</p> <p> Camp: ' + val.Camp + '</p> <p> Time: ' + val.Time + '</p> </div> </li>');
        ++i;
      });
    list.innerHTML = ''
    list.append(con);
    }
  });
  }

  public filterCherokeeBadges(): void {
    firebase.database().ref('/CMB').orderByChild('Area').on('value', function (snapshot){
      console.log(snapshot.val());
      if(snapshot.exists()){
      var con = document.createElement('ul');
      var list  = document.getElementById('mbList');
      var i = 0;
      snapshot.forEach(function(data)
      {
        var val = data.val();
        var temp = 'rad-'+ i;
        con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + val.Name + '</label> <div class="content"> <p> Merit Badge Area: ' + val.Area + '</p> <p> Camp: ' + val.Camp + '</p> <p> Time: ' + val.Time + '</p> </div> </li>');
        ++i;
      });
    list.innerHTML = ''
    list.append(con);
      }
    });
  }
  
  public filterOVB(): void {
    firebase.database().ref('/OVB').orderByChild('Name').on('value', function (snapshot){
      console.log(snapshot.val());
      if(snapshot.exists()){
      var con = document.createElement('ul');
      var list  = document.getElementById('mbList');
      var i = 0;
      snapshot.forEach(function(data)
      {
        var val = data.val();
        var temp = 'rad-'+ i;
        con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + val.Name + '</label> <div class="content"> <p> Merit Badge Area: ' + val.Area + '</p> <p> Camp: ' + val.Camp + '</p> <p> Time: ' + val.Time + '</p> </div> </li>');
        ++i;
      });
    list.innerHTML = ''
    list.append(con);
      }
    });
  }

  public searchButton(): void{
    var dbRef = firebase.database().ref();

    var c = (document.getElementById("camp")) as HTMLIonSelectElement;

    var a = (document.getElementById("area")) as HTMLIonSelectElement;

    var CampValue = c.value;
    var AreaValue = a.value;

    console.log(CampValue);
    console.log(AreaValue);


    dbRef.child(CampValue).orderByChild('Area').equalTo(AreaValue).once('value',function(snapshot){
      if(snapshot.exists()){
        var con = document.createElement('ul');
      var list  = document.getElementById('mbList');
      var i = 0;
      snapshot.forEach(function(data)
      {
        var val = data.val();
        var temp = 'rad-'+ i;
        con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + val.Name + '</label> <div class="content"> <p> Merit Badge Area: ' + val.Area + '</p> <p> Camp: ' + val.Camp + '</p> <p> Time: ' + val.Time + '</p> </div> </li>');
        ++i;
      });
    list.innerHTML = ''
    list.append(con);
      }
    });
  }


  public searchSessionButton(): void{
    var dbRef = firebase.database().ref();

    var c = (document.getElementById("camp2")) as HTMLIonSelectElement;

    var a = (document.getElementById("session")) as HTMLIonSelectElement;

    var CampValue = c.value;
    var SessionValue = a.value;

    console.log(CampValue);
    console.log(SessionValue);


    dbRef.child(CampValue).orderByChild('Session').equalTo(SessionValue).once('value',function(snapshot){
      if(snapshot.exists()){
        var con = document.createElement('ul');
      var list  = document.getElementById('mbList');
      var i = 0;
      snapshot.forEach(function(data)
      {
        var val = data.val();
        var temp = 'rad-'+ i;
        con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + val.Name + '</label> <div class="content"> <p> Merit Badge Area: ' + val.Area + '</p> <p> Camp: ' + val.Camp + '</p> <p> Time: ' + val.Time + '</p> <p> Hours: ' + val.Hours + '</p> <p> Session: ' + val.Session+ '</p> <p> Description: ' + val.Description + '</p>   </div> </li>');
        ++i;
      });
    list.innerHTML = ''
    list.append(con);
      }
    });
  }


  public viewAll(): void{
    var v = (document.getElementById("view")) as HTMLIonSelectElement;
    var searchValue = v.value;
    console.log(searchValue);

    if (searchValue==="Osage"){
      this.filterOsageBadges();
    }

    else if(searchValue==="Cherokee"){
      this.filterCherokeeBadges();
    }

    else if(searchValue==="OVB"){
      this.filterOVB();
    }

    else{
      console.log("Error, should not see this message");
    }

  }

  ngOnInit() {
    
  }

}