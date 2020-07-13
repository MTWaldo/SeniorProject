import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/user/auth.service';
import { Router } from '@angular/router';

//These snippets of code came from Jorge Vergara (javebratt.com)

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
)
 {
    this.loginForm = this.formBuilder.group({
      email: ['',
		//gives required fields and only accepts email Strings
        Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
		//Accepts String as password, hiding it as dots.
      Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
   }
   
   //Function is connected to form on HTML page, waits for both user and password to have populated fields
   async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
		//Shows error if missing one field
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
		//presents loading screen for looks
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
  
      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
			  //redirects to new admin-home page
            this.router.navigateByUrl('/admin-home');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
      }
    }


   

  ngOnInit() { }

}
