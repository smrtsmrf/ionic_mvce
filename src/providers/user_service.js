"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ionic_native_1 = require('ionic-native');
var core_1 = require('@angular/core');
var Rx = require('rxjs/rx');
var firebase_1 = require('firebase');
var user_1 = require('../models/user');
var global_1 = require('../models/global');
var UserService = (function () {
    function UserService(_dbService) {
        var _this = this;
        this._dbService = _dbService;
        this._usersRef = _dbService.db.ref(global_1.Global.FIREBASE_USERS_PATH);
        this._orgPath = _dbService.db.ref(global_1.Global.FIREBASE_ORGS_PATH + "/" + global_1.Global.FIREBASE_RESIDENTIAL_ORGS_PATH);
        this._fbAuth = firebase_1.default.auth();
        this._fbAuth.onAuthStateChanged(function (user) {
            console.log("UserService::onAuthStateChanged() -- Firebase user", user);
            if (!user) {
                _this.currentUser = null;
                return;
            }
            // console.log(JSON.stringify(user));
            var uid = user.uid;
            // let email = user.providerData[0].email;
            // some other way to check if they're in our system?
            // if not in system then createOrg(user). no else.
            _this._usersRef.child(uid).once("value", function (snapshot) {
                var userObj = snapshot.val();
                if (!userObj) {
                    userObj = _this.createResidentialOrg(user);
                }
                console.log("UserService::onAuthStateChanged() -- Vutiliti userObj", userObj);
                if (userObj) {
                    _this.currentUser = new user_1.User().fromObject(uid, userObj);
                    // console.log("UserService::authChanged()" , self.currentUser);
                    if (_this.loginObserver$) {
                        _this.loginObserver$.next(_this.currentUser);
                    }
                }
                else {
                }
            });
        });
    }
    UserService.prototype.loginWithEmail = function (email, password) {
        return this._fbAuth.signInWithEmailAndPassword(email, password);
    };
    UserService.prototype.persistUser = function () {
        this._usersRef.child(this.currentUser.uid).set(this.currentUser.toFirebaseObject());
        // console.log(this.currentUser.toFirebaseObject());
    };
    UserService.prototype.logout = function () {
        this._fbAuth.signOut();
        this.currentUser = null;
    };
    UserService.prototype.onLogin = function () {
        var _this = this;
        var loginStream$ = new Rx.Observable(function (observer) {
            return _this.loginObserver$ = observer;
        }).share();
        return loginStream$;
    };
    UserService.prototype.signupEmail = function (email, password) {
        var _this = this;
        return this._fbAuth.createUserWithEmailAndPassword(email, password).then(function (newUser) {
            _this.createResidentialOrg(newUser);
        });
    };
    UserService.prototype.createResidentialOrg = function (newUser) {
        this._orgPath.child(newUser.uid).set({
            "_type": "org",
            "Building1": {
                "_type": "building"
            }
        });
        var userObj = {
            email: newUser.email,
            org: global_1.Global.FIREBASE_RESIDENTIAL_ORGS_PATH + "/" + newUser.uid
        };
        this._usersRef.child(newUser.uid).set(userObj);
        return userObj;
    };
    UserService.prototype.resetPassword = function (email) {
        return this._fbAuth.sendPasswordResetEmail(email);
    };
    UserService.prototype.authWithTwitter = function () {
        //Twitter Cordova Plugin launches Pop-up and returns credentials
        ionic_native_1.TwitterConnect.login().then(function (response) {
            alert(JSON.stringify(response));
            // NativeStorage.setItem('_user',
            //   {
            //     userName: response.userName,
            //     userId: response.userId,
            //     token: response.token,
            //   });
            var twitterCredential = firebase_1.default.auth.TwitterAuthProvider.credential(response.token, response.secret);
            firebase_1.default.auth().signInWithCredential(twitterCredential)
                .then(function (newUser) {
            })
                .catch(function (error) {
                alert("Firebase failure: " + JSON.stringify(error));
            });
        }).catch(function (error) {
            alert(JSON.stringify(error));
        });
    };
    //
    UserService.prototype.facebookLogin = function () {
        ionic_native_1.Facebook.login(['email']).then(function (response) {
            alert(JSON.stringify(response));
            // NativeStorage.setItem('_user',
            //   {
            //     token: response.authResponse.accessToken
            //   });
            var facebookCredential = firebase_1.default.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
            firebase_1.default.auth().signInWithCredential(facebookCredential)
                .then(function (newUser) {
            })
                .catch(function (error) {
                alert("Firebase failure: " + JSON.stringify(error));
            });
        }).catch(function (error) { console.log(error); });
    };
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
