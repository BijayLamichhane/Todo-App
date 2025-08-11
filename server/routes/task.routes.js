import express from 'express';
import { addTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const taskRoutes = express.Router();

taskRoutes.post('/add', protect, addTask);
taskRoutes.post('/delete', protect, deleteTask);
taskRoutes.get('/get', protect, getTasks);
taskRoutes.post('/update', protect, updateTask);



export default taskRoutes;