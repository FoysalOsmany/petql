import "reflect-metadata";

import * as http from 'http';
import 'reflect-metadata';
import { app } from './app';
import {Application} from "express";

const port = process.env.NODE_ENV === 'test' ? 3001 : 3000;

let server:Application;

// @ts-ignore
server = http.createServer(app);
server.listen(port, '0.0.0.0', () => {
  console.log('PetQL Server Started :) Listening on localhost:3000')
});

export {server};
