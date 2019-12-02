import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHomePage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('/home');
    });
  }



  public addMessage(){
    let dateTime = new Date();
    var DBRef = firebase.database().ref('Messages');
    const addUserInputsUI = document.getElementsByClassName("user-input") as HTMLCollectionOf<HTMLIonInputElement>;
    let NewUser = {};
    for(let i = 0, len = addUserInputsUI.length; i < len; i++){
        let key = addUserInputsUI[i].getAttribute('data-key');
        let value = addUserInputsUI[i].value;
        NewUser[key]=value;
    }
    DBRef.push(NewUser);
  }

  public filterMessages(){
    firebase.database().ref('/Messages').on('value', function(snapshot) {
      console.log(snapshot.val());
      if(snapshot.exists()){
        var con = document.createElement('ul');
        var list  = document.getElementById('messList');
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

  ngOnInit() {
    this.filterMessages();
  }

}
