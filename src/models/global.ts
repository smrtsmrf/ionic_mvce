/**
 * Created by Vutiliti on 1/16/2017.
 */
export class Global {
  static POWER_READ_MULTIPLIER: number = 0.01;    // to convert to kWh

  static FIREBASE_ORGS_PATH: string = "orgs";
  static FIREBASE_RESIDENTIAL_ORGS_PATH: string = "Vutiliti/VutilitiCP/Residential";
  static FIREBASE_USERS_PATH: string = "users";
  // static FIREBASE_METER_READS_PATH: string = "commercial_data_demo";
  static FIREBASE_METER_READS_PATH: string = "reads";
  static FIREBASE_METERS_PATH: string = "meters";

  static UTILITY_PROPERTIES: Object = {
    power: {
      color: "#EF8E0F",
      transparentColor: "#79654A",
      unit: "kWh"
    },
    water: {
      color: "#2075CB",
      transparentColor: "#3D5A7D",
      unit: "GL"
    },
    gas: {
      color: "#EEC706",
      transparentColor: "#525579",
      unit: "Ccf"
    },
    solar: {
      color: "#57DD00",
      transparentColor: "#446C4B",
      unit: "kWh"
    }
  };
}
