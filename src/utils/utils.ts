import {ResidentialMeter} from "../models/residential_meter";
// import {Read, PowerRead, WaterRead, GasRead, SolarRead} from '../models/reads';
import moment from 'moment';

export class Utils {
  static sum(values: Array<number>): number {
    return values.reduce((total: number, current: number) => total + current);
  }

  static hardRound(value: number, precision: number): number {
    return parseFloat(value.toFixed(precision));
  }

  static isObject(item: any): boolean {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
  }

  // [list] should be an array that search() will add located values to
  static search(name: string, obj: any, list: any) {
    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = obj[key];

      if (key == name) {
        list.push(value);
      }
      else if (Utils.isObject(value)) {
        Utils.search(name, value, list);
      }
    }
  }

  // find all residential meters in an org node by utility type ("power", "water", etc.)
  static findAllResidentialMeters(type: string, orgNode: Object): Array<ResidentialMeter> {
    let result = [];
    let nodes = [];

    Utils.search(`_${type}`, orgNode, nodes);

    let nodesKeys = Object.keys(nodes);
    for (let i = 0; i < nodesKeys.length; i++) {
      let node = nodes[nodesKeys[i]];

      let meterKeys = Object.keys(node);
      for (let j = 0; j < meterKeys.length; j++) {
        let meter = node[meterKeys[j]];
        result.push(ResidentialMeter.fromOrgObject(meterKeys[j], type, meter));
      }
    }

    return result;
  }


}
