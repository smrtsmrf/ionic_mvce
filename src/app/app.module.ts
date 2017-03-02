import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {SQLite} from 'ionic-native';
import {ReactiveFormsModule} from '@angular/forms';

//Pages
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {MyApp} from './app.component';
import {ProfilePage} from '../pages/profile/profile';
import {ResetPasswordPage} from '../pages/reset-password/reset-password';
import {SignupPage} from '../pages/signup/signup';

//Components


//Providers
import {CompanyService} from '../providers/company_service';
import {DatabaseService} from '../providers/database_service';
import {ResidentialMeter} from '../models/residential_meter';
import {UserService} from '../providers/user_service';


@NgModule({
  declarations: [
    HomePage,
    LoginPage,
    MyApp,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      platforms:{
        ios : {
          scrollAssist: false,
          autoFocusAssist: false
        },
        android : {
          scrollAssist: false,
          autoFocusAssist: false
        }
      }
    }),
    ReactiveFormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    // MyApp,
    HomePage,
    LoginPage,
    ProfilePage,
    ResetPasswordPage,
    SignupPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    CompanyService,
    DatabaseService,
    ResidentialMeter,
    Storage,
    SQLite,
    UserService
  ]
})
export class AppModule {
}
