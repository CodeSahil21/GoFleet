import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes';
import captainRouter from './routes/captain.routes';
import mapRouter from './routes/maps.routes';
import rideRouter from './routes/ride.routes';
const app = express();
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/captains',captainRouter)
app.use('/maps',mapRouter);
app.use('/rides',rideRouter);
export default app;