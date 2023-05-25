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
    swaggerPath: '/api', // If not defined, Swagger will not be enabled
    swaggerTitle: 'NodeNet API', // Title of your Swagger API
    swaggerDescription: 'NodeNet server API', // Description of your Swagger API
    //jwtSecret: 'KeyShouldBeInsideEnvironmentVariables!!!' // Secret key for JWT
  };
  
  init(){ }
}