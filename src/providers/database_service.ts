import { Injectable } from '@angular/core';
import {Global} from '../models/global';
import {Read} from '../models/reads';
import {Utils} from "../utils/utils";
import firebase from 'firebase';
import * as _ from "lodash";
import {ResidentialMeter} from "../models/residential_meter";

@Injectable()
export class DatabaseService {

  db: any;

  private _meterDataRef: any;

  constructor(){
    console.log("DatabaseService()");

    const fbConfig = {
      apiKey: "AIzaSyARnfo80rPEQQgZjMBGuwekYTve9nsBA08",
      authDomain: "vutiliti-platform.firebaseapp.com",
      databaseURL: "https://vutiliti-platform.firebaseio.com",
      storageBucket: "firebase-vutiliti-platform.appspot.com"
    };

    firebase.initializeApp(fbConfig);

    this.db = firebase.database();

    this._meterDataRef = this.db.ref(Global.FIREBASE_METER_READS_PATH);
  }


}
