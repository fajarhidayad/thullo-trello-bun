import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import boardsTable from './board';
import cardsTable from './card';

const listsTable = pgTable('lists', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  boardId: uuid('board_id')
    .references(() => boardsTable.id)
    .notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'string',
    withTimezone: true,
  }).$onUpdate(() => new Date().toDateString()),
});

export const listRelations = relations(listsTable, ({ one, many }) => ({
  board: one(boardsTable, {
    fields: [listsTable.boardId],
    references: [boardsTable.id],
  }),
  cards: many(cardsTable),
}));

export default listsTable;
