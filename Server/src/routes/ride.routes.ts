import express from 'express';
import { userMiddleware,captainMiddleware } from '../middlewares/auth.middleware';
import { createRideHandler, getFareHandler,confirmRideHandler, endRideHandler ,startRideHandler } from '../controllers/ride.controller';
const rideRouter  = express.Router();

rideRouter.post('/create',userMiddleware,createRideHandler);
rideRouter.get('/get-fare',userMiddleware,getFareHandler);
rideRouter.post('/confirm',captainMiddleware,confirmRideHandler);
rideRouter.get('/start-ride',captainMiddleware,startRideHandler);
rideRouter.post('/end-ride',captainMiddleware,endRideHandler);
export default rideRouter;