import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  loginUser(email:string, password:string): Promise<firebase.auth.UserCredential>{

    return firebase.auth().signInWithEmailAndPassword(email, password);

  }

  logoutUser():Promise<void> {
    return firebase.auth().signOut();
  }



}
