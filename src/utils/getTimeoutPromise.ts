import { CancelTokenSource } from 'axios';
import { HttpTimeoutError } from './Errors/HttpErrors';
import { CANCEL_REQUEST_TIME } from '../assets/WEATHER_CONSTANTS';

export const getTimeoutPromise = (token: CancelTokenSource, msg: string) => {
  return new Promise((_, rej) => {
    setTimeout(() => {
      token.cancel(msg);
      rej(new HttpTimeoutError(msg));
    }, CANCEL_REQUEST_TIME);
  });
};
