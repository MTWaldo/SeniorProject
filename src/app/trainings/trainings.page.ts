import { Component, OnInit } from '@angular/core';
import * as firebase from 'Firebase';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.page.html',
  styleUrls: ['./trainings.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainingsPage implements OnInit {

  // public filterTrainings(): void {
  //   firebase.database().ref('/AT').on('value', function (snapshot){
  //     if(snapshot.exists()){
  //       var con = document.createElement('ul');
  //       snapshot.forEach(function(data)
  //       {
  //         var val = data.val();
  //         con.innerHTML += ('<li> <input type="radio" name="radio-accordian"/> <label>' + val.Name + '</label> <div class="content> <h3>' + val.Location + '</h3> <p>' + val.Time + '</p> <p>' + val.Price + '</p> </div> </li>');
  //       });
  //         var list  = document.getElementById('accord');
  //           list.innerHTML = "";
  //           list.append(con);
  //     }
  //   });
  // }

  constructor() { }

  ngOnInit() {
    
    firebase.database().ref('/AT').on('value', function (snapshot){
      if(snapshot.exists()){
        var con = document.createElement('ul');
        var list  = document.getElementById('ulList');
        var i = 0;
        snapshot.forEach(function(data)
        {
          //con.innerHTML='';
          var val = data.val();
          var temp = 'radio-'+ i;
          con.innerHTML += ('<li> <input type="radio" id="' + temp + '" name="radio-accordian"/> <label for="'+ temp + '">' + val.Name + '</label> <div class="content"> <p> Location: ' + val.Location + '</p> <p> Time: ' + val.Time + '</p> <p> Price: ' + val.Price + '</p> </div> </li>');
          ++i;

        });
        list.append(con);
      }
    });
  }

}
