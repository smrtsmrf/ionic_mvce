import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ProfilePage} from '../profile/profile';
import {CompanyService} from "../../providers/company_service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public nav: NavController, public companyService: CompanyService) {
    console.log("HomePage()");
  }

  changeMainView(newView: string): void {
    if (newView == "ProfilePage") {
      this.nav.push(ProfilePage);
      return;
    }

    if (newView == "AddMeter") {
      return;
    }
  }
}
