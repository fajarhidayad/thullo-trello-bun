import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import boardsTable from './board';
import boardMembersTable from './boardMember';
import labelTable from './label';
import commentsTable from './comment';
import cardMembersTable from './cardMember';

const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('firstname', { length: 100 }).notNull(),
  lastName: varchar('lastname', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 64 }).notNull(),
  createdAt: timestamp('created_at', {
    mode: 'string',
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updated_at', {
    mode: 'string',
    withTimezone: true,
  }).$onUpdate(() => new Date().toDateString()),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  boards: many(boardsTable),
  boardMembers: many(boardMembersTable),
  cardMembers: many(cardMembersTable),
  labels: many(labelTable),
  comments: many(commentsTable),
}));

export default usersTable;
