import { isNullOrWhitespace } from './../helpers/string.helper';
import { DevError } from './../errors/dev.error';
import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { injectable, inject } from 'inversify';
import PromiseRouter from "express-promise-router";

@injectable()
export abstract class BaseController {

  public readonly path: string;
  public readonly router: Router;

  public abstract initializeRoutes(): void;

  constructor(path: string = '') {
    if (isNullOrWhitespace(path)) {
      throw new DevError(`Parameter 'path' can not be empty.`);
    }

    this.router = PromiseRouter();
    this.path = path;

  }
}
