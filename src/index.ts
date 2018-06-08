import {GoldenApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {GoldenApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new GoldenApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
