export class User {
  uid: string;
  email: string;
  org: string;

  static fromData(uid: string,_email: string, _org: string, meters:Object) {
    let value = new User();

    value.uid = uid;
    value.email = _email;
    value.org = _org ? _org : "Vutiliti/_org/VutilitiCP/_org/Dev/_org/KodyCo";

    return value;
  }

  static fromObject(uid:string, value: Object): User {
    return User.fromData(uid, value["email"], value["org"], value["meters"]);
  }

  toFirebaseObject() {
    return {
      email: this.email,
      org: this.org
    };
  }
}
