import { Request, Response } from "express";
import { db } from '../../db/index';
import { NewUser, User, collections, flashcards, users } from '../../db/schema';
import { eq, inArray } from "drizzle-orm";
import { getToken } from "./verify";


export async function login(req: Request, res: Response): Promise<Response> {
    try {
        // const token = getToken(user);
        const email = req.body.email;
        // Eventually add authentication 
        // For now: if email exists then allow them to login
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        });
        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }

        return res.status(200).send(user);

    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function getUserById(req: Request, res: Response): Promise<Response> {
    try {
        const user_id = req.params.user_id;

        const user = await db.query.users.findFirst({
            where: eq(users.user_id, user_id)
        });

        if (!user) {
            return res.status(404).send({message: 'User not found'});
        }
        return res.send(user);

    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function getUsers(req: Request, res: Response): Promise<Response> {
    try {
        const allUsers: User[] = await db.query.users.findMany();

        return res.send(allUsers);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function createUser(req: Request, res: Response): Promise<Response> {
    try {
        const { email, name } = req.body;
        const results: NewUser[] = await db.insert(users).values({email,name}).returning();

        if (!results || results.length < 1) {
            return res.status(500).send({message: 'User could not be created'});
        }

        return res.send(results);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    try {
        const user_id = req.params.user_id;
        const { email, name } = req.body;
        const updatedUsers: NewUser[] = await db
            .update(users)
            .set({email: email, name: name})
            .where(eq(users.user_id, user_id))
            .returning();

        if (!updatedUsers || updatedUsers.length < 1) {
            return res.status(404).send({message: 'User could not be updated'});
        }

        return res.send(updatedUsers[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}

export async function deleteUser(req: Request, res: Response): Promise<Response> {
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

        // Delete associated flashcards if array has values

        if (collectionIdsArray.length > 0) {
            const deletedFlashcards = await db
                .delete(flashcards)
                .where(
                    inArray(flashcards.collection_id, collectionIdsArray)
                )
        }


        // Delete associated collections
        const deletedCollections = await db
            .delete(collections)
            .where(eq(collections.user_id, user_id))


        // Third: delete user
        const deletedUsers = await db
            .delete(users)
            .where(eq(users.user_id, user_id))
            .returning({user_id: users.user_id});


        if (!deletedUsers || deletedUsers.length < 1) {
            return res.status(404).send({message: 'User could not be deleted'});
        }

        return res.send(deletedUsers[0]);
    } catch (e) {
        console.log(e);
        return res.status(500).send({message: 'Error encountered'});
    }
}