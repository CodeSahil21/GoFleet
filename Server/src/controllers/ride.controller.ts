import { createRide, getFare, confirmRide, startRide, endRide } from "../services/ride.service";
import { Request, Response, NextFunction } from 'express';
import { createRideSchema, getFareSchema, confirmRideRequestSchema, startRideSchema, endRideSchema } from "../utils/schema";
import { AuthenticatedRequest } from '../types/types';
import { getAddressCoordinate, getCaptainsInRadius } from "../services/map.service";
import { sendMessageToSocketId } from "../socket";
import { AuthenticatedCaptainRequest } from '../types/types';
import prisma from '../db'
interface Vehicle {
    id: number;
    color: string;
    plate: string;
    capacity: number;
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO';
}

interface Location {
    id: number;
    ltd: number | null;
    lng: number | null;
}

interface Captain {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
    password: string;
    socketId?: string | null;
    status: 'ACTIVE' | 'INACTIVE';
    vehicle: Vehicle;
    location?: Location | null;
}
export const createRideHandler = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Validate request body
        const validationResult = createRideSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.format() });
        }

        // Extract userId from req.user (set by userMiddleware)
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: User ID not found' });
        }

        const { pickup, destination, vehicleType } = validationResult.data;

        // Create the ride
        const ride = await createRide(userId, pickup, destination, vehicleType);
        ride.otp = ""; // Clear OTP before sending the response
        res.status(201).json(ride);

        // Get pickup coordinates
        const pickupCoordinates = await getAddressCoordinate(pickup);

        // Find captains in the radius
        const captains: Captain[] = await getCaptainsInRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);

    // Fetch the ride with user details
    const rideWithUser = await prisma.ride.findUnique({
        where: { id: ride.id },
        include: {
            user: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                },
            },
        },
    });

     // Check if rideWithUser is null
     if (!rideWithUser) {
        console.error('Ride not found after creation');
        return res.status(404).json({ message: 'Ride not found after creation' });
    }
        // Notify captains about the new ride
        captains.forEach((captain: Captain) => {
            if (captain.socketId) {
                sendMessageToSocketId(captain.socketId, 'new-ride', rideWithUser);
                console.log(`Notified captain ${captain.id} at socket ${captain.socketId}`);
            }
        });
    } catch (error) {
        console.error('Error during creating ride:', error);
        return res.status(500).json({ msg: 'Ride not created' });
    }
};

export const getFareHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const validationResult = getFareSchema.safeParse(req.query);
        if(!validationResult.success){
            return res.status(400).json({errors:validationResult.error.format()});  
        }
        const {pickup,destination} = validationResult.data;
        const getFares = await getFare(pickup,destination);
        return res.status(200).json(getFares);
    }catch(error){
        return res.status(404).json({msg:'Fare not found'});
    }
}
 

export const confirmRideHandler = async (req: AuthenticatedCaptainRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Validate the request body using Zod schema
        const validationResult = confirmRideRequestSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.format() });
        }

        // Ensure captain is defined
        if (!req.captain) {
            return res.status(401).json({ message: "Unauthorized: Captain not found" });
        }

        // Call the service to confirm the ride
        const ride = await confirmRide({
            ...validationResult.data, // Spread the validated data (e.g., rideId)
            captain: req.captain,     // Add the captain object from the request
        });

        // Notify the user via socket
        if (ride.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, 'ride-confirmed', ride); // Pass the ride object as data
        }

        // Return the confirmed ride details
        return res.status(200).json(ride);
    } catch (err: any) {
        console.error('Error confirming ride:', err);
        return res.status(500).json({ message: "Ride did not confirm" });
    }
};

export const startRideHandler = async (req: AuthenticatedCaptainRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        // console.log('Incoming query:', req.query);
             // Parse rideId to a number
             const parsedQuery = {
                rideId: parseInt(req.query.rideId as string, 10),
                otp: req.query.otp as string,
            };
    
            const validationResult = startRideSchema.safeParse(parsedQuery);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.format() });
        }

        const { rideId, otp } = validationResult.data;

        if (!req.captain) {
            return res.status(401).json({ message: "Unauthorized: Captain not found" });
        }

        const ride = await startRide({
            rideId,
            otp,
            captain: req.captain,
        });

        return res.status(200).json(ride);
    } catch (err: any) {
        console.error("Error starting ride:", err);
        if (err.message === "Ride not found") {
            return res.status(404).json({ message: err.message });
        }
        if (err.message === "Ride not accepted") {
            return res.status(400).json({ message: err.message });
        }
        if (err.message === "Invalid OTP") {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
};

export const endRideHandler = async (req: AuthenticatedCaptainRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const validationResult = endRideSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.format() });
        }

        const { rideId } = validationResult.data;

        if (!req.captain) {
            return res.status(401).json({ message: "Unauthorized: Captain not found" });
        }

        const ride = await endRide({
            rideId,
            captain: req.captain,
        });

        return res.status(200).json(ride);
    } catch (err: any) {
        console.error("Error ending ride:", err);
        if (err.message === "Ride not found") {
            return res.status(404).json({ message: err.message });
        }
        if (err.message === "Unauthorized: Captain does not match") {
            return res.status(403).json({ message: err.message });
        }
        if (err.message === "Ride not ongoing") {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "An unexpected error occurred" });
    }
};