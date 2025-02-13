import { z } from 'zod';


 export const userSignupSchema = z.object({
  firstname: z.string().min(1, "First Name is required").max(255).nonempty("firstname is required"),
  lastname: z.string().max(255).optional(),
  email: z.string().email("Invalid email address").nonempty("email is required"),
  password: z.string().min(6, "password must be at least 6 characters long").nonempty("Password is required"),
});

export const userSigninSchema = z.object({
  email:z.string().email("Invalid email address "),
  password:z.string().min(6, "password must be at least 6 characters long"),
});


export const captainSignupSchema = z.object({
    firstname: z.string().min(3, 'Firstname must be at least 3 characters long'),
    lastname: z.string().min(3, 'Lastname must be at least 3 characters long').optional(),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    vehicle: z.object({
        color: z.string().min(3, 'Color must be at least 3 characters long'),
        plate: z.string().min(3, 'Plate must be at least 3 characters long'),
        capacity: z.number().min(1, 'Capacity must be at least 1'),
        vehicleType: z.enum(['CAR', 'MOTORCYCLE', 'AUTO']),
    }),
    location: z.object({
        ltd: z.number().optional(),
        lng: z.number().optional(),
    }).optional(),
});

export const captainSigninSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});