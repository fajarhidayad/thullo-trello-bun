import type { Request, Response } from 'express';
import { db } from '../drizzle/db';
import { boardTable } from '../drizzle/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

/**
 *
 * @param req
 * @param res
 * @returns All boards
 */
async function getAllBoards(req: Request, res: Response) {
  const boards = await db.select().from(boardTable);

  return res.json({
    data: boards,
  });
}

/**
 *
 * @param req
 * @param res
 * @returns Board details
 */
async function getBoardDetails(req: Request, res: Response) {
  const id = req.params.id;

  const checkId = z.string().uuid().safeParse(id);

  if (!checkId.success) {
    return res.status(400).json({
      message: 'Invalid param type "id"',
    });
  }

  const board = await db.query.boardTable.findFirst({
    where: eq(boardTable.id, id),
  });

  if (!board) {
    return res.status(404).json({
      message: 'board not found',
    });
  }

  return res.json({
    data: board,
  });
}

export default {
  getAllBoards,
  getBoardDetails,
};
