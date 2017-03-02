/**
 * Created by Vutiliti on 11/28/2016.
 */
import {NavController, AlertController} from 'ionic-angular';
import {Component} from '@angular/core';
import {TwitterConnect, NativeStorage} from 'ionic-native';

import {UserService} from '../../providers/user_service';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor(public nav: NavController,
              public alertCtrl: AlertController,
              public userService:UserService) {
  }

  back(): void {
    this.nav.pop(ProfilePage);
  }
  logout(){
    this.userService.logout();
    this.nav.setRoot(LoginPage);
  }


  // doTwLogout() {
  //   TwitterConnect.logout().then(function (response) {
  //       alert('removing twitter credentials');
  //       NativeStorage.remove('_user');
  //       alert('User removed');
  //       this.app.getRootNav().setRoot(LoginPage);
  //     },
  //     function (error) {
  //       console.log(error);
  //     });
  // };
}
