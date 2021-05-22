import * as jwt from 'koa-jwt';
import { Context, Next } from 'koa';

const withSecret = () =>
  jwt({ secret: process.env.DEV_AUTH0_CLIENT_SECRET, key: 'jwtdata' });

export const getAccountId = async (ctx: Context, next: Next) => {
  ctx.state.accountId = ctx.state?.jwtdata?.sub;
  return await next();
};

export const auth = withSecret();
