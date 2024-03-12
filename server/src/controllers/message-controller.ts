import { Message } from "../models";
import { Request, Response, NextFunction } from "../types";
import { MessageDocument, ConversationDocument } from "../types";
import { throwErrorHelper } from "../utils";

/**
 * Creates a new message in the database
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the message is created
 * */
export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let newMessage: MessageDocument;

  newMessage = await Message.create(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

/**
 *  Retrieves all messages in the database according to the conversation ID
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the messages are retrieved
 *  */
export const getMessagesByConversation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json({
      messages: messages.map((message) =>
        message.toObject({
          getters: true,
        })
      ),
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
