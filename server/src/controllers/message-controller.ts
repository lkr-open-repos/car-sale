import { Message } from "../models";
import { Request, Response, NextFunction } from "../types";
import { MessageDocument, ConversationDocument } from "../types";
import { throwErrorHelper } from "../utils";

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
