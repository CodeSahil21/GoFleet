import express from 'express';
const userRouter = express.Router();
import {createUser, getUserProfile, loginUser,logoutUser } from '../controllers/user.controller';
import { userMiddleware } from '../middlewares/auth.middleware';


//route to signup:creating user
userRouter.post('/signup',createUser);
//route to signin:login user
userRouter.post('/signin',loginUser);
//route to get user profile
userRouter.get('/profile', userMiddleware  , getUserProfile);
//route to  logout user
userRouter.get('/logout',userMiddleware,logoutUser);
export default userRouter;