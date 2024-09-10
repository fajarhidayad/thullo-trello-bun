import {
  pgTable,
  primaryKey,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import usersTable from './user';
import cardsTable from './card';
import { relations } from 'drizzle-orm';

const cardMembersTable = pgTable(
  'card_members',
  {
    userId: uuid('user_id')
      .references(() => usersTable.id)
      .notNull(),
    cardId: uuid('card_id')
      .references(() => cardsTable.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at', {
      mode: 'string',
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.cardId, table.userId] }),
    uniqueMember: unique().on(table.cardId, table.userId),
  })
);

export const cardMemberRelations = relations(cardMembersTable, ({ one }) => ({
  member: one(usersTable, {
    fields: [cardMembersTable.userId],
    references: [usersTable.id],
  }),
  card: one(cardsTable, {
    fields: [cardMembersTable.cardId],
    references: [cardsTable.id],
  }),
}));

export default cardMembersTable;
