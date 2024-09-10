import type { Request, Response } from 'express';
import { z } from 'zod';

export const registrationSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name must at least 3 characters' })
    .max(50, { message: 'First name must below 50 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name must at least 3 characters' })
    .max(50, { message: 'Last name must below 50 characters' }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: 'password must at least 6 characters' })
    .max(32),
});

export const loginSchema = registrationSchema.omit({
  email: true,
  password: true,
});

export async function register(req: Request, res: Response) {
  // const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  res.json({
    message: 'success',
  });
}

export async function login(req: Request, res: Response) {
  // const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  res.json({
    message: 'success',
  });
}
