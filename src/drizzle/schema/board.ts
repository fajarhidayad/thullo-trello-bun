import { relations } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import usersTable from './user';
import listsTable from './list';
import boardMembersTable from './boardMember';
import labelTable from './label';

export const visibilityEnum = pgEnum('visibility', ['public', 'private']);

const boardsTable = pgTable('boards', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 100 }).notNull(),
  description: text('description'),
  visibility: visibilityEnum('visibility').default('public'),
  coverImg: varchar('cover_img'),
  authorId: uuid('author_id')
    .references(() => usersTable.id)
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

export const boardRelations = relations(boardsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [boardsTable.authorId],
    references: [usersTable.id],
  }),
  lists: many(listsTable),
  members: many(boardMembersTable),
  labels: many(labelTable),
}));

export default boardsTable;
