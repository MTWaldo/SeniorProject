import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environment';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AdminSchedulingPage } from './admin-scheduling.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSchedulingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminSchedulingPage]
})
export class AdminSchedulingPageModule {}
