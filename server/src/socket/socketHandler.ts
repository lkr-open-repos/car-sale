import { Socket, Server } from "socket.io";
import { wsLogger } from "../utils/loggers";

/**
 * Socket handler for handling socket events.
 *
 * @param {Server} io - the socket.io server
 * @param {Socket} socket - the socket object
 * @return {void}
 * */
export const socketHandler = (io: Server, socket: Socket): void => {
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
