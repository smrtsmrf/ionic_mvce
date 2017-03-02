"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var home_1 = require('../pages/home/home');
var login_1 = require('../pages/login/login');
var signup_1 = require('../pages/signup/signup');
var reset_password_1 = require("../pages/reset-password/reset-password");
var MyApp = (function () {
    function MyApp(platform, _data) {
        this.platform = platform;
        this._data = _data;
        this.rootPage = login_1.LoginPage;
        this.pages = [
            { title: 'Login', component: login_1.LoginPage },
            { title: 'Welcome', component: home_1.HomePage },
            { title: 'SignUp', component: signup_1.SignupPage },
            { title: 'ResetPassword', component: reset_password_1.ResetPasswordPage },
        ];
        platform.ready().then(function () {
            ionic_native_1.StatusBar.styleDefault();
            ionic_native_1.Splashscreen.hide();
        });
    }
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        core_1.Component({
            template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
        })
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
