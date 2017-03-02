"use strict";
/**
 * Created by Vutiliti on 1/16/2017.
 */
var residential_meter_1 = require("./residential_meter");
var User = (function () {
    function User() {
    }
    User.prototype.fromData = function (uid, _email, _org, meters) {
        this.uid = uid;
        this.email = _email;
        this.org = _org ? _org : "Vutiliti/_org/VutilitiCP/_org/Dev/_org/KodyCo";
        if (meters) {
            this.meters = {};
            var utilityType = "power";
            this.meters[utilityType] = {};
            for (var meterId in meters[utilityType]) {
                this.meters[utilityType][meterId] =
                    new residential_meter_1.ResidentialMeter().fromObject(meterId, utilityType, meters[utilityType][meterId]);
            }
        }
    };
    User.prototype.fromObject = function (uid, value) {
        this.fromData(uid, value["email"], value["org"], value["meters"]);
        return this;
    };
    User.prototype.toFirebaseObject = function () {
        var obj = {
            email: this.email,
            org: this.org
        };
        if (this.meters) {
            obj['meters'] = {};
            var utilityType = "power";
            obj['meters'][utilityType] = {};
            for (var meterId in this.meters[utilityType]) {
                obj['meters'][utilityType][meterId] = this.meters[utilityType][meterId].toFirebaseObject();
            }
        }
        return obj;
    };
    User.prototype.addMeter = function (meter) {
        this.meters[meter.type][meter.meterId] = meter;
    };
    return User;
}());
exports.User = User;
