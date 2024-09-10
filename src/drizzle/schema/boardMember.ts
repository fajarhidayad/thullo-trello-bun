import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import usersTable from './user';
import boardsTable from './board';
import { relations } from 'drizzle-orm';

export const roleEnum = pgEnum('role', ['author', 'member']);

const boardMembersTable = pgTable(
  'board_members',
  {
    userId: uuid('user_id')
      .references(() => usersTable.id)
      .notNull(),
    boardId: uuid('board_id')
      .references(() => boardsTable.id)
      .notNull(),
    role: roleEnum('role').default('member'),
    createdAt: timestamp('created_at', {
      mode: 'string',
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.boardId] }),
      uniqueMember: unique().on(table.userId, table.boardId),
    };
  }
);

export const boardMemberRelation = relations(boardMembersTable, ({ one }) => ({
  member: one(usersTable, {
    fields: [boardMembersTable.userId],
    references: [usersTable.id],
  }),
  board: one(boardsTable, {
    fields: [boardMembersTable.boardId],
    references: [boardsTable.id],
  }),
}));

export default boardMembersTable;
