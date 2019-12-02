import { Component, OnInit, Query } from '@angular/core';
import * as firebase from 'Firebase';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-admin-scheduling',
  templateUrl: './admin-scheduling.page.html',
  styleUrls: ['./admin-scheduling.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSchedulingPage implements OnInit {





public addMBBtnClicked() {

  var DBRef = firebase.database().ref();
  var camp = ((document.getElementById("addCamp") as HTMLIonInputElement).value);
  var usersRef = DBRef.child('OMB');
  
  if (camp === "Osage"){
    usersRef = DBRef.child('OMB');
    console.log(usersRef);
  }

  else if (camp === "Cherokee"){
    usersRef = DBRef.child('CMB');
    console.log(usersRef);
  }

  else if (camp === "OVB"){
   usersRef = DBRef.child('OVB');
   console.log(usersRef);
  }

  else if (camp === "Open Activities"){
    usersRef = DBRef.child('OA');
    console.log(usersRef);

  }

  else {
    console.log("ERROR");
  }


  var Area = ((document.getElementById("addArea") as HTMLIonInputElement).value);
  const addUserInputsUI = document.getElementsByClassName("user-input") as HTMLCollectionOf<HTMLIonInputElement>;
  let NewUser = {};
  for(let i = 0, len = addUserInputsUI.length; i < len; i++){
      let key = addUserInputsUI[i].getAttribute('data-key');
      let value = addUserInputsUI[i].value;
      NewUser[key]=value;
  }
  NewUser["Camp"] = camp;
  NewUser["Area"] = Area;
  usersRef.push(NewUser);
}


public readData(): void{
  var d = (document.getElementById("read")) as HTMLIonSelectElement;
  var check = d.value;
  console.log(check);

  var dbRef = firebase.database().ref('OMB');
  var tree = ''
  if(check==="Osage"){
    dbRef = firebase.database().ref('OMB');
    tree = 'OMB';
    console.log(dbRef);
  }

  else if(check==="Cherokee"){
    dbRef = firebase.database().ref('CMB');
    tree = 'CMB';
    console.log(dbRef);
  }

  else  if(check==="OVB"){
    dbRef = firebase.database().ref('OVB');
    tree = 'OVB';
    console.log(dbRef);
  }

  else if(check==="Open Activities"){
    dbRef = firebase.database().ref('OA');
    tree  = 'OA';
      console.log(dbRef);
  }

  else if(check==="Trainings"){
    dbRef = firebase.database().ref('AT');
    tree = 'AT';
    console.log(dbRef);
  }

  else{
    console.log("error reading, should not see this message");
  }

  const editListUI = document.getElementById("editList");
  var temp = 1;
  dbRef.orderByChild('Name').on("value",snap => {
      editListUI.innerHTML="";
      snap.forEach(childSnap => {
        let key = childSnap.key,
          value = childSnap.val();
          let li = document.createElement("li");
          let editIconUI: any = document.createElement("span");
          editIconUI.class = "acc ver";
          editIconUI.innerHTML = "✎";
          editIconUI.setAttribute("userid", key);
          editIconUI.addEventListener("click", (e, testRef = dbRef) =>{
            var result = confirm("Do you wish to edit?")
            if(result) {
                document.getElementById('edit-user-module').style.display = "block";
                document.querySelector<HTMLInputElement>(".edit-userid").value = e.target.getAttribute("userid");
                e.target.setAttribute("tree",tree);
                var editRef = testRef.child(e.target.getAttribute("userid"));
                console.log(editRef);
                var editUserInputsUI = document.querySelectorAll<HTMLInputElement>(".edit-user-input");
                editRef.on("value",snap => {
                  for (var i = 0, len = editUserInputsUI.length; i < len; i++){
                    var key = editUserInputsUI[i].getAttribute("data-key");
                    editUserInputsUI[i].value = snap.val()[key];
                  }
                });
                var saveBtn = document.querySelector<HTMLInputElement>("edit-user-btn");
                saveBtn.addEventListener("click", this.dataSaveBtn)
            //     (e: any) => {
            //       var tree = e.target.getAttribute("tree");
            //       var dbRef = firebase.database().ref(tree);
            //       const userID = document.querySelector<HTMLInputElement>("edit-userid").value;
            //       const userRef = dbRef.child(userID);

            //       var editedUserObject = {}

            //       const editUserInputsUI = document.querySelectorAll<HTMLInputElement>("edit-user-input");

            //       editUserInputsUI.forEach(function(textField) {
            //      let key = textField.getAttribute("data-key");
            //      let value = textField.value;
            //     editedUserObject[textField.getAttribute("data-key")] = textField.value

            //   }

            // userRef.update(editedUserObject);
            // document.getElementById('edit-user-module').style.display = "none";
            //     });
              }
          })


          let deleteIconUI: any = document.createElement("span");
          deleteIconUI.class = "acc ver";
          deleteIconUI.innerHTML = " X";
          deleteIconUI.setAttribute("userid",key);
          console.log("Before Event Listener:");
          console.log(dbRef);
          deleteIconUI.addEventListener("click",(e, remRef = dbRef ) => {
            console.log("After Event Listener: ");
            console.log(remRef);
            var result = confirm("Are you sure you want to delete from database? This action cannot be undone");
            if(result){
              e.stopPropagation();
              var userID = e.target.getAttribute("userid");
              var editRef = dbRef.child(userID);
              editRef.remove();
            }
          });
          li.innerHTML = ('<li> <input type="radio" id="' + temp + '" name="radio-accord"/> <label for="'+ temp + '">' + value.Name + '</label> <div class="content"> <p> Merit Badge Area: ' + value.Area + '</p> <p> Camp: ' + value.Camp + '</p> <p> Time: ' + value.Time + '</p> <p> Hours: ' + value.Hours + '</p> <p> Session: ' + value.Session+ '</p> <p> Description: ' + value.Description + '</p>   </div> </li>');
          li.append(editIconUI);
          li.append(deleteIconUI);

          li.setAttribute("user-key", key);
          editListUI.append(li);
          ++temp;
      })
  })




}


public dataSaveBtn(e){

    var userID = document.querySelector<HTMLInputElement>(".edit-userid").value;
    var userRef = document.getElementById("editCampCHT") as HTMLInputElement;
    var ref = firebase.database().ref();
    if(userRef.value==="Osage"){
      ref = firebase.database().ref('OMB');
      console.log(ref);
    }
  
    else if(userRef.value==="Cherokee"){
      ref = firebase.database().ref('CMB');;
      console.log(ref);
    }
  
    else  if(userRef.value==="OVB"){
      ref = firebase.database().ref('OVB');
      console.log(ref);
    }
  
    else if(userRef.value==="Open Activities"){
      dbRef = firebase.database().ref('OA');
        console.log(ref);
    }
  
    else if(userRef.value==="Trainings"){
      ref = firebase.database().ref('AT');
      console.log(ref);
    }
  
    else{
      console.log("error reading, should not see this message");
    }

    console.log(e);
    var dbRef = ref.child(userID);
    var editedUserObject = {};
    var editUserInputUI = document.querySelectorAll<HTMLInputElement>(".edit-user-input");

  editUserInputUI.forEach(function(textField){
    let key = textField.getAttribute("data-key");
    let value = textField.value;
    editedUserObject[textField.getAttribute("data-key")] = textField.value;
  });
  console.log(editedUserObject);
  dbRef.update(editedUserObject);
}





constructor() {


}



ngOnInit() {


}

}


