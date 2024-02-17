ALTER TABLE "collections" ADD COLUMN "numFlashcards" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcards" ADD COLUMN "dictionary" boolean DEFAULT false NOT NULL;