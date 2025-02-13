import { Request, Response, NextFunction } from 'express';
import { createUser as createUserService } from '../services/user.service';
import { generateToken, comparePassword } from '../utils/auth';
import { userSigninSchema, userSignupSchema } from '../utils/schema';
import prisma from '../db'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Validate request data using Zod schema
        const validationResult = userSignupSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.format() });
        }

        const { firstname, lastname, email, password } = validationResult.data;

        // Create the user using the service
        const user = await createUserService({ firstname, lastname, email, password });

        // Generate a token
        const token = generateToken(user.id);

        // Send response
        return res.status(201).json({ token, user });
    } catch (error) {
        // Log the error for debugging
        console.error('Error during signup:', error);

        // Send error response
        return res.status(500).json({ msg: "Error during signup" });

        // Optionally, pass the error to the global error handler if it exists
        // next(error);
    }
};


export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Validate request data using Zod schema
        const validationResult = userSigninSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.format() });
        }

        const { email, password } = validationResult.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = generateToken(user.id);
        return res.status(200).json({ token, user });
    } catch (error) {
        
        // Log the error for debugging
        console.error('Error during signup:', error);
        return res.status(500).json({ msg: "Error during login" });
    }
};