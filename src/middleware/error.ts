import * as Pino from 'pino';
import { Context, Next } from 'koa';

const pino = Pino({ name: 'error.ts' });

export const error = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    const errorCode = err.status || 500;
    if (errorCode === 500) {
      pino.error(err, 'error middleware');
    } else {
      pino.warn(err.message);
    }
    ctx.status = errorCode;
    ctx.body = { message: err.message };
  }
};
