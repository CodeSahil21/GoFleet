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