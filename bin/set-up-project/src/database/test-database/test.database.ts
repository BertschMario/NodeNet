import { Database, IDatabase } from "@nodenet/core/src";

@Database()
export class TestDatabase extends IDatabase {
  async call(serviceData){
    return `${serviceData} => Database`;
  }
}