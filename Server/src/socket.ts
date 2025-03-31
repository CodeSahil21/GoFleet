import { Server, Socket } from "socket.io";
import http from "http";
import prisma from "./db"; // Assuming you're using Prisma for database operations
interface User {
    id: number;
    firstname: string;
    lastname?: string | null;
    email: string;
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
    user?: User; // Include user details as per the Prisma query
}
let io: Server | null = null;

export const initializeSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust this to your frontend's origin
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket: Socket) => {
        // console.log(`Socket connected: ${socket.id}`);

        // Handle 'join' event
        socket.on("join", async (data: { userId: number; userType: "user" | "captain" }) => {
            const { userId, userType } = data;

            try {
                if (userType === "user") {
                    await prisma.user.update({
                        where: { id: userId },
                        data: { socketId: socket.id },
                    });
                } else if (userType === "captain") {
                    await prisma.captain.update({
                        where: { id: userId },
                        data: { socketId: socket.id },
                    });
                }
                // console.log(`User ${userId} of type ${userType} joined with socket ID ${socket.id}`);
            } catch (error) {
                console.error("Error updating socket ID:", error);
            }
        });
        // Handle 'update-location-captain' event
        socket.on("update-location-captain", async (data: { userId: number; location: { ltd: number; lng: number } }) => {
            const { userId, location } = data;
        
            if (!location || typeof location.ltd !== "number" || typeof location.lng !== "number") {
                return socket.emit("error", { message: "Invalid location data" });
            }
        
            try {
                await prisma.captain.update({
                    where: { id: userId },
                    data: {
                        location: {
                            upsert: {
                                create: { ltd: location.ltd, lng: location.lng },
                                update: { ltd: location.ltd, lng: location.lng },
                            },
                        },
                    },
                });
                // console.log(`Updated location for captain ${userId}:`, location);
            } catch (error) {
                console.error("Error updating location:", error);
            }
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            // console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};

// Function to send a message to a specific socket ID
export const sendMessageToSocketId = (socketId: string, event: string, data:any) => {
    if (io) {
        io.to(socketId).emit(event, data);
        // console.log(`Message sent to socket ID ${socketId}:`, { event, data });
    } else {
        console.error("Socket.io is not initialized.");
    }
};