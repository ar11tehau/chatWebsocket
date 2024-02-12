// Import required modules using ES6 syntax
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { createAdapter } from "@socket.io/postgres-adapter";
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "@prisma/client";

// Initialize Express app
const PORT = process.env.PORT;
const app = express();
const server = createServer(app);

// Initialisze Prisma Client
// const connectionString = `${process.env.DATABASE_URL}`;
// const pool = new pg.Pool({ connectionString })
// const adapter = new PrismaPg(pool)
const prisma = new PrismaClient();

// Create a WebSocket server
const io = new Server(server, {
   cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
   },
});

// io.adapter(createAdapter(pool));


const createNewUser = async (username) => {
   try {
      // Create the user in the database using Prisma
      const newUser = await prisma.user.create({
         data: {
            username,
         },
      });
      return newUser
   } catch (error) {
      console.error("Error creating user:", error);
      return false
   }
}

const checkUserName = async (username) => {
   try {
      // Create the user in the database using Prisma
      const userNameDb = await prisma.user.findUnique({
         where: {
            username,
         },
      });
      return userNameDb
   } catch (error) {
      console.error("Error creating user:", error);
      return false
   }
}

// Handle incoming WebSocket connections
io.on("connection", (socket) => {
   console.log("A user connected");

   // Handle messages from clients
   socket.on("newuser", async (username) => {
      console.log(await checkUserName(username))

      if (checkUserName(username)) {
         io.emit("user_created", "already exist");
      }
      else {
         if (createNewUser(username)) {
            io.emit("user_created", "true");
         }
         else {
            io.emit("user_created", "false");
         }
      }
   });

   // Handle messages from clients
   socket.on("newmsg", (msg) => {
      console.log("Message from client:", msg);
   });

   // Handle messages from clients
   socket.on("message", (msg) => {
      console.log("Message from client:", msg);
   });

   // Handle disconnection
   socket.on("disconnect", () => {
      console.log("User disconnected");
   });
});

// Create an HTTP server using Express
server.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});
