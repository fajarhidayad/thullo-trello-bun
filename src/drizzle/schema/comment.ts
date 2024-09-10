import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import usersTable from './user';
import cardsTable from './card';
import { relations } from 'drizzle-orm';

const commentsTable = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  body: varchar('body', { length: 256 }).notNull(),
  userId: uuid('user_id')
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  cardId: uuid('card_id')
    .references(() => cardsTable.id, { onDelete: 'cascade' })
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

export const commentRelations = relations(commentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [commentsTable.userId],
    references: [usersTable.id],
  }),
  card: one(cardsTable, {
    fields: [commentsTable.cardId],
    references: [cardsTable.id],
  }),
}));

export default commentsTable;
