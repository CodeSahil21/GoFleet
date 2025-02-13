import express from 'express';
const userRouter = express.Router();
import {createUser, loginUser } from '../controllers/user.controller';

//route to signup:creating user
userRouter.post('/signup',createUser);
userRouter.post('/signin',loginUser);

export default userRouter;