import http from 'http';

export interface IRequest extends http.IncomingMessage {
  params?: any;
  body?: any;
}
