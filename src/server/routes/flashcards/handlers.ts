import { Request, Response } from "express";
import { db } from '../../db/index';
import { NewFlashcard, Flashcard, flashcards, Collection, collections } from '../../db/schema';
import { eq, inArray } from "drizzle-orm";

export async function getFlashcardById(req: Request, res: Response): Promise<Response> {
    try {
        const flashcard_id = req.params.flashcard_id;

        const flashcard = await db.query.flashcards.findFirst({
            where: eq(flashcards.flashcard_id, flashcard_id)
        });

        if (!flashcard) {
            return res.status(404).send({message: 'Flashcard not found'});
        }
        return res.send(flashcard);

    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function getFlashcards(req: Request, res: Response): Promise<Response> {
    try {
        const allFlashcards: Flashcard[] = await db.query.flashcards.findMany();

        return res.send(allFlashcards);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function getFlashcardsByCollectionId(req: Request, res: Response): Promise<Response> {
    try {
        const collection_id = req.params.collection_id;

        const allFlashcards: Flashcard[] = await db.query.flashcards.findMany({
            where: eq(flashcards.collection_id, collection_id)
        });

        if (!allFlashcards || allFlashcards.length < 0) {
            return res.status(404).send({message: 'Error encountered'});
        }

        return res.send(allFlashcards);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function getFlashcardsByUserId(req: Request, res: Response): Promise<Response> {
    try {
        const user_id = req.params.user_id;

        // Get an array of collectionId objects
        const allCollectionIds = await db.query.collections.findMany({
            columns: {
                collection_id: true
            },
            where: eq(collections.user_id, user_id)
        });

        // Convert [{"collection_id": "id"}] to ["id"]
        const collectionIdsArray: string[] = allCollectionIds.map(item => item.collection_id);

        // Get all flashcards in collectionIdsArray
        const allFlashcards = await db.query.flashcards.findMany({
            where: inArray(flashcards.collection_id, collectionIdsArray)
        });

        if (!allFlashcards || allFlashcards.length < 0) {
            return res.status(404).send({message: 'Error encountered'});
        }

        return res.send(allFlashcards);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function createFlashcard(req: Request, res: Response): Promise<Response> {
    try {
        const { collection_id, english, romaji, kana } = req.body;
        const results: NewFlashcard[] = await db.insert(flashcards).values({collection_id, english, romaji, kana}).returning();

        if (!results || results.length < 1) {
            return res.status(500).send({message: 'Flashcard could not be created'});
        }

        return res.send(results[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function updateFlashcard(req: Request, res: Response): Promise<Response> {
    try {
        const flashcard_id = req.params.flashcard_id;
        const { english, romaji, kana } = req.body;
        const updatedFlashcards: NewFlashcard[] = await db
            .update(flashcards)
            .set({english, romaji, kana})
            .where(eq(flashcards.flashcard_id, flashcard_id))
            .returning();

        if (!updatedFlashcards || updatedFlashcards.length < 1) {
            return res.status(404).send({message: 'Flashcard could not be updated'});
        }

        return res.send(updatedFlashcards[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function deleteFlashcard(req: Request, res: Response): Promise<Response> {
    try {
        const flashcard_id = req.params.flashcard_id;
        const deletedFlashcards = await db
            .delete(flashcards)
            .where(eq(flashcards.flashcard_id, flashcard_id))
            .returning({flashcard_id: flashcards.flashcard_id});

        

        if (!deletedFlashcards || deletedFlashcards.length < 1) {
            return res.status(404).send({message: 'Flashcard could not be deleted'});
        }

        return res.send(deletedFlashcards[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function deleteFlashcardsByCollectionId(req: Request, res: Response): Promise<Response> {
    try {
        const collection_id = req.params.collection_id;
        const deletedFlashcards = await db
            .delete(flashcards)
            .where(eq(flashcards.collection_id, collection_id))
            .returning({flashcard_id: flashcards.flashcard_id});

        if (!deletedFlashcards || deletedFlashcards.length < 1) {
            return res.status(404).send({message: 'Flashcard could not be deleted'});
        }

        return res.send(deletedFlashcards);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}