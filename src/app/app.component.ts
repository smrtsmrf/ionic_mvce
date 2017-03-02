import { Component, ViewChild } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar, Keyboard } from 'ionic-native';
import { DatabaseService } from '../providers/database_service';

import { LoginPage } from '../pages/login/login';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  public rootPage: any  = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(private platform: Platform,
              public _data:DatabaseService) {
    platform.ready().then(() => {

      StatusBar.overlaysWebView(true);
      // StatusBar.styleDefault();

      if (this.platform.is('ios' || 'android')) {
        Keyboard.disableScroll(true);
        Keyboard.hideKeyboardAccessoryBar(true);
      }
    });
  }
}
