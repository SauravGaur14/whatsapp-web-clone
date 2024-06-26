import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import { config } from "dotenv";
import cors from "cors";

import authRuotes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import mongoose from "mongoose";

import helmet from "helmet";
// import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception\n");
  console.log(err.name, err.message, err);
  process.exit(1);
});

// loading environment variables and config constants
config({ path: "./config.env" });

const app = express();

// Set HTTP Security Headers
app.use(helmet());

// to allow CORS requests from Fronted
app.use(cors());

// Limit rate of requests from a IP address
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 100,
  message: "Too many requests from this IP. Please try again later",
});
app.use("/api", limiter);

// to allow parsing of json data from req object
app.use(express.json());

// Data sanitozation against NoSql query injection
app.use(mongoSanitize());

// Data sanitozation against XSS Attack
// app.use(xssClean());

// Routes
app.use("/api/auth", authRuotes);
app.use("/api/message", messageRoutes);

const port = process.env.PORT;
const DB = process.env.DB_URL.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
).replace("<USERNAME>", process.env.DB_USERNAME);

// console.log("tyring to connect to db");
mongoose.connect(DB).then((con) => {
  // console.log("db Connection successfull");
  // console.log(con.connections);
});

const server = createServer(app);

server.listen(port, () => {
  // console.log("listening on port", port);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  // console.log("new user added", socket.id);

  socket.on("login", (user) => {
    // console.log("User logged in:", user.uid);
    onlineUsers.set(user.uid, socket.id);
    // console.log("emiting update onlineusers event to : ",Array.from(onlineUsers.keys()));
    io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
    // console.log("Online users after new login:", onlineUsers);
  });

  socket.on("send message", (msg) => {
    const sendTo = onlineUsers.get(msg.receiver);
    if (sendTo) {
      socket.to(sendTo).emit("message received", msg);
    }
  });

  socket.on("request-voice-call", (callDetails) => {
    const sendTo = onlineUsers.get(callDetails.to);
    if (sendTo) {
      socket.to(sendTo).emit("incoming-voice-call", callDetails);
    }
  });

  socket.on("request-video-call", (callDetails) => {
    const sendTo = onlineUsers.get(callDetails.to);
    if (sendTo) {
      socket.to(sendTo).emit("incoming-video-call", callDetails);
    }
  });

  socket.on("reject-call", (callDetails) => {
    // console.log("call end event : emiting reject call event to :",
    //   onlineUsers.get(callDetails.to));
    socket.to(onlineUsers.get(callDetails.to)).emit("rejected-call");
  });

  socket.on("ice-candidate", (candidateDetails) => {
    const sendTo = onlineUsers.get(candidateDetails.to);
    if (sendTo) {
      socket
        .to(sendTo)
        .emit("ice-candidate", { candidate: candidateDetails.candidate });
    }
  });

  socket.on("sdp-offer", (offerDetails) => {
    const sendTo = onlineUsers.get(offerDetails.to);
    if (sendTo) {
      socket.to(sendTo).emit("sdp-offer", { offer: offerDetails.offer });
    }
  });

  socket.on("sdp-answer", (answerDetails) => {
    const sendTo = onlineUsers.get(answerDetails.to);
    if (sendTo) {
      socket.to(sendTo).emit("sdp-answer", { answer: answerDetails.answer });
    }
  });

  socket.on("logout", (uid) => {
    onlineUsers.delete(uid);

    io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
  });

  socket.on("disconnect", (reason, details) => {
    const user = Array.from(onlineUsers.entries()).find(
      ([, socketId]) => socketId === socket.id
    );
    if (user) {
      onlineUsers.delete(user[0]);

      io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
    }
  });
});

// UTILITY FUNCTION TO MONITOR ALL EVENTS EMITTED BY SOCKET.IO

// const logEmittedEvent = (event, ...args) => {
//   console.log(`Event emitted: ${event}`, ...args);
// };

// const originalEmit = io.emit;
// io.emit = function(event, ...args) {
//   logEmittedEvent(event, ...args);
//   originalEmit.apply(io, [event, ...args]);
// };
