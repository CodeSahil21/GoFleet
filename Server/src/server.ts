import http from "http";
import app from "./app";
import { initializeSocket } from "./socket";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Socket.io
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
