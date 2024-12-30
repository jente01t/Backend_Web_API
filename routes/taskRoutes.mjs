import express from 'express';
import { 
    createTask, 
    getTasks, 
    getTaskById, 
    updateTask, 
    deleteTask,
    getUserTasks 
} from '../controllers/taskController.mjs';
import { protect } from '../middleware/authMiddleware.mjs';

const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);

// middelware
router.use(protect);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/user/:userId', getUserTasks);

export default router;