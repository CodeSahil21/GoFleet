import express from 'express';
const mapRouter  = express.Router();
import { userMiddleware } from '../middlewares/auth.middleware';
import { getAutoCompleteSuggestionHandler, getCoordinates, getDistanceTime } from '../controllers/map.controller';

mapRouter.get('/get-coordinates',userMiddleware,getCoordinates);
mapRouter.get('/get-distance-time',userMiddleware,getDistanceTime);
mapRouter.get('/get-suggestions',userMiddleware,getAutoCompleteSuggestionHandler);
export default mapRouter;
