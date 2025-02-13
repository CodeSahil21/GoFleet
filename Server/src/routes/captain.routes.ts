import express from 'express';
import { createCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from '../controllers/captain.controller';
import { captainMiddleware } from '../middlewares/auth.middleware';
const captainRouter = express.Router();

//endpoint to signup:creating captain
captainRouter.post('/signup', createCaptain);
//endpoint to signin:login captain
captainRouter.post('/login', loginCaptain);
//endpoint to get captain profile
captainRouter.get('/profile', captainMiddleware, getCaptainProfile);
//endpoint to logout captain
captainRouter.post('/logout', captainMiddleware, logoutCaptain);


export default captainRouter;