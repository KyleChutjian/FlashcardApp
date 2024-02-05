import { Request, Response } from "express";
import { db } from '../../db/index';
import { NewCollection, Collection, collections, flashcards } from '../../db/schema';
import { eq } from "drizzle-orm";
import { getFlashcardsByCollectionId } from '../flashcards/handlers'

export async function getCollectionById(req: Request, res: Response): Promise<Response> {
    try {
        const collection_id = req.params.collection_id;

        const user = await db.query.collections.findFirst({
            where: eq(collections.collection_id, collection_id)
        });

        if (!user) {
            return res.status(404).send({message: 'Collection not found'});
        }
        return res.send(user);

    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function getCollections(req: Request, res: Response): Promise<Response> {
    try {
        const allCollections: Collection[] = await db.query.collections.findMany();

        return res.send(allCollections);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function getCollectionsByUserId(req: Request, res: Response): Promise<Response> {
    try {
        const user_id = req.params.user_id;
        const allCollections: Collection[] = await db.query.collections.findMany({
            where: eq(collections.user_id, user_id)
        });

        if (!allCollections || allCollections.length < 1) {
            return res.status(404).send({message: 'Error encountered'});
        }

        return res.send(allCollections);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function createCollection(req: Request, res: Response): Promise<Response> {
    try {
        const { user_id, name } = req.body;
        const results: NewCollection[] = await db.insert(collections).values({user_id, name}).returning();

        if (!results || results.length < 1) {
            return res.status(500).send({message: 'Collection could not be created'});
        }

        return res.send(results);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function updateCollection(req: Request, res: Response): Promise<Response> {
    try {
        const collection_id = req.params.collection_id;
        const { name } = req.body;
        const updatedCollections: NewCollection[] = await db
            .update(collections)
            .set({name: name})
            .where(eq(collections.collection_id, collection_id))
            .returning();

        if (!updatedCollections || updatedCollections.length < 1) {
            return res.status(404).send({message: 'Collection could not be updated'});
        }

        return res.send(updatedCollections[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function deleteCollection(req: Request, res: Response): Promise<Response> {
    try {
        const collection_id = req.params.collection_id;

        // First delete associated flashcards by Collection_id
        const deletedFlashcards = await db
            .delete(flashcards)
            .where(eq(flashcards.collection_id, collection_id))
            .returning({flashcard_id: flashcards.flashcard_id});

        // After collection is empty, delete the collection
        const deletedCollections = await db
            .delete(collections)
            .where(eq(collections.collection_id, collection_id))
            .returning({collection_id: collections.collection_id});

        if (!deletedCollections || deletedCollections.length < 1) {
            return res.status(404).send({message: 'Collection could not be deleted'});
        }

        return res.send(deletedCollections[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}