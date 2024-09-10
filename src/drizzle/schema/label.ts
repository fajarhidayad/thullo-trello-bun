import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import usersTable from './user';
import boardsTable from './board';
import { relations } from 'drizzle-orm';
import cardLabelTable from './cardLabel';

const labelTable = pgTable('labels', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  bgColor: varchar('bg_color', { length: 32 }).notNull(),
  userId: uuid('user_id')
    .references(() => usersTable.id)
    .notNull(),
  boardId: uuid('board_id')
    .references(() => boardsTable.id, { onDelete: 'cascade' })
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

export const labelRelations = relations(labelTable, ({ one, many }) => ({
  board: one(boardsTable, {
    fields: [labelTable.boardId],
    references: [boardsTable.id],
  }),
  user: one(usersTable, {
    fields: [labelTable.userId],
    references: [usersTable.id],
  }),
  cards: many(cardLabelTable),
}));

export default labelTable;
