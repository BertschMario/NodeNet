import { ServerConfig, Module } from '@nodenet/core/src';
import * as Controller from './controller';
import * as Service from './service';
import * as Database from './database';


@Module(Controller, Service, Database)
export class AppModule {
  
  config: ServerConfig = {
    name: 'NodeNet Server',
    port: 3000
  };
  
  init(){ }
}