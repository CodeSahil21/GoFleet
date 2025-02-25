import prisma from '../db';
import { hashPassword } from '../utils/auth';
export interface CreateCaptainInput {
    firstname: string;
    lastname?: string;
    email: string;
    password: string;
    color: string;
    plate: string;
    capacity: number;
    vehicleType: 'CAR' | 'MOTORCYCLE' | 'AUTO';
}
export const createCaptain = async (data : CreateCaptainInput)=>{
    const {firstname,lastname,email,password,color,plate,capacity,vehicleType} = data;
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    //check if user already exists
    const isCaptainAlready = await prisma.captain.findUnique({ where: { email } });
    if (isCaptainAlready) {
        throw new Error('Captain already exists');
    }
    //hashing the password
    const hashedPassword = await hashPassword(password);
    // Create the vehicle
    const vehicle = await prisma.vehicle.create({
        data: {
            color,
            plate,
            capacity,
            vehicleType,
        },
    });

    // Create the captain
    const captain = await prisma.captain.create({
        data: {
            firstname,
            lastname,
            email,
            password: hashedPassword,
            vehicleId: vehicle.id
        },
        include: {
            vehicle: true, 
          },
    });

    return captain;
}