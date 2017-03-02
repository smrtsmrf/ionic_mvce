"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var login_1 = require('../login/login');
var add_device_1 = require('../add-device/add-device');
var ProfilePage = (function () {
    function ProfilePage(nav, alertCtrl, userService) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.userService = userService;
    }
    ProfilePage.prototype.cancelClicked = function () {
        this.nav.pop(ProfilePage);
    };
    ProfilePage.prototype.saveSettings = function () {
        this.nav.pop(ProfilePage);
    };
    ProfilePage.prototype.logout = function () {
        this.userService.logout();
        this.nav.setRoot(login_1.LoginPage);
    };
    ProfilePage.prototype.addDevice = function () {
        this.nav.push(add_device_1.AddDevice);
    };
    ProfilePage = __decorate([
        core_1.Component({
            selector: 'page-profile',
            templateUrl: 'profile.html',
        })
    ], ProfilePage);
    return ProfilePage;
}());
exports.ProfilePage = ProfilePage;
