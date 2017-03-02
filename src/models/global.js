"use strict";
/**
 * Created by Vutiliti on 1/16/2017.
 */
var Global = (function () {
    function Global() {
    }
    Global.FIREBASE_ORGS_PATH = "orgs";
    Global.FIREBASE_RESIDENTIAL_ORGS_PATH = "Vutiliti/VutilitiCP/Residential";
    Global.FIREBASE_USERS_PATH = "users";
    Global.FIREBASE_METER_DATA_PATH = "commercial_data_demo";
    Global.FIREBASE_METERS_PATH = "meters";
    Global.UTILITY_COLORS = {
        "power": "#FFAD2B",
        "water": "#3A91E9",
        "gas": "#7B67CE",
        "solar": "#57DD00"
    };
    Global.UTILITY_TRANSPARENT_COLORS = {
        "power": "#79654A",
        "water": "#3D5A7D",
        "gas": "#525579",
        "solar": "#446C4B"
    };
    Global.UTILITY_UNITS = {
        "power": "kWh",
        "water": "GL",
        "gas": "Ccf",
        "solar": "kWh"
    };
    return Global;
}());
exports.Global = Global;
