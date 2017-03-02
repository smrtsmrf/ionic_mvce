"use strict";
/**
 * Created by Vutiliti on 1/19/2017.
 */
var ResidentialMeter = (function () {
    function ResidentialMeter() {
        //Testing purpose only must Delete
        this.newUserMeter = [];
    }
    ResidentialMeter.prototype.fromData = function (meterId, name, guid, provider, type, goal) {
        this.name = name;
        this.meterId = meterId;
        this.guid = guid;
        this.type = type;
        this.provider = provider;
        this.goal = goal;
    };
    ResidentialMeter.prototype.fromObject = function (meterId, type, value) {
        // console.log("residential_Meters::fromObject(value)", value);
        this.fromData(meterId, value["name"], value["guid"], value["provider"], value["type"], value["goal"]);
        return this;
    };
    ResidentialMeter.prototype.toFirebaseObject = function () {
        return {
            guid: this.guid,
            type: 'meter',
        };
    };
    return ResidentialMeter;
}());
exports.ResidentialMeter = ResidentialMeter;
