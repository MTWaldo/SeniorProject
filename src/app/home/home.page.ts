import { Component } from '@angular/core';
import * as firebase from 'Firebase';
import {FcmService } from '../fcm.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {

//Prints accordian messages for Messages tree
  public filterMessages(){
    firebase.database().ref('/Messages').orderByChild('Time').on('value', function(snapshot) {
      console.log(snapshot.val());
      if(snapshot.exists()){
        var con = document.createElement('ul');
        var list  = document.getElementById('messageList');
        var i = 0;
        snapshot.forEach(function(data)
        {
          var val = data.val();
          var temp = 'rad-'+ i;
          con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + val.Message + '</label> <div class="content"> <p> Author: ' + val.Author + '</p> <p> Time: ' + val.Time + ' </p> </div> </li>');
          ++i;
        });
      list.innerHTML = ''
      list.append(con);
      }
    });


  }
 // public fcm: FcmService, ghost code from cloud messaging
  constructor(public fcm: FcmService) {}

  // ionViewDidLoad(){
  //   this.fcm.getToken();
  //   this.fcm.listenToNotifications().pipe(
  //     tap(msg =>{
  //       const toast = this.toastCtrl.create({
  //         message: msg.nody,
  //         duration: 3000
  //       });
  //       toast.present();
  //     })
  //   )
  //   .subscribe();
  // }


  getPermission() {
    this.fcm.getPermission();
  }

  subscribe(){
    
    this.fcm.sub('message');
  }

  revokePermission(){
    this.fcm.unsub('message');
  }


  ngOnInit() {
    this.filterMessages();
  }
}
