"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var email_1 = require('../../validators/email');
var home_1 = require('../home/home');
// import {ChartsPage} from "../charts/charts";
var SignupPage = (function () {
    function SignupPage(nav, _userService, formBuilder, loadingCtrl, alertCtrl) {
        this.nav = nav;
        this._userService = _userService;
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.emailChanged = false;
        this.passwordChanged = false;
        this.submitAttempt = false;
        this.signupForm = formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, email_1.EmailValidator.isValid])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.minLength(6), forms_1.Validators.required])]
        });
    }
    SignupPage.prototype.elementChanged = function (input) {
        var field = input.inputControl.name;
        this[field + "Changed"] = true;
    };
    SignupPage.prototype.signupUser = function () {
        var _this = this;
        this.submitAttempt = true;
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        }
        else {
            this.showLoading();
            this._userService.signupEmail(this.signupForm.value.email, this.signupForm.value.password).then(function () {
                _this.loading.dismiss();
                _this.loading.onDidDismiss(function () {
                    _this.nav.setRoot(home_1.HomePage);
                });
            }, function (error) {
                _this.loading.dismiss();
                var alert = _this.alertCtrl.create({
                    message: error.message,
                    buttons: [
                        {
                            text: "Ok",
                            role: 'cancel'
                        }
                    ]
                });
                alert.present();
            });
        }
    };
    SignupPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    };
    ;
    SignupPage = __decorate([
        core_1.Component({
            selector: 'page-signup',
            templateUrl: 'signup.html'
        })
    ], SignupPage);
    return SignupPage;
}());
exports.SignupPage = SignupPage;
