import prisma from '../db';
import { getDistanceTimeService } from './map.service';
import { sendMessageToSocketId } from '../socket'; 
import crypto from 'crypto';
interface location{
    lat:number;
    lng:number;
}

interface Fare {
    auto: number;
    car: number;
    motorcycle: number;
}
interface Vehicle {
    id: number;
    color: string;
    plate: string;
    capacity: number;
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO';
}
//for confirmin ride
interface User {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
    socketId?: string | null; // Add socketId property
}

interface Captain {
    id: number;
    firstname: string;
    lastname: string | null;
    email: string;
    socketId: string | null;
    status: 'ACTIVE' | 'INACTIVE';
    vehicle: Vehicle;
}

interface Ride {
    id: number;
    userId: number;
    captainId?: number | null;
    pickup: string;
    destination: string;
    fare: number;
    status: 'PENDING' | 'ACCEPTED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
    duration?: number | null;
    distance?: number | null;
    paymentID?: string | null;
    orderId?: string | null;
    signature?: string | null;
    otp: string;
    user?: User;
    captain?: Captain | null; // Allow null for captain
    createdAt?: Date;
    updatedAt?: Date;
}

export const getFare = async(pickup:string,destination:string):Promise<Fare>=>{
if(!pickup || !destination){
    throw new Error('Pickup and destination are required');
    }
    const distanceTime = await getDistanceTimeService(pickup,destination);

    const baseFare= {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate= {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };return {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };
}

export const getOtp = (num: number): string =>{
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}
 
export const createRide = async (userId: number, pickup: string, destination: string,vehicleType:string ): Promise<Ride> => {
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
     const fare = await getFare(pickup,destination);

     const ride = await prisma.ride.create({
        data:{
            user: {
                connect: { id: userId }, // Use `connect` to link the user by ID
            },
            pickup,
            destination,
            otp: getOtp(6),
            fare: fare[vehicleType.toLowerCase() as keyof typeof fare], // Select the fare for the specific vehicle type
        },
     });
     return ride;
}

export const confirmRide = async ({ rideId, captain }: { rideId: number; captain: Captain }): Promise<Ride> => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    await prisma.ride.update({
        where: { id: rideId },
        data: {
            status: 'ACCEPTED',
            captain: {
                connect: { id: captain.id },
            },
        },
    });

    const ride = await prisma.ride.findUnique({
        where: { id: rideId },
        include: {
            user: true,
            captain: {
                include: {
                    vehicle: true, // Include the captain's vehicle details
                },
            },
        },
    });

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride as Ride;
};

export const startRide = async ({rideId,otp,captain}:{ rideId: number; otp: string; captain: Captain }): Promise<Ride> => {
    if(!rideId || !otp){
        throw new Error('Ride ID and OTP are required');
    }
    const ride  = await  prisma.ride.findUnique({
        where: { id: rideId },
        include: {
            user: true,
            captain: true,
        },
    });
    if (!ride) {
        throw new Error('Ride not found');
    }
    if (ride.status !== 'ACCEPTED') {
        throw new Error('Ride not accepted');
    }
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

     // Calculate distance and duration using the getDistanceTimeService
     const distanceTime = await getDistanceTimeService(ride.pickup, ride.destination);

    // Update the ride status to 'ONGOING'
    const updatedRide = await prisma.ride.update({
        where: { id: rideId },
        data: {
            status: 'ONGOING',
            distance: distanceTime.distance.value / 1000, // Convert meters to kilometers
            duration: Math.round(distanceTime.duration.value / 60), // Convert seconds to minutes
        },
        include: {
            user: true,
            captain: {
                include: {
                    vehicle: true,
                },
            },
        },
    });

     // Notify the user via socket
     if (updatedRide.user?.socketId) {
        sendMessageToSocketId(updatedRide.user.socketId, 'ride-started', updatedRide);
    }

    return updatedRide as Ride;
}

export const endRide = async ({ rideId, captain }: { rideId: number; captain: Captain }): Promise<Ride> => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    // Fetch the ride with user and captain details
    const ride = await prisma.ride.findUnique({
        where: { id: rideId },
        include: {
            user: true,
            captain: true,
        },
    });

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.captainId !== captain.id) {
        throw new Error('Unauthorized: Captain does not match');
    }

    if (ride.status !== 'ONGOING') {
        throw new Error('Ride not ongoing');
    }

    // Update the ride status to 'COMPLETED'
    const updatedRide = await prisma.ride.update({
        where: { id: rideId },
        data: {
            status: 'COMPLETED',
        },
        include: {
            user: true,
            captain: {
                include: {
                    vehicle: true,
                },
            },
        },
    });

    // Notify the user via socket
    if (updatedRide.user?.socketId) {
        sendMessageToSocketId(updatedRide.user.socketId, 'ride-ended', updatedRide);
    }

    return updatedRide as Ride;
};