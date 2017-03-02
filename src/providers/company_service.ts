import {Injectable} from '@angular/core';
import {Global} from '../models/global';
import {ResidentialMeter} from '../models/residential_meter';
import {ReadsCache} from '../models/reads_cache';
import {DatabaseService} from './database_service';
import {UserService} from './user_service';
import {Utils} from "../utils/utils";
import {ReadsRequest} from "../events/reads_request";

@Injectable()
export class CompanyService {
  private _orgsRef: any;
  private _metersRef: any;
  private _meterDataRef: any;

  org: any;
  residentialMeters: Array<ResidentialMeter>;

  readsCache: any = {};

  constructor(private _dbService: DatabaseService,
              private _userService: UserService) {

    console.log('CompanyService()');

    this._orgsRef = _dbService.db.ref(Global.FIREBASE_ORGS_PATH);
    this._metersRef = _dbService.db.ref(Global.FIREBASE_METERS_PATH);
    this._meterDataRef = _dbService.db.ref(Global.FIREBASE_METER_READS_PATH);
  }

  getOrg(orgPath: string): Promise<any> {
    // console.log("CompanyService::getOrg()", orgPath);

    return new Promise<any>((resolve) => {
      this._orgsRef.child(orgPath).once('value').then((snapshot) => {
        let org = snapshot.val();

        if (!org) {
          resolve(null);
        }
        else {
          console.log("CompanyService::getOrg() -- org", org);
          this.org = org;

          // TODO: get other meter types

          this.residentialMeters = Utils.findAllResidentialMeters("power", this.org);

          console.log("CompanyService::getOrg() -- meters", this.residentialMeters);

          resolve(this.org);
        }
      });
    });
  }
}
