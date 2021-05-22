import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';

import { router as healthRoutes } from './health.routes';

const router = new Router();

router
  .use(bodyParser({}))
  .use('/ping', healthRoutes.routes(), healthRoutes.allowedMethods());

export const routes = router;
