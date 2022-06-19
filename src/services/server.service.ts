import http from 'http';
import { IRequest } from '../models/server.interface';

export type RouterCallbackFunction = (req: IRequest, res: http.ServerResponse, err?: any) => void;
export type MethodType = 'GET' | 'PUT' | 'POST' | 'DELETE';
