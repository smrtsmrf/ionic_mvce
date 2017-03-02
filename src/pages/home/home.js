"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var profile_1 = require('../profile/profile');
var add_meter_1 = require('../add_meter/add_meter');
var database_service_1 = require("../../providers/database_service");
var residential_meter_1 = require("../../models/residential_meter");
var HomePage = (function () {
    function HomePage(nav, resMeter) {
        this.nav = nav;
        this.resMeter = resMeter;
        this.blah = "wtf";
        this.meters = [
            "Home",
            "Gas",
            "Water"
        ];
        this.pages = [
            "item 1",
            "item 2",
            "item 3",
        ];
        this.tempAddedMeters = [];
        this.currentChart = "arc";
        this.currentView = "home";
        this.dateSelected = "Hour";
        this.nav = nav;
        this.resMeter = resMeter;
        this.tempAddedMeters = resMeter.newUserMeter;
    }
    HomePage.prototype.changeChartView = function (newView) {
        if (this.currentChart == newView) {
            console.log("save()::userMeter");
            return;
        }
        this.currentChart = newView;
    };
    HomePage.prototype.changeMainView = function (newView) {
        if (newView == "ProfilePage") {
            this.nav.push(profile_1.ProfilePage);
            return;
        }
        if (newView == "AddMeter") {
            this.nav.push(add_meter_1.AddMeter);
            return;
        }
    };
    HomePage.prototype.updateChart = function (value) {
        this.dateSelected = value;
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [database_service_1.DatabaseService, residential_meter_1.ResidentialMeter]
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
