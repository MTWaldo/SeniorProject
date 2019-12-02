import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'library', loadChildren: './library/library.module#LibraryPageModule' },
  { path: 'admin-login', loadChildren: './admin-login/admin-login.module#AdminLoginPageModule'},
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'leaders-guide', loadChildren: './leaders-guide/leaders-guide.module#LeadersGuidePageModule' },
  { path: 'weather', loadChildren: './weather/weather.module#WeatherPageModule' },
  { path: 'trainings', loadChildren: './trainings/trainings.module#TrainingsPageModule' },
  { path: 'merit-badges', loadChildren: './merit-badges/merit-badges.module#MeritBadgesPageModule' },
  { path: 'messaging', loadChildren: './messaging/messaging.module#MessagingPageModule', canActivate: [AuthGuard], },
  { path: 'admin-scheduling', loadChildren: './admin-scheduling/admin-scheduling.module#AdminSchedulingPageModule', canActivate: [AuthGuard], },
  { path: 'admin-home', loadChildren: './admin-home/admin-home.module#AdminHomePageModule', canActivate: [AuthGuard]},
  { path: 'weather', loadChildren: './weather/weather.module#WeatherPageModule' },
  { path: 'admin-trainings', loadChildren: './admin-trainings/admin-trainings.module#AdminTrainingsPageModule', canActivate: [AuthGuard] },
  { path: 'upload', loadChildren: './upload/upload.module#UploadPageModule', canActivate: [AuthGuard]  },

  
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
