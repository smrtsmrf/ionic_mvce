import {/*, GooglePlus, NativeStorage,*/ TwitterConnect, Facebook} from 'ionic-native';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {Observer} from "rxjs/Observer";
// import {Observable} from 'rxjs/Observable';
import * as Rx from 'rxjs/rx';
import firebase from 'firebase';

import { User } from '../models/user';
import { Global } from '../models/global';
import {DatabaseService} from "./database_service";

@Injectable()
export class UserService {
  private _fbAuth: any;
  public _usersRef: any;
  public _orgPath: any;
  public currentUser: User;
  public loginObserver$: Observer<User>;

  constructor(private _dbService: DatabaseService, public alertCtrl: AlertController) {
    this._usersRef = _dbService.db.ref(Global.FIREBASE_USERS_PATH);
    this._orgPath = _dbService.db.ref(`${Global.FIREBASE_ORGS_PATH}/${Global.FIREBASE_RESIDENTIAL_ORGS_PATH}`);
    this._fbAuth = firebase.auth();

    this._fbAuth.onAuthStateChanged((user) => {
      console.log("UserService::onAuthStateChanged() -- Firebase user", user);

      if (!user) {
        this.currentUser = null;
        return;
      }
      // console.log(JSON.stringify(user));
      let uid = user.uid;
      // let email = user.providerData[0].email;

      // some other way to check if they're in our system?
      // if not in system then createOrg(user). no else.
      this._usersRef.child(uid).once("value", (snapshot) => {
        let userObj = snapshot.val();
        if (!userObj) {
          userObj = {email: user.email, org: "Vutiliti/VutilitiCP/Dev/KodyCo/Coruscant/Jedi Temple"};
            this.loginUser(uid, userObj);
        }
        else {
          // just do logmein
          this.loginUser(uid, userObj);
        }
          console.log("UserService::onAuthStateChanged() -- Vutiliti userObj", userObj);
        });
      }
    );
  }

  loginUser = (uid, userObj) => {
    this.currentUser = User.fromObject(uid, userObj);
    // console.log("UserService::authChanged()" , self.currentUser);

    if (this.loginObserver$) {
      this.loginObserver$.next(this.currentUser);
    }
  };

  loginWithEmail(email: string, password: string) {
    return this._fbAuth.signInWithEmailAndPassword(email.toLowerCase(), password);
  }

  persistUser() {
    this._usersRef.child(this.currentUser.uid).set(this.currentUser.toFirebaseObject());
    // console.log(this.currentUser.toFirebaseObject());
  }

  logout() {
    this._fbAuth.signOut();
    this.currentUser = null;
  }

  onLogin() {
    let loginStream$ = new Rx.Observable(observer =>
      this.loginObserver$ = observer).share();

    return loginStream$;
  }

  signupEmail(email: string, password: string): any {
    return this._fbAuth.createUserWithEmailAndPassword(email.toLowerCase(), password).then((newUser) => {
      // this.createResidentialUserRecords(newUser);
    });
  }


  resetPassword(email: string): any {
    return this._fbAuth.sendPasswordResetEmail(email.toLowerCase());
  }



   authWithTwitter(){
    //Twitter Cordova Plugin launches Pop-up and returns credentials
       TwitterConnect.login().then( (response) => {
         let alert = this.alertCtrl.create({
           message: JSON.stringify(response),
           buttons: [
             {
               text: "Ok",
               role: 'cancel'
             }
           ]
         });
         alert.present();

         // NativeStorage.setItem('_user',
         //   {
         //     userName: response.userName,
         //     userId: response.userId,
         //     token: response.token,
         //   });
        let twitterCredential = firebase.auth.TwitterAuthProvider.credential(response.token, response.secret);
        firebase.auth().signInWithCredential(twitterCredential)
          .then((newUser) => {
          })
          .catch((error) => {
            let alert = this.alertCtrl.create({
              message: "Firebase failure: " + JSON.stringify(error),
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();

          });
    }).catch((error) => {
         let alert = this.alertCtrl.create({
           message: JSON.stringify(error),
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

  facebookLogin(){
    Facebook.login(['email']).then( (response) => {
      let alert = this.alertCtrl.create({
        message: JSON.stringify(response),
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();

      // NativeStorage.setItem('_user',
      //   {
      //     token: response.authResponse.accessToken
      //   });
      let facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((newUser) => {
        })
        .catch((error) => {
          let alert = this.alertCtrl.create({
            message: "Firebase failure: " + JSON.stringify(error),
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });

    }).catch((error) => { console.log(error) });

  }

  // //Currently not working due to error 12501
  // googleFirebase(){
  //   // let loading = this.loadingCtrl.create({content: 'Coming in hot....'});
  //   // loading.present();
  //   GooglePlus.login({
  //     'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  //     'webClientId': '6734889420-jo0peak42t6g4glrj60n0422vdqe918n.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  //     'offline': true,
  //   }).then(function (user) {
  //     alert('logging in');
  //     let googleCredential = firebase.auth.GoogleAuthProvider.credential(user.getAuthResponse().id_token);
  //     firebase.auth().signInWithCredential(googleCredential)
  //       .then((success) => {
  //         alert('Hitting firebase');
  //         this.userProfile = success;
  //       });
  //     NativeStorage.setItem('user', {
  //       name: user.displayName,
  //       email: user.email,
  //       picture: user.imageUrl,
  //     })
  //       .then(function (error) {
  //         alert('Native storage activated. if (error) = '+error);
  //         console.log(error);
  //       })
  //   }, function (error) {
  //     alert(error);
  //     // loading.dismiss();
  //   });
  // }

//-----------------GOOGLE AUTH ATTEMPTS---------
// AngularFire2 googleAuth breaks app
//   googlePlusLogin() {
//
//     this.af.auth.subscribe((data: FirebaseAuthState) => {
//
//       this.af.auth.unsubscribe()
//       console.log("in auth subscribe", data)
//
//       this.platform.ready().then(() => {
//         GooglePlus.login({
//           'webClientId' : '<Enter your webclient ID here' }) .then((userData) => {
//
//           let provider = firebase.auth.GoogleAuthProvider.credential(userData.idToken);
//
//           firebase.auth().signInWithCredential(provider)
//             .then((success) => {
//               console.log("Firebase success: " + JSON.stringify(success));
//               this.displayAlert(success,"signInWithCredential successful")
//               this.userProfile = success;
//
//             })
//             .catch((error) => {
//               console.log("Firebase failure: " + JSON.stringify(error));
//               this.displayAlert(error,"signInWithCredential failed")
//             });
//
//         })
//           .catch((error) => {
//             console.log("Firebase failure: " + JSON.stringify(error));
//             this.displayAlert(error,"signInWithCredential failed")
//           });
//
//       })
//     })
//   }
//   displayAlert(value,title) {
//     let coolAlert = this.alertController.create({
//       title: title,
//       message: JSON.stringify(value),
//       buttons: [
//         {
//           text: "Cancel"
//         },
//         {
//           text: "Save",
//           handler: data => {
//           }
//         }
//       ]
//     });
//     coolAlert.present();
//
//   }
  //Basic googleAuth without hitting firebase
  // doGoogleLogin(){
  //   let nav = this.navCtrl;
  //   let loading = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });
  //   loading.present();
  //   GooglePlus.login({
  //     'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  //     'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  //     'offline': true
  //   })
  //     .then(function (user) {
  //       loading.dismiss();
  //
  //       NativeStorage.setItem('user', {
  //         name: user.displayName,
  //         email: user.email,
  //         picture: user.imageUrl
  //       })
  //         .then(function(){
  //           nav.push(HomePage);
  //         }, function (error) {
  //           console.log(error);
  //         })
  //     }, function (error) {
  //       loading.dismiss();
  //     });
  // }
// Trying to use manual sign in flow to pass along credentials for sign in
  // onSignIn(googleUser) {
  //   console.log('Google Auth Response', googleUser);
  //   // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  //   let unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
  //     unsubscribe();
  //     // Check if we are already signed-in Firebase with the correct user.
  //     // if (!this.isUserEqual(googleUser, firebaseUser)) {
  //       // Build Firebase credential with the Google ID token.
  //       let credential = firebase.auth.GoogleAuthProvider.credential(
  //         googleUser.getAuthResponse().id_token);
  //       // Sign in with credential from the Google user.
  //       firebase.auth().signInWithCredential(credential).catch(function(error) {
  //         // Handle Errors here.
  //         alert(error);
  //         // let errorCode = error.code;
  //         // let errorMessage = error.message;
  //         // // The email of the user's account used.
  //         // let email = error.email;
  //         // // The firebase.auth.AuthCredential type that was used.
  //         // let credential = error.credential;
  //         // ...
  //       });
  //     // } else {
  //     //   console.log('User already signed-in Firebase.');
  //     // }
  //   });
  // }
  // isUserEqual(googleUser, firebaseUser) {
  //   if (firebaseUser) {
  //     let providerData = firebaseUser.providerData;
  //     for (let i = 0; i < providerData.length; i++) {
  //       if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
  //         providerData[i].uid === googleUser.getBasicProfile().getId()) {
  //         // We don't need to reauth the Firebase connection.
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // }


}

