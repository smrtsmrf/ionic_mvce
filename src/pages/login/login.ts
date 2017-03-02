import {Component} from '@angular/core';
import {AlertController, NavController, LoadingController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';

import {EmailValidator} from '../../validators/email';
import {UserService} from '../../providers/user_service';
import {CompanyService} from '../../providers/company_service';

import {SignupPage} from '../signup/signup';
import {ResetPasswordPage} from "../reset-password/reset-password";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm;
  submitAttempt: boolean = false;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  loading: any;

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public userService: UserService,
              public formBuilder: FormBuilder,
              private _companyService: CompanyService) {
    // listen for login success
    this.userService.onLogin().subscribe(value => {

      if (value) {
        this._companyService.getOrg(this.userService.currentUser.org);
      //
      //   this.showLoading();
      //
      //   setTimeout(() => {
      //     this.loading.dismiss();
      //   }, 1500);
      //
      //   this.loading.onDidDismiss(() =>{
          this.navCtrl.setRoot(HomePage);
      //   });
      }
    });

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  // SOCIAL LOGINS

  facebookLogin() {
    this.userService.facebookLogin();
    this.navCtrl.push(HomePage);

  }

  twitterLogin() {
    this.userService.authWithTwitter();
    this.navCtrl.push(HomePage);
  }

  //New User options and password resets
  goToSignup() {
    this.navCtrl.push(SignupPage);
  }

  goToResetPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginWithEmail() {
    this.submitAttempt = true;
    this.userService.loginWithEmail(this.loginForm.value.email, this.loginForm.value.password)
      .catch(() => {
        let alert = this.alertCtrl.create({
          message: "The username or password is incorrect.",
          buttons: [
            {
              text: "Try again",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
    });

    this.loading.present();
  };
}
