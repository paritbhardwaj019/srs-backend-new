import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import compression from "compression";
import http from "http";
import { Server } from "socket.io";

import userRouter from "./routes/user.routes.js";
import packagesRouter from "./routes/packages.routes.js";
import workoutPlanRouter from "./routes/workoutPlan.routes.js";
import trainerPackageRouter from "./routes/trainerPackage.route.js";
import trainerRequestRouter from "./routes/trainerRequest.routes.js";
import exerciseRouter from "./routes/exercise.route.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/error.controller.js";

// Create main app
const app = express();
const userSocketMap = new Map();

// Configure CORS
app.use(cors({ origin: /^/, credentials: true }));

// Parse json in request into req.body
app.use(express.json());

// Serve static files
app.use(express.static("./public"));

// Limit requests from same API
app.use(
  "/api",
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!",
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Compress responses
app.use(compression());

// Middleware to parse JSON data
app.use(bodyParser.json());

// Middleware for Video and Image File Upload

// Define routes
app
  .use("/api/users", userRouter)
  .use("/api/admin", packagesRouter)
  .use("/api/trainer/workoutPlans", workoutPlanRouter)
  .use("/api/trainer-packages", trainerPackageRouter)
  .use("/api/trainer-requests", trainerRequestRouter)
  .use("/api/exercise", exerciseRouter)
  .use("/api/chat", chatRouter)
  .use("/api/message", messageRouter);

// Create 404 error
app.all("*", (req, res, next) =>
  next(
    new AppError(
      `The requested resource ${req.originalUrl} was not found at this server`,
      404
    )
  )
);

app.use(globalErrorHandler);

// Set up Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Set to your client's domain
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add this line
  console.log("A user connected to the WebSocket server.");

  socket.on("registerUser", (userId) => {
    userSocketMap.set(userId, socket.id);
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Remove the user from the userSocketMap when they disconnect
    for (const [userId, savedSocketId] of userSocketMap.entries()) {
      if (savedSocketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  });

  socket.on("error", (error) => {
    console.log("Error on socket:", socket.id, "Error:", error);
  });
});

// Store the io object in the Express app
app.set("io", io);

// Export the server for use in server.js
export default server;
