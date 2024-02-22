import { Socket, Server } from "socket.io";
import { wsLogger } from "../utils/loggers";

export const socketHandler = (io: Server, socket: Socket) => {
  socket.on("error", (error: Error) => {
    wsLogger.error({
      message: error.message,
    });
  });

  try {
    socket.on("joinConversation", (conversationId): void => {
      socket.join(conversationId);
    });
  } catch (err: any) {
    wsLogger.error({
      message: err.message,
    });
  }

  try {
    socket.on("sendMessage", ({ room, message }): any => {
      io.to(room).emit("recieveMessage");
    });
  } catch (err: any) {
    wsLogger.error({
      message: err.message,
    });
  }
};
