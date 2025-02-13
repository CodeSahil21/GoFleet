import { Request } from 'express';

export interface AuthenticatedUser {
    id: number;
    firstname: string;
    lastname: string | null;
    email: string;
    socketId: string | null;
}

export interface AuthenticatedRequest extends Request {
    user?: AuthenticatedUser;
}
