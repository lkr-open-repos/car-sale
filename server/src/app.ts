import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";

import { httpErrorLogger, httpEventLogger } from "./utils/index";
import { socketHandler } from "./socket/socketHandler";
import carsRoutes from "./routes/car-routes";
import userRoutes from "./routes/user-routes";
import favoriteRoutes from "./routes/favorite-routes";

import { errorHandler, notFound } from "./middleware";
import messageRoutes from "./routes/message-routes";
import conversationRoutes from "./routes/conversation-routes";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
});

app.use(Helmet());

app.use(cors(corsOptions));

app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        httpEventLogger.info(message.trim());
      },
    },
  })
);

dotenv.config();

// Routes
app.use("/api/v1/cars", carsRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/conversations", conversationRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(`${process.env.MONGODB_CONNECTION_STRING!}`)
  .then(() => {
    io.on("connection", (socket: Socket) => {
      socketHandler(io, socket);
    });

    httpServer.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    httpErrorLogger.error({
      message: err.message,
    });
  });
