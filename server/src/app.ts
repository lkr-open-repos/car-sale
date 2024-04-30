import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import fs from "fs"
import https from "https"

import { httpErrorLogger, httpEventLogger } from "./utils/index";
import { socketHandler } from "./socket/socketHandler";
import carsRoutes from "./routes/car-routes";
import userRoutes from "./routes/user-routes";
import favoriteRoutes from "./routes/favorite-routes";
import messageRoutes from "./routes/message-routes";
import conversationRoutes from "./routes/conversation-routes";
import loggingRoutes from "./routes/logging-routes";
import { errorHandler, notFound } from "./middleware";
import { keys } from "./utils/keys";

// Configure cors options
const corsOptions = {
  origin: ["http://localhost:5173", "http://client:4000", "http://localhost:4000"],
  credentials: true,
  optionSuccessStatus: 200,
};

// Configure SSL
try {

  const sslCertPath = '/etc/letsencrypt/live/ilker.tinkerbytes.com/fullchain.pem';
  const sslKeyPath = '/etc/letsencrypt/live/ilker.tinkerbytes.com/privkey.pem'; 
  
  const options = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath),
  };
} catch {
  console.log("later");
  
}


// Initialize express
const app = express();
const httpServer = https.createServer(options, app);
const io = new Server(httpServer, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
});

// Security headers with helmet
app.use(Helmet());

// Enable cors
app.use(cors(corsOptions));

// Enable json
app.use(express.json());

// Enable static files
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use('/.well-known', express.static('.well-known'));

// Enable morgan for HTTP requests logging
app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        httpEventLogger.info(message.trim());
      },
    },
  })
);

// Enable dotenv for environment variables
dotenv.config();

// Routes
app.use("/api/v1/cars", carsRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/logging", loggingRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(`${keys.MONGODB_CONNECTION_STRING!}`)
  .then(() => {
    // Set up socket.io
    io.on("connection", (socket: Socket) => {
      socketHandler(io, socket);
    });

    httpServer.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    // Log errors
    httpErrorLogger.error({
      message: err.message,
    });
    console.log(err, keys);
  });
