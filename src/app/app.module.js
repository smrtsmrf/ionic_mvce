"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var storage_1 = require('@ionic/storage');
var forms_1 = require('@angular/forms');
//Pages
var app_component_1 = require('./app.component');
var home_1 = require('../pages/home/home');
var login_1 = require('../pages/login/login');
var profile_1 = require('../pages/profile/profile');
var charts_1 = require('../pages/charts/charts');
var add_meter_1 = require('../pages/add_meter/add_meter');
var add_device_1 = require('../pages/add-device/add-device');
var signup_1 = require("../pages/signup/signup");
var reset_password_1 = require("../pages/reset-password/reset-password");
var meter_number_1 = require("../pages/meter_number/meter_number");
//Providers
var user_service_1 = require('../providers/user_service');
var profile_data_1 = require('../providers/profile_data');
var database_service_1 = require('../providers/database_service');
var company_service_1 = require('../providers/company_service');
var consumption_data_1 = require("../components/consumption_data/consumption_data");
var meter_form_1 = require('../components/meter-form/meter-form');
var device_setup_1 = require('../components/device-setup/device_setup');
var arc_chart_1 = require("../components/arc-chart/arc-chart");
var residential_meter_1 = require('../models/residential_meter');
var line_chart_1 = require('../components/line-chart/line-chart');
var date_range_1 = require('../components/date-range/date-range');
//Google Auth and Client_Id
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.MyApp,
                home_1.HomePage,
                login_1.LoginPage,
                profile_1.ProfilePage,
                signup_1.SignupPage,
                reset_password_1.ResetPasswordPage,
                charts_1.ChartsPage,
                add_meter_1.AddMeter,
                consumption_data_1.ConsumptionData,
                meter_number_1.MeterNumberPage,
                meter_form_1.MeterFormComponent,
                arc_chart_1.ArcChart,
                date_range_1.DateRange,
                add_device_1.AddDevice,
                device_setup_1.DeviceSetupComponent,
                line_chart_1.LineChart
            ],
            imports: [
                ionic_angular_1.IonicModule.forRoot(app_component_1.MyApp),
                forms_1.ReactiveFormsModule,
            ],
            bootstrap: [ionic_angular_1.IonicApp],
            entryComponents: [
                app_component_1.MyApp,
                home_1.HomePage,
                profile_1.ProfilePage,
                login_1.LoginPage,
                charts_1.ChartsPage,
                signup_1.SignupPage,
                add_meter_1.AddMeter,
                add_device_1.AddDevice,
                reset_password_1.ResetPasswordPage,
                meter_number_1.MeterNumberPage,
                meter_form_1.MeterFormComponent,
            ],
            providers: [[{ provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
                    database_service_1.DatabaseService,
                    user_service_1.UserService,
                    profile_data_1.ProfileData,
                    storage_1.Storage,
                    company_service_1.CompanyService,
                    residential_meter_1.ResidentialMeter]
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
