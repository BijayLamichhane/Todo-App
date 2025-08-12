import express from 'express';
import { getUserData, loginUser, registerUser, validateToken } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.get('/data', protect, getUserData);
userRoutes.get('/validate', protect, validateToken);




export default userRoutes;
