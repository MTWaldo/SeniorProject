import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { IonicModule } from '@ionic/angular';

import { MeritBadgesPage } from './merit-badges.page';
import { environment } from '../environment';

const routes: Routes = [
  {
    path: '',
    component: MeritBadgesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,

    RouterModule.forChild(routes)
  ],
  declarations: [MeritBadgesPage]
})
export class MeritBadgesPageModule {

  Area: string;
  Camp: string;
  Name: string;
  Session1: string;
  Session2: string;
  Session3: string;
  Session4: string;
  Session5: string;
  Session6: string;
}
