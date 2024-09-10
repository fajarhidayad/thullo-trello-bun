import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { listTable } from '.';
import cardLabelTable from './cardLabel';
import commentsTable from './comment';
import listsTable from './list';

const cardsTable = pgTable('cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  listId: uuid('list_id')
    .references(() => listsTable.id)
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

export const cardRelations = relations(cardsTable, ({ one, many }) => ({
  list: one(listTable, {
    fields: [cardsTable.listId],
    references: [listsTable.id],
  }),
  labels: many(cardLabelTable),
  comments: many(commentsTable),
}));

export default cardsTable;
