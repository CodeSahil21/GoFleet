import { Request, Response, NextFunction } from 'express';
import { createCaptain as createCaptainService } from '../services/captain.service';
import { generateToken, comparePassword } from '../utils/auth';
import { captainSigninSchema,captainSignupSchema } from '../utils/schema';
import prisma from '../db';
import { AuthenticatedCaptainRequest } from '../types/types';

export const createCaptain = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Validate request data using Zod schema
        const validationResult = captainSignupSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.format() });
        }

        const { firstname, lastname, email, password, vehicle: { color, plate, capacity, vehicleType } } = validationResult.data;

        // Create the captain using the service
        const captain = await createCaptainService({ firstname, lastname, email, password, color, plate, capacity, vehicleType });

        // Generate a token
        const token = generateToken(captain.id);

        // Send response
        return res.status(201).json({ token, captain });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during signup:', error);

        // Send error response
        return res.status(500).json({ msg: "Error during signup" });

        // Optionally, pass the error to the global error handler if it exists
        // next(error);
    }
};


export const loginCaptain = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Validate request data using Zod schema
        const validationResult = captainSigninSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.format() });
        }

        const { email, password } = validationResult.data;
        const captain = await prisma.captain.findUnique({ where: { email } });
        if (!captain) {
            return res.status(400).json({ msg: "Captain not found" });
        }

        const isMatch = await comparePassword(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = generateToken(captain.id);
        res.cookie('token', token);
        return res.status(200).json({ token, captain });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during login:', error);
        return res.status(500).json({ msg: "Error during login" });
    }
};
// Get Captain Profile
export const getCaptainProfile = async (req: AuthenticatedCaptainRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const captain = req.captain;

        if (!captain) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        return res.status(200).json({ captain });
    } catch (error) {
        console.error('Error fetching captain profile:', error);
        return res.status(500).json({ msg: "Error fetching captain profile" });
    }
};
// Logout Captain
export const logoutCaptain = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ msg: "Logout successful" });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ msg: "Error during logout" });
    }
};

