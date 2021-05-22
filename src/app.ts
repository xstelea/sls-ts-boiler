import * as serverless from 'serverless-http';
import * as Koa from 'koa';
import { routes } from './routes/routes';
import { error } from './middleware/error';
import * as Pino from 'pino';
const cors = require('koa2-cors');
const pino = Pino({ name: 'app' });
const logger = require('koa-pino-logger');

let server;

const app = new Koa();

export const handler = serverless(app);

if (process.env.IS_LOCAL === 'true') {
  server = app.listen(4000);
  app
    .use(logger())
    .use(cors())
    .use(error)
    .use(routes.routes())
    .use(routes.allowedMethods());
  console.log(`app running on http://localhost:4000`);

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
} else {
  app
    .use(logger())
    .use(error)
    .use(routes.routes())
    .use(routes.allowedMethods());
}

function cleanup() {
  pino.info('closing server...');
  server.close(async () => {
    pino.info('done!');
    process.exit(1);
  });
}
