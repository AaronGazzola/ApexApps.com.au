import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from './errorResponse';

@Injectable()
export class Admin implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // if (req.user?.isAdmin) {
    //   next();
    // } else {
    //   return next(new ErrorResponse('Not authorized to access content', 401));
    // }
  }
}
