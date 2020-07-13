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
	  //Calls method from ../services/user/auth.service to log out of Firebase (User is logged out and stays logged out).
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('/home');
    });
  }



  public addMessage(){
	 //Method reads input from admin-home.html and adds into  Messages reference on database.
    let dateTime = new Date();
    var DBRef = firebase.database().ref('Messages');
	//Ion-inputs are all classified as "user-input";
    const addUserInputsUI = document.getElementsByClassName("user-input") as HTMLCollectionOf<HTMLIonInputElement>;
	//NewUser is dynamic to allow an addition of dateTime outside of for loop (loop is instantiating the cells by 'key'
    let NewUser = {};

    for(let i = 0, len = addUserInputsUI.length; i < len; i++){
        let key = addUserInputsUI[i].getAttribute('data-key');
        let value = addUserInputsUI[i].value;
        NewUser[key]=value;
    }
	NewUser["Time"]=dateTime;
		//Firebase is not currently accepting this data as a String
    DBRef.push(NewUser);
  }

  public filterMessages(){
	//Method is pulling from Messages and printing them out in Accordian boxes, called in NGOnInIt
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
		  //Prints out information in format of accordian
          con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + val.Message + '</label> <div class="content"> <p> Author: ' + val.Author + '</p> <p> Time: ' + val.Time + ' </p> </div> </li>');
          ++i;
        });
      list.innerHTML = ''
      list.append(con);
      }
    });


  }

  ngOnInit() {
	  //automatically loads messages from filterMessages on page initialization.
    this.filterMessages();
  }

}
