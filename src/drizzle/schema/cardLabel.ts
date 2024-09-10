import {
  pgTable,
  primaryKey,
  timestamp,
  unique,
  uuid,
} from 'drizzle-orm/pg-core';
import labelTable from './label';
import cardsTable from './card';
import { relations } from 'drizzle-orm';

const cardLabelTable = pgTable(
  'card_labels',
  {
    labelId: uuid('label_id')
      .references(() => labelTable.id, { onDelete: 'cascade' })
      .notNull(),
    cardId: uuid('card_id')
      .references(() => cardsTable.id)
      .notNull(),
    createdAt: timestamp('created_at', {
      mode: 'string',
      withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp('updated_at', {
      mode: 'string',
      withTimezone: true,
    }).$onUpdate(() => new Date().toDateString()),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.cardId, table.labelId] }),
    uniqueLabel: unique().on(table.cardId, table.labelId),
  })
);

export const cardLabelRelations = relations(cardLabelTable, ({ one }) => ({
  card: one(cardsTable, {
    fields: [cardLabelTable.cardId],
    references: [cardsTable.id],
  }),
  label: one(labelTable, {
    fields: [cardLabelTable.labelId],
    references: [labelTable.id],
  }),
}));

export default cardLabelTable;
