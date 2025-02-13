import prisma from '../db';
import { hashPassword } from '../utils/auth';

interface CreateUserInput {
    firstname: string;
    lastname?: string;
    email: string;
    password: string;
}

export const createUser = async ({ firstname, lastname, email, password }: CreateUserInput) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }

    // Check if user already exists
    const isUserAlready = await prisma.user.findUnique({ where: { email } });
    if (isUserAlready) {
        throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user in the database
    const user = await prisma.user.create({
        data: {
            firstname,
            lastname,
            email,
            password: hashedPassword
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true
        }
    });

    return user;
};