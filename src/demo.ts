import { Handler, APIGatewayEvent, Context } from 'aws-lambda';
import { response } from './utils';
import fetch from 'node-fetch';
import * as Pino from 'pino';

const pino = Pino({ name: 'demo' });

export const demo: Handler = async (event: APIGatewayEvent, _: Context) => {
  const request = await fetch('http://google.com');
  try {
    return response(request.status, await request.json());
  } catch (error) {
    pino.error(`unsuccessful request`);
    return response(request.status, { message: request.statusText });
  }
};
