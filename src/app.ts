// uncomment the following to disable source-map translation of stack traces.
require('source-map-support').install();

// Library Imports
import express, {IRoute, IRouter, NextFunction, Request, Response} from 'express';
import helmet from 'helmet';
import colors from 'colors';
import cors from 'cors';
import util from 'util';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import Q from 'q';
// Other Imports
import {TYPES} from "./configurations/types";
import {container} from "./configurations/inversify.config";
import {IComponentRoutes} from "./components/component.routes";


class Server {
  public corsOptions: any;
  public app: any;

  constructor() {
    this.app = express();

    // Configure application
    this.config();

    // Configure routes
    this.routes();
  }

  private config() {
    // Secure app with helmet
    this.app.use(helmet());

    // Mount json form parser
    this.app.use(bodyParser.json({limit: '500mb'}));

    // Enable CORS
    this.app.use(cors());

    // Mount query string parser
    this.app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

    // Print Request and Response Time in Console
    this.app.use((req: Request, res: Response, next: any) => {
      const start = process.hrtime();

      console.log(colors.cyan('Processing Request %s.'), req.url);
      console.log(colors.magenta(JSON.stringify(req.headers, null, 2)));
      console.log(colors.magenta(JSON.stringify(req.params, null, 2)));
      console.log(colors.magenta(JSON.stringify(req.query, null, 2)));
      console.log(colors.magenta(JSON.stringify(req.body, null, 2)));

      res.once('finish', function () {
        const diff = process.hrtime(start);
        const ms = diff[0] * 1e3 + diff[1] * 1e-6;

        console.log(colors.green('Response time: %d ms for Request URL %s'), ms, req.url);
      });
      const transactionLogFile = path.resolve(path.join(__dirname, '../transactionLog.log'));

      const logData = `${new Date().toUTCString()}
      ip: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}
      method: ${req.method}
      originalUri: ${req.originalUrl}
      uri: ${req.url}
      requestParams: ${JSON.stringify(req.params)}
      responseQuery: ${JSON.stringify(req.query)}
      requestBody: ${JSON.stringify(req.body)}
      referer: ${req.headers.referer || ''}
      ua: ${req.headers['user-agent']}
      
      `;

      Q.nfcall(fs.readFile, transactionLogFile, "utf8")
        .then(fileData => {
          console.log(fileData + logData);
          return Q.nfcall(fs.writeFile, transactionLogFile, fileData + '\n\n' + logData.trim(), 'utf8')
        }).catch(e => console.error(e));

      next();
    });
  }


  private routes() {
    let componentRoutes: IComponentRoutes = container.get<IComponentRoutes>(TYPES.IComponentRoutes);
    let router: IRouter<IRoute> = componentRoutes.setupRoutes();

    // Enable Cors & Use Router
    this.app.use(cors(), router);

    this.app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      if (err) {
        console.log(err);

        const status =
          res.locals.status ||
          err.statusCode ||
          err.status ||
          (err.output && err.output.statusCode) ||
          400;

        return res.status(status).send({message: err.message || err.msg});
      }

      try {
        JSON.parse(err)
          ? console.dir(JSON.stringify(err))
          : console.log(
          util.inspect(err, {
            showHidden: true,
            depth: null,
          })
          );
      } catch (e) {
        console.error(e);
      }

      err.status ? res.status(err.status).send(err.msg) : next(err);

      return next();
    });

    this.app.get('/healthCheck', cors(), (_req: any, res: any) => {
      res.send(`Server is up for ${process.uptime()}s`);
    });
  }
}

const server = new Server();
export const app = server.app;
