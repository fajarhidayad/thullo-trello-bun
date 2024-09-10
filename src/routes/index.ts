import { Router } from 'express';
import boardHandler from '../handlers/board.handler';
import { validateBody } from '../modules/requestValidation';
import * as authHandler from '../handlers/auth.handler';
import { authenticated } from '../modules/auth';

const router = Router();

router.post(
  '/auth/register',
  validateBody(authHandler.registrationSchema),
  authHandler.register
);

router.post(
  '/auth/login',
  validateBody(authHandler.loginSchema),
  authHandler.login
);

router.use(authenticated);

router.get('/profile/:id', () => {});

/**
 * Board routes group
 */
router.get('/boards', boardHandler.getAllBoards);
router.get('/boards/:id', boardHandler.getBoardDetails);
router.post('/boards', () => {});
router.put('/boards/:id', () => {});
router.delete('/boards/:id', () => {});
router.get('/boards/:id/labels', () => {});
router.post('/boards/:id/labels', () => {});

/**
 * Member routes
 */
router.get('/boards/:id/members', () => {});
router.post('/boards/:id/members', () => {});
router.delete('/boards/:boardId/members/:id', () => {});
router.get('/cards/:id/members/', () => {});
router.post('/cards/:cardId/members/:userId', () => {});
router.delete('/cards/:cardId/members/:userId', () => {});

/**
 * Label routes
 */
router.put('/labels/:labelId', () => {});
router.delete('/labels/:labelId', () => {});

/**
 * List routes group
 */
router.post('/boards/:id/lists', () => {});
router.get('/lists', () => {});
router.post('/lists', () => {});
router.put('/lists/:id', () => {});
router.delete('/lists/:id', () => {});

/**
 * Card routes group
 */
router.post('/lists/:id/cards', () => {});
router.get('/cards/:id', () => {});
router.put('/cards/:id', () => {});
router.delete('/cards/:id', () => {});
router.post('/cards/:cardId/labels/:labelId', () => {});
router.delete('/cards/:cardId/labels/:labelId', () => {});

/**
 * Comment routes
 */
router.get('/cards/:id/comments', () => {});
router.post('/cards/:id/comments', () => {});
router.put('/comments/:id', () => {});
router.delete('/comments/:id', () => {});

export default router;
