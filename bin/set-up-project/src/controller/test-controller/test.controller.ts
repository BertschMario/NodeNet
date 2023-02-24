import { Controller, IController } from "@nodenet/core/src";

@Controller('[GET]', '/test')
export class TestController extends IController {
  async call(server){
    const data = await this.dispatch('Controller');
    return server.ok(data);
  }
}