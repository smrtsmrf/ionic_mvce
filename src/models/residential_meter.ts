/**
 * Created by Vutiliti on 1/19/2017.
 */
export class ResidentialMeter {
  public name: string;
  public meterId: string;
  public guid: string;
  public type: string;        // utility type
  public provider: string;
  public goal: number;

  static fromData(meterId:string, name:string, guid:string, provider:string, type:string, goal:number) {
    let value = new ResidentialMeter();
    value.name = name;
    value.meterId = meterId;
    value.guid = guid;
    value.type = type;
    value.provider = provider;
    value.goal = goal;

    return value;
  }

  static fromObject(meterId:string, type:string, obj: any): ResidentialMeter {
    return ResidentialMeter.fromData(meterId, obj["name"], obj["guid"], obj["provider"], obj["type"], obj["goal"]);
  }

  static fromOrgObject(name: string, utilityType: string, obj: any): ResidentialMeter {
    return ResidentialMeter.fromData(obj['_meter_id'], name, obj['_guid'], obj['_provider'], utilityType, obj['_goal']);
  }

  toFirebaseObject(){
    return {
      _guid:this.guid,
      _type: 'meter',
      _goal:this.goal,
      _provider:this.provider
    };
  }

  toOrgObject() {
    let obj = {
      _meter_id: this.meterId,
      _guid: this.guid,
      _provider: this.provider,
      _type: "meter",
    };

    if (this.goal) {
      obj['_goal'] = this.goal;
    }

    return obj;
  }
}


