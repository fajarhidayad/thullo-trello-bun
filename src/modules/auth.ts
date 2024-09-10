import jwt from 'jsonwebtoken';
import env from '../env';
import type { NextFunction, Request, Response } from 'express';
import argon from 'argon2';

interface AuthPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export function createJWT(payload: AuthPayload) {
  const token = jwt.sign(payload, env.JWT_SECRET);
  return token;
}

export function authenticated(req: Request, res: Response, next: NextFunction) {
  const authPayload = req.headers.authorization;

  if (!authPayload) {
    req.statusCode = 401;
    next(new Error('Unauthorized'));
    return;
  }

  const [bearer, token] = authPayload.split(' ');
  if (bearer !== 'Bearer' || !token) {
    req.statusCode = 401;
    next(new Error('Invalid token'));
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthPayload;
    req.user = payload;
    next();
  } catch (error) {
    req.statusCode = 401;
    next(new Error('Invalid token payload'));
  }
}

export async function hashPassword(password: string) {
  const hash = await argon.hash(password);
  return hash;
}

export async function comparePassword(password: string, hash: string) {
  const isMatched = await argon.verify(hash, password);
  return isMatched;
}
