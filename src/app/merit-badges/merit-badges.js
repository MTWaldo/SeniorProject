var config = {
    apiKey: "AIzaSyAMD2ZqkppolLnXeDTRWC1tJEDMfb5ENv0",
    authDomain: "kksr-72c45.firebaseapp.com",
    databaseURL: "https://kksr-72c45.firebaseio.com",
    projectId: "kksr-72c45",
    storageBucket: "kksr-72c45.appspot.com",
    messagingSenderId: "699112874976",
    appId: "1:699112874976:web:a75fec7b5e914bf7e78185"
};

firebase.initializeApp(config);
const dbRef = firebase.database().ref();
const mbRef = dbRef.child('Merit Badges');

readUserData();


// --------------------------
// READ
// --------------------------
function readUserData() {

  const userListUI = document.getElementById("user-list");

  usersRef.on("value", snap => {

    userListUI.innerHTML = ""

    snap.forEach(childSnap => {

      let key = childSnap.key,
        value = childSnap.val()

      let $li = document.createElement("li");

      // edit icon
      let editIconUI = document.createElement("span");
      editIconUI.class = "edit-user";
      editIconUI.innerHTML = " ✎";
      editIconUI.setAttribute("userid", key);
      editIconUI.addEventListener("click", editButtonClicked)

      // delete icon
      let deleteIconUI = document.createElement("span");
      deleteIconUI.class = "delete-user";
      deleteIconUI.innerHTML = " ☓";
      deleteIconUI.setAttribute("userid", key);
      deleteIconUI.addEventListener("click", deleteButtonClicked)

      $li.innerHTML = value.name;
      $li.append(editIconUI);
      $li.append(deleteIconUI);

      $li.setAttribute("user-key", key);
      $li.addEventListener("click", userClicked)
      userListUI.append($li);

    });


  })

}



function userClicked(e) {


  var userID = e.target.getAttribute("user-key");

  const userRef = dbRef.child('Merit Badge/' + userID);
  const userDetailUI = document.getElementById("user-detail");

  userRef.on("value", snap => {

    userDetailUI.innerHTML = ""

    snap.forEach(childSnap => {
      var $p = document.createElement("p");
      $p.innerHTML = childSnap.key + " - " + childSnap.val();
      userDetailUI.append($p);
    })

  });


}





// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)



function addUserBtnClicked() {

  const usersRef = dbRef.child('Merit Badge');

  const addUserInputsUI = document.getElementsByClassName("user-input");

  // this object will hold the new user information
  let newUser = {};

  // loop through View to get the data for the model
  for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

    let key = addUserInputsUI[i].getAttribute('data-key');
    let value = addUserInputsUI[i].value;
    newUser[key] = value;
  }

  usersRef.push(newUser)


  console.log(myPro)



}


// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

  e.stopPropagation();

  var userID = e.target.getAttribute("userid");

  const userRef = dbRef.child('Merit Badge/' + userID);

  userRef.remove();

}


function deBugging() {
  console.log("Whale");
}


function viewOsage() {

  dbRef.child('Osage').child().on('value', function(snapshot) {
    if (snapshot.exists()) {
      var content = '';
      snapshot.forEach(function(data) {
        var val = data.val();
        content += '<tr>';
        content += '<td>' + val.Name + '</td>';
        content += '<td>' + val.Session1 + '</td>';
        content += '</tr>';
      });
      $('#mex-table').append(content);
    }
  });
};



// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {

  document.getElementById('edit-user-module').style.display = "block";

  //set user id to the hidden input field
  document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

  const userRef = dbRef.child('Merit Badge/' + e.target.getAttribute("userid"));

  // set data to the user field
  const editUserInputsUI = document.querySelectorAll(".edit-user-input");


  userRef.on("value", snap => {

    for (var i = 0, len = editUserInputsUI.length; i < len; i++) {

      var key = editUserInputsUI[i].getAttribute("data-key");
      editUserInputsUI[i].value = snap.val()[key];
    }

  });




  const saveBtn = document.querySelector("#edit-user-btn");
  saveBtn.addEventListener("click", saveUserBtnClicked)
}


function saveUserBtnClicked(e) {

  const userID = document.querySelector(".edit-userid").value;
  const userRef = dbRef.child('Merit Badge/' + userID);

  var editedUserObject = {}

  const editUserInputsUI = document.querySelectorAll(".edit-user-input");

  editUserInputsUI.forEach(function(textField) {
    let key = textField.getAttribute("data-key");
    let value = textField.value;
    editedUserObject[textField.getAttribute("data-key")] = textField.value
  });



  userRef.update(editedUserObject);

  document.getElementById('edit-user-module').style.display = "none";


}