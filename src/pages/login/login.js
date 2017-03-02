"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
// import { GoogleAuth, User } from '@ionic/cloud-angular';
var email_1 = require('../../validators/email');
var signup_1 = require('../signup/signup');
var reset_password_1 = require("../reset-password/reset-password");
var home_1 = require("../home/home");
var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, userService, formBuilder, _companyService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this._companyService = _companyService;
        this.submitAttempt = false;
        this.emailChanged = false;
        this.passwordChanged = false;
        // listen for login success
        this.userService.onLogin().subscribe(function (value) {
            console.log("LoginPage::onLogin()");
            _this.loggedUser = value;
            _this._companyService.getOrg(_this.userService.currentUser.org);
            if (_this.loggedUser) {
                _this.showLoading();
                setTimeout(function () {
                    _this.loading.dismiss();
                }, 1500);
                _this.loading.onDidDismiss(function () {
                    _this.navCtrl.setRoot(home_1.HomePage);
                });
            }
        });
        this.loginForm = formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, email_1.EmailValidator.isValid])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.minLength(6), forms_1.Validators.required])]
        });
    }
    // SOCIAL LOGINS
    LoginPage.prototype.googleFirebase = function () {
        //Currently not working. need to handle sign-in flow manually
        // this.userService.googleFirebase();
    };
    LoginPage.prototype.facebookLogin = function () {
        this.userService.facebookLogin();
        this.navCtrl.push(home_1.HomePage);
    };
    LoginPage.prototype.twitterLogin = function () {
        this.userService.authWithTwitter();
        this.navCtrl.push(home_1.HomePage);
    };
    //New User options and password resets
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.push(signup_1.SignupPage);
    };
    LoginPage.prototype.goToResetPassword = function () {
        this.navCtrl.push(reset_password_1.ResetPasswordPage);
    };
    LoginPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    LoginPage.prototype.loginWithEmail = function () {
        this.submitAttempt = true;
        this.userService.loginWithEmail(this.loginForm.value.email, this.loginForm.value.password);
        this.navCtrl.push(home_1.HomePage);
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Welcome back'
        });
        this.loading.present();
    };
    ;
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
