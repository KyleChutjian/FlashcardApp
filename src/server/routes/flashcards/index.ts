import { Router } from 'express';
import {
    getFlashcardById,
    getFlashcards,
    getFlashcardsByUserId,
    getFlashcardsByCollectionId,
    getFlashcardsByCollectionIds,
    createFlashcard,
    updateFlashcard,
    deleteFlashcard,
    deleteFlashcardsByCollectionId
} from './handlers';

export const router = Router();

router.get('/:flashcard_id', getFlashcardById);
router.get('/', getFlashcards);
router.get('/user/:user_id', getFlashcardsByUserId);
router.get('/collection/:collection_id', getFlashcardsByCollectionId);
router.post('/collections', getFlashcardsByCollectionIds);
router.post('/', createFlashcard);
router.patch('/', updateFlashcard);
router.delete('/:flashcard_id', deleteFlashcard);
router.delete('/collection/:collection_id', deleteFlashcardsByCollectionId);