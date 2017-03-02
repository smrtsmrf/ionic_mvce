"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var global_1 = require('../models/global');
var reads_1 = require('../models/reads');
var simple_stream_1 = require('../events/simple_stream');
var reads_update_event_1 = require('../events/reads_update_event');
var cache_status_1 = require('../models/cache_status');
var moment_1 = require('moment');
var CompanyService = (function () {
    function CompanyService(_dbService, _userService) {
        this._dbService = _dbService;
        this._userService = _userService;
        this.readsCache = {};
        this.cacheStatus = {};
        console.log('CompanyService()');
        this._orgsRef = _dbService.db.ref(global_1.Global.FIREBASE_ORGS_PATH);
        this._metersRef = _dbService.db.ref(global_1.Global.FIREBASE_METERS_PATH);
        this._meterDataRef = _dbService.db.ref(global_1.Global.FIREBASE_METER_DATA_PATH);
    }
    CompanyService.prototype.getOrg = function (orgPath) {
        // console.log("CompanyService::getOrg()", orgPath);
        var _this = this;
        this._orgsRef.child(orgPath).once('value').then(function (snapshot) {
            _this.org = snapshot.val();
            console.log("CompanyService::getOrg() -- org", _this.org);
        });
    };
    CompanyService.prototype.getReads = function (guid, type, dateRange) {
        var _this = this;
        console.log('CompanyService::getReads()');
        // create status object (if necessary)
        if (!this.cacheStatus[guid]) {
            this.cacheStatus[guid] = {};
        }
        if (!this.cacheStatus[guid][dateRange]) {
            this.cacheStatus[guid][dateRange] = new cache_status_1.CacheStatus();
        }
        // create stream for this request
        var stream = new simple_stream_1.SimpleStream();
        // if the requested data is already cached, return it (almost) immediately
        if (this.cacheStatus[guid][dateRange].status == cache_status_1.CacheStatus.CACHED) {
            console.log("CompanyService::getReads($guid, $type, $dateRange) -- Retrieving " + this.readsCache[guid][dateRange].length + " from cache.");
            // manage stream in CacheStatus
            this.cacheStatus[guid][dateRange].add(stream);
            // return data (minutely delayed)
            setTimeout(function () {
                stream.add(new reads_update_event_1.ReadsUpdateEvent().fromData(guid, type, dateRange, _this.readsCache[guid][dateRange]));
            }, 1);
        }
        else if (this.cacheStatus[guid][dateRange].status == cache_status_1.CacheStatus.NO_DATA) {
            setTimeout(function () {
                stream.close();
            }, 1);
        }
        else {
            // manage stream in CacheStatus
            this.cacheStatus[guid][dateRange].add(stream);
            // if the data is absent and not yet loading, order a load
            if (this.cacheStatus[guid][dateRange].status == cache_status_1.CacheStatus.ABSENT) {
                // mark cache location as "loading"
                this.cacheStatus[guid][dateRange].nowLoading();
                this._loadReads(guid, type, dateRange);
            }
        }
        return stream;
    };
    CompanyService.prototype._loadReads = function (guid, type, dateRange) {
        var _this = this;
        console.log("CompanyService::_loadReads(" + guid + ", " + type + ", " + dateRange + ")");
        // prepare cache location
        if (!this.readsCache[guid]) {
            this.readsCache[guid] = {};
        }
        if (!this.readsCache[guid][dateRange]) {
            this.readsCache[guid][dateRange] = [];
        }
        var start;
        var dbPath;
        var summarySpan;
        switch (dateRange) {
            case "today":
                start = moment_1.default().startOf('day').toDate();
                dbPath = 'read_summaries/hours';
                summarySpan = "hour";
                break;
            case "week":
                start = moment_1.default().subtract(1, 'weeks').toDate();
                dbPath = 'read_summaries/hours';
                summarySpan = "hour";
                break;
            case "month":
                start = moment_1.default().subtract(1, 'months').toDate();
                dbPath = 'read_summaries/days';
                summarySpan = "day";
                break;
            case "year":
                start = moment_1.default().subtract(1, 'years').toDate();
                dbPath = 'read_summaries/months';
                summarySpan = "month";
                break;
        }
        var startAt = start.getTime().toString();
        var endAt = new Date().getTime().toString();
        var readsPath = guid + "/" + dbPath;
        // grab historical reads
        this._meterDataRef.child(readsPath).orderByKey().startAt(startAt).endAt(endAt).once('value').then(function (snapshot) {
            var reads = snapshot.val();
            console.log("CompanyService::_loadReads() -- reads\n", reads);
            if (reads) {
                // add loaded reads to cache
                for (var dateMS in reads) {
                    _this.readsCache[guid][dateRange].push(_this._newRead(type, dateMS, reads[dateMS]));
                }
                // notify all interested parties that the data has arrived
                _this.cacheStatus[guid][dateRange].cached();
                _this.cacheStatus[guid][dateRange].notifyAll(new reads_update_event_1.ReadsUpdateEvent().fromData(guid, type, dateRange, _this.readsCache[guid][dateRange]));
            }
            else {
                console.log("CompanyService::_loadMeterReads($guid, $type, $dateRange) -- No data found.");
                _this.cacheStatus[guid][dateRange].noData();
            }
        });
        // listen for new reads
        this._meterDataRef.child(readsPath).orderByKey().startAt(endAt).on('child_added', function (snapshot) {
            var addedRead = _this._newRead(type, snapshot.key, snapshot.val());
            console.log("CompanyService::_loadReads() -- onChildAdded\n", addedRead);
            var lastRead = _this.readsCache[guid][dateRange].slice(-1)[0];
            var replace;
            switch (summarySpan) {
                case "hour":
                    replace = lastRead.date.getHours() == addedRead.date.getHours();
                    break;
                case "day":
                    replace = lastRead.date.getDay() == addedRead.date.getDay();
                    break;
                case "month":
                    replace = lastRead.date.getMonth() == addedRead.date.getMonth();
                    break;
                case "year":
                    replace = lastRead.date.getFullYear() == addedRead.date.getFullYear();
                    break;
            }
            // if the new read is a summary update, remove the last read from the cache
            if (replace) {
                _this.readsCache[guid][dateRange].pop();
            }
            // add new read to cache
            _this.readsCache[guid][dateRange].push(addedRead);
            // notify listeners that they should reload data
            _this.cacheStatus[guid][dateRange].notifyAll(new reads_update_event_1.ReadsUpdateEvent().refreshEvent());
        });
    };
    CompanyService.prototype._newRead = function (type, dateMS, readObj) {
        // console.log("CompanyService::_newRead() -- type", type);
        var read;
        var date = parseInt(dateMS);
        switch (type) {
            case "power":
                read = new reads_1.PowerRead().fromObject(date, readObj);
                break;
            case "water":
                read = new reads_1.WaterRead().fromObject(date, readObj);
                break;
            case "gas":
                read = new reads_1.GasRead().fromObject(date, readObj);
                break;
            case "solar":
                read = new reads_1.SolarRead().fromObject(date, readObj);
                break;
        }
        return read;
    };
    CompanyService.prototype.findMeterByID = function (meterID) {
        var _this = this;
        console.log("CompanyService::findMeterByID()");
        return new Promise(function (resolve) {
            _this._metersRef.orderByChild('meter_id').equalTo(meterID).once('value').then(function (snapshot) {
                var meterObj = snapshot.val();
                if (!meterObj) {
                    resolve(null);
                }
                else {
                    resolve(meterObj);
                }
            });
        });
    };
    CompanyService.prototype.addResidentialMeter = function (meter) {
        this._orgsRef.child(this._userService.currentUser.org + "/Building1/_meters/_" + meter.type + "/" + meter.name).set(meter.toFirebaseObject());
    };
    CompanyService = __decorate([
        core_1.Injectable()
    ], CompanyService);
    return CompanyService;
}());
exports.CompanyService = CompanyService;
