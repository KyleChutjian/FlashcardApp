import { Router } from 'express';
import {
    login,
    getUserById,
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from './handlers';

export const router = Router();

router.post('/login', login);
router.get('/:user_id', getUserById);
router.get('/', getUsers);
router.post('/', createUser);
router.patch('/:user_id', updateUser);
router.delete('/:user_id', deleteUser);