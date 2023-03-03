import { ServerConfig, Module } from '@nodenet/core/src';
import * as Controller from './controller';
import * as Service from './service';
import * as Database from './database';


@Module(Controller, Service, Database)
export class AppModule {
  
  config: ServerConfig = {
    name: 'NodeNet Server',
    port: 3000,
    // host: 'http://localhost', -- Host of your server application (default: http://localhost)
    // version: '1.0.0', -- Version of your server application
    swagger: { // If not defined, Swagger will not be enabled
      path: '/api', // Path to Swagger (e.g. host:port/api)
      // title: 'NodeNet API', -- Title displayed in Swagger
      // description: 'NodeNet server API', -- Description displayed in Swagger
    }
  };
  
  init(){ }
}