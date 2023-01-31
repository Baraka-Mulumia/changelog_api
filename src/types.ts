import { Request, Response } from 'express';

export type IResponse = Response;

export type IRequest = Request & {
  user?: {
    id: string;
    username: string;
  };
};
