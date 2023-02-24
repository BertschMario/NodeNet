import { Service, IService } from "@nodenet/core/src";

@Service()
export class TestService extends IService {
  async call(controllerData){
    return await this.dispatch(`${controllerData} => Service`);
  }
}