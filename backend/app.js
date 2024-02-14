// Import required modules using ES6 syntax
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "@prisma/client";

// Initialize Express app
const PORT = process.env.PORT;
const app = express();
const server = createServer(app);

// Initialisze Prisma Client
const prisma = new PrismaClient();

// Create a WebSocket server
const io = new Server(server, {
   cors: {
      origin: "https://chat.domelier.fr/",
      methods: ["GET", "POST"],
      credentials: true,
   },
});

const createNewUser = async (username) => {
   try {
      // Create the user in the database using Prisma
      const newUser = await prisma.user.create({
         data: {
            username,
         },
      });
      return newUser;
   } catch (error) {
      console.error("Error creating user:", error);
      return false;
   }
};

const isUser = async (username) => {
   try {
      // Create the user in the database using Prisma
      const userNameDb = await prisma.user.findUnique({
         where: {
            username,
         },
      });

      if (userNameDb) {
         return userNameDb;
      } else {
         return false;
      }
   } catch (error) {
      console.error("Error creating user:", error);
      return false;
   }
};

const getUsers = async () => {
   try {
      // Create the user in the database using Prisma
      const contacts = await prisma.user.findMany({
         select: {
            username: true,
         },
      });
      return contacts;
   } catch (error) {
      console.error("Error creating user:", error);
      return false;
   }
};

const createMsg = async (content, senderId, receiverId) => {
   try {
      const newMessage = await prisma.message.create({
         data: {
            content,
            sender: { connect: { id: senderId } },
            receiver: { connect: { id: receiverId } },
         },
      });
      return newMessage;
   } catch (error) {
      console.error("Error creating message:", error);
      return false;
   }
};

const getMessages = async (senderId, receiverId) => {
   try {
      const messages = await prisma.message.findMany({
         where: {
            OR: [
               { senderId: senderId },
               { receiverId: receiverId },
               { senderId: receiverId },
               { receiverId: senderId },
            ],
         },
         orderBy: {
            timestamp: "asc", // Order messages by timestamp in ascending order
         },
      });
      return messages;
   } catch (error) {
      console.error("Error retrieving messages:", error);
      return false;
   }
};
const users = (await getUsers()).map((userDb) => userDb.username);

const connectedUsers = new Map();

// Handle incoming WebSocket connections
io.on("connection", (socket) => {
   console.log("User connected");
   // Handle messages from clients
   socket.on("userConnection", async (user) => {
      try {
         console.log(user, "is connected");
         connectedUsers.set(socket.id, user);
         if (!(await isUser(user))) {
            createNewUser(user);
         }
         io.emit("connected", [[...connectedUsers.values()], users]);
      } catch (error) {
         connectedUsers.delete(socket.id);
         socket.emit("connected", error);
      }
   });

   socket.on("userdb", async ([sender, receiver]) => {
      const senderDb = await isUser(sender);
      const receiverDb = await isUser(receiver);
      socket.emit("userdb", [senderDb.id, receiverDb.id]);
   });

   socket.on("newmessage", async ([content, senderId, receiverId]) => {
      const messages = await createMsg(content, senderId, receiverId);
   });

   socket.on("getmessages", async ([senderId, receiverId]) => {
      if (senderId && receiverId) {
         const messages = await getMessages(senderId, receiverId);
         socket.emit("getmessages", [...messages]);
      }
   });

   // Handle logout
   socket.on("logout", () => {
      const username = connectedUsers.delete(socket.id);
      connectedUsers.delete(socket.id);
      io.emit("connected", [[...connectedUsers.values()], users]);
      console.log(username, "is disconnected");
      console.log("connectedUsers :", connectedUsers.values());
      console.log("User disconnected");
   });

   // Handle disconnection
   socket.on("disconnect", () => {
      // Get the username associated with the socket ID
      const username = connectedUsers.delete(socket.id);
      connectedUsers.delete(socket.id);
      io.emit("connected", [[...connectedUsers.values()], users]);
      console.log(username, "is disconnected");
      console.log("connectedUsers :", connectedUsers.values());
      console.log("User disconnected");
   });
});

// Create an HTTP server using Express
server.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});
