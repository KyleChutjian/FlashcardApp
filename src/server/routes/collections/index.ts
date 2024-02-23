import { Router } from 'express';
import {
    getCollectionById,
    getCollectionNameById,
    getCollections,
    getCollectionsByUserId,
    createCollection,
    updateCollection,
    updateCollectionCategory,
    deleteCollection
} from './handlers';

export const router = Router();

router.get('/:collection_id', getCollectionById);
router.get('/name/:collection_id', getCollectionNameById);
router.get('/', getCollections);
router.get('/user/:user_id', getCollectionsByUserId);
router.post('/', createCollection);
router.patch('/:collection_id', updateCollection);
router.patch('/:collection_id/:category', updateCollectionCategory);
router.delete('/:collection_id', deleteCollection);