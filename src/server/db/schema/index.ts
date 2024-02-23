import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { boolean, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

// user_id, email, name, password
export const users = pgTable('users', {
    user_id: uuid('user_id').defaultRandom().primaryKey(),
    email: varchar('email', {length: 256}).notNull(),
    name: varchar('name', {length: 256}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
})

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// collection_id, user_id, collection_name, flashcards
export const collections = pgTable('collections', {
    collection_id: uuid('collection_id').defaultRandom().primaryKey(),
    user_id: uuid('user_id').references(() => users.user_id).notNull(),
    name: varchar('name', {length: 256}).notNull(),
    numFlashcards: integer('numFlashcards').default(0).notNull(),
    category: varchar('category', {length: 50}).default("backlog").notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Collection = InferSelectModel<typeof collections>;
export type NewCollection = InferInsertModel<typeof collections>;

// flashcard_id, english, romaji, kana
export const flashcards = pgTable('flashcards', {
    flashcard_id: uuid('flashcard_id').defaultRandom().primaryKey(),
    collection_id: uuid('collection_id').references(() => collections.collection_id),
    english: varchar('english', {length: 256}).notNull(),
    romaji: varchar('romaji', {length: 256}).notNull(),
    kana: varchar('kana', {length: 256}).notNull(),
    dictionary: boolean('dictionary').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Flashcard = InferSelectModel<typeof flashcards>;
export type NewFlashcard = InferInsertModel<typeof flashcards>;