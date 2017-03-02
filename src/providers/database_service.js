"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var firebase_1 = require('firebase');
var DatabaseService = (function () {
    function DatabaseService() {
        console.log("DatabaseService()");
        var fbConfig = {
            apiKey: "AIzaSyCk2McEgI_Ikl9HQMNYN3wROiH1l8hmRR0",
            authDomain: "pulse-staging-2da8a.firebaseapp.com",
            databaseURL: "https://pulse-staging-2da8a.firebaseio.com",
            storageBucket: "pulse-staging-2da8a.appspot.com",
            messagingSenderId: "219248871580"
        };
        firebase_1.default.initializeApp(fbConfig);
        this.db = firebase_1.default.database();
    }
    DatabaseService = __decorate([
        core_1.Injectable()
    ], DatabaseService);
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
