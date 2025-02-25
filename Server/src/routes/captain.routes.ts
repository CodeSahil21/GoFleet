import express from 'express';
import { createCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller';
import { captainMiddleware } from '../middlewares/auth.middleware';
const captainRouter = express.Router();

//endpoint to signup:creating captain
captainRouter.post('/signup', createCaptain);
//endpoint to signin:login captain
captainRouter.post('/signin', loginCaptain);
//endpoint to get captain profile
captainRouter.get('/profile', captainMiddleware, getCaptainProfile);
//endpoint to logout captain
captainRouter.get('/logout', captainMiddleware, logoutCaptain);


export default captainRouter;