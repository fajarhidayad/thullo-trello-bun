import type { NextFunction, Request, Response } from 'express';

export function errorNotFound(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({
    message: 'Not found',
  });
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const code = req.statusCode;
  if (code && code < 500) {
    return res.status(code).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
}
