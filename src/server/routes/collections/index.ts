import { Router } from 'express';
import {
    getCollectionById,
    getCollections,
    getCollectionsByUserId,
    createCollection,
    updateCollection,
    deleteCollection
} from './handlers';

export const router = Router();

router.get('/:collection_id', getCollectionById);
router.get('/', getCollections);
router.get('/user/:user_id', getCollectionsByUserId);
router.post('/', createCollection);
router.patch('/:collection_id', updateCollection);
router.delete('/:collection_id', deleteCollection);